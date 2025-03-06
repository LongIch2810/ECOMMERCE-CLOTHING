const Gender = require("../models/genderModel");
const TypeProduct = require("../models/typeProductModel");
const Product = require("../models/productModel");
const Stock = require("../models/stockModel");
const Brand = require("../models/brandModel");
const Color = require("../models/colorModel");

require("dotenv").config();

const menProducts = [
  {
    name: "Nike Club Futura",
    price: 200000,
    description:
      "Áo khoác Nike Club Futura giữ ấm hiệu quả với chất liệu cao cấp, nhẹ nhàng và thoải mái khi mặc. Thiết kế hiện đại, năng động, phù hợp cho nhiều hoàn cảnh từ dạo phố đến tập luyện. Kiểu dáng thời trang cùng logo Nike đặc trưng giúp bạn nổi bật và tự tin.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734546212/image_clothing/image_product/xiba11mjproadhpekcbe.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734546250/image_clothing/image_product/h8fux3z3gctwsulekdnu.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734546550/image_clothing/image_product/vwwly7fd9sblzsm5y48e.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734546250/image_clothing/image_product/h3pvwdai8prjc7w8w8dj.png",
    ],
  },
  {
    name: "Nike Windrunner",
    price: 300000,
    description:
      "Áo khoác Nike Windrunner được thiết kế với chất liệu thoáng khí, giúp bạn luôn mát mẻ và thoải mái khi vận động. Kiểu dáng nhẹ nhàng, linh hoạt, phù hợp cho cả hoạt động thể thao và dạo phố. Thiết kế hiện đại cùng logo Nike đặc trưng tạo nên phong cách năng động và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734547355/image_clothing/image_product/bfgvzkxg5wm2pz2iqini.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734547355/image_clothing/image_product/zjt5rwftbd9lfe9utfc9.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734547354/image_clothing/image_product/px3e8yiamdnsyclqqiqx.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734547434/image_clothing/image_product/lxxoilxqwgnhdfhpapda.png",
    ],
  },
  {
    name: "Nike Fancy Matic",
    price: 300000,
    description:
      "Áo khoác Nike Fancy Matic được làm từ chất liệu cao cấp, thoáng mát và mang lại cảm giác nhẹ nhàng khi mặc. Thiết kế trẻ trung, hiện đại, phù hợp cho nhiều phong cách và hoạt động khác nhau. Điểm nhấn thời trang cùng logo Nike đặc trưng giúp bạn tự tin và thu hút mọi ánh nhìn.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734546569/image_clothing/image_product/uxess7hnl4ojor10esbd.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734546568/image_clothing/image_product/zobvjeaj8rucvwximhce.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734546568/image_clothing/image_product/dqtebymubxj9egot0rbs.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734546769/image_clothing/image_product/vdqveryt1yqfobzvibre.png",
    ],
  },
  {
    name: "Nike Wind z10",
    price: 250000,
    description:
      "Áo sweater Nike Wind Z10 được thiết kế với chất liệu thoáng mát, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Kiểu dáng hiện đại, năng động, phù hợp cho nhiều phong cách thời trang. Logo Nike đặc trưng tạo điểm nhấn, giúp bạn tự tin và thu hút mọi ánh nhìn.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734546770/image_clothing/image_product/vfwdej9tc7emms49vsao.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734546769/image_clothing/image_product/ywp0lsypvrauqptz8u7h.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734546769/image_clothing/image_product/rtoltqjs2m5ssqvouv7d.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734547434/image_clothing/image_product/lxxoilxqwgnhdfhpapda.png",
    ],
  },
  {
    name: "Nike T-Shirt alpha",
    price: 250000,
    description:
      "Áo phông Nike T-Shirt Alpha được làm từ chất liệu cao cấp, thoáng mát, thấm hút mồ hôi tốt, mang lại cảm giác nhẹ nhàng và thoải mái khi mặc. Thiết kế đơn giản nhưng đầy phong cách, phù hợp cho cả hoạt động thể thao và thời trang hàng ngày. Logo Nike tinh tế tạo điểm nhấn, giúp bạn trông năng động và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734548433/image_clothing/image_product/pttltxjohlhvfholtgwe.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734548433/image_clothing/image_product/o1vb4lqylqv9erxoehzj.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734548433/image_clothing/image_product/kkfli1tbexctsyw71al0.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734548432/image_clothing/image_product/qffdp2ya1k97dkwnujll.png",
    ],
  },
  {
    name: "Nike T-Shirt beta",
    price: 250000,
    description:
      "Áo phông Nike T-Shirt Beta được thiết kế với chất liệu mềm mại, thoáng mát, mang lại cảm giác nhẹ nhàng và dễ chịu suốt cả ngày. Kiểu dáng hiện đại, năng động, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Nike tinh tế tạo điểm nhấn, giúp bạn nổi bật và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549117/image_clothing/image_product/al7t7q0snivcmh9465lc.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549117/image_clothing/image_product/nj06qzwuxaz5ylmfbhiw.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549117/image_clothing/image_product/lgo49rb8e0sdjgzmdczh.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549117/image_clothing/image_product/udo3kqre7zh1rh2zdbpd.png",
    ],
  },
  {
    name: "Nike T-Shirt omega",
    price: 250000,
    description:
      "Áo phông Nike T-Shirt Omega được làm từ chất liệu cao cấp, thoáng mát và thấm hút mồ hôi hiệu quả, mang lại cảm giác nhẹ nhàng và thoải mái khi mặc. Thiết kế năng động, đơn giản nhưng đầy phong cách, phù hợp cho nhiều hoạt động hàng ngày. Logo Nike đặc trưng tạo điểm nhấn, giúp bạn tự tin và thu hút mọi ánh nhìn.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549118/image_clothing/image_product/aiuxovqiv47hxiycmkq2.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549118/image_clothing/image_product/tqmxwjo9m0cscifub0sq.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549118/image_clothing/image_product/vf7lknaqt7bejtevhd4m.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549118/image_clothing/image_product/ds8r2sl3m8g00yrj4kq6.png",
    ],
  },
  {
    name: "Nike T-Shirt Cuaaaa",
    price: 250000,
    description:
      "Áo phông Nike T-Shirt Cuaaaa được thiết kế với chất liệu mềm mại, thoáng mát, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Kiểu dáng hiện đại, trẻ trung, phù hợp cho nhiều phong cách và hoạt động. Logo Nike đặc trưng tạo điểm nhấn, giúp bạn thêm phần năng động và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549118/image_clothing/image_product/jzjd3xgnl9gj7bj4jvgl.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549118/image_clothing/image_product/ut1ndkmpwrqjj14irmoo.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549117/image_clothing/image_product/onrsmrejkhldnhg1s1nh.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549117/image_clothing/image_product/w9glzbkn9l57whbfkld2.png",
    ],
  },
  {
    name: "Nike Polo alpha",
    price: 250000,
    description:
      "Áo polo Nike Polo Alpha được làm từ chất liệu cao cấp, thoáng mát, thấm hút mồ hôi tốt, mang lại cảm giác nhẹ nhàng và thoải mái khi mặc. Thiết kế thanh lịch, năng động, phù hợp cho cả môi trường công sở lẫn các hoạt động hàng ngày. Logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549453/image_clothing/image_product/jov5vzjzxp3wd97zuywq.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549453/image_clothing/image_product/catd7myi3xfexfd9dwyd.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549453/image_clothing/image_product/onsgmgvvub4bvevxunkb.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549453/image_clothing/image_product/aynildzklowjaeqc9wlv.png",
    ],
  },
  {
    name: "Nike Polo beta",
    price: 250000,
    description:
      "Áo polo Nike Polo Beta được thiết kế với chất liệu thoáng mát, thấm hút mồ hôi tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Kiểu dáng thanh lịch, hiện đại, phù hợp cho cả công việc và hoạt động thường ngày. Logo Nike đặc trưng tạo điểm nhấn, giúp bạn tự tin và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549454/image_clothing/image_product/bui2ldijeeuorzebwjgo.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549454/image_clothing/image_product/tnzwejvi8zmrhjyl3ik2.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549453/image_clothing/image_product/yk0vdzwh4ay7skujngwo.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549453/image_clothing/image_product/mtmkmu0b7tllrepusldv.png",
    ],
  },
  {
    name: "Nike Shirts Yellow Dark",
    price: 280000,
    description:
      "Áo sơ mi Nike Shirts Yellow Dark được làm từ chất liệu cao cấp, thoáng mát, mang lại cảm giác nhẹ nhàng và dễ chịu khi mặc. Thiết kế hiện đại, lịch lãm nhưng vẫn năng động, phù hợp cho nhiều phong cách và hoàn cảnh. Màu sắc ấn tượng cùng logo Nike tinh tế tạo điểm nhấn, giúp bạn trông cuốn hút và tự tin.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549599/image_clothing/image_product/o3bbehmj4wc4ukppwxle.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549599/image_clothing/image_product/usfwrsqgy7sjpibintbx.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549599/image_clothing/image_product/yfjegzhv7lhprcnbz1u7.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549599/image_clothing/image_product/bvk5zbc1sy8ivsfrwldc.png",
    ],
  },
  {
    name: "Nike Shirts White",
    price: 280000,
    description:
      "Áo sơ mi Nike Shirts White được làm từ chất liệu cao cấp, thoáng mát, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế thanh lịch, đơn giản nhưng tinh tế, phù hợp cho nhiều phong cách từ công sở đến dạo phố. Logo Nike tinh tế tạo điểm nhấn, giúp bạn trông sang trọng và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549754/image_clothing/image_product/mwdp1rhue2vfdconaru0.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549754/image_clothing/image_product/iauqhrpcve3kktb3nebe.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549754/image_clothing/image_product/omga3jwtnvy5d5ghyhcq.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549753/image_clothing/image_product/b7jkdkk3k7dkzs9erteu.png",
    ],
  },
  {
    name: "Nike Sweater Red Dark",
    price: 580000,
    description:
      "Áo sweater Nike Sweater Red Dark được làm từ chất liệu mềm mại, thoáng mát, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế hiện đại, năng động, phù hợp cho nhiều phong cách và hoàn cảnh khác nhau. Màu đỏ trầm ấn tượng cùng logo Nike đặc trưng tạo điểm nhấn, giúp bạn trông cuốn hút và tự tin.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550198/image_clothing/image_product/cocvocj2hjt9tm0kof0x.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550198/image_clothing/image_product/qrm6nyioosvp27zw60cx.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550197/image_clothing/image_product/xu4gye2azgekarth9thx.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550197/image_clothing/image_product/eww1m9oxbs0nhwhmsjbe.png",
    ],
  },
  {
    name: "Nike Sweater Gray",
    price: 480000,
    description:
      "Áo sweater Nike Sweater Gray được làm từ chất liệu cao cấp, mềm mại và thoáng mát, mang lại cảm giác nhẹ nhàng và thoải mái khi mặc. Thiết kế đơn giản nhưng hiện đại, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Màu xám trung tính kết hợp với logo Nike tinh tế tạo điểm nhấn, giúp bạn trông năng động và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549917/image_clothing/image_product/t8pl8xuamgrdjmwbyrdp.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549917/image_clothing/image_product/ga6vmh1dvdk5oyzsrtql.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549917/image_clothing/image_product/etosao8cqbse0iq8ojcc.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734549917/image_clothing/image_product/anvfsspgaqbnxybihg1e.png",
    ],
  },
  {
    name: "Nike Sweater Mixed Classic",
    price: 880000,
    description:
      "Áo sweater Nike Sweater Mixed Classic được làm từ chất liệu cao cấp, thoáng mát và mềm mại, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế pha trộn màu sắc tinh tế, tạo phong cách cổ điển nhưng vẫn hiện đại và năng động. Logo Nike đặc trưng là điểm nhấn, giúp bạn tự tin và thu hút mọi ánh nhìn.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550199/image_clothing/image_product/vs2n2ipv2dphqk9xtdid.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550199/image_clothing/image_product/hpm9csiilyctibvgjo9y.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550198/image_clothing/image_product/maynodehnzyt7snhuyxu.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550198/image_clothing/image_product/smcc93wambkpbuetxttj.png",
    ],
  },
  {
    name: "Nike Jeans Basic",
    price: 280000,
    description:
      "Quần jeans Nike Jeans Basic được làm từ chất liệu denim cao cấp, thoáng mát và co giãn nhẹ, mang lại cảm giác thoải mái suốt cả ngày. Thiết kế đơn giản nhưng tinh tế, dễ dàng phối với nhiều trang phục khác nhau. Kiểu dáng hiện đại cùng logo Nike đặc trưng tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550601/image_clothing/image_product/nbeyqi1bnhdyfj5sbwsz.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550601/image_clothing/image_product/gxn5fngdawlcvknq3b9n.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550601/image_clothing/image_product/ll3x9lmr4np6rnkzired.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550600/image_clothing/image_product/aaltbzdce1rrxs99f1wa.png",
    ],
  },
  {
    name: "Nike Wind Pant Beige",
    price: 280000,
    description:
      "Quần gió Nike Wind Pant Beige được làm từ chất liệu cao cấp, thoáng mát và nhẹ nhàng, mang lại sự thoải mái tối đa khi vận động. Thiết kế hiện đại, năng động, phù hợp cho nhiều hoạt động từ thể thao đến dạo phố. Màu be trang nhã kết hợp với logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550758/image_clothing/image_product/ypbvfyxpha0hrk5scwy8.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550758/image_clothing/image_product/khvz3jz4cbzhvhcpxvt4.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550758/image_clothing/image_product/oolwg1stx66lxoji6x1y.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550757/image_clothing/image_product/ncqxl70uafgesi4rh7g1.png",
    ],
  },
  {
    name: "Nike Wind Pant Black",
    price: 280000,
    description:
      "Quần gió Nike Wind Pant Black được làm từ chất liệu cao cấp, thoáng mát và nhẹ nhàng, mang lại cảm giác thoải mái suốt cả ngày. Thiết kế năng động, hiện đại, phù hợp cho nhiều hoạt động từ thể thao đến dạo phố. Màu đen mạnh mẽ kết hợp với logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550892/image_clothing/image_product/wjp0v36vzltsvokodmos.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550892/image_clothing/image_product/hht2akf8r7mzoldxotod.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550891/image_clothing/image_product/gpooebz6ejpsuxcnzcz3.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734550891/image_clothing/image_product/kq73bu9yhe9hnh6717eb.png",
    ],
  },
  {
    name: "Nike Kaki Pant Black",
    price: 380000,
    description:
      "Quần kaki Nike Kaki Pant Black được làm từ chất liệu cao cấp, thoáng mát và co giãn nhẹ, mang lại cảm giác thoải mái suốt cả ngày. Thiết kế hiện đại, đơn giản nhưng tinh tế, phù hợp cho nhiều phong cách từ công sở đến dạo phố. Màu đen mạnh mẽ kết hợp với logo Nike đặc trưng tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551159/image_clothing/image_product/z3guadgerizvluzmmiva.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551159/image_clothing/image_product/wldjk1tigs82u95hkpu0.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551159/image_clothing/image_product/fnlsmxwoop9fxjlfa4xc.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551158/image_clothing/image_product/dmyhcegitpxdafavtbeh.png",
    ],
  },
  {
    name: "Nike Kaki Pant Beige",
    price: 480000,
    description:
      "Quần kaki Nike Kaki Pant Beige được làm từ chất liệu cao cấp, thoáng mát và co giãn nhẹ, mang lại cảm giác thoải mái suốt cả ngày. Thiết kế thanh lịch, đơn giản nhưng tinh tế, phù hợp cho nhiều phong cách từ công sở đến dạo phố. Màu be trang nhã kết hợp với logo Nike đặc trưng tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551294/image_clothing/image_product/ptco3wi1ef5viuiverck.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551293/image_clothing/image_product/oxmpkgr0g0rtcdkysdzc.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551293/image_clothing/image_product/ruyvkpgpjzhvd8bbuwnv.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551293/image_clothing/image_product/upn9gwr4bme2dylmmdcv.png",
    ],
  },
  {
    name: "Nike Short Black Cool",
    price: 280000,
    description:
      "Quần đùi Nike Short Black Cool được làm từ chất liệu cao cấp, thoáng mát và thấm hút mồ hôi tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế năng động, linh hoạt, phù hợp cho các hoạt động thể thao và dạo phố. Màu đen mạnh mẽ kết hợp với logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551423/image_clothing/image_product/prshnhpgj1q4zc3fqcrx.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551423/image_clothing/image_product/zyhgrgmpdxi5jcqlyfvt.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551423/image_clothing/image_product/t7bj6dkqprad9xuhjjjv.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551422/image_clothing/image_product/mz8dkgsgye1oedjc1dcz.png",
    ],
  },
  {
    name: "Nike Short Basic Lonely",
    price: 280000,
    description:
      "Quần đùi Nike Short Basic Lonely được làm từ chất liệu cao cấp, thoáng mát và thấm hút mồ hôi tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế đơn giản nhưng tinh tế, phù hợp cho nhiều hoạt động từ thể thao đến dạo phố. Logo Nike đặc trưng tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551651/image_clothing/image_product/gp1lext8a3sihbqog9dl.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551651/image_clothing/image_product/v8wdwuwngfb8dtaocdr2.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551650/image_clothing/image_product/qpyfdhgveakx2uu9onx9.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551650/image_clothing/image_product/iyhajwjgjxe9tkfhymfa.png",
    ],
  },
  {
    name: "Nike Short Red Light Basketball",
    price: 280000,
    description:
      "Quần đùi Nike Short Red Light Basketball được làm từ chất liệu cao cấp, thoáng mát và thấm hút mồ hôi tốt, mang lại cảm giác nhẹ nhàng và thoải mái khi vận động. Thiết kế rộng rãi, linh hoạt, phù hợp cho các hoạt động thể thao, đặc biệt là bóng rổ. Màu đỏ nổi bật kết hợp với logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551680/image_clothing/image_product/sdx4stn6ezntb6ubeeft.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551680/image_clothing/image_product/dkxugzlobzt2yg6xjnw3.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551679/image_clothing/image_product/skd5l8ed8lxdg0k0rzus.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734551679/image_clothing/image_product/xelormoeo2nldseuyorc.png",
    ],
  },
];

