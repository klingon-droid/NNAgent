import { Database } from './database';

export const db = new Database();

export type { IDatabase } from './types';
export { Database } from './database';
export { LocalStorage } from './storage';