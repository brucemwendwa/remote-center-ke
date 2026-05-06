export function productId(product) {
  return product?.id || product?._id || product?.slug || product?.name;
}

export function normalizeProduct(product) {
  if (!product) return product;

  const brand =
    typeof product.brand === 'object'
      ? product.brand?.name
      : product.brandName || product.brand;
  const category =
    typeof product.category === 'object'
      ? product.category?.name || product.category?.slug
      : product.categoryName || product.category;
  const images = product.images?.length ? product.images : product.image ? [product.image] : [];

  return {
    ...product,
    id: product.id || product._id,
    brand: brand || 'Remote Center',
    category: category || 'Uncategorized',
    image: product.image || images[0],
    images,
    originalPrice: product.originalPrice || product.compareAtPrice,
    reviews: product.reviews ?? product.numReviews ?? 0,
  };
}

export function normalizeProducts(products = []) {
  return products.map(normalizeProduct).filter(Boolean);
}
