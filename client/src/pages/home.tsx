import React from 'react';
import { Container } from "react-bootstrap";
import img1 from '../img/hm1.png';
import img2 from '../img/hm2.png';
import img3 from '../img/hm3.png';
import img from '../img/11.png';

export const Home = () => {
  return (
    <div style={{
      minHeight: "100vh", 
      backgroundImage: `url(${img})`,
      backgroundSize: 'cover',
    }}>
      <>
        <br />
        <br />
        <div className="container">
          <div className="text-center mt-2">
          <h1 style={{
            padding: '20px',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '50px',
            color: 'white',
            fontWeight: 'bold',
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.4)',
            letterSpacing: '2px',
          }}>
            Mental Health Assistant
          </h1>
        </div>

          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <img src={img1} className="card-img-top" style={{ height: '300px' }} alt="Understanding Mental Health Image" />
                <div className="card-body">
                  <h5 className="card-title">Understanding Mental Health</h5>
                  <p className="card-text">Learn about different mental health conditions and how they can affect individuals.</p>
                  <a href="https://www.verywellmind.com/what-is-mental-health-2330755" className="btn btn-primary">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <img src={img2} className="card-img-top" style={{ height: '300px' }} alt="Find Support Groups Image" />
                <div className="card-body">
                  <h5 className="card-title">Find Support Groups</h5>
                  <p className="card-text">Connect with others who may be experiencing similar challenges. Support is crucial.</p>
                  <a href="https://themindclan.com/sharing_spaces/" className="btn btn-primary">Explore Groups</a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <img src={img3} className="card-img-top" style={{ height: '300px' }} alt="Professional Help Image" />
                <div className="card-body">
                  <h5 className="card-title">Professional Help</h5>
                  <p className="card-text">Seek help from mental health professionals. Find therapists and counselors near you.</p>
                  <a href="https://www.betterhelp.com/" className="btn btn-primary">Find a Professional</a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </>
    </div>
  );
};
