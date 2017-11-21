import { Observable } from "rxjs/Observable";

export class DocMeta {
    static width: 100;
    static height: 200;

    contentId: string;// sha of file
    displayHeader: string;
    summary: string;
    imageData: string;

    static serialize(header: string,
        summary: string,
        imageUrl: string,
        contentId: string, contentUrl: string) {
        if (imageUrl) {
            let o = Observable.bindCallback(DocMeta.convertImgToDataUrlViaCanvas);
            return o(imageUrl, 'image/png', DocMeta.width, DocMeta.height).map((v) => {
                let contentLink = contentUrl ? `[${contentUrl}](${contentUrl})` : '';
                return `
<!--
    {
        "displayHeader": ${header},
        "summary": ${summary},
        "imageData":${v},
        "contentId":${contentId} 
    }
-->
        ${contentLink}
`;
            });
        }
        return Observable.of(`
<!--
    {

        "displayHeader": ${header},
        "summary": ${summary},
        "imageData":'',
        "contentId":${contentId} 
    }
-->
        please visit: ${contentUrl}
        `);
    }
    static getFirstLine(text) {
        var index = text.indexOf("\n");
        if (index === -1) index = undefined;
        return text.substring(0, index);
    }
    static getHeader(content: string) {
        let re = /\s*#\s(.*?)\s/g
        let r = re.exec(content)
        if (r) return r[1];
        return '';
    }
    static getSummary(content: string) {
        let re = /\s*#\s(.*?)\s/g
        let r = re.exec(content)
        if (r) return r[1];
        return '';
    }
    static getFirstPicture(content: string) {
        let re = /.*!\[.*\]\((.*?)\)/gm;;
        if (re) return re[1];
        return '';
    }
    static serializeContent(content: string, contentId: string, contentUrl: string) {
        let header = DocMeta.getHeader(content);
        let summary = DocMeta.getSummary(content);
        let picUrl = DocMeta.getFirstPicture(content);
        return DocMeta.serialize(header, summary, picUrl, contentId, contentUrl);
    }

    static deSerialize(metaData: string) {
        let re = /(<!--[\r\n]*)([\s\S]*)(-->[\s\S]*)/gm;
        let jsonString = metaData.replace(re, "$2");
        let meta = <DocMeta>JSON.parse(jsonString);
        return meta;
    }

    //http://jsfiddle.net/handtrix/YvQ5y/
    static convertImgToDataUrlViaCanvas(url, outputFormat, width, height, callback) {
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = function () {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            var dataURL;
            canvas.height = height;
            canvas.width = width;
            ctx.drawImage(<HTMLImageElement>this, 0, 0, width, height);
            dataURL = canvas.toDataURL(outputFormat);
            callback(dataURL);
            canvas = null;
        };
        img.src = url;
    }

    static convertFileToDataUrlViaFileReader(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
                callback(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }
}