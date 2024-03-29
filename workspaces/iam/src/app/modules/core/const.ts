import { InjectionToken } from '@angular/core';

export const NET_COMMU_TIMEOUT = 57_000; // ms
export const MSG_DISPLAY_TIMEOUT = 6_000;
export const DB_CACHE_TOKEN = new InjectionToken('DB_CACHE_TOKEN');
export const NET_CACHE_TOKEN = new InjectionToken('NET_CACHE_TOKEN');
export const STORE_CACHE_TOKEN = new InjectionToken('STORE_CACHE_TOKEN');
export const CACHE_FACADE_TOKEN = new InjectionToken('CACHE_FACADE_TOKEN');
