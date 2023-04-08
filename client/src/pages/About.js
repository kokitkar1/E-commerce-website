import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - E wish"}>
      <div className="row contactus " style={{ minHeight: "110vh" }}>
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          <p> E-Wish is an e commerce website that offers a wide range of products and services to customers worldwide. Our mission is to provide our customers with a seamless and enjoyable shopping experience from the comfort of their homes.</p>

          <p>At E-Wish, we strive to offer the best possible prices for high-quality products and services. We believe in providing our customers with the best value for their money, which is why we constantly work to keep our prices competitive.</p>

          <p>We are committed to providing exceptional customer service and support to all our customers. Our friendly and knowledgeable team is available 24/7 to assist you with any questions or concerns you may have.</p>

            {/* <p>We are constantly adding new products and services to our website to ensure that our customers have access to the latest trends and innovations. We also offer fast and reliable shipping options to ensure that your orders arrive on time.</p> */}

          <p>Thank you for choosing E-Wish as your preferred ecommerce website. We look forward to serving you and providing you with the best possible shopping experience.</p>
          </p>
        </div>
      </div>
    </Layout>
  );
};


export default About;
