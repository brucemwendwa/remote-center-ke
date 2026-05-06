// Stub — wire to a real PDF lib (pdfkit) later.
export async function generateInvoicePdf(order) {
  return Buffer.from(
    `INVOICE\nOrder: ${order.trackingNumber}\nTotal: KES ${order.pricing?.total || 0}\n`,
    'utf-8'
  );
}
export default generateInvoicePdf;
