import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="page contact-page">
      <section className="intro-section">
        <h1>Contact Us</h1>
        <p>
          Have questions or want to book a personalized reading? Reach out to us
          and we will get back to you as soon as possible.
        </p>
      </section>

      <section className="contact-form-section">
        {submitted ? (
          <div className="success-message">
            <h2>Thank You!</h2>
            <p>
              Your message has been sent. We will get back to you within 24–48
              hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <select id="subject">
                <option value="">Select a topic</option>
                <option value="astrology">Astrology Reading</option>
                <option value="numerology">Numerology Reading</option>
                <option value="general">General Inquiry</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="5" required></textarea>
            </div>
            <button type="submit" className="btn">Send Message</button>
          </form>
        )}
      </section>
    </div>
  );
}
