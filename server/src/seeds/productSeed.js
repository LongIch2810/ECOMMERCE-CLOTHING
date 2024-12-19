const Gender = require("../models/genderModel");
const TypeProduct = require("../models/typeProductModel");
const Product = require("../models/productModel");
const Supplier = require("../models/supplierModel");
const Stock = require("../models/stockModel");

require("dotenv").config();

const menProducts = [
  {
    name: "Nike Club Futura",
    price: 200,
    description: "Áo khoác Nike Club Futura giày ấm, nhẹ nhàng, thu hút",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734546212/image%20clothing/image%20product/xiba11mjproadhpekcbe.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734546250/image%20clothing/image%20product/h8fux3z3gctwsulekdnu.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734546550/image%20clothing/image%20product/vwwly7fd9sblzsm5y48e.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734546250/image%20clothing/image%20product/h3pvwdai8prjc7w8w8dj.png",
    ],
  },
  {
    name: "Nike Windrunner",
    price: 300,
    description: "Áo khoác Nike Windrunner thoàng mát, nhẹ nhàng, thu hút",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734547355/image%20clothing/image%20product/bfgvzkxg5wm2pz2iqini.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734547355/image%20clothing/image%20product/zjt5rwftbd9lfe9utfc9.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734547354/image%20clothing/image%20product/px3e8yiamdnsyclqqiqx.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734547434/image%20clothing/image%20product/lxxoilxqwgnhdfhpapda.png",
    ],
  },
  {
    name: "Nike Fancy Matic",
    price: 300,
    description: "Áo khoác Nike Fancy Matic thoàng mát, nhẹ nhàng, thu hút",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734546569/image%20clothing/image%20product/uxess7hnl4ojor10esbd.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734546568/image%20clothing/image%20product/zobvjeaj8rucvwximhce.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734546568/image%20clothing/image%20product/dqtebymubxj9egot0rbs.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734546769/image%20clothing/image%20product/vdqveryt1yqfobzvibre.png",
    ],
  },
  {
    name: "Nike Wind z10",
    price: 250,
    description: "Áo sweater Nike Wind z10 thoàng mát, nhẹ nhàng, thu hút",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734546770/image%20clothing/image%20product/vfwdej9tc7emms49vsao.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734546769/image%20clothing/image%20product/ywp0lsypvrauqptz8u7h.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734546769/image%20clothing/image%20product/rtoltqjs2m5ssqvouv7d.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734547434/image%20clothing/image%20product/lxxoilxqwgnhdfhpapda.png",
    ],
  },
  {
    name: "Nike T-Shirt alpha",
    price: 250,
    description: "Áo phông Nike T-Shirt alpha thoàng mát, nhẹ nhàng, thu hút",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734548433/image%20clothing/image%20product/pttltxjohlhvfholtgwe.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734548433/image%20clothing/image%20product/o1vb4lqylqv9erxoehzj.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734548433/image%20clothing/image%20product/kkfli1tbexctsyw71al0.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734548432/image%20clothing/image%20product/qffdp2ya1k97dkwnujll.png",
    ],
  },
  {
    name: "Nike T-Shirt beta",
    price: 250,
    description: "Áo phông Nike T-Shirt beta thoàng mát, nhẹ nhàng, thu hút",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549117/image%20clothing/image%20product/al7t7q0snivcmh9465lc.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549117/image%20clothing/image%20product/nj06qzwuxaz5ylmfbhiw.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549117/image%20clothing/image%20product/lgo49rb8e0sdjgzmdczh.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549117/image%20clothing/image%20product/udo3kqre7zh1rh2zdbpd.png",
    ],
  },
  {
    name: "Nike T-Shirt omega",
    price: 250,
    description: "Áo phông Nike T-Shirt omega  thoàng mát, nhẹ nhàng, thu hút",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549118/image%20clothing/image%20product/aiuxovqiv47hxiycmkq2.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549118/image%20clothing/image%20product/tqmxwjo9m0cscifub0sq.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549118/image%20clothing/image%20product/vf7lknaqt7bejtevhd4m.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549118/image%20clothing/image%20product/ds8r2sl3m8g00yrj4kq6.png",
    ],
  },
  {
    name: "Nike T-Shirt Cuaaaa",
    price: 250,
    description: "Áo phông Nike T-Shirt Cuaaaa thoàng mát, nhẹ nhàng, thu hút",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549118/image%20clothing/image%20product/jzjd3xgnl9gj7bj4jvgl.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549118/image%20clothing/image%20product/ut1ndkmpwrqjj14irmoo.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549117/image%20clothing/image%20product/onrsmrejkhldnhg1s1nh.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549117/image%20clothing/image%20product/w9glzbkn9l57whbfkld2.png",
    ],
  },
  {
    name: "Nike Polo alpha",
    price: 250,
    description: "Áo polo Nike Polo alpha  thoàng mát, nhẹ nhàng, thu hút",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549453/image%20clothing/image%20product/jov5vzjzxp3wd97zuywq.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549453/image%20clothing/image%20product/catd7myi3xfexfd9dwyd.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549453/image%20clothing/image%20product/onsgmgvvub4bvevxunkb.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549453/image%20clothing/image%20product/aynildzklowjaeqc9wlv.png",
    ],
  },
  {
    name: "Nike Polo beta",
    price: 250,
    description: "Áo polo Nike Polo beta thoàng mát, nhẹ nhàng, thu hút",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549454/image%20clothing/image%20product/bui2ldijeeuorzebwjgo.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549454/image%20clothing/image%20product/tnzwejvi8zmrhjyl3ik2.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549453/image%20clothing/image%20product/yk0vdzwh4ay7skujngwo.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549453/image%20clothing/image%20product/mtmkmu0b7tllrepusldv.png",
    ],
  },
  {
    name: "Nike Shirts Yellow Dark",
    price: 280,
    description:
      "Áo sơ mi Nike Shirts Yellow Dark thoàng mát, nhẹ nhàng, thu hút",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549599/image%20clothing/image%20product/o3bbehmj4wc4ukppwxle.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549599/image%20clothing/image%20product/usfwrsqgy7sjpibintbx.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549599/image%20clothing/image%20product/yfjegzhv7lhprcnbz1u7.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549599/image%20clothing/image%20product/bvk5zbc1sy8ivsfrwldc.png",
    ],
  },
  {
    name: "Nike Shirts White",
    price: 280,
    description: "Áo sơ mi Nike Shirts White thoàng mát, nhẹ nhàng, thu hút",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549754/image%20clothing/image%20product/mwdp1rhue2vfdconaru0.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549754/image%20clothing/image%20product/iauqhrpcve3kktb3nebe.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549754/image%20clothing/image%20product/omga3jwtnvy5d5ghyhcq.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549753/image%20clothing/image%20product/b7jkdkk3k7dkzs9erteu.png",
    ],
  },
  {
    name: "Nike Sweater Red Dark",
    price: 280,
    description:
      "Áo sweater Nike Sweater Red Dark thoàng mát, nhẹ nhàng, thu hút",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550198/image%20clothing/image%20product/cocvocj2hjt9tm0kof0x.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550198/image%20clothing/image%20product/qrm6nyioosvp27zw60cx.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550197/image%20clothing/image%20product/xu4gye2azgekarth9thx.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550197/image%20clothing/image%20product/eww1m9oxbs0nhwhmsjbe.png",
    ],
  },
  {
    name: "Nike Sweater Gray",
    price: 280,
    description: "Áo sweater Nike Sweater Gray thoàng mát, nhẹ nhàng, thu hút",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549917/image%20clothing/image%20product/t8pl8xuamgrdjmwbyrdp.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549917/image%20clothing/image%20product/ga6vmh1dvdk5oyzsrtql.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549917/image%20clothing/image%20product/etosao8cqbse0iq8ojcc.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549917/image%20clothing/image%20product/anvfsspgaqbnxybihg1e.png",
    ],
  },
  {
    name: "Nike Sweater Mixed Classic",
    price: 280,
    description:
      "Áo sweater Nike Sweater Mixed Classic thoàng mát, nhẹ nhàng, thu hút",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550199/image%20clothing/image%20product/vs2n2ipv2dphqk9xtdid.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550199/image%20clothing/image%20product/hpm9csiilyctibvgjo9y.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550198/image%20clothing/image%20product/maynodehnzyt7snhuyxu.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550198/image%20clothing/image%20product/smcc93wambkpbuetxttj.png",
    ],
  },
  {
    name: "Nike Jeans Basic",
    price: 280,
    description: "Quần jeans Nike Jeans Basic thoàng mát, nhẹ nhàng, thu hút",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550601/image%20clothing/image%20product/nbeyqi1bnhdyfj5sbwsz.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550601/image%20clothing/image%20product/gxn5fngdawlcvknq3b9n.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550601/image%20clothing/image%20product/ll3x9lmr4np6rnkzired.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550600/image%20clothing/image%20product/aaltbzdce1rrxs99f1wa.png",
    ],
  },
  {
    name: "Nike Wind Pant Beige",
    price: 280,
    description: "Quần gió Nike Wind Pant Beige thoàng mát, nhẹ nhàng, thu hút",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550758/image%20clothing/image%20product/ypbvfyxpha0hrk5scwy8.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550758/image%20clothing/image%20product/khvz3jz4cbzhvhcpxvt4.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550758/image%20clothing/image%20product/oolwg1stx66lxoji6x1y.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550757/image%20clothing/image%20product/ncqxl70uafgesi4rh7g1.png",
    ],
  },
  {
    name: "Nike Wind Pant Black",
    price: 280,
    description: "Quần gió Nike Wind Pant Black thoàng mát, nhẹ nhàng, thu hút",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550892/image%20clothing/image%20product/wjp0v36vzltsvokodmos.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550892/image%20clothing/image%20product/hht2akf8r7mzoldxotod.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550891/image%20clothing/image%20product/gpooebz6ejpsuxcnzcz3.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550891/image%20clothing/image%20product/kq73bu9yhe9hnh6717eb.png",
    ],
  },
  {
    name: "Nike Kaki Pant Black",
    price: 280,
    description:
      "Quần kaki Nike Kaki Pant Black thoàng mát, nhẹ nhàng, thu hút",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551159/image%20clothing/image%20product/z3guadgerizvluzmmiva.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551159/image%20clothing/image%20product/wldjk1tigs82u95hkpu0.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551159/image%20clothing/image%20product/fnlsmxwoop9fxjlfa4xc.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551158/image%20clothing/image%20product/dmyhcegitpxdafavtbeh.png",
    ],
  },
  {
    name: "Nike Kaki Pant Beige",
    price: 280,
    description:
      "Quần kaki Nike Kaki Pant Beige thoàng mát, nhẹ nhàng, thu hút",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551294/image%20clothing/image%20product/ptco3wi1ef5viuiverck.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551293/image%20clothing/image%20product/oxmpkgr0g0rtcdkysdzc.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551293/image%20clothing/image%20product/ruyvkpgpjzhvd8bbuwnv.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551293/image%20clothing/image%20product/upn9gwr4bme2dylmmdcv.png",
    ],
  },
  {
    name: "Nike Short Black Cool",
    price: 280,
    description:
      "Quần đùi Nike Short Black Cool thoàng mát, nhẹ nhàng, thu hút",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551423/image%20clothing/image%20product/prshnhpgj1q4zc3fqcrx.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551423/image%20clothing/image%20product/zyhgrgmpdxi5jcqlyfvt.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551423/image%20clothing/image%20product/t7bj6dkqprad9xuhjjjv.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551422/image%20clothing/image%20product/mz8dkgsgye1oedjc1dcz.png",
    ],
  },
  {
    name: "Nike Short Basic Lonely",
    price: 280,
    description:
      "Quần đùi Nike Short Basic Lonely thoàng mát, nhẹ nhàng, thu hút",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551651/image%20clothing/image%20product/gp1lext8a3sihbqog9dl.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551651/image%20clothing/image%20product/v8wdwuwngfb8dtaocdr2.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551650/image%20clothing/image%20product/qpyfdhgveakx2uu9onx9.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551650/image%20clothing/image%20product/iyhajwjgjxe9tkfhymfa.png",
    ],
  },
  {
    name: "Nike Short Red Light Basketball",
    price: 280,
    description:
      "Quần đùi Nike Short Red Light Basketball thoàng mát, nhẹ nhàng, thu hút",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551680/image%20clothing/image%20product/sdx4stn6ezntb6ubeeft.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551680/image%20clothing/image%20product/dkxugzlobzt2yg6xjnw3.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551679/image%20clothing/image%20product/skd5l8ed8lxdg0k0rzus.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551679/image%20clothing/image%20product/xelormoeo2nldseuyorc.png",
    ],
  },
];

