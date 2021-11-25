import picaLib from 'pica';
import YAML from 'js-yaml';
import { Issue } from 'app/modules/net-storage/github/issues/issue';

export interface Tag {name: string, description?: string, color? :string}

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

export function issueToDocMeta(issue: Issue){
  let meta = DocMeta.deSerialize(issue.body);
  if (!meta) meta = {} as DocMeta;
  meta.id = meta.id || issue.number;
  meta.tag = issue.labels;
  meta.updateDate = meta.updateDate || new Date(issue.updated_at);
  meta.createDate = meta.createDate || new Date(issue.created_at);
  meta.format = meta.format || 'md';
  meta.isDeleted = !!issue.closed_at;
  meta._context = issue;
  return meta;
};

export class DocMeta {
  static width: 400;

  public _context: any; // issue obj;
  public version: string;
  public subPage: string[];
  public tag: Tag[];

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
    const r = /(.*)_(\d+)\.(\w*)/.exec(name);
    return { sanitizedTitle: r[1], id: +r[2], ext: r[3] };
  }

  static getHeadMeta(content: string):HeadMeta {
    let startPos = 0;
    let endPos = content.indexOf('\n');
    if (endPos === -1) return undefined;

    let metaStartPos;
    let metaEndPos;

    while (metaStartPos === undefined || metaEndPos === undefined) {
      let line = content.substring(startPos, endPos)
      const regex = /^---\s*$/;
      if (regex.test(line)) {
        if (metaStartPos === undefined) metaStartPos = endPos + 1;
        else if (metaEndPos === undefined) {
          metaEndPos = startPos;
          const metaContent = content.substring(metaStartPos, metaEndPos);
          const headMeta = YAML.load(metaContent, { json: true });
          return headMeta;

        }
        else throw Error('we never come here');
      }

      startPos = endPos + 1;

      // not find in whole content
      if (startPos >= content.length) return undefined;

      endPos = content.indexOf('\n', startPos);

      // if end of file without \n
      if (endPos === -1) endPos = content.length
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
    const meta = { ...oldMeta, ...newMeta } as DocMeta;
    const metaStr = DocMeta.serialize(meta, contentUrl);
    return { meta, metaStr };
  }

  static deSerialize(metaData: string) {
    const re = /<!--\stype:iam[\r\n]*([\s\S]*)-->[\s\S]*/gm;
    const jsonString = re.exec(metaData);
    if (!jsonString) return null;
    try {
      const meta = <DocMeta>JSON.parse(jsonString[1]);

      meta.createDate = meta.createDate && new Date(meta.createDate);
      meta.updateDate = meta.updateDate && new Date(meta.updateDate);
      return meta;
    } catch (err) {
      console.log(jsonString)
      console.error(err);
      return null;
    }
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
      .then(blob => console.log('resized to canvas & created blob!'));
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
