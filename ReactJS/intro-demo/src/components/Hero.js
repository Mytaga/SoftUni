function Hero(){
    return(
        <section class="hero" id="hero">
        <div class="container">
          <div class="row">

            <div class="col-12">
              <div id="myCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel">
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img src="images/slider/portrait-successful-mid-adult-doctor-with-crossed-arms.jpg" class="img-fluid" alt=""/>
                  </div>

                  <div class="carousel-item">
                    <img src="images/slider/young-asian-female-dentist-white-coat-posing-clinic-equipment.jpg" class="img-fluid" alt=""/>
                  </div>

                  <div class="carousel-item">
                    <img src="images/slider/doctor-s-hand-holding-stethoscope-closeup.jpg" class="img-fluid" alt=""/>
                  </div>
                </div>
              </div>

              <div class="heroText d-flex flex-column justify-content-center">

                <h1 class="mt-auto mb-2">
                  Better
                  <div class="animated-info">
                    <span class="animated-item">health</span>
                    <span class="animated-item">days</span>
                    <span class="animated-item">lives</span>
                  </div>
                </h1>

                <p class="mb-4">Medic Care is a Bootstrap 5 Template provided by TemplateMo website. Credits go to FreePik and RawPixel for images used in this template.</p>

                <div class="heroLinks d-flex flex-wrap align-items-center">
                  <a class="custom-link me-4" href="#about" data-hover="Learn More">Learn More</a>

                  <p class="contact-phone mb-0"><i class="bi-phone"></i> 010-020-0340</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    );
}

export default Hero;