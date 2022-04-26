const getProductPrice = (
  price: number,
  discount: number,
  promotion: number,
  quantity: number
) => {
  // product may not have promotion or discount setted
  if (!discount) discount = 0;
  if (!promotion) promotion = 0;

  if (discount === 0 && promotion === 0) return price * quantity;
  if (promotion > 0) return promotion * quantity;

  const percent = discount / 100;
  const discountValue = price * percent;
  return (price - discountValue) * quantity;
};

const priceWrappedWithLocaleString = (
  price: number,
  discount: number,
  promotion: number,
  quantity: number
) => {
  return getProductPrice(price, discount, promotion, quantity).toLocaleString(
    "pt-BR",
    { style: "currency", currency: "BRL" }
  );
};

export { getProductPrice, priceWrappedWithLocaleString };
