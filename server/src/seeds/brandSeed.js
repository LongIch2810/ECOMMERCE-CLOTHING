const Brand = require("../models/brandModel");
const generateSlug = require("../utils/generateSlug");

const brands = [
  {
    name: "NIKE",
    slug: generateSlug("nike"),
    logo: "https://static.vecteezy.com/system/resources/previews/010/994/330/original/nike-logo-name-black-clothes-design-icon-abstract-football-illustration-with-white-background-free-vector.jpg",
  },
  {
    name: "ADIDAS",
    slug: generateSlug("adidas"),
    logo: "https://static.vecteezy.com/system/resources/previews/019/136/309/original/adidas-logo-adidas-icon-free-free-vector.jpg",
  },
  {
    name: "GUCCI",
    slug: generateSlug("gucci"),
    logo: "https://static.vecteezy.com/system/resources/previews/023/871/111/original/gucci-logo-brand-clothes-with-name-symbol-design-fashion-illustration-free-vector.jpg",
  },
  {
    name: "CHANNEL",
    slug: generateSlug("channel"),
    logo: "https://www.freepnglogos.com/uploads/chanel-logo-png-30.jpg",
  },
  {
    name: "EVISU",
    slug: generateSlug("evisu"),
    logo: "https://logodix.com/logo/445961.jpg",
  },
  {
    name: "DIRTY COINS",
    slug: generateSlug("dirty coins"),
    logo: "https://thumb.danhsachcuahang.com/image/2019/06/thoi-trang-nam-dirty-coins-thumb-264.png",
  },
  {
    name: "PUMA",
    slug: generateSlug("puma"),
    logo: "https://static.vecteezy.com/system/resources/previews/010/994/431/large_2x/puma-logo-black-symbol-with-name-clothes-design-icon-abstract-football-illustration-with-white-background-free-vector.jpg",
  },
  {
    name: "UNIQLO",
    slug: generateSlug("dirty coins"),
    logo: "https://tse3.mm.bing.net/th?id=OIP.5eTnAnPg5w7fcOGZ-8D0ZgHaHY&pid=Api&P=0&h=180",
  },
  {
    name: "ADLV",
    slug: generateSlug("adlv"),
    logo: "https://i.pinimg.com/originals/59/8a/41/598a41befbbe264fa4ae653bdd6342cd.jpg",
  },
  {
    name: "LOUIS VUITTON",
    slug: generateSlug("louis vuitton"),
    logo: "https://wallpaperaccess.com/full/1681533.jpg",
  },
];

const seedBrand = async () => {
  try {
    const addBrands = brands.map(async (brand) => {
      const newBrand = await Brand.create(brand);
      return await newBrand.save();
    });

    const results = await Promise.all(addBrands);
    if (results.length > 0) {
      console.log("Added brands successfully !");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = seedBrand;
