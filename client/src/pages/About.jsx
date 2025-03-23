import Dropdown from "@/components/about/Dropdown";
import Target from "@/components/about/Target";
import Title from "@/components/title/Title";
import Layout from "@/layout/Layout";
import React, { useEffect } from "react";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout>
      {/* Tiêu đề */}
      <div className="flex items-center justify-center my-8">
        <Title
          className="text-2xl font-bold md:text-3xl lg:text-4xl"
          text="Giới thiệu"
        ></Title>
      </div>

      {/* Nội dung chính */}
      <div className="container px-4 mx-auto">
        <div className="gap-5">
          {/* Hình ảnh */}
          <img
            src="./about.jpg"
            alt="Giới thiệu Dirty Clothes"
            className="rounded-lg w-full h-[600px] object-cover mb-8"
          />

          {/* Nội dung văn bản */}
          <div className="flex flex-col p-3 text-gray-700 gap-y-5">
            <h1 className="text-2xl font-bold text-gray-800">
              DIRTY CLOTHES - KHÔNG CHỈ LÀ THỜI TRANG
            </h1>
            <p>
              Chào mừng bạn đến với <strong>DIRTY CLOTHES</strong>, nơi gắn kết
              yêu thương qua từng bộ trang phục!
            </p>
            <p>
              <strong>DIRTY CLOTHES</strong> được biết đến là một thương hiệu
              thời trang dành cho cả gia đình. Nhờ sự nỗ lực không ngừng của đội
              ngũ nhân sự cùng lòng tin yêu từ phía quý khách hàng,{" "}
              <strong>DIRTY CLOTHES</strong> ngày càng phát triển vững mạnh, hứa
              hẹn sớm trở thành Tập đoàn thời trang toàn cầu trong tương lai
              không xa.
            </p>
            <p>
              <strong>DIRTY CLOTHES</strong> tự hào là địa chỉ tin cậy chuyên
              cung cấp áo quần gia đình với chất lượng hàng đầu và phong cách đa
              dạng. Chúng tôi mang đến những sản phẩm độc đáo, không chỉ đẹp mắt
              mà còn thể hiện sự đồng điệu và gắn bó giữa các thành viên trong
              gia đình.
            </p>
            <Target></Target>
            {/* Dropdowns */}
            <Dropdown text="Tại sao chọn chúng tôi ?">
              <ul className="pl-5 text-left list-disc">
                <li>Thiết kế đa dạng, phù hợp mọi lứa tuổi</li>
                <li>Chất liệu cao cấp, thoải mái</li>
                <li>Ý nghĩa đặc biệt</li>
                <li>Dịch vụ tận tâm</li>
              </ul>
            </Dropdown>

            <Dropdown text="Sản phẩm của chúng tôi ?">
              <ul className="pl-5 text-left list-disc">
                <li>Áo quần gia đình đi dạo, du lịch</li>
                <li>Trang phục đồng phục gia đình cho sự kiện đặc biệt</li>
                <li>Đồ mặc nhà thoải mái, ấm cúng</li>
                <li>Thiết kế theo yêu cầu, cá nhân hóa phong cách riêng</li>
              </ul>
            </Dropdown>

            <Dropdown text="Cam kết của chúng tôi ?">
              <ul className="pl-5 text-left list-disc">
                <li>Sản phẩm giống hình 100%, kiểm tra kỹ trước khi giao</li>
                <li>Mua sắm thả ga mà không lo về giá</li>
                <li>Chương trình giảm giá đặc biệt và quà tặng khi mua hàng</li>
                <li>Đồ mặc nhà thoải mái, ấm cúng</li>
              </ul>
            </Dropdown>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
