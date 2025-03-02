import React, { useEffect } from "react";
import Layout from "@/layout/Layout";
import Banner from "@/components/banner/Banner";
import ContentItem from "@/components/content/ContentItem";
import IconMen from "@/components/icons/IconMen";
import IconWomen from "@/components/icons/IconWomen";
import GroupBanner from "@/components/group/GroupBanner";
import { useSelector } from "react-redux";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <section>
        <div className="mb-10 md:mb-20">
          <GroupBanner
            titleBanner="Làm chủ phong cách tối giản"
            descriptionBanner="Đường cắt tinh xảo, chi tiết chỉnh chi chất liệu cao cấp."
            textButton="Mua ngay"
          >
            <Banner src="/banner-2.avif" className="w-full"></Banner>
          </GroupBanner>
          <GroupBanner
            titleBanner="Biến tấu sắc trung tính"
            descriptionBanner="Phối màu hài hòa, hợp mắt giúp người mặc cảm thấy tự tin và sang trọng."
            textButton="Mua ngay"
          >
            <Banner src="/banner-3.avif" className="w-full"></Banner>
          </GroupBanner>
        </div>
        <ContentItem title="Nam" icon={<IconMen />}></ContentItem>
        <ContentItem title="Nữ" icon={<IconWomen />}></ContentItem>
      </section>
    </Layout>
  );
};

export default Home;
