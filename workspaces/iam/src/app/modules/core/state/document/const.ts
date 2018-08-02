import { InjectionToken } from '@angular/core';

export const NEW_DOC_ID = Number.POSITIVE_INFINITY;
export const DEFAULT_NEW_DOC_CONTENT = '# Title\n*summery*\n';
export const DB_CACHE_TOKEN = new InjectionToken('DB_CACHE_TOKEN');
export const NET_CACHE_TOKEN = new InjectionToken('NET_CACHE_TOKEN');
