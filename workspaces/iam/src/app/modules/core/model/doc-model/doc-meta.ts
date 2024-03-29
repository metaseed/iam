import picaLib from 'pica';
import { JSON_SCHEMA, dump, load } from 'js-yaml';
import { Issue } from 'app/modules/net-storage/github/issues/issue';
import { EntityCacheStore } from '@rx-store/entity';
import { Logger } from 'core';

const DEFAULT_DOC_HEAD_META_CONTENT = `author: Jason Song <metaseed@gmail.com>
version: 1.0.0
tag: []
subPage: []
enable: [toc]
`;

export const DEFAULT_DOC_HEAD_META = `---
${DEFAULT_DOC_HEAD_META_CONTENT}
---
`;
export function getDefaultDocHeadMeta() {
  return load(DEFAULT_DOC_HEAD_META_CONTENT, { json: true }) as HeadMeta;
}

export function setHeadMeta(content: string, headMeta: HeadMeta) {
  const headMetaStr = dump(headMeta, {flowLevel:1 });
  return processHeadMeta<string>(content, (metaStartPos, metaEndPos) => {
    const metaContent = content.slice(0, metaStartPos) + headMetaStr + content.slice(metaEndPos);
    return metaContent;
  }, headMetaStr);
}

export function getHeadMeta(content: string): HeadMeta {
  return processHeadMeta<HeadMeta>(content, (metaStartPos, metaEndPos) => {
    const metaContent = content.substring(metaStartPos, metaEndPos);
    const headMeta = load(metaContent, { json: true });
    return headMeta as HeadMeta;
  });
}
/**
 *
 * @param content
 * @param process
 * @param headMetaStr only used when set
 * @returns
 */
export function processHeadMeta<T>(content: string, process: (start, end) => T, headMetaStr: string = undefined): T {
  let startPos = 0;
  let endPos = content.indexOf('\n');
  if (endPos === -1) {
    if (headMetaStr) {
      // assume the content is head that without \n
      return `${content}
      ${headMetaStr}` as unknown as T;
    }
    return undefined;
  }
  let metaStartPos;
  let metaEndPos;

  while (metaStartPos === undefined || metaEndPos === undefined) {
    let line = content.substring(startPos, endPos)
    const regex = /^---\s*$/;
    if (regex.test(line)) {
      if (metaStartPos === undefined) metaStartPos = endPos + 1;
      else if (metaEndPos === undefined) {
        metaEndPos = startPos;
        return process(metaStartPos, metaEndPos);

      }
      else throw Error('we never come here');
    }

    startPos = endPos + 1;

    // not find in whole content
    if (startPos >= content.length) {
      if (headMetaStr) {
        const headEnd = content.indexOf('\n');
        return `${content.slice(0, headEnd)}
        ${headMetaStr}
        ${content.slice(headEnd + 1)}` as unknown as T;
      }
      return undefined;
    }

    endPos = content.indexOf('\n', startPos);

    // if end of file without \n
    if (endPos === -1) endPos = content.length
  }
}



export interface Tag { name: string, description?: string, color?: string }

const logger = Logger('DocMeta')

const pica = picaLib();

export class Version {
  major: number;
  minor: number;
  reversion: number;
}

export interface HeadMeta {
  author: string;
  version: string;
  tag: string[];
  subPage: number[];
  enable: string[];
}

function deSerialize(metaData: string) {
  const re = /<!--\stype:iam[\r\n]*([\s\S]*)-->[\s\S]*/gm;
  const jsonString = re.exec(metaData);
  if (!jsonString) return null;
  try {
    const meta = <DocMeta>JSON.parse(jsonString[1]);

    meta.createDate = meta.createDate && new Date(meta.createDate);
    meta.updateDate = meta.updateDate && new Date(meta.updateDate);
    return meta;
  } catch (err) {
    logger.debug(jsonString)
    logger.error(err);
    return null;
  }
}

export function issueToDocMeta(
  issue: Issue,
  tagCache: EntityCacheStore<string, Tag>) {
  let meta = deSerialize(issue.body);
  if (!meta) meta = {} as DocMeta;
  meta.isDeleted = !!issue.closed_at;
  meta.id = meta.id || issue.number;
  meta.tag = issue.labels.map(l => l.name);
  meta.updateDate = issue.updated_at ? new Date(issue.updated_at) : meta.updateDate;
  meta.createDate = issue.created_at ? new Date(issue.created_at) : meta.createDate;
  meta.format = meta.format || 'md';
  meta._context = issue;

  const tags = issue.labels.map(l =>
    ({ name: l.name, color: l.color, description: l.description, default: l.default })
  )
  tagCache.upsertMany(tags);
  return meta;
};

