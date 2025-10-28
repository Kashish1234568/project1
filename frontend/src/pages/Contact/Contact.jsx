// frontend/src/pages/Contact.jsx
import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact <span>QR Dine</span></h1>
      <p className="contact-tagline">We'd love to hear from you!</p>

      <div className="contact-info">
        <h3>📩 Get in Touch</h3>
        <p>Email: <a href="mailto:support@qrdine.com">Restaurantteamsupport@gmail.com</a></p>
        <p>Phone: +91 98765 43210</p>
        <p>Location: Udaipur, Rajasthan, India</p>
      </div>

      <div className="support-hours">
        <h3>🕒 Support Hours</h3>
        <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
        <p>Sunday: Closed</p>
      </div>

      <div className="team-section">
        <h3>👨‍💻 Our Team</h3>
        <div className="team-grid">
          <div className="team-card">
            <h4>Kashish Soni</h4>
            <p>📞 8955090665</p>
          </div>
          <div className="team-card">
            <h4>Charu Mali</h4>
            <p>📞 9352944264</p>
          </div>
          <div className="team-card">
            <h4>Vinayak Maheshwari</h4>
            <p>📞 8209437099</p>
          </div>
          <div className="team-card">
            <h4>Jay Sharma</h4>
            <p>📞 9424447265</p>
          </div>
        </div>
      </div>

      <div className="contact-footer">
        <p>📬 You can also message us anytime — We’ll reply within 24 hours!</p>
      </div>
    </div>
  );
};

export default Contact;
