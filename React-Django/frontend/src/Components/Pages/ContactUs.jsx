import React, { useState } from "react";
import {
  FaFacebook,
  FaWhatsapp,
  FaTiktok,
  FaPhone,
  FaEnvelope,
  FaLink,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";
import { Button } from "../Utilities/Button";
import { InputField } from "../Utilities/InputField";
export const ContactUs = () => {
  const [usrEmail, setUsrEmail] = useState("");
  const [usrComment, setUsrComment] = useState("");
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    alert("cleickse");
  };

  return (
    <div className="contact-section">
      <div className="contact-form-text">
        <div className="contact-text">
          <span>Get in touch</span>
          <h3>
            We would like
            <br /> to hear from you
          </h3>
          <p>
            We’re here to help! Whether you have questions about our services,
            need support, or want to learn more about joining our network, feel
            free to reach out through any of the options below.
          </p>
        </div>
        <div className="contact-form">
          <h4>Leave a comment</h4>
          <form onSubmit={handleOnSubmit}>
            <InputField
              label="Enter email address"
              type="email"
              onChange={(e) => setUsrEmail(e.target.value)}
            />
            <textarea
              onChange={(e) => setUsrComment(e.target.value)}
            ></textarea>
            <Button type="submit" title="Submit" />
          </form>
        </div>
      </div>
      <div className="contact-links">
        <div className="contact-box">
          <div className="icon">
            <FaWhatsapp />
          </div>
          <div className="text">
            <h5>Chat our support</h5>
            <p>We are here to help</p>
          </div>
          <a href="#">Chat on Whatsapp</a>
        </div>

        <div className="contact-box">
          <div className="icon">
            <FaEnvelope />
          </div>
          <div className="text">
            <h5>Send us mail</h5>
            <p>Speak to us via email</p>
          </div>
          <a href="#">gradepoint.email</a>
        </div>

        <div className="contact-box">
          <div className="icon">
            <FaPhone />
          </div>
          <div className="text">
            <h5>Call us</h5>
            <p>Mon - fri from 8am - 5pm</p>
          </div>
          <a href="#">+234 814 747 6103</a>
        </div>

        <div className="contact-box">
          <div className="icon">
            <FaLink />
          </div>
          <div className="text">
            <h5>Social media</h5>
            <p>Connect with us</p>
          </div>
          <div className="social-links">
            <a href="#">
              <FaFacebook />
            </a>
            <a href="#">
              <FaTiktok />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
