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