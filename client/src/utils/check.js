const isExpire = (end_date) => {
  const now = Date.now();
  const endDate = new Date(end_date);
  return endDate.getTime() < now ? true : false;
};
export { isExpire };
