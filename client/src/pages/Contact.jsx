import InfoItem from "@/components/contact.jsx/InfoItem";
import SocialMedia from "@/components/contact.jsx/SocialMedia";
import IconAddress from "@/components/icons/IconAddress";
import IconFacebook from "@/components/icons/IconFacebook";
import IconInstagram from "@/components/icons/IconInstagram";
import IconMail from "@/components/icons/IconMail";
import IconPhone from "@/components/icons/IconPhone";
import IconTiktok from "@/components/icons/IconTiktok";
import IconTwitter from "@/components/icons/IconTwitter";
import Title from "@/components/title/Title";
import Layout from "@/layout/Layout";
import React from "react";

const Contact = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center">
        <Title className="block text-4xl" text="Liên hệ"></Title>
      </div>
      <div className="flex gap-5">
        <img
          src="./contact.jpg"
          alt=""
          className="rounded-lg w-[800px] h-[500px] object-cover"
        />
        <div className="flex flex-col items-center flex-1 p-3 gap-y-10">
          <InfoItem
            icon={<IconAddress />}
            content="102/16h/16 Au Duong Lan, P3, Q8, TPHCM"
          ></InfoItem>
          <InfoItem icon={<IconPhone />} content="+84 822 917 787"></InfoItem>
          <InfoItem
            icon={<IconMail />}
            content="ichtrachuylong.91.04@gmail.com"
          ></InfoItem>
          <div className="flex gap-5">
            <SocialMedia
              icon={<IconFacebook width={70} height={70} />}
            ></SocialMedia>
            <SocialMedia
              icon={<IconTwitter width={70} height={70} />}
            ></SocialMedia>
            <SocialMedia
              icon={<IconTiktok width={70} height={70} />}
            ></SocialMedia>
            <SocialMedia
              icon={<IconInstagram width={70} height={70} />}
            ></SocialMedia>
          </div>
          <Title
            className="text-xl italic"
            text="Cảm ơn đã liên hệ với chúng tôi"
          ></Title>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
