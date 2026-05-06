export function calcDeliveryFee({ city, area } = {}) {
  const c = (city || '').toLowerCase().trim();
  const a = (area || '').toLowerCase().trim();
  if (c === 'nairobi') {
    if (a === 'cbd' || a.includes('cbd') || a.includes('city center') || a.includes('city centre')) {
      return 200;
    }
    return 350;
  }
  return 600;
}
export default calcDeliveryFee;
