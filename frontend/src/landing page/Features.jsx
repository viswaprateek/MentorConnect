import React from 'react';
import './Features.css';

const Features = () => {
  return (
    <section className="features">
      <div className="container">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature">
            <i className="icon-education"></i>
            <h4>Attendence Tracking</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="feature">
            <i className="icon-value"></i>
            <h4>Schedule Meetings</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="feature">
            <i className="icon-environment"></i>
            <h4>Request Letter Approval</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="feature">
            <i className="icon-certification"></i>
            <h4>Student Biodata</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="feature">
            <i className="icon-teachers"></i>
            <h4>Student Academic performance</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="feature">
            <i className="icon-support"></i>
            <h4>Student Non-Academic performance</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
