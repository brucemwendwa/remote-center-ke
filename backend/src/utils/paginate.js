export function paginate(query) {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 20));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}
export function meta(total, page, limit) {
  return { total, page, limit, pages: Math.ceil(total / limit) || 1 };
}
export default paginate;
