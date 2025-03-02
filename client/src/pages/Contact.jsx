import React, { useEffect } from "react";
import Layout from "@/layout/Layout";
import Title from "@/components/title/Title";
import InfoItem from "@/components/contact.jsx/InfoItem";
import SocialMedia from "@/components/contact.jsx/SocialMedia";
import IconAddress from "@/components/icons/IconAddress";
import IconPhone from "@/components/icons/IconPhone";
import IconMail from "@/components/icons/IconMail";
import IconFacebook from "@/components/icons/IconFacebook";
import IconTwitter from "@/components/icons/IconTwitter";
import IconInstagram from "@/components/icons/IconInstagram";
import IconTiktok from "@/components/icons/IconTiktok";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center py-10 space-y-8">
        {/* Tiêu đề */}
        <Title
          className="text-4xl font-bold text-center"
          text="Liên hệ với chúng tôi"
        />

        {/* Thông tin liên hệ */}
        <div className="flex flex-wrap items-start justify-center gap-10">
          <div className="flex flex-col items-start space-y-6">
            <InfoItem
              icon={<IconAddress />}
              content="102/16h/16 Âu Dương Lân, P3, Q8, TPHCM"
            />
            <InfoItem icon={<IconPhone />} content="+84 822 917 787" />
            <InfoItem
              icon={<IconMail />}
              content="ichtrachuylong.91.04@gmail.com"
            />
            <Title className="text-lg font-semibold" text="Giờ làm việc" />
            <p className="text-gray-700">Thứ Hai - Thứ Sáu: 08:00 - 18:00</p>
            <p className="text-gray-700">Thứ Bảy: 09:00 - 16:00</p>
            <p className="text-gray-700">Chủ Nhật: Nghỉ</p>
            <div className="flex gap-4">
              <SocialMedia icon={<IconFacebook width={40} height={40} />} />
              <SocialMedia icon={<IconTwitter width={40} height={40} />} />
              <SocialMedia icon={<IconTiktok width={40} height={40} />} />
              <SocialMedia icon={<IconInstagram width={40} height={40} />} />
            </div>
          </div>

          {/* Bản đồ Google Maps */}
          <div>
            <iframe
              className="w-[400px] h-[300px] rounded-lg shadow-md"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4973912144133!2d106.67774507575606!3d10.773374059204079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ec1f28f768d%3A0x33a7594b27f73c62!2zMTAyIMSQLiDEkOG7qW5nIEzDom4sIFAzLCBRdeG6rW4gOCwgVGjDoG5oIHBo4buRIE3huqdtIFRQLkhDTSwgVmnhu4d0IE5hbQ!5e0!3m2!1sen!2s!4v1711984955020!5m2!1sen!2s"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Form liên hệ */}
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
          <Title
            className="text-xl font-semibold text-center"
            text="Gửi tin nhắn cho chúng tôi"
          />
          <form className="mt-4 space-y-4">
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              placeholder="Tên của bạn"
              required
            />
            <input
              type="email"
              className="w-full p-2 border rounded-lg"
              placeholder="Email của bạn"
              required
            />
            <textarea
              className="w-full p-2 border rounded-lg"
              rows="4"
              placeholder="Nội dung tin nhắn"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Gửi tin nhắn
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
