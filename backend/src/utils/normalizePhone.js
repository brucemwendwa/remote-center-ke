// Normalize Kenyan phone numbers to 2547XXXXXXXX / 2541XXXXXXXX
export function normalizePhone(input) {
  if (!input) return null;
  let s = String(input).trim().replace(/\s+/g, '').replace(/[-()]/g, '');
  if (s.startsWith('+')) s = s.slice(1);
  if (s.startsWith('0') && s.length === 10) s = '254' + s.slice(1);
  if (s.startsWith('7') && s.length === 9) s = '254' + s;
  if (s.startsWith('1') && s.length === 9) s = '254' + s;
  if (!/^254\d{9}$/.test(s)) return null;
  return s;
}
export default normalizePhone;
