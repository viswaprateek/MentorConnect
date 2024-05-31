import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content text-md-left text-center">
          <h2>Hello Welcome to</h2>
          <h1>VNR MTP</h1>
          <p>This is Mentor Connect's Landing Page</p>
          <i><b>This website can be used by both Mentors and Mentees.</b></i>
          <div className='my-2'>
            <button className="btn btn-outline-dark py-2">View More Detail</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
