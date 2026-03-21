export function generateMeetingUrl() {
  const token = Math.random().toString(36).slice(2, 10);
  return `https://meet.google.com/${token.slice(0, 3)}-${token.slice(3, 7)}-${token.slice(7, 8)}demo`;
}
