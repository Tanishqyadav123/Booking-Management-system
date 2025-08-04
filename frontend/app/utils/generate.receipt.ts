export function generateUniqueReceipt(prefix: string = "RCP"): string {
  const timestamp = Date.now(); // current time in ms
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase(); // random 6 chars
  return `${prefix}-${timestamp}-${randomPart}`;
}
