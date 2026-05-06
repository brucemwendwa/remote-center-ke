export const dateFmt = (d) => {
  try {
    return new Date(d).toLocaleDateString('en-KE', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  } catch {
    return '';
  }
};

export const dateTimeFmt = (d) => {
  try {
    return new Date(d).toLocaleString('en-KE', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  } catch {
    return '';
  }
};
