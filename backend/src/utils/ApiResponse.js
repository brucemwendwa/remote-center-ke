export class ApiResponse {
  constructor(data = null, message = 'OK', meta = null) {
    this.success = true;
    this.message = message;
    this.data = data;
    if (meta) this.meta = meta;
  }
}
export const ok = (res, data, message = 'OK', meta = null) =>
  res.json(new ApiResponse(data, message, meta));
export const created = (res, data, message = 'Created') =>
  res.status(201).json(new ApiResponse(data, message));
export default ApiResponse;