const sizes = [
  {
    size: "XS",
    quantity: 10,
    status: "Available",
  },
  {
    size: "S",
    quantity: 10,
    status: "Available",
  },
  {
    size: "M",
    quantity: 10,
    status: "Available",
  },
  {
    size: "L",
    quantity: 10,
    status: "Available",
  },
  {
    size: "XL",
    quantity: 10,
    status: "Available",
  },
  {
    size: "XXL",
    quantity: 10,
    status: "Available",
  },
];

/*-----------------------------------------Them san pham-------------------------------------------*/
const addProductsByGender = async (slugType, arr, slugGender, supplierName) => {
  try {
    const gender = await Gender.findOne({ slug: slugGender });
    const type_product = await TypeProduct.findOne({ slug: slugType });
    const supplier = await Supplier.findOne({ name: supplierName });
    const addProducts = arr.map(async (product) => {
      const newProduct = await Product.create({
        ...product,
        gender: gender._id,
        type_product: type_product._id,
        supplier: supplier._id,
      });
      await newProduct.save();
      await addProductStock(newProduct._id);

      return newProduct;
    });
    return await Promise.all(addProducts);
  } catch (error) {
    console.log(error);
  }
};

/*-------------------------------------------Them san pham vao kho----------------------------------------------*/
const addProductStock = async (product_id) => {
  try {
    const newProductStock = await Stock.create({
      product: product_id,
      sizes,
    });
    await newProductStock.save();
  } catch (error) {
    console.log(error);
  }
};

