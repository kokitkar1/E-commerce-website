import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={"Contact us - E wish"}>
      <div className="row contactus " style={{ minHeight: "85vh" }}>
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className=" p-2 text-black text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
          Thank you for your interest in contacting E-Wish. You can reach us through the following channels:
          <tr />
          We aim to respond you within 24 hours.
          </p>
          <p className="mt-3"> 
            <BiMailSend /> : www.help@ewish.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : +91-4568597895
          </p>
          <p className="mt-3">
            <BiSupport /> : 6250-6250-6250 (toll free)
          </p>
          <tr />
          <p className="text-justify mt-2">
          We look forward to hearing from you soon.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
