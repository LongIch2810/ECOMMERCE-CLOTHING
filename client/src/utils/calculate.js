const calculateTotal = (
  subTotal,
  max_discount = 0,
  discount = 0,
  unitDiscount = "%",
  shippingFee = 0
) => {
  let total = subTotal + shippingFee;
  total = !discount
    ? total
    : unitDiscount === "%"
    ? total - (total * discount) / 100 > max_discount
      ? total - max_discount
      : total - (total * discount) / 100
    : total - discount;
  return total;
};

const calculateTotalDiscount = (
  subTotal,
  max_discount = 0,
  discount = 0,
  unitDiscount = "%",
  shippingFee = 0
) => {
  if (!discount) return 0;
  let total = subTotal + shippingFee;
  total =
    unitDiscount === "%"
      ? total - (total * discount) / 100 > max_discount
        ? max_discount
        : total - (total * discount) / 100
      : discount;
  return total;
};

export { calculateTotal, calculateTotalDiscount };
