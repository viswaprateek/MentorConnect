import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-3 mt-auto">
      <div className="container">
        <div className="row text-center">
          <div className="col-md-4 mb-3">
            <h6 className="my-2">MentorConnect.vnrvjiet</h6>
          </div>
          <div className="col-md-4 mb-3">
            <p className="my-2">
              Connect with us: 
              <a href="#" className="text-white mx-1">LinkedIn</a> | 
              <a href="#" className="text-white mx-1">Twitter</a>
            </p>
          </div>
          <div className="col-md-4 mb-3">
            {/* Additional Links or Info */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
