import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus "  style={{ minHeight: "210vh" }}>
      <h5 className="text-center mb-1 mt-3">At E-Wish, we take your privacy and the security of your personal information very seriously.<tr /> We are committed to protecting your personal information and ensuring that it is used only in accordance with this privacy policy.</h5>
        <div className="col-md-6 ">
          <img className="mb-1" src="/images/pv3.jpg" alt="Privacy matters" style={{ width: "100%" }}/>
          <img src="/images/pv2.jpg" alt="Privacy matters" style={{ width: "100%" }}/>
        </div>
        <div className="mb-1 mt-3">
          {/* <h5 className="mb-5 mt-3">At E-Wish, we take your privacy and the security of your personal information very seriously. We are committed to protecting your personal information and ensuring that it is used only in accordance with this privacy policy.</h5> */}
          <h5>Information Collection:</h5>
          <p>We collect personal information such as name, email address, shipping address, and payment details when you make a purchase on our website. We also collect non-personal information such as IP address, browser type, and device type for analytical purposes.</p>
          <h5>Information Usage:</h5>
          <p>We use your personal information to process your orders, to communicate with you regarding your orders, to provide customer service and support, and to improve our website and services. We do not sell, rent, or share your personal information with any third parties for marketing purposes.</p>
          <h5>Information Protection:</h5>
          <p>We take appropriate security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. We use SSL encryption to ensure the security of all data transmitted through our website.</p>
          <h5>Cookies:</h5>
          <p>We use cookies and other tracking technologies to improve your experience on our website and to provide personalized content and advertisements. You can choose to disable cookies in your browser settings if you prefer.</p>
          <h5>Changes to Privacy Policy:</h5>
          <p>We reserve the right to make changes to this privacy policy at any time. We will notify you of any significant changes to the policy through email or a notice on our website.y</p>
        </div>
      </div>
      <h6 className="text-center" style={{color: "blue"}}>Thank you for trusting us with your personal information. If you have any questions or concerns regarding our privacy policy, please do not hesitate to contact us.</h6>
    </Layout>
  );
};


export default Policy;
