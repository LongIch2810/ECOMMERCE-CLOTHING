const calculateTotal = (
  subTotal,
  max_discount = 0,
  discount = 0,
  unitDiscount = "%",
  shippingFee = 0
) => {
  const total = subTotal + shippingFee;
  return !discount
    ? total
    : unitDiscount === "%"
    ? total - (total * discount) / 100 > max_discount
      ? total - max_discount
      : total - (total * discount) / 100
    : total - discount;
};

export { calculateTotal };