export class DocMeta {
  static width: 400;

  public _context: any; // issue obj;
  public version: string;
  public subPage: number[];
  public enable: string[];
  public tag: string[];

  private constructor(
    public id: number,
    public title: string,

    /**
     * utc time
     */
    public createDate: Date,
    /**
     * utc time
     */
    public updateDate: Date,
    public summary: string,
    public imageData: string,
    /**
     *  suffix
     */
    public format = 'md',
    public isDeleted = false

  ) { }

  static parseDocumentName(name: string) {
    let r = /(.*)_(\d+)\.(\w*)/.exec(name);
    if (r)
      return { sanitizedTitle: r[1], id: +r[2], ext: r[3] };
    else {
      r = /(\d+)\.(\w*)/.exec(name);
      return { sanitizedTitle: '', id: +r[1], ext: r[2] };
    }
  }


  static serialize(meta: DocMeta, contentUrl: string) {
    return `
<!-- type:iam
    ${JSON.stringify(meta, (key, value) => {
      if (key.startsWith('_')) return undefined;
      return value;
    })}
-->
> please visit: **[${meta.title}](${contentUrl})**
`;
  }

  static getFirstLine(text) {
    let index = text.indexOf('\n');
    if (index === -1) index = undefined;
    return text.substring(0, index);
  }
  static getTitle(content: string) {
    const re = /\s*#\s(.*)\s*/g;
    const r = re.exec(content);
    if (r) return r[1];
    return '';
  }

  // sync the regex with the one in title.js markdown-it plugin
  // although we remove title from filename, we could use it to give download file a meaningful name
  static sanitizeTitle = (title: string) => title.replace(/[<>:"/\\|?*]/g, '~'); // on windows these chars is invalid for file name.;

  static getSummary(content: string) {
    const re = /\s*\*(.*?)\*\s*/g;
    const r = re.exec(content);
    if (r) return r[1];
    return '';
  }
  static getFirstPicture(content: string) {
    let re = /.*!\[.*\]\((.*?)\s+=/g;
    let r = re.exec(content);
    if (r && r[1]) return r[1];
    re = /.*!\[.*\]\((.*?)\)/g;
    r = re.exec(content);
    if (r && r[1]) return r[1];
    return '';
  }

  static serializeContent(
    id: number,
    content: string,
    contentUrl: string,
    format: string,
    createDate: Date,
    updateDate: Date,
    oldMeta: DocMeta
  ) {
    const title = DocMeta.getTitle(content);
    const summary = DocMeta.getSummary(content);
    const picUrl = DocMeta.getFirstPicture(content);
    const newMeta = new DocMeta(
      id,
      title,
      createDate,
      updateDate ?? new Date(),
      summary,
      picUrl,
      format
    );
    function deleteUndefinedField(obj) {
      for (const [key, value] of Object.entries(obj)) {
        if (value === undefined) delete obj[key];
      }
    }
    // remove undefined property value that may override oldMeta
    deleteUndefinedField(newMeta);
    const meta = { ...oldMeta, ...newMeta } as DocMeta;
    const metaStr = DocMeta.serialize(meta, contentUrl);
    return { meta, metaStr };
  }

  // http://jsfiddle.net/handtrix/YvQ5y/
  // https://stackoverflow.com/questions/34639708/how-do-i-set-crossorigin-attribute-when-using-canvas-todataurl
  static convertImgToDataUrlViaCanvas(url, outputFormat, width, callback) {
    const img = document.createElement('img');
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = url;
    img.onload = function () {
      let canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      // document.body.appendChild(canvas);
      let dataUrl;
      const h = width * (img.height / img.width);
      canvas.height = h;
      canvas.width = width;
      ctx.fillStyle = 'white';
      ctx.font = '15px sans-serif';
      ctx.drawImage(<HTMLImageElement>this, 0, 0, width, h);
      dataUrl = canvas.toDataURL(outputFormat);
      callback(dataUrl);
      canvas = null;
    };
    const canvas = document.createElement('canvas');
    const height = width * (img.height / img.width);
    canvas.height = height;
    canvas.width = width;
    pica
      .resize(img, canvas)
      .then(result => pica.toBlob(result, 'image/jpeg', 0.9))
      .then(blob => logger.debug('resized to canvas & created blob!'));
  }

  static convertFileToDataUrlViaFileReader(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
}
