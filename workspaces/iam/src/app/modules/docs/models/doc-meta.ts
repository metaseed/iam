import { Observable, of } from 'rxjs';
const pica = require('pica')();
export class DocMeta {
  static width: 400;

  constructor(
    public contentId: string, // sha of file
    public title: string,
    public summary: string,
    public imageData: string
  ) {}

  static serialize(
    title: string,
    summary: string,
    imageUrl: string,
    contentId: string,
    contentUrl: string
  ) {
    //         if (imageUrl) {
    //             let o = Observable.bindCallback(DocMeta.convertImgToDataUrlViaCanvas);
    //             return o(imageUrl, 'image/png', 100)
    //                 // .catch(e => {
    //                 //     return Observable.of({});
    //                 // })
    //                 .map((v: string) => {
    //                     let contentLink = contentUrl ? `[${contentUrl}](${contentUrl})` : '';
    //                     return [`
    // <!-- type:iam
    //     {
    //         "title": "${title}",
    //         "summary": "${summary}",
    //         "imageData":"${v}",
    //         "contentId":"${contentId}"
    //     }
    // -->
    //         ${contentLink}
    // `, new DocMeta(contentId, title, summary, v)];
    //                 });
    //         }
    return of([
      `
<!-- type:iam
    {

        "title": "${title}",
        "summary": "${summary}",
        "imageData":"${imageUrl}",
        "contentId":"${contentId}"
    }
-->
> please visit: **[${title}](${contentUrl})**
        `,
      new DocMeta(contentId, title, summary, imageUrl)
    ]);
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
  static serializeContent(content: string, contentId: string, contentUrl: string) {
    let header = DocMeta.getTitle(content);
    let summary = DocMeta.getSummary(content);
    let picUrl = DocMeta.getFirstPicture(content);
    return DocMeta.serialize(header, summary, picUrl, contentId, contentUrl);
  }

  static deSerialize(metaData: string) {
    let re = /<!--\stype:iam[\r\n]*([\s\S]*)-->[\s\S]*/gm;
    let jsonString = re.exec(metaData);
    if (!jsonString) return null;
    try {
      let meta = <DocMeta>JSON.parse(jsonString[1]);
      return meta;
    } catch {
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