const womenProducts = [
  {
    name: "Nike T-Shirt Freestyle",
    price: 280000,
    description:
      "Áo phông Nike T-Shirt Freestyle được làm từ chất liệu cao cấp, thoáng mát và thấm hút mồ hôi tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế năng động, trẻ trung, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734789301/image_clothing/image_product/mc6lmno1ut5vboe5idoc.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734789301/image_clothing/image_product/bxa8caxrguntmpfymjp8.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734789301/image_clothing/image_product/wvhdzkwgv2bu7qlgvqkn.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734789301/image_clothing/image_product/bxa8caxrguntmpfymjp8.png",
    ],
  },
  {
    name: "Nike T-Shirt Sportswear Short-Sleeve",
    price: 280000,
    description:
      "Áo phông Nike T-Shirt Sportswear Short-Sleeve được làm từ chất liệu cao cấp, thoáng mát và thấm hút mồ hôi tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế tay ngắn năng động, phù hợp cho các hoạt động thể thao và dạo phố. Logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734789664/image_clothing/image_product/nunwlbkc9n9xy0lhbdrw.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734789664/image_clothing/image_product/zenhkzf9as6kxsjlgm7m.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734789664/image_clothing/image_product/adtxeimtaj5mtefylwsl.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734789664/image_clothing/image_product/cloqpzug0jhdujrzunub.png",
    ],
  },
  {
    name: "Jordan Artist Series by Darien Birks",
    price: 280000,
    description:
      "Áo phông Jordan Artist Series by Darien Birks được làm từ chất liệu cao cấp, thoáng mát và thấm hút mồ hôi tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế mang đậm dấu ấn nghệ thuật với họa tiết độc đáo, kết hợp cùng phong cách thể thao đặc trưng của Jordan. Logo Jordan tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734789811/image_clothing/image_product/b3cg5mos6k5o4xjpxqea.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734789811/image_clothing/image_product/esltkrnzt89bzaqfqtlh.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734789811/image_clothing/image_product/kc6vfqtcwflcs7mkfmfn.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734789810/image_clothing/image_product/cvo231ongfovy8gkcjss.png",
    ],
  },
  {
    name: "Nike T-Shirt Sportswear Essential",
    price: 280000,
    description:
      "Áo phông Nike T-Shirt Sportswear Essential được làm từ chất liệu cao cấp, thoáng mát và thấm hút mồ hôi tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế đơn giản nhưng tinh tế, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Nike đặc trưng tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734790098/image_clothing/image_product/ja6i4dotnflr6axh2ifq.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734790098/image_clothing/image_product/h65znjasi6kojektfo6v.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734790098/image_clothing/image_product/oyqusa7gk5ej78hsm4s6.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734790098/image_clothing/image_product/lr4i1pqo4azos0h8i5n1.png",
    ],
  },
  {
    name: "Nike T-Shirt Sportswear Classic",
    price: 280000,
    description:
      "Áo phông Nike T-Shirt Sportswear Classic được làm từ chất liệu cao cấp, thoáng mát và thấm hút mồ hôi tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế đơn giản nhưng tinh tế, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Nike đặc trưng tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734790442/image_clothing/image_product/pphkz1z8nniifqdalevr.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734790442/image_clothing/image_product/eako8fkq1sub2of27rml.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734790442/image_clothing/image_product/laf7x9ds5xyqjhiijfyq.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734790442/image_clothing/image_product/va87nmtjhsk7xw2pwy9z.png",
    ],
  },
  {
    name: "Nike Sweater Sportswear Phoenix Fleece",
    price: 280000,
    description:
      "Áo sweater Nike Sweater Sportswear Phoenix Fleece được làm từ chất liệu nỉ cao cấp, mềm mại và thoáng mát, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế hiện đại, trẻ trung, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734790795/image_clothing/image_product/bnlqtgqx24b40lfbrixn.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734790795/image_clothing/image_product/fcauqaschrkzmfdinaeg.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734790795/image_clothing/image_product/z3dq2qcwbwlebelvnqca.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734790795/image_clothing/image_product/rnjnw1najsp1pyxkrwsc.png",
    ],
  },
  {
    name: "Nike Sweater Crew-Neck French",
    price: 280000,
    description:
      "Áo sweater Nike Sweater Crew-Neck French được làm từ chất liệu nỉ cao cấp, mềm mại và thoáng mát, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế cổ tròn đơn giản nhưng tinh tế, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Nike đặc trưng tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734791038/image_clothing/image_product/m5uo1tfpkb3xnp5hzjas.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734791037/image_clothing/image_product/uwmdnwcd5nqzczzi5cfl.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734791037/image_clothing/image_product/vfxnf3qotiaciabmsero.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734791037/image_clothing/image_product/lbjzmz89dmwpymgmjsyw.png",
    ],
  },
  {
    name: "Nike Short-sleeve Polo Top",
    price: 950000,
    description:
      "Áo polo Nike Short-Sleeve Polo Top được làm từ chất liệu cao cấp, thoáng mát và thấm hút mồ hôi tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế tay ngắn năng động, hiện đại, phù hợp cho nhiều phong cách từ thể thao đến công sở. Logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734791253/image_clothing/image_product/cluyq27hvpqfulvruavf.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734791253/image_clothing/image_product/tcmjeqftst4sgeumiewk.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734791252/image_clothing/image_product/kskevkxjtdj7bpsi2gij.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734791252/image_clothing/image_product/jfaz8dtprkfqymk9fk03.png",
    ],
  },
  {
    name: "Nike Polo Women by YOON",
    price: 550000,
    description:
      "Áo polo Nike Polo Women by YOON được làm từ chất liệu cao cấp, thoáng mát và thấm hút mồ hôi tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế hiện đại, thanh lịch, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734791555/image_clothing/image_product/fnmphn3wzed7qpvgf0ey.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734791555/image_clothing/image_product/j4al6h4jubmowvx6hljy.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734791554/image_clothing/image_product/ji87pajkcqpygw6qalyi.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734791553/image_clothing/image_product/oyv1nvsys05mgttga2eh.png",
    ],
  },
  {
    name: "Nike Shirts Woven Crop Top",
    price: 650000,
    description:
      "Áo sơ mi Nike Shirts Woven Crop Top được làm từ chất liệu cao cấp, thoáng mát và mềm mại, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế crop top hiện đại, trẻ trung, phù hợp cho nhiều phong cách từ năng động đến cá tính. Logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734791746/image_clothing/image_product/rikyonqhso3zimibioqp.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734791745/image_clothing/image_product/xct7yhmfullj9gh1wxyz.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734791745/image_clothing/image_product/jqeis9ukkbi2xvynshik.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734791745/image_clothing/image_product/hravt9sorfnkqxifapfe.png",
    ],
  },
  {
    name: "Nike Sportswear Oversized Full-Zip French Terry Hoodie",
    price: 1000000,
    description:
      "Áo khoác Nike Sportswear Oversized Full-Zip French Terry Hoodie được làm từ chất liệu nỉ French Terry cao cấp, mềm mại và giữ ấm hiệu quả, mang lại cảm giác nhẹ nhàng và thoải mái khi mặc. Thiết kế oversized hiện đại, năng động, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734792628/image_clothing/image_product/zl5fkf7fecta0qawvqe1.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734792628/image_clothing/image_product/kyg5t8adks8rp6qykdqm.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734792628/image_clothing/image_product/c3srgctwfr6kplqyrgle.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734792628/image_clothing/image_product/n26dvuw759z0tqs3nz8h.png",
    ],
  },
  {
    name: "Nike Air Jordan Knit Shorts",
    price: 280000,
    description:
      "Quần đùi Nike Air Jordan Knit Shorts được làm từ chất liệu vải dệt cao cấp, thoáng mát và thấm hút mồ hôi tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế năng động, linh hoạt, phù hợp cho các hoạt động thể thao và dạo phố. Logo Jordan đặc trưng tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734793278/image_clothing/image_product/cw6ihx8mb4mevf9oaweh.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734793278/image_clothing/image_product/ktwthflhd05hywrbimdx.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734793278/image_clothing/image_product/rulnexty1kp6imbgdn1x.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734793278/image_clothing/image_product/pmod6eb03phz5p0tjhue.png",
    ],
  },
  {
    name: "Nike Short Sportswear Chill Terry",
    price: 480000,
    description:
      "Quần đùi Nike Short Sportswear Chill Terry được làm từ chất liệu Terry cao cấp, thoáng mát và thấm hút mồ hôi tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế đơn giản nhưng tinh tế, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Nike đặc trưng tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734792975/image_clothing/image_product/hdxi8gvlzhhsdnzls2xq.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734792975/image_clothing/image_product/uflg5clwrs4xh8c6uenc.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734792975/image_clothing/image_product/ctnziz0oa2ulza5eyr5o.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734792975/image_clothing/image_product/c4jqex5veipwt7lrg9cy.png",
    ],
  },
  {
    name: "Dress NikeCourt Slam",
    price: 580000,
    description:
      "Váy liền thân Dress NikeCourt Slam được làm từ chất liệu cao cấp, thoáng mát và co giãn tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế thể thao hiện đại, ôm dáng tinh tế, phù hợp cho cả thi đấu và dạo phố. Logo Nike đặc trưng tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734793689/image_clothing/image_product/d0gv4zyuotsilfwhe3fn.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734793689/image_clothing/image_product/ujqfugkhpccbueegg3cr.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734793689/image_clothing/image_product/jmli98yuflrj4nzwsnqz.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734793689/image_clothing/image_product/h7qx3wzpr4slnicactzu.png",
    ],
  },
  {
    name: "Dress Nike Air Jordan Knit",
    price: 280000,
    description:
      "Váy liền thân Dress Nike Air Jordan Knit được làm từ chất liệu dệt kim cao cấp, thoáng mát và co giãn tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế hiện đại, ôm dáng tinh tế, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Jordan đặc trưng tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734793749/image_clothing/image_product/uxkogatfftcfxeqhijzy.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734793749/image_clothing/image_product/ltl1nzn8dqfoyqynwa5i.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734793749/image_clothing/image_product/nsqgdgx6lqtw1ext0qlv.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734793749/image_clothing/image_product/a0ysqfffr4hp9uejkisd.png",
    ],
  },
  {
    name: "NikeCourt Slam Tennis Skirt",
    price: 280000,
    description:
      "Chân váy NikeCourt Slam Tennis Skirt được làm từ chất liệu cao cấp, thoáng mát và co giãn tốt, mang lại cảm giác nhẹ nhàng và thoải mái khi vận động. Thiết kế thể thao năng động, phù hợp cho cả thi đấu và dạo phố. Logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734794068/image_clothing/image_product/mjotkcigxipk7iqazhqv.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734794068/image_clothing/image_product/ulxgjnsljpxq0dyb1xmh.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734794068/image_clothing/image_product/nlmztidwzgb7hplkmofm.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734794067/image_clothing/image_product/umcqdgdk2hf6dthqwi8l.png",
    ],
  },
  {
    name: "Nike Skirt ACG 'Snowgrass'",
    price: 280000,
    description:
      "Chân váy Nike Skirt ACG 'Snowgrass' được làm từ chất liệu cao cấp, thoáng mát và co giãn tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế hiện đại, năng động, phù hợp cho nhiều hoạt động ngoài trời và dạo phố. Logo Nike ACG tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734794178/image_clothing/image_product/nxgiahvdc5ewrjaooewg.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734794178/image_clothing/image_product/ljllbod49qjspdpsmtqa.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734794177/image_clothing/image_product/guul2otjxqf4xxz7xuss.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734794178/image_clothing/image_product/kfcxwfx6eawcma0rhu9t.png",
    ],
  },
  {
    name: "Nike Skirt Sportswear Chill Rib",
    price: 280000,
    description:
      "Chân váy Nike Skirt Sportswear Chill Rib được làm từ chất liệu gân cao cấp, thoáng mát và co giãn tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế đơn giản nhưng tinh tế, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Nike đặc trưng tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734794338/image_clothing/image_product/mseevruuzrjrkgp3ec9s.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734794338/image_clothing/image_product/e8cin0nm5fyy2zdfqm9j.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734794337/image_clothing/image_product/hum93ecgkfse0lvrj2kr.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734794337/image_clothing/image_product/iyw00lnqedzggrug39eo.png",
    ],
  },
  {
    name: "Nike Wind Pant High-Waisted Woven Open-Hem",
    price: 250000,
    description:
      "Quần gió Nike Wind Pant High-Waisted Woven Open-Hem được làm từ chất liệu dệt cao cấp, thoáng mát và nhẹ nhàng, mang lại cảm giác thoải mái suốt cả ngày. Thiết kế lưng cao tôn dáng cùng ống rộng thoải mái, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734794673/image_clothing/image_product/obgncj65mleqtww248po.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734794673/image_clothing/image_product/tmvyvjeizfhptgts0gz5.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734794673/image_clothing/image_product/hj016ijpcfdr38sbb2ey.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734794673/image_clothing/image_product/tuoficn0gdzw0qgyvys8.png",
    ],
  },
  {
    name: "Nike Wind Pant Everything Wovens",
    price: 330000,
    description:
      "Quần gió Nike Wind Pant Everything Wovens được làm từ chất liệu dệt cao cấp, thoáng mát và nhẹ nhàng, mang lại cảm giác thoải mái suốt cả ngày. Thiết kế hiện đại, linh hoạt, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734794816/image_clothing/image_product/dzxkbywxb2iztectjekr.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734794816/image_clothing/image_product/quphsdmtmoalryeilezp.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734794815/image_clothing/image_product/pvoeaxbbvnilcslgxzzv.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734794815/image_clothing/image_product/dmqpnsevt3zqo3sz0o23.png",
    ],
  },
  {
    name: "Nike Kaki Pant Sustainable Materials",
    price: 680000,
    description:
      "Quần gió Nike Kaki Pant Sustainable Materials được làm từ chất liệu bền vững, thoáng mát và nhẹ nhàng, mang lại cảm giác thoải mái suốt cả ngày. Thiết kế hiện đại, đơn giản nhưng tinh tế, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Nike đặc trưng tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 4.9,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734795255/image_clothing/image_product/ds7mrebip36u8qdysbsi.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734795255/image_clothing/image_product/t8n1wsqwfi8kc0jq7dye.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734795254/image_clothing/image_product/c61mr2mkrbraownmit3s.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1734795255/image_clothing/image_product/blmq25ewj87oafvo51vv.png",
    ],
  },
];

