import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './styles/info.css';

const InfoPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const teamMembers = [
    {
      name: "Bhagya Priya Murmu",
      role: "Web Developer",
      bio: "Aspiring web developer",
      image: "/images/Bhagya.png"
    },
    {
      name: "Hrishita Kishore",
      role: "Web Developer",
      bio: "Aspiring web developer",
      image: "/images/Hrishita.png"
    },
    {
      name: "Anisha Maan",
      role: "Web Developer",
      bio: "Aspiring web developer",
      image: "/images/Anisha.png"
    }
  ];

  return (
    <div className="info-container">
      {/* Privacy Policy Section */}
      <section id="privacy" className="privacy-section">
  <h2>Privacy Policy</h2>
  <div className="privacy-content">
    <p>Last Updated: {new Date().getFullYear()}</p>
    
    <h3>1. Information We Collect</h3>
    <ul>
      <li><strong>Personal Data:</strong> When you create an account, we collect your name, email address, and preferences to personalize your news experience and maintain your user profile.</li>
      <li><strong>Reading History:</strong> We track articles you read, time spent, and interactions to improve recommendations and suggest relevant content tailored to your interests.</li>
      
     
      <li><strong>Cookies Data:</strong> We utilize cookies and similar tracking technologies to enhance user experience and gather analytics about website usage patterns.</li>
    </ul>

    <h3>2. How We Use Your Information</h3>
    <ul>
      <li>To improve our services by analyzing usage patterns and developing new features that enhance user experience.</li>
      
      <li>To send newsletters, service updates, and important notifications, with clear opt-out options available for all communications.</li>
     
    </ul>

    <h3>3. Data Protection Measures</h3>
    <ul>
      <li>Implementation of SSL encryption for all data transmissions to ensure secure communication between users and our servers.</li>
      
      <li>Strict access controls and permission systems that limit employee access to personal data on a need-to-know basis.</li>
      
      
    </ul>

    <h3>4. Third-Party Data Sharing</h3>
    <ul>
      <li>Sharing anonymized analytics data with trusted third-party providers to help us understand readership patterns and improve our services.</li>
      <li>Collaboration with advertising partners for delivering relevant advertisements while maintaining strict controls on data usage.</li>
      
     
      
    </ul>

    <h3>5. Your Privacy Rights</h3>
    <ul>
      <li>The right to access and download your personal data in a commonly used, machine-readable format upon request.</li>
      <li>The right to request correction of inaccurate or incomplete personal information in our records.</li>
      <li>The right to request deletion of your account and associated personal data, subject to certain legal exceptions.</li>
      
     
    </ul>

    <p>For any privacy-related inquiries or to exercise your rights, please contact our Data Protection Officer at <a href="mailto:privacy@yournews.com">privacy@yournews.com</a>.</p>
  </div>
</section>

      {/* Terms of Service Section */}
      <section id="terms" className="terms-section">
  <h2>Terms of Service</h2>
  <div className="terms-content">
    <p className="effective-date">Effective Date: {new Date().toLocaleDateString()}</p>
    
    <h3>1. Acceptance & User Obligations</h3>
    <p>By accessing YourNews ("the Service"), you agree to these Terms and our Privacy Policy. As a user, you must:</p>
    <ul>
      <li>Provide accurate registration information and maintain account security</li>
      <li>Refrain from impersonation, scraping, or unauthorized data collection</li>
      
      
      
    </ul>

    <h3>2. Content Usage & Restrictions</h3>
    <p>All content is protected under copyright law. You may:</p>
    <ul>
      <li>Access and share articles for personal, non-commercial use with proper attribution</li>
      <li>Read content through authorized platforms without bypassing access controls</li>
      
      
     
    </ul>

    <h3>3. Service Management</h3>
    <p>We reserve the right to:</p>
    <ul>
      <li>Modify or discontinue service features at our discretion</li>
      <li>Remove content or terminate accounts for policy violations</li>
      
      
     
    </ul>

    <h3>4. Limitations & Disclaimers</h3>
    <ul>
      <li>Content is provided "as is" without warranties of accuracy or completeness</li>
      <li>Opinions expressed belong solely to their respective authors</li>
      
      
      
    </ul>

    <h3>5. Legal Provisions</h3>
    <ul>
      <li>These Terms shall be governed by the laws of [Your Country/State]</li>
      <li>Disputes will be resolved in the courts of [Jurisdiction]</li>
      <li>Unauthorized use may result in civil or criminal liability</li>
      
    </ul>

    <p className="contact">For questions regarding these Terms, contact <a href="mailto:legal@yournews.com">legal@yournews.com</a>.</p>
  </div>
</section>

      {/* About Us Section */}
      <section id="about" className="info-section">
        <h2>About Our Team</h2>
        <div className="info-content">
          <p>We are a dedicated team of three professionals committed to delivering quality content.</p>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <img src={member.image} alt={member.name} className="team-photo" />
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="info-section">
        <h2>Contact Us</h2>
        <div className="info-content">
          <p>We'd love to hear from you! Here's how you can reach us:</p>
          <div className="contact-info">
            <p><strong>Email:</strong> contact@yournews.com</p>
            <p><strong>Phone:</strong> +91-9876567891</p>
            <p><strong>Address:</strong> IIIT Guwahati , Assam</p>
          </div>
          <div className="team-contacts">
            <h3>Direct Team Contacts</h3>
            <div className="contact-grid">
              {teamMembers.map((member, index) => (
                <div key={index} className="contact-card">
                  <h4>{member.name}</h4>
                  <p>{member.role}</p>
                  <p><strong>Email:</strong> {member.email || `${member.name.split(' ')[0].toLowerCase()}@yournews.com`}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfoPage;