import React from "react";
import { FaFacebook, FaWhatsapp, FaTiktok, FaPhone } from "react-icons/fa6";
import Button from "../Utilities/Button";
export const ContactUs = () => {
  return (
    <div className="contact-section">
      <div className="social-links">
        <div className="heading">Follow us</div>
        <div className="social-media">
          <FaFacebook /> <FaTiktok /> <FaWhatsapp /> <FaPhone />
        </div>
      </div>

      <div className="contact-form">
        <form onSubmit={handleOnSubmit}>
          <Button type="submit" title="submit" />
        </form>
      </div>
    </div>
  );
};
