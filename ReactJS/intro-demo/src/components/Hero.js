function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="row">

          <div className="col-12">
            <div id="myCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src="images/slider/portrait-successful-mid-adult-doctor-with-crossed-arms.jpg" className="img-fluid" alt="" />
                </div>

                <div className="carousel-item">
                  <img src="images/slider/young-asian-female-dentist-white-coat-posing-clinic-equipment.jpg" className="img-fluid" alt="" />
                </div>

                <div className="carousel-item">
                  <img src="images/slider/doctor-s-hand-holding-stethoscope-closeup.jpg" className="img-fluid" alt="" />
                </div>
              </div>
            </div>

            <div className="heroText d-flex flex-column justify-content-center">

              <h1 className="mt-auto mb-2">
                Better
                <div className="animated-info">
                  <span className="animated-item">health</span>
                  <span className="animated-item">days</span>
                  <span className="animated-item">lives</span>
                </div>
              </h1>

              <p className="mb-4">Medic Care is a Bootstrap 5 Template provided by TemplateMo website. Credits go to FreePik and RawPixel for images used in this template.</p>

              <div className="heroLinks d-flex flex-wrap align-items-center">
                <a className="custom-link me-4" href="#about" data-hover="Learn More">Learn More</a>

                <p className="contact-phone mb-0"><i className="bi-phone"></i> 010-020-0340</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;