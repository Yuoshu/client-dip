import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">Зв'язатися з нами</h1>
          <p className="text-justify mt-2">
            Почувайтеся вільно. Телефонуйте або пишіть якщо хочете дізнатися відповіді на свої питання з приводу нашого сайту та товарів
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@help.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 012-3456789
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (Безкоштовно)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;