import React from "react";
import Layout from "@/layout/Layout";
import Banner from "@/components/banner/Banner";
import ContentItem from "@/components/content/ContentItem";
import IconMen from "@/components/icons/IconMen";
import IconWomen from "@/components/icons/IconWomen";
const Home = () => {
  return (
    <Layout>
      <section>
        <Banner className="object-cover w-full mb-20"></Banner>
        <ContentItem title="Nam" icon={<IconMen />}></ContentItem>
        <ContentItem title="Nữ" icon={<IconWomen />}></ContentItem>
      </section>
    </Layout>
  );
};

export default Home;
