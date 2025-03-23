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
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742729749/image_clothing/image_product/egeribaukxghp361mbir.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742729761/image_clothing/image_product/lgqj4xsnccqwwzbszvmc.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742729769/image_clothing/image_product/xv8yatstynsn1wp6sk0e.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742729775/image_clothing/image_product/wzspxsqyusvfr9pjqfro.webp",
    ],
  },
  {
    name: "Nike Windrunner",
    price: 300000,
    description:
      "Áo khoác Nike Windrunner được thiết kế với chất liệu thoáng khí, giúp bạn luôn mát mẻ và thoải mái khi vận động. Kiểu dáng nhẹ nhàng, linh hoạt, phù hợp cho cả hoạt động thể thao và dạo phố. Thiết kế hiện đại cùng logo Nike đặc trưng tạo nên phong cách năng động và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742730209/image_clothing/image_product/lhg1bclqgldvo858cqmj.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742730233/image_clothing/image_product/hiivz43yv5d6co9ajsmh.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742730245/image_clothing/image_product/aqmnuxdvstfzyrfdsou1.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742730252/image_clothing/image_product/cgfibfg9a1mxak4ibgmv.webp",
    ],
  },
  {
    name: "Nike Fancy Matic",
    price: 300000,
    description:
      "Áo khoác Nike Fancy Matic được làm từ chất liệu cao cấp, thoáng mát và mang lại cảm giác nhẹ nhàng khi mặc. Thiết kế trẻ trung, hiện đại, phù hợp cho nhiều phong cách và hoạt động khác nhau. Điểm nhấn thời trang cùng logo Nike đặc trưng giúp bạn tự tin và thu hút mọi ánh nhìn.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742730449/image_clothing/image_product/ytcujleox6hjb1cbzosh.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742730452/image_clothing/image_product/p1tw2lvs70peufq0ahmr.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742730458/image_clothing/image_product/vxlfgqbdaazr5hhotojn.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742730462/image_clothing/image_product/hun1cdpph0fbcgzx6b38.webp",
    ],
  },
  {
    name: "Nike Wind z10",
    price: 250000,
    description:
      "Áo sweater Nike Wind Z10 được thiết kế với chất liệu thoáng mát, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Kiểu dáng hiện đại, năng động, phù hợp cho nhiều phong cách thời trang. Logo Nike đặc trưng tạo điểm nhấn, giúp bạn tự tin và thu hút mọi ánh nhìn.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742730685/image_clothing/image_product/ju4hxc4hqvioogfnpb0p.jpg",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742730695/image_clothing/image_product/ygcbjewx3wbmxgwlj55r.jpg",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742730701/image_clothing/image_product/wx0vldudlldakskys7gv.jpg",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742730706/image_clothing/image_product/k0cffrjyv5c0ix1qrjau.jpg",
    ],
  },
  {
    name: "Nike T-Shirt alpha",
    price: 250000,
    description:
      "Áo phông Nike T-Shirt Alpha được làm từ chất liệu cao cấp, thoáng mát, thấm hút mồ hôi tốt, mang lại cảm giác nhẹ nhàng và thoải mái khi mặc. Thiết kế đơn giản nhưng đầy phong cách, phù hợp cho cả hoạt động thể thao và thời trang hàng ngày. Logo Nike tinh tế tạo điểm nhấn, giúp bạn trông năng động và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742730989/image_clothing/image_product/nbreyywipjxic24av9hd.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742730996/image_clothing/image_product/gvufcfhcktpzyip4ej6q.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742730997/image_clothing/image_product/bcz6dmucoq2ff81khbu8.jpg",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742730998/image_clothing/image_product/pks50mapnol5h6ifpobs.webp",
    ],
  },
  {
    name: "Nike T-Shirt beta",
    price: 250000,
    description:
      "Áo phông Nike T-Shirt Beta được thiết kế với chất liệu mềm mại, thoáng mát, mang lại cảm giác nhẹ nhàng và dễ chịu suốt cả ngày. Kiểu dáng hiện đại, năng động, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Nike tinh tế tạo điểm nhấn, giúp bạn nổi bật và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742731260/image_clothing/image_product/odbzkkdqixyjtsfvtcr3.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742731260/image_clothing/image_product/bmu2w03v1hm5b2xa34zk.jpg",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742731261/image_clothing/image_product/kkf4bjtydycnnavstpwc.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742731261/image_clothing/image_product/ier5oblnsaody9uwh07h.webp",
    ],
  },
  {
    name: "Nike T-Shirt omega",
    price: 250000,
    description:
      "Áo phông Nike T-Shirt Omega được làm từ chất liệu cao cấp, thoáng mát và thấm hút mồ hôi hiệu quả, mang lại cảm giác nhẹ nhàng và thoải mái khi mặc. Thiết kế năng động, đơn giản nhưng đầy phong cách, phù hợp cho nhiều hoạt động hàng ngày. Logo Nike đặc trưng tạo điểm nhấn, giúp bạn tự tin và thu hút mọi ánh nhìn.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742731612/image_clothing/image_product/oxuztindeilstqkgdbth.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742731612/image_clothing/image_product/azbxmhqgbeobl1yavw51.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742731612/image_clothing/image_product/sxvxhclbflndtumjptiy.jpg",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742731611/image_clothing/image_product/cxbnf5efbejtndqz9y1b.webp",
    ],
  },
  {
    name: "Nike T-Shirt Cool",
    price: 250000,
    description:
      "Áo phông Nike T-Shirt Cool được thiết kế với chất liệu mềm mại, thoáng mát, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Kiểu dáng hiện đại, trẻ trung, phù hợp cho nhiều phong cách và hoạt động. Logo Nike đặc trưng tạo điểm nhấn, giúp bạn thêm phần năng động và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742731849/image_clothing/image_product/jnbq767xoo08x5khik14.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742731850/image_clothing/image_product/z7b4whu4enbbbidfykuu.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742731850/image_clothing/image_product/rpadm3fre20avknulisi.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742731850/image_clothing/image_product/ft3ne6qrr6mbkjgswotp.webp",
    ],
  },
  {
    name: "Nike Polo alpha",
    price: 250000,
    description:
      "Áo polo Nike Polo Alpha được làm từ chất liệu cao cấp, thoáng mát, thấm hút mồ hôi tốt, mang lại cảm giác nhẹ nhàng và thoải mái khi mặc. Thiết kế thanh lịch, năng động, phù hợp cho cả môi trường công sở lẫn các hoạt động hàng ngày. Logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742732123/image_clothing/image_product/sr3frzv3djfes0ltmm1f.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742732122/image_clothing/image_product/zr7y5jztrjd4kzsbckeh.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742732122/image_clothing/image_product/xwnmmpsajufjw8hkssme.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742732122/image_clothing/image_product/i76vucbewp0ibsalicng.webp",
    ],
  },
  {
    name: "Nike Polo beta",
    price: 250000,
    description:
      "Áo polo Nike Polo Beta được thiết kế với chất liệu thoáng mát, thấm hút mồ hôi tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Kiểu dáng thanh lịch, hiện đại, phù hợp cho cả công việc và hoạt động thường ngày. Logo Nike đặc trưng tạo điểm nhấn, giúp bạn tự tin và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742732424/image_clothing/image_product/cqa3qdiqtlr8x9natxxl.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742732424/image_clothing/image_product/lwjjkkkvvhvitsmopyqi.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742732425/image_clothing/image_product/hwwlsdv92cojxya2zfel.jpg",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742732424/image_clothing/image_product/bkgrf0fifse4arakxwsp.webp",
    ],
  },
  {
    name: "Nike Shirts Club",
    price: 280000,
    description:
      "Áo sơ mi Nike Shirts Club được làm từ chất liệu cao cấp, thoáng mát, mang lại cảm giác nhẹ nhàng và dễ chịu khi mặc. Thiết kế hiện đại, lịch lãm nhưng vẫn năng động, phù hợp cho nhiều phong cách và hoàn cảnh. Màu sắc ấn tượng cùng logo Nike tinh tế tạo điểm nhấn, giúp bạn trông cuốn hút và tự tin.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742732761/image_clothing/image_product/syxrp2gviiechya2dpjh.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742732761/image_clothing/image_product/ffxofr995tkjrkupumap.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742732761/image_clothing/image_product/e7xphyi9gye3srrq6suw.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742732425/image_clothing/image_product/hwwlsdv92cojxya2zfel.jpg",
    ],
  },
  {
    name: "Nike Shirts Toolkit",
    price: 280000,
    description:
      "Áo sơ mi Nike Shirts Toolkit được làm từ chất liệu cao cấp, thoáng mát, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế thanh lịch, đơn giản nhưng tinh tế, phù hợp cho nhiều phong cách từ công sở đến dạo phố. Logo Nike tinh tế tạo điểm nhấn, giúp bạn trông sang trọng và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742732943/image_clothing/image_product/v1mdgxx2djlrbtfvs8h8.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742732943/image_clothing/image_product/h95zvik7nilyygbibbya.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742732943/image_clothing/image_product/csvw2agwk6fbgaxljejm.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742732943/image_clothing/image_product/bmvvxzaq0kbcfzhlxnxc.webp",
    ],
  },
  {
    name: "Nike Sweater Dark",
    price: 580000,
    description:
      "Áo sweater Nike Sweater Dark được làm từ chất liệu mềm mại, thoáng mát, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế hiện đại, năng động, phù hợp cho nhiều phong cách và hoàn cảnh khác nhau. Màu đỏ trầm ấn tượng cùng logo Nike đặc trưng tạo điểm nhấn, giúp bạn trông cuốn hút và tự tin.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742733256/image_clothing/image_product/tmcesmly9fra2kscr3j4.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742733256/image_clothing/image_product/qgoozjw5wmvvqywxlcju.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742733256/image_clothing/image_product/tjqrru9e0jlpteadzhsz.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742733257/image_clothing/image_product/ill8efls6qfy4w5cwigr.webp",
    ],
  },
  {
    name: "Nike Sweater Power",
    price: 480000,
    description:
      "Áo sweater Nike Sweater Power được làm từ chất liệu cao cấp, mềm mại và thoáng mát, mang lại cảm giác nhẹ nhàng và thoải mái khi mặc. Thiết kế đơn giản nhưng hiện đại, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Màu xám trung tính kết hợp với logo Nike tinh tế tạo điểm nhấn, giúp bạn trông năng động và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742733574/image_clothing/image_product/sdrjntmo0p0mepyrcngh.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742733574/image_clothing/image_product/gln5zblfvsuqxulnnfuc.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742733575/image_clothing/image_product/c8kgtca68r2aaswqisjf.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742733575/image_clothing/image_product/eo1fjoe2fr4pl7uqs67u.webp",
    ],
  },
  {
    name: "Nike Cardigan Mixed Classic",
    price: 880000,
    description:
      "Áo khoác Nike Cardigan Mixed Classic được làm từ chất liệu cao cấp, thoáng mát và mềm mại, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế pha trộn màu sắc tinh tế, tạo phong cách cổ điển nhưng vẫn hiện đại và năng động. Logo Nike đặc trưng là điểm nhấn, giúp bạn tự tin và thu hút mọi ánh nhìn.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742733872/image_clothing/image_product/jfl49r0o36aqbuip7got.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742733872/image_clothing/image_product/kimklbzajlwadze33et5.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742733872/image_clothing/image_product/n6ojcrlxxivllqixlism.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742733871/image_clothing/image_product/whjjpfpa2ijno5gfaff4.webp",
    ],
  },
  {
    name: "Nike Jeans Town",
    price: 280000,
    description:
      "Quần jeans Nike Jeans Town được làm từ chất liệu denim cao cấp, thoáng mát và co giãn nhẹ, mang lại cảm giác thoải mái suốt cả ngày. Thiết kế đơn giản nhưng tinh tế, dễ dàng phối với nhiều trang phục khác nhau. Kiểu dáng hiện đại cùng logo Nike đặc trưng tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742734043/image_clothing/image_product/tshb38ye8nwrwexmzodq.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742734041/image_clothing/image_product/hrhhlppymdocg2xynrcz.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742734041/image_clothing/image_product/igibiemzh7ailbmdw2eo.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742734040/image_clothing/image_product/pch9cvp6cnagjg9wnsha.webp",
    ],
  },
  {
    name: "Nike Wind Pant Cargo",
    price: 280000,
    description:
      "Quần gió Nike Wind Pant Cargo được làm từ chất liệu cao cấp, thoáng mát và nhẹ nhàng, mang lại sự thoải mái tối đa khi vận động. Thiết kế hiện đại, năng động, phù hợp cho nhiều hoạt động từ thể thao đến dạo phố. Màu be trang nhã kết hợp với logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742740732/image_clothing/image_product/kgr0rllkhtupuhcfk3qs.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742740732/image_clothing/image_product/ntjbeejodhaodtxzjjbe.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742740731/image_clothing/image_product/zmeweypbtsvijmfoav1q.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742740731/image_clothing/image_product/ubpjq199szbcprnqv0td.png",
    ],
  },
  {
    name: "Nike Wind Pant MVP",
    price: 280000,
    description:
      "Quần gió Nike Wind Pant MVP được làm từ chất liệu cao cấp, thoáng mát và nhẹ nhàng, mang lại cảm giác thoải mái suốt cả ngày. Thiết kế năng động, hiện đại, phù hợp cho nhiều hoạt động từ thể thao đến dạo phố. Màu đen mạnh mẽ kết hợp với logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742741005/image_clothing/image_product/k04ycicmvkw4w6ub1tnx.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742741005/image_clothing/image_product/omjlgb6qvquymzsgjghd.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742741006/image_clothing/image_product/usipdzpers4ai0b5f95m.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742741005/image_clothing/image_product/klj0lyn33yoxsnprwskk.png",
    ],
  },
  {
    name: "Nike Kaki Pant Life",
    price: 380000,
    description:
      "Quần kaki Nike Kaki Pant Life được làm từ chất liệu cao cấp, thoáng mát và co giãn nhẹ, mang lại cảm giác thoải mái suốt cả ngày. Thiết kế hiện đại, đơn giản nhưng tinh tế, phù hợp cho nhiều phong cách từ công sở đến dạo phố. Màu đen mạnh mẽ kết hợp với logo Nike đặc trưng tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742741198/image_clothing/image_product/gabyyxnfcsum8xzjh6co.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742741198/image_clothing/image_product/s7qjbca6jsqa6gujrpue.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742741198/image_clothing/image_product/fzrakzfz3smkjzpnp6c9.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742741198/image_clothing/image_product/y9to0ckr0xabxb5nzpvq.png",
    ],
  },
  {
    name: "Nike Kaki Pant Thompson",
    price: 480000,
    description:
      "Quần kaki Nike Kaki Pant Thompson được làm từ chất liệu cao cấp, thoáng mát và co giãn nhẹ, mang lại cảm giác thoải mái suốt cả ngày. Thiết kế thanh lịch, đơn giản nhưng tinh tế, phù hợp cho nhiều phong cách từ công sở đến dạo phố. Màu be trang nhã kết hợp với logo Nike đặc trưng tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742741387/image_clothing/image_product/zhyazjyzffvl5ymlu43t.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742741387/image_clothing/image_product/jflu6ivqy6x2tvupozrr.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742741387/image_clothing/image_product/a8a5z1qmpxynkzfag8tg.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742741387/image_clothing/image_product/lj8pzbtriydej1or1aiy.png",
    ],
  },
  {
    name: "Nike Short Black Cool",
    price: 280000,
    description:
      "Quần đùi Nike Short Black Cool được làm từ chất liệu cao cấp, thoáng mát và thấm hút mồ hôi tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế năng động, linh hoạt, phù hợp cho các hoạt động thể thao và dạo phố. Màu đen mạnh mẽ kết hợp với logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742741633/image_clothing/image_product/n30zilz65bwyh7sq6cnr.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742741633/image_clothing/image_product/av8bcff7onpx1g3z489g.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742741633/image_clothing/image_product/p2ywaxc6ugfftejojpaa.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742741633/image_clothing/image_product/htx9mwxup4frfmqaioma.png",
    ],
  },
  {
    name: "Nike Short Stride Running Division",
    price: 500000,
    description:
      "Quần đùi Nike Short Stride Running Division được làm từ chất liệu cao cấp, thoáng mát và thấm hút mồ hôi tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế đơn giản nhưng tinh tế, phù hợp cho nhiều hoạt động từ thể thao đến dạo phố. Logo Nike đặc trưng tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742741796/image_clothing/image_product/ifzhfk2fkllyuf7ix2dq.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742741796/image_clothing/image_product/ute4pagxnm3dizbq0jdb.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742741796/image_clothing/image_product/eq97nmhqkx29nmo0rtdz.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742741795/image_clothing/image_product/deyodru9t7qivx7aoucg.png",
    ],
  },
  {
    name: "Nike Short Stride Run Energy",
    price: 500000,
    description:
      "Quần đùi Nike Short Stride Run Energy được làm từ chất liệu cao cấp, thoáng mát và thấm hút mồ hôi tốt, mang lại cảm giác nhẹ nhàng và thoải mái khi vận động. Thiết kế rộng rãi, linh hoạt, phù hợp cho các hoạt động thể thao, đặc biệt là bóng rổ. Màu đỏ nổi bật kết hợp với logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742741981/image_clothing/image_product/tfxlvaj9hqthuep5sfte.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742741981/image_clothing/image_product/q38fuw4elvpgueb6jfwe.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742741981/image_clothing/image_product/ocdfpl2ljnb90rjuyhue.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742741981/image_clothing/image_product/ci8fybqqj1psyktvjjfu.png",
    ],
  },
  {
    name: "Nike Short Form",
    price: 500000,
    description:
      "Quần đùi Nike Short Form được làm từ chất liệu cao cấp, thoáng mát và thấm hút mồ hôi tốt, mang lại cảm giác nhẹ nhàng và thoải mái khi vận động. Thiết kế rộng rãi, linh hoạt, phù hợp cho các hoạt động thể thao, đặc biệt là bóng rổ. Màu đỏ nổi bật kết hợp với logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742742206/image_clothing/image_product/z7wa7wq1w5mqycu42xym.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742742206/image_clothing/image_product/z7fbxlkvrvoychwict2i.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742742206/image_clothing/image_product/z0oxc6phpis1lkplttct.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742742205/image_clothing/image_product/gyiigu4ddnbykizlkjwo.png",
    ],
  },
  {
    name: "Nike Short Unlimited",
    price: 700000,
    description:
      "Quần đùi Nike Short Unlimited được làm từ chất liệu cao cấp, thoáng mát và thấm hút mồ hôi tốt, mang lại cảm giác nhẹ nhàng và thoải mái khi vận động. Thiết kế rộng rãi, linh hoạt, phù hợp cho các hoạt động thể thao, đặc biệt là bóng rổ. Màu đỏ nổi bật kết hợp với logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742742401/image_clothing/image_product/ikqbwxmwme5iimd1lntf.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742742401/image_clothing/image_product/h1wtgt6j9ivbeubwcm6i.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742742401/image_clothing/image_product/qbjvosy0sfttp6e1alzi.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742742401/image_clothing/image_product/mytr4bnygcvstrpnzv7t.png",
    ],
  },
];

