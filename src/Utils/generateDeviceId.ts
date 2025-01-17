import { v4 as uuidv4 } from 'uuid';
export default async function generateDeviceId(): Promise<string> {
  return uuidv4();
}