/*-------------------------------------Check xem them san pham thanh cong hay chua------------------------------*/
const checkResults = (arr) => {
  const results = arr.map((item) => (item.length > 0 ? true : false));
  return !results.includes(false) ? true : false;
};

/*-----------------------------------------Fake Data Product---------------------------------*/
const seedProduct = async () => {
  try {
    const results = await seedMenProduct();
    if (results) {
      console.log("Added products successfully");
    }
  } catch (error) {
    console.log(error);
  }
};

/*------------------------------------Fake Data Men Product-------------------------------------------*/
const seedMenProduct = async () => {
  try {
    const outWearJacketArr = menProducts.filter((item) =>
      item.description.toLowerCase().includes("áo khoác")
    );
    const tShirtArr = menProducts.filter((item) =>
      item.description.toLowerCase().includes("áo phông")
    );
    const shirtArr = menProducts.filter((item) =>
      item.description.toLowerCase().includes("áo sơ mi")
    );
    const poloArr = menProducts.filter((item) =>
      item.description.toLowerCase().includes("áo polo")
    );
    const sweaterArr = menProducts.filter((item) =>
      item.description.toLowerCase().includes("áo sweater")
    );
    const jeanArr = menProducts.filter((item) =>
      item.description.toLowerCase().includes("quần jeans")
    );
    const kakiPantArr = menProducts.filter((item) =>
      item.description.toLowerCase().includes("quần kaki")
    );
    const windPantArr = menProducts.filter((item) =>
      item.description.toLowerCase().includes("quần gió")
    );
    const shortArr = menProducts.filter((item) =>
      item.description.toLowerCase().includes("quần đùi")
    );

    const results1 = await addProductsByGender(
      "ao-khoac",
      outWearJacketArr,
      "nam",
      "NIKE"
    );
    const results2 = await addProductsByGender(
      "ao-phong",
      tShirtArr,
      "nam",
      "NIKE"
    );
    const results3 = await addProductsByGender(
      "ao-so-mi",
      shirtArr,
      "nam",
      "NIKE"
    );
    const results4 = await addProductsByGender(
      "ao-polo",
      poloArr,
      "nam",
      "NIKE"
    );
    const results5 = await addProductsByGender(
      "ao-sweater",
      sweaterArr,
      "nam",
      "NIKE"
    );
    const results6 = await addProductsByGender(
      "quan-jean",
      jeanArr,
      "nam",
      "NIKE"
    );
    const results7 = await addProductsByGender(
      "quan-kaki",
      kakiPantArr,
      "nam",
      "NIKE"
    );
    const results8 = await addProductsByGender(
      "quan-gio",
      windPantArr,
      "nam",
      "NIKE"
    );
    const results9 = await addProductsByGender(
      "quan-short",
      shortArr,
      "nam",
      "NIKE"
    );

    const arr = [
      results1,
      results2,
      results3,
      results4,
      results5,
      results6,
      results7,
      results8,
      results9,
    ];

    if (checkResults(arr)) {
      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = seedProduct;