const sizes = [
  {
    size: "XS",
    quantity: 10,
    status: "Có hàng",
  },
  {
    size: "S",
    quantity: 10,
    status: "Có hàng",
  },
  {
    size: "M",
    quantity: 10,
    status: "Có hàng",
  },
  {
    size: "L",
    quantity: 10,
    status: "Có hàng",
  },
  {
    size: "XL",
    quantity: 10,
    status: "Có hàng",
  },
  {
    size: "XXL",
    quantity: 10,
    status: "Có hàng",
  },
];

/*-----------------------------------------Them san pham-------------------------------------------*/
const addProductsByGender = async (slugType, arr, slugGender, brandName) => {
  try {
    const gender = await Gender.findOne({ slug: slugGender });
    const type_product = await TypeProduct.findOne({ slug: slugType });
    const brand = await Brand.findOne({ name: brandName });
    const colors = await Color.find({}).select("_id");
    const addProducts = arr.map(async (product) => {
      const newProduct = await Product.create({
        ...product,
        gender: gender._id,
        type_product: type_product._id,
        brand: brand._id,
      });
      await newProduct.save();
      await addProductStock(newProduct._id, colors);

      return newProduct;
    });
    return await Promise.all(addProducts);
  } catch (error) {
    console.log(error);
  }
};

