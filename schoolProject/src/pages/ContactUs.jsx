import React, { useState } from "react";
import "../styles/ContactUs.scss";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to a server
    console.log("Form submitted:", formData);
    setSubmitStatus("Thank you for your message! We will get back to you soon.");

    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-us-container">
      <h1>Contact Us</h1>
      <p>Have questions about Joyland School? We'd love to hear from you!</p>

      {submitStatus && <div className="success-message">{submitStatus}</div>}

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone (optional):</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
          ></textarea>
        </div>

        <button type="submit" className="submit-button">
          Send Message
        </button>
      </form>

      <div className="contact-info">
        <h2>Other Ways to Contact Us</h2>
        <p>
          <strong>POSTALL ADDRESS: </strong> P.O BOX 86713-80100 MOMBASA, KENYA
        </p>
        <p>
          <strong>Call/WhatsApp:</strong> +254723024301
        </p>
        <p>
          <strong>Email:</strong> info@joylandschools.com
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
