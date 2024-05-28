import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content " >
          <h2>Hello Welcome to</h2>
          <h1>VNR MTP</h1>
          <p>This is Mentor Connect's Landing Page </p>
          <i><b>This website can be used by both Mentors and Mentees.</b></i>
          <button className='my-5'>View More Detail</button>
        </div>
        
        {/* <div className="hero-form">
        </div> */}
        </div>
    
    </section>
  );
};

export default HeroSection;
