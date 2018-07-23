import { Observable, of } from 'rxjs';
import picaLib from 'pica';

const pica = picaLib();

export class Version {
  major: number;
  minor: number;
  revison: number;
}

export class DocMeta {
  static width: 400;

  public _context: any; // issue obj;

  private constructor(
    public id: number,
    public title: string,
    public version: Version,
    public createDate: Date, //utc time
    public updateDate: Date, //utc time
    public summary: string,
    public imageData: string,
    public contentSha: string, // sha of file
    public tags: any, // in issue as labels
    public format = 'md', // sufix
    public isDeleted = false
  ) {}

  private serialize(contentUrl: string) {
    return `
<!-- type:iam
    ${JSON.stringify(this, (key, value) => {
      if (key.startsWith('_')) return undefined;
      return value;
    })}
-->
> please visit: **[${this.title}](${contentUrl})**
`;
  }

  static getFirstLine(text) {
    var index = text.indexOf('\n');
    if (index === -1) index = undefined;
    return text.substring(0, index);
  }
  static getTitle(content: string) {
    let re = /\s*#\s(.*)/g;
    let r = re.exec(content);
    if (r) return r[1];
    return '';
  }
  static getSummary(content: string) {
    let re = /\s*\*(.*?)\*\s*/g;
    let r = re.exec(content);
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

  private static getVersion(content: string) {
    return undefined;
  }

  private static getTags(content: string) {
    return undefined;
  }

  static serializeContent(
    id: number,
    content: string,
    contentSha: string,
    contentUrl: string,
    format: string,
    createDate: Date
  ) {
    const title = DocMeta.getTitle(content);
    const summary = DocMeta.getSummary(content);
    const picUrl = DocMeta.getFirstPicture(content);
    const version = DocMeta.getVersion(content);
    const tags = DocMeta.getTags(content);
    const meta = new DocMeta(
      id,
      title,
      version,
      createDate,
      new Date(),
      summary,
      picUrl,
      contentSha,
      tags,
      format
    );
    const metaStr = meta.serialize(contentUrl);
    return { meta, metaStr };
  }

  static deSerialize(metaData: string) {
    let re = /<!--\stype:iam[\r\n]*([\s\S]*)-->[\s\S]*/gm;
    let jsonString = re.exec(metaData);
    if (!jsonString) return null;
    try {
      let meta = <DocMeta>JSON.parse(jsonString[1]);
      if (!meta.contentSha) { // old name is contentId
        const sha = meta['contentId'];
        if (sha) meta.contentSha = sha;
      }

      meta.createDate = meta.createDate && new Date(meta.createDate);
      meta.updateDate = meta.updateDate && new Date(meta.updateDate);
      return meta;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  //http://jsfiddle.net/handtrix/YvQ5y/
  //https://stackoverflow.com/questions/34639708/how-do-i-set-crossorigin-attribute-when-using-canvas-todataurl
  static convertImgToDataUrlViaCanvas(url, outputFormat, width, callback) {
    var img = document.createElement('img');
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = url;
    img.onload = function() {
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      //document.body.appendChild(canvas);
      var dataURL;
      const height = width * (img.height / img.width);
      canvas.height = height;
      canvas.width = width;
      ctx.fillStyle = 'white';
      ctx.font = '15px sans-serif';
      ctx.drawImage(<HTMLImageElement>this, 0, 0, width, height);
      dataURL = canvas.toDataURL(outputFormat);
      callback(dataURL);
      canvas = null;
    };
    var canvas = document.createElement('canvas');
    var dataURL;
    const height = width * (img.height / img.width);
    canvas.height = height;
    canvas.width = width;
    pica
      .resize(img, canvas)
      .then(result => pica.toBlob(result, 'image/jpeg', 0.9))
      .then(blob => console.log('resized to canvas & created blob!'));
  }

  static convertFileToDataUrlViaFileReader(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
}