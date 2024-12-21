import slugify from "slugify";

const generateSlug = (text) => {
  return slugify(text, { lower: true });
};

export default generateSlug;
