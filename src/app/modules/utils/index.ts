export const mergeConf = (config, fromConfig: Object): Object => {
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
