import { fromByteArray } from "base64-js";

declare var TextDecoder;
declare var TextEncoder;

export function base64Encode(str, encoding = "utf-8") {
  let bytes = new TextEncoder(encoding).encode(str);
  return fromByteArray(bytes);
}

// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
export function base64Decode(str, encoding = "utf-8") {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(
    atob(str)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
}

export function mergeConf(config: object, fromConfig: object) {
  if (!fromConfig) {
    return config;
  }
  if (Object.getPrototypeOf(fromConfig) !== Object.prototype) {
    throw new Error("fromConfig must be object literal!");
  }
  for (const propName in fromConfig) {
    if (fromConfig[propName] instanceof Object) {
      fromConfig[propName] = mergeConf(config[propName], fromConfig[propName]);
    }
  }
  return Object.assign({}, config, fromConfig);
}

export function mergeConfig(toConfig, fromConfig: object) {
  const t = mergeConf(toConfig, fromConfig);
  Object.assign(toConfig, t);
}

export function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function uid() {
  const uidLength = 16;
  const crypto = window.crypto || (<any>window).msCrypto;
  const alphabet =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const radix = alphabet.length;
  const array = new Uint32Array(uidLength);
  crypto.getRandomValues(array);
  return array.map((value) => <any>alphabet[value % radix]).join("");
}

export function hash(str) {
  let hash = 0;
  if (!str) return hash;
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char; // eslint-disable-line no-bitwise
    hash |= 0; // eslint-disable-line no-bitwise
  }
  return hash;
}