const womenProducts = [
  {
    name: "Nike Sportswear Club Essentials",
    price: 280000,
    description:
      "Áo phông Nike Sportswear Club Essentials được làm từ chất liệu cao cấp, thoáng mát và thấm hút mồ hôi tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế năng động, trẻ trung, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742745428/image_clothing/image_product/jrqojcmtrz1u6yetuakw.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742745428/image_clothing/image_product/x1llkt954ifepbes7li2.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742745428/image_clothing/image_product/rn6aryhfabpy2lua3pkc.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742745428/image_clothing/image_product/j2zyyrpvivj3olkzn90i.png",
    ],
  },
  {
    name: "Nike T-Shirt Jordan Essentials",
    price: 280000,
    description:
      "Áo phông Nike T-Shirt Jordan Essentials được làm từ chất liệu cao cấp, thoáng mát và thấm hút mồ hôi tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế tay ngắn năng động, phù hợp cho các hoạt động thể thao và dạo phố. Logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742745658/image_clothing/image_product/imk1y2bbbbq9fpi6tjjr.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742745657/image_clothing/image_product/wx89q39su4yacqhbldtl.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742745657/image_clothing/image_product/em6rbg8pdhbey7x3xyta.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742745657/image_clothing/image_product/pffquu4gagilcydotbn0.png",
    ],
  },
  {
    name: "Nike Sportswear Ninety",
    price: 580000,
    description:
      "Áo phông Jordan Artist Series by Darien Birks được làm từ chất liệu cao cấp, thoáng mát và thấm hút mồ hôi tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế mang đậm dấu ấn nghệ thuật với họa tiết độc đáo, kết hợp cùng phong cách thể thao đặc trưng của Jordan. Logo Jordan tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742745986/image_clothing/image_product/y6u4j2ef06uyye1ro9ki.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742745985/image_clothing/image_product/z1tjunom5eukgmufbu9z.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742745971/image_clothing/image_product/ofsn3mxp4yav0aquh7cg.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742745956/image_clothing/image_product/b9dunvnwz6ckxmkmtyjl.png",
    ],
  },
  {
    name: "Nike T-Shirt ACG",
    price: 280000,
    description:
      "Áo phông Nike T-Shirt ACG được làm từ chất liệu cao cấp, thoáng mát và thấm hút mồ hôi tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế đơn giản nhưng tinh tế, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Nike đặc trưng tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742746175/image_clothing/image_product/xkcovja0m6atyfslkvuu.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742746175/image_clothing/image_product/qk8nolcfwfc75y5nfwmm.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742746175/image_clothing/image_product/ekeiyabnktkfyewuwuzy.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742746175/image_clothing/image_product/qehpg6vom9okso8z5p6h.png",
    ],
  },
  {
    name: "Nike T-Shirt Loose Short-Sleeve Graphic",
    price: 480000,
    description:
      "Áo phông Nike T-Shirt Loose Short-Sleeve Graphic được làm từ chất liệu cao cấp, thoáng mát và thấm hút mồ hôi tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế đơn giản nhưng tinh tế, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Nike đặc trưng tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742746365/image_clothing/image_product/cfvpq2lcxzqwo0i6edgt.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742746365/image_clothing/image_product/zclk7uwgjst701btd9pt.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742746364/image_clothing/image_product/zuvfzbj1e7bejyqaibvz.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742746364/image_clothing/image_product/keicoxc2dq2gfrmbjmu0.png",
    ],
  },
  {
    name: "Nike T-Shirt Jordan Graphic",
    price: 580000,
    description:
      "Áo phông Nike T-Shirt Jordan Graphic được làm từ chất liệu cao cấp, thoáng mát và thấm hút mồ hôi tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế đơn giản nhưng tinh tế, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Nike đặc trưng tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742746658/image_clothing/image_product/u7lf3ifbyrgzfxkkehjp.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742746657/image_clothing/image_product/f11evm2pakakroejsppu.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742746657/image_clothing/image_product/gkhedair6cjbnph89oir.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742746657/image_clothing/image_product/lotzqxjnptk7egshkkyh.png",
    ],
  },
  {
    name: "Nike Sweater Sportswear Phoenix Fleece",
    price: 580000,
    description:
      "Áo sweater Nike Sweater Sportswear Phoenix Fleece được làm từ chất liệu nỉ cao cấp, mềm mại và thoáng mát, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế hiện đại, trẻ trung, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742746855/image_clothing/image_product/n4nag2aj4rklcmkvir2r.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742746854/image_clothing/image_product/nity233bcri81qbxsvcc.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742746854/image_clothing/image_product/ltr3n13dzxma3t3kl7ve.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742746854/image_clothing/image_product/j6p60cetfd7vfyljc44i.png",
    ],
  },
  {
    name: "Nike Sweater 24.7 ImpossiblySoft",
    price: 680000,
    description:
      "Áo sweater Nike Sweater 24.7 ImpossiblySoft được làm từ chất liệu nỉ cao cấp, mềm mại và thoáng mát, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế cổ tròn đơn giản nhưng tinh tế, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Nike đặc trưng tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742747015/image_clothing/image_product/fz9mfi6yrqlih2tujwt3.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742747014/image_clothing/image_product/apd5c3ykhmhmr4ij4rhc.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742747015/image_clothing/image_product/gbdlbxdt2fnxy4evlzt1.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742747014/image_clothing/image_product/srpbkgp9pbrfq91ak3ic.png",
    ],
  },
  {
    name: "Nike Sweater 1/2-Zip Crop Sweatshirt",
    price: 980000,
    description:
      "Áo sweater Nike Sweater 1/2-Zip Crop Sweatshirt được làm từ chất liệu nỉ cao cấp, mềm mại và thoáng mát, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế cổ tròn đơn giản nhưng tinh tế, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Nike đặc trưng tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742751305/image_clothing/image_product/r3fnwlt2hhywu1zqrfmk.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742751305/image_clothing/image_product/k5zxgajmppht2snva34d.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742751305/image_clothing/image_product/otnik19p2dr4kc8magiy.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742751304/image_clothing/image_product/sn9fzy02uxvtqedu9hlr.png",
    ],
  },
  {
    name: "Nike Short-sleeve Polo Victory",
    price: 950000,
    description:
      "Áo polo Nike Short-Sleeve Polo Victory được làm từ chất liệu cao cấp, thoáng mát và thấm hút mồ hôi tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế tay ngắn năng động, hiện đại, phù hợp cho nhiều phong cách từ thể thao đến công sở. Logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742747207/image_clothing/image_product/q3d3dv4vmvjd7rqpzxbk.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742747206/image_clothing/image_product/lc9pognzcm5s8lbkjjgy.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742747207/image_clothing/image_product/alatpsct5dylbxub0ceu.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742747206/image_clothing/image_product/bha7ctwljwjw34019gfr.png",
    ],
  },
  {
    name: "Nike Polo Women by YOON",
    price: 550000,
    description:
      "Áo polo Nike Polo Women by YOON được làm từ chất liệu cao cấp, thoáng mát và thấm hút mồ hôi tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế hiện đại, thanh lịch, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742747371/image_clothing/image_product/oo0lkuz9lctilvgluwzt.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742747370/image_clothing/image_product/ltncpb53sfirylza7acq.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742747370/image_clothing/image_product/va2oc0m3ubrwrh5bynzq.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742747371/image_clothing/image_product/dcdlyzlz6taiydlsm5b7.png",
    ],
  },
  {
    name: "Nike Shirts Woven Simple",
    price: 650000,
    description:
      "Áo sơ mi Nike Shirts Woven Simple được làm từ chất liệu cao cấp, thoáng mát và mềm mại, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế crop top hiện đại, trẻ trung, phù hợp cho nhiều phong cách từ năng động đến cá tính. Logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742747607/image_clothing/image_product/rcpbzqdualaoqsedf5em.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742747606/image_clothing/image_product/judxjap2umtkojotcweb.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742747602/image_clothing/image_product/ayxnbkbjsre1qwl0ptm4.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742747586/image_clothing/image_product/lzi6ucvaflqglqcmkmej.png",
    ],
  },
  {
    name: "Nike Sportswear Cardigan Terry",
    price: 1000000,
    description:
      "Áo khoác Nike Sportswear Cardigan French Terry được làm từ chất liệu nỉ French Terry cao cấp, mềm mại và giữ ấm hiệu quả, mang lại cảm giác nhẹ nhàng và thoải mái khi mặc. Thiết kế oversized hiện đại, năng động, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742747843/image_clothing/image_product/g7vfqmervnvyeeg1fvmo.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742747843/image_clothing/image_product/wppszrl0efcpmoixphra.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742747843/image_clothing/image_product/hwpvmkuiltmvx4byymgd.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742747844/image_clothing/image_product/lehm8tchalelaudc3j0z.png",
    ],
  },
  {
    name: "Nike Sportswear Chill Knit",
    price: 1000000,
    description:
      "Áo khoác Nike Sportswear Chill Knit được làm từ chất liệu gió cao cấp, mềm mại và giữ ấm hiệu quả, mang lại cảm giác nhẹ nhàng và thoải mái khi mặc. Thiết kế oversized hiện đại, năng động, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742748043/image_clothing/image_product/fpzynhmuubu4k8lfxpr6.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742748043/image_clothing/image_product/ew7cvyedjytvqpozujtx.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742748043/image_clothing/image_product/efkv5gq4u54bx7y4goeb.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742748042/image_clothing/image_product/ctld1s2ogcgjanzwp6ye.png",
    ],
  },
  {
    name: "Nike Every Stitch Considered",
    price: 1500000,
    description:
      "Áo khoác Nike Every Stitch Considered được làm từ chất liệu kaki cao cấp, mềm mại và giữ ấm hiệu quả, mang lại cảm giác nhẹ nhàng và thoải mái khi mặc. Thiết kế oversized hiện đại, năng động, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742748364/image_clothing/image_product/ikn11r5xndcpfxaz4zpv.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742748363/image_clothing/image_product/bez6pdzxh9njnxz3tsjd.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742748363/image_clothing/image_product/eljzwptww77o0y0bphdy.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742748355/image_clothing/image_product/jwy56tdjzmewouge5at8.png",
    ],
  },
  {
    name: "Nike Jordan Renegade",
    price: 3000000,
    description:
      "Áo khoác Nike Jordan Renegade được làm từ chất liệu kaki cao cấp, mềm mại và giữ ấm hiệu quả, mang lại cảm giác nhẹ nhàng và thoải mái khi mặc. Thiết kế oversized hiện đại, năng động, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742751535/image_clothing/image_product/rdsvbonccnbjchtf9j1e.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742751535/image_clothing/image_product/gzwqufm7vqvo01zh50w0.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742751535/image_clothing/image_product/uyryjgiclny23lhigtrs.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742751535/image_clothing/image_product/swrvhw1cqvnnydtqwi0h.png",
    ],
  },
  {
    name: "Nike Trail Shorts",
    price: 480000,
    description:
      "Quần đùi Nike Trail Shorts được làm từ chất liệu vải dệt cao cấp, thoáng mát và thấm hút mồ hôi tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế năng động, linh hoạt, phù hợp cho các hoạt động thể thao và dạo phố. Logo Jordan đặc trưng tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742748621/image_clothing/image_product/a3ll38sscir2iipowdsn.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742748621/image_clothing/image_product/k50nzod0klzmcwteaaic.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742748621/image_clothing/image_product/y0pdru3g0glb9twtn7jg.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742748615/image_clothing/image_product/lys5u5atghzliswfuhyc.png",
    ],
  },
  {
    name: "Nike Short Sportswear Chill Terry",
    price: 480000,
    description:
      "Quần đùi Nike Short Sportswear Chill Terry được làm từ chất liệu Terry cao cấp, thoáng mát và thấm hút mồ hôi tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế đơn giản nhưng tinh tế, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Nike đặc trưng tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742748758/image_clothing/image_product/qzdrc4t68wjyirnwuicm.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742748757/image_clothing/image_product/jvra4ppnlmx3fqthktjc.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742748757/image_clothing/image_product/zgvy7uqrt8qmo5hajnfc.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742748757/image_clothing/image_product/ncptf0bkgngis5hei1jl.png",
    ],
  },
  {
    name: "Nike Essential Cargo Shorts",
    price: 480000,
    description:
      "Quần đùi Nike Essential Cargo Shorts được làm từ chất liệu kaki cao cấp, thoáng mát và thấm hút mồ hôi tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế năng động, linh hoạt, phù hợp cho các hoạt động thể thao và dạo phố. Logo Jordan đặc trưng tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742748955/image_clothing/image_product/n2bk2jjjmvkp8tyi1b88.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742748954/image_clothing/image_product/iplazgt6t3bucrahwqjq.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742748954/image_clothing/image_product/ul7c91acksmlo343jeqd.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742748954/image_clothing/image_product/vn0cnipqpfwm9xlpqlsy.png",
    ],
  },
  {
    name: "Dress Sportswear Chill Knit",
    price: 880000,
    description:
      "Váy liền thân Dress Sportswear Chill Knit được làm từ chất liệu cao cấp, thoáng mát và co giãn tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế thể thao hiện đại, ôm dáng tinh tế, phù hợp cho cả thi đấu và dạo phố. Logo Nike đặc trưng tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742749128/image_clothing/image_product/btlnde7uwdpwuoyyjqaa.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742749128/image_clothing/image_product/tzi5aftjfbkpcxbbcdhk.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742749127/image_clothing/image_product/liacl3ahgi3vdmdxt14x.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742749128/image_clothing/image_product/teefnmgpitfyoaumpl2t.png",
    ],
  },
  {
    name: "Dress Nike Air Jordan Knit",
    price: 680000,
    description:
      "Váy liền thân Dress Nike Air Jordan Knit được làm từ chất liệu dệt kim cao cấp, thoáng mát và co giãn tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế hiện đại, ôm dáng tinh tế, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Jordan đặc trưng tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742749320/image_clothing/image_product/fnoke2xfxri4r8i2oorb.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742749320/image_clothing/image_product/ax0pmkuuxyeh5iqkwcvl.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742749318/image_clothing/image_product/zp5eulcxkxojl8frnjsw.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742749302/image_clothing/image_product/cz8tkmolbkpxh1xqcbbo.png",
    ],
  },
  {
    name: "Nike Printed Tennis Dress",
    price: 680000,
    description:
      "Váy liền thân Nike Printed Tennis Dress được làm từ chất liệu dệt kim cao cấp, thoáng mát và co giãn tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế hiện đại, ôm dáng tinh tế, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Jordan đặc trưng tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742749483/image_clothing/image_product/ju6g8tpcbdfxuxt6nsgu.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742749483/image_clothing/image_product/pundaeszhbxvo2qhdied.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742749483/image_clothing/image_product/kwoypqeav6ayu4qvigs6.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742749483/image_clothing/image_product/jtnldktlndnx53knkeze.png",
    ],
  },
  {
    name: "Nike Twill Skirt",
    price: 480000,
    description:
      "Chân váy Nike Twill Skirt được làm từ chất liệu cao cấp, thoáng mát và co giãn tốt, mang lại cảm giác nhẹ nhàng và thoải mái khi vận động. Thiết kế thể thao năng động, phù hợp cho cả thi đấu và dạo phố. Logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742749643/image_clothing/image_product/ibaxdvthn1tl5gugr53e.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742749643/image_clothing/image_product/pce3edmmuh1zt8kb4hsi.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742749642/image_clothing/image_product/vc3mvao2tjc0cilqonxs.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742749643/image_clothing/image_product/pjb5rc2g4pekgtdgykh2.png",
    ],
  },
  {
    name: "Nike Mid-Rise Woven Cargo Midi Skirt",
    price: 680000,
    description:
      "Chân váy Nike Mid-Rise Woven Cargo Midi Skirt được làm từ chất liệu cao cấp, thoáng mát và co giãn tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế hiện đại, năng động, phù hợp cho nhiều hoạt động ngoài trời và dạo phố. Logo Nike ACG tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742749786/image_clothing/image_product/iqtv35kjovizzhmuacol.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742749786/image_clothing/image_product/x0cpfvwhluva4mradgiz.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742749785/image_clothing/image_product/yeviwwjkshvuoomnusxi.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742749785/image_clothing/image_product/idbqjr2fgv0cbslak1is.png",
    ],
  },
  {
    name: "Nike Dri-FIT Pleated Tennis Skirt",
    price: 580000,
    description:
      "Chân váy Nike Dri-FIT Pleated Tennis Skirt được làm từ chất liệu gân cao cấp, thoáng mát và co giãn tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế đơn giản nhưng tinh tế, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Nike đặc trưng tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742749988/image_clothing/image_product/ug6kfbdyvzpmkehx63u7.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742749987/image_clothing/image_product/gge1tfylmqoi8uoailkq.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742749987/image_clothing/image_product/fcodnkrown4ex2gflbuo.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742749987/image_clothing/image_product/kdvxqvl90fk2udgb0msi.png",
    ],
  },
  {
    name: "Nike 24.7 PerfectStretch Skirt",
    price: 780000,
    description:
      "Chân váy Nike 24.7 PerfectStretch Skirt được làm từ chất liệu gân cao cấp, thoáng mát và co giãn tốt, mang lại cảm giác nhẹ nhàng và thoải mái suốt cả ngày. Thiết kế đơn giản nhưng tinh tế, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Nike đặc trưng tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742750206/image_clothing/image_product/qfvi7vljvvxxzdsujr0k.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742750206/image_clothing/image_product/yzjsmilyvgbnpkhctjch.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742750206/image_clothing/image_product/yua2n51n7r5sm4diutqi.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742750206/image_clothing/image_product/pxbmj2t1ctohyphyfr9i.png",
    ],
  },
  {
    name: "Nike Wind Pant High-Waisted Woven Open-Hem",
    price: 550000,
    description:
      "Quần gió Nike Wind Pant High-Waisted Woven Open-Hem được làm từ chất liệu dệt cao cấp, thoáng mát và nhẹ nhàng, mang lại cảm giác thoải mái suốt cả ngày. Thiết kế lưng cao tôn dáng cùng ống rộng thoải mái, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742750372/image_clothing/image_product/kuyxmavsubcgurx7jpzf.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742750372/image_clothing/image_product/uljfkm64vfrtifajaieg.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742750372/image_clothing/image_product/xn6lbo1vevep3suvajra.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742750372/image_clothing/image_product/xwgabuzahppoinchmuvs.png",
    ],
  },
  {
    name: "Nike Wind Pant Jordan Chicago",
    price: 530000,
    description:
      "Quần gió Nike Wind Pant Jordan Chicago được làm từ chất liệu dệt cao cấp, thoáng mát và nhẹ nhàng, mang lại cảm giác thoải mái suốt cả ngày. Thiết kế hiện đại, linh hoạt, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Nike tinh tế tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742750540/image_clothing/image_product/kuhjkfvwxcaids2vnyml.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742750540/image_clothing/image_product/vwozq5rtvgtjzjta9jv2.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742750540/image_clothing/image_product/jxedzso2jnhtcknqprb8.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742750540/image_clothing/image_product/ffyoc733yfxrvaratt73.png",
    ],
  },
  {
    name: "Nike Kaki Pant High-Waisted",
    price: 680000,
    description:
      "Quần kaki Nike Kaki High-Waisted được làm từ chất liệu bền vững, thoáng mát và nhẹ nhàng, mang lại cảm giác thoải mái suốt cả ngày. Thiết kế hiện đại, đơn giản nhưng tinh tế, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Nike đặc trưng tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742750725/image_clothing/image_product/ngg7nlfuynuucfmarsep.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742750725/image_clothing/image_product/bl3pr9cldq6r0td3fxga.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742750725/image_clothing/image_product/mmwvsyqcv2aivdrwsfxm.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742750725/image_clothing/image_product/usuekr7ttkzsqdnrxyx8.png",
    ],
  },
  {
    name: "Nike Kaki Pant Mid-Rise Twill",
    price: 780000,
    description:
      "Quần kaki Nike Kaki Mid-Rise Twill được làm từ chất liệu bền vững, thoáng mát và nhẹ nhàng, mang lại cảm giác thoải mái suốt cả ngày. Thiết kế hiện đại, đơn giản nhưng tinh tế, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Nike đặc trưng tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742750937/image_clothing/image_product/rdbegqtzplf5vdt6bdsp.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742750937/image_clothing/image_product/cthjff69iyndem6jowwg.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742750937/image_clothing/image_product/zgtuaykychc2v6lsvzd0.png",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742750937/image_clothing/image_product/wfamoxkqabn6c0u5tzcc.png",
    ],
  },
  {
    name: "Nike Jean Denim Special",
    price: 1000000,
    description:
      "Quần kaki Nike Jean Denim Special được làm từ chất liệu bền vững, thoáng mát và nhẹ nhàng, mang lại cảm giác thoải mái suốt cả ngày. Thiết kế hiện đại, đơn giản nhưng tinh tế, phù hợp cho nhiều phong cách từ thể thao đến dạo phố. Logo Nike đặc trưng tạo điểm nhấn, giúp bạn trông phong cách và thu hút.",
    averageReview: 0,
    images: [
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742752141/image_clothing/image_product/k7odkoj5nyydoxquxeuf.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742752047/image_clothing/image_product/ivrnioiapqctgwqotrdq.webp",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742752032/image_clothing/image_product/gfdpahszdpeemjaefkh0.jpg",
      "https://res.cloudinary.com/dbfat0hl6/image/upload/v1742752019/image_clothing/image_product/ykm0x7hffvvnmbzoczau.jpg",
    ],
  },
];

const sizes = [
  {
    size: "XS",
    quantity: 100,
    status: "Có hàng",
  },
  {
    size: "S",
    quantity: 100,
    status: "Có hàng",
  },
  {
    size: "M",
    quantity: 100,
    status: "Có hàng",
  },
  {
    size: "L",
    quantity: 100,
    status: "Có hàng",
  },
  {
    size: "XL",
    quantity: 100,
    status: "Có hàng",
  },
  {
    size: "XXL",
    quantity: 100,
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
    const jeanPantArr = womenProducts.filter((item) =>
      item.description.toLowerCase().includes("quần jeans")
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
    const results12 = await addProductsByGender(
      "quan-jean",
      jeanPantArr,
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
      results12,
    ];

    return checkResults(arr) ? true : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = seedProduct;