/*-------------------------------------------Them san pham vao kho----------------------------------------------*/
const addProductStock = async (product_id, colors) => {
  try {
    // Gán màu sắc cho từng kích thước
    const sizesWithColors = [];
    for (const size of sizes) {
      for (const color of colors) {
        sizesWithColors.push({
          ...size,
          color, // Mỗi size có nhiều màu sắc khác nhau
        });
      }
    }

    // Thêm vào kho hàng
    const newProductStock = await Stock.create({
      product: product_id,
      sizes: sizesWithColors,
    });

    await newProductStock.save();
    console.log("Thêm sản phẩm vào kho thành công!");
  } catch (error) {
    console.log("Lỗi khi thêm sản phẩm vào kho:", error);
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
    const results1 = await seedMenProduct();
    const results2 = await seedWomenProduct();
    if (results1 && results2) {
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

    return checkResults(arr) ? true : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const seedWomenProduct = async () => {
  try {
    const outWearJacketArr = womenProducts.filter((item) =>
      item.description.toLowerCase().includes("áo khoác")
    );
    const tShirtArr = womenProducts.filter((item) =>
      item.description.toLowerCase().includes("áo phông")
    );
    const shirtArr = womenProducts.filter((item) =>
      item.description.toLowerCase().includes("áo sơ mi")
    );
    const poloArr = womenProducts.filter((item) =>
      item.description.toLowerCase().includes("áo polo")
    );
    const sweaterArr = womenProducts.filter((item) =>
      item.description.toLowerCase().includes("áo sweater")
    );
    const kakiPantArr = womenProducts.filter((item) =>
      item.description.toLowerCase().includes("quần kaki")
    );
    const windPantArr = womenProducts.filter((item) =>
      item.description.toLowerCase().includes("quần gió")
    );
    const shortArr = womenProducts.filter((item) =>
      item.description.toLowerCase().includes("quần đùi")
    );
    const dressArr = womenProducts.filter((item) =>
      item.description.toLowerCase().includes("váy liền thân")
    );
    const skirtArr = womenProducts.filter((item) =>
      item.description.toLowerCase().includes("chân váy")
    );

    const results1 = await addProductsByGender(
      "ao-khoac",
      outWearJacketArr,
      "nu",
      "NIKE"
    );
    const results2 = await addProductsByGender(
      "ao-phong",
      tShirtArr,
      "nu",
      "NIKE"
    );
    const results3 = await addProductsByGender(
      "ao-so-mi",
      shirtArr,
      "nu",
      "NIKE"
    );
    const results4 = await addProductsByGender(
      "ao-polo",
      poloArr,
      "nu",
      "NIKE"
    );
    const results5 = await addProductsByGender(
      "ao-sweater",
      sweaterArr,
      "nu",
      "NIKE"
    );
    const results7 = await addProductsByGender(
      "quan-kaki",
      kakiPantArr,
      "nu",
      "NIKE"
    );
    const results8 = await addProductsByGender(
      "quan-gio",
      windPantArr,
      "nu",
      "NIKE"
    );
    const results9 = await addProductsByGender(
      "quan-short",
      shortArr,
      "nu",
      "NIKE"
    );
    const results10 = await addProductsByGender(
      "vay-lien-than",
      dressArr,
      "nu",
      "NIKE"
    );
    const results11 = await addProductsByGender(
      "chan-vay",
      skirtArr,
      "nu",
      "NIKE"
    );

    const arr = [
      results1,
      results2,
      results3,
      results4,
      results5,
      results7,
      results8,
      results9,
      results10,
      results11,
    ];

    return checkResults(arr) ? true : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
module.exports = seedProduct;
