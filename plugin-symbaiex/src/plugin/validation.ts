import { SYMBaiEXClient } from '../client';

export async function validateConnection(client: SYMBaiEXClient): Promise<boolean> {
  try {
    const connected = await client.validateConnection();
    if (!connected) {
      throw new Error('Failed to connect to SYMBaiEX API');
    }
    return true;
  } catch (error) {
    console.error('Connection validation error:', error);
    return false;
  }
}