export const formatKES = (n) => {
  const v = Number(n || 0);
  return `KES ${v.toLocaleString('en-KE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};
