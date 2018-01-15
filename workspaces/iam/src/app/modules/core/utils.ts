import base64js from 'base64-js';
declare var TextDecoder;
declare var TextEncoder;

export const base64Encode = (str, encoding = 'utf-8') => {
    let bytes = new TextEncoder(encoding).encode(str);
    return base64js.fromByteArray(bytes);
}

// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
export const base64Decode = (str, encoding = 'utf-8') => {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}
export const mergeConf = (config, fromConfig: Object): Object => {
    if (!fromConfig) {
        return config;
    }
    if (Object.getPrototypeOf(fromConfig) !== Object.prototype) {
        throw new Error('fromConfig must be object literal!');
    }
    for (const propName in fromConfig) {
        if (fromConfig[propName] instanceof Object) {
            fromConfig[propName] = mergeConf(config[propName], fromConfig[propName]);
        }
    }
    return Object.assign({}, config, fromConfig);
};

export const mergeConfig = (toConfig, fromConfig: Object) => {
    const t = mergeConf(toConfig, fromConfig);
    Object.assign(toConfig, t);
};

export const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}