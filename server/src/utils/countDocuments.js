const countDocuments = async (collection) => {
  return await collection.countDocuments();
};

module.exports = countDocuments;
