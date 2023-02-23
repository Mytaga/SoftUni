import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Timeline from './components/Timeline';

function App() {
  return (
    <div>
      <Navigation />
      <Hero />
      <About />
      <Gallery />
      <Timeline />

      <section class="section-padding pb-0" id="reviews">
        <div class="container">
          <div class="row">

            <div class="col-12">
              <h2 class="text-center mb-lg-5 mb-4">Our Patients</h2>

              <div class="owl-carousel reviews-carousel">

                <figure class="reviews-thumb d-flex flex-wrap align-items-center rounded">
                  <div class="reviews-stars">
                    <i class="bi-star-fill"></i>
                    <i class="bi-star-fill"></i>
                    <i class="bi-star-fill"></i>
                    <i class="bi-star-fill"></i>
                    <i class="bi-star"></i>
                  </div>

                  <p class="text-primary d-block mt-2 mb-0 w-100"><strong>Best Health Care</strong></p>

                  <p class="reviews-text w-100">Phasellus ligula ante, tempus ac imperdiet ut, mattis ac nibh. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>

                  <img src="images/reviews/beautiful-woman-face-portrait-brown-background.jpeg" class="img-fluid reviews-image" alt="" />

                  <figcaption class="ms-4">
                    <strong>Marie</strong>

                    <span class="text-muted">Patient</span>
                  </figcaption>
                </figure>

                <figure class="reviews-thumb d-flex flex-wrap align-items-center rounded">
                  <div class="reviews-stars">
                    <i class="bi-star-fill"></i>
                    <i class="bi-star-fill"></i>
                    <i class="bi-star-fill"></i>
                    <i class="bi-star-fill"></i>
                    <i class="bi-star"></i>
                  </div>

                  <p class="text-primary d-block mt-2 mb-0 w-100"><strong>Doctor cares everyone!</strong></p>

                  <p class="reviews-text w-100">Donec in elementum orci, nec posuere ligula. Quisque vulputate diam et ullamcorper ullamcorper. Pellentesque vestibulum neque at leo fermentum mattis.</p>

                  <img src="images/reviews/senior-man-wearing-white-face-mask-covid-19-campaign-with-design-space.jpeg" class="img-fluid reviews-image" alt="" />

                  <figcaption class="ms-4">
                    <strong>Ben Walker</strong>

                    <span class="text-muted">Recovered</span>
                  </figcaption>
                </figure>

                <figure class="reviews-thumb d-flex flex-wrap align-items-center rounded">
                  <div class="reviews-stars">
                    <i class="bi-star-fill"></i>
                    <i class="bi-star-fill"></i>
                    <i class="bi-star-fill"></i>
                    <i class="bi-star-fill"></i>
                    <i class="bi-star-fill"></i>
                  </div>

                  <p class="text-primary d-block mt-2 mb-0 w-100"><strong>Great services!</strong></p>

                  <p class="reviews-text w-100">Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec sit amet velit vitae purus aliquam efficitur.</p>

                  <img src="images/reviews/portrait-british-woman.jpeg" class="img-fluid reviews-image" alt="" />

                  <figcaption class="ms-4">
                    <strong>Laura Zono</strong>

                    <span class="text-muted">New Patient</span>
                  </figcaption>
                </figure>

                <figure class="reviews-thumb d-flex flex-wrap align-items-center rounded">
                  <div class="reviews-stars">
                    <i class="bi-star-fill"></i>
                    <i class="bi-star-fill"></i>
                    <i class="bi-star-fill"></i>
                    <i class="bi-star"></i>
                    <i class="bi-star"></i>
                  </div>

                  <p class="text-primary d-block mt-2 mb-0 w-100"><strong>Best Advices</strong></p>

                  <p class="reviews-text w-100">Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Maecenas faucibus mollis interdum. Donec ullamcorper nulla non metus auctor fringilla.</p>

                  <img src="images/reviews/woman-wearing-mask-face-closeup-covid-19-green-background.jpeg" class="img-fluid reviews-image" alt="" />

                  <figcaption class="ms-4">
                    <strong>Rosey</strong>

                    <span class="text-muted">Almost Recovered</span>
                  </figcaption>
                </figure>

              </div>
            </div>

          </div>
        </div>
      </section>

      <section class="section-padding" id="booking">
        <div class="container">
          <div class="row">

            <div class="col-lg-8 col-12 mx-auto">
              <div class="booking-form">

                <h2 class="text-center mb-lg-3 mb-2">Book an appointment</h2>

                <form role="form" action="#booking" method="post">
                  <div class="row">
                    <div class="col-lg-6 col-12">
                      <input type="text" name="name" id="name" class="form-control" placeholder="Full name" required />
                    </div>

                    <div class="col-lg-6 col-12">
                      <input type="email" name="email" id="email" pattern="[^ @]*@[^ @]*" class="form-control" placeholder="Email address" required />
                    </div>

                    <div class="col-lg-6 col-12">
                      <input type="telephone" name="phone" id="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" class="form-control" placeholder="Phone: 123-456-7890" />
                    </div>

                    <div class="col-lg-6 col-12">
                      <input type="date" name="date" id="date" value="" class="form-control" />

                    </div>

                    <div class="col-12">
                      <textarea class="form-control" rows="5" id="message" name="message" placeholder="Additional Message"></textarea>
                    </div>

                    <div class="col-lg-3 col-md-4 col-6 mx-auto">
                      <button type="submit" class="form-control" id="submit-button">Book Now</button>
                    </div>
                  </div>
                </form>

              </div>
            </div>

          </div>
        </div>
      </section>
      <footer class="site-footer section-padding" id="contact">
        <div class="container">
          <div class="row">

            <div class="col-lg-5 me-auto col-12">
              <h5 class="mb-lg-4 mb-3">Opening Hours</h5>

              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex">
                  Sunday : Closed
                </li>

                <li class="list-group-item d-flex">
                  Monday, Tuesday - Firday
                  <span>8:00 AM - 3:30 PM</span>
                </li>

                <li class="list-group-item d-flex">
                  Saturday
                  <span>10:30 AM - 5:30 PM</span>
                </li>
              </ul>
            </div>

            <div class="col-lg-2 col-md-6 col-12 my-4 my-lg-0">
              <h5 class="mb-lg-4 mb-3">Our Clinic</h5>

              <p><a href="mailto:hello@company.co">hello@company.co</a></p>

              <p>123 Digital Art Street, San Diego, CA 92123</p>
            </div>

            <div class="col-lg-3 col-md-6 col-12 ms-auto">
              <h5 class="mb-lg-4 mb-3">Socials</h5>

              <ul class="social-icon">
                <li><a href="#" class="social-icon-link bi-facebook"></a></li>

                <li><a href="#" class="social-icon-link bi-twitter"></a></li>

                <li><a href="#" class="social-icon-link bi-instagram"></a></li>

                <li><a href="#" class="social-icon-link bi-youtube"></a></li>
              </ul>
            </div>

            <div class="col-lg-3 col-12 ms-auto mt-4 mt-lg-0">
              <p class="copyright-text">Copyright © Medic Care 2021
                <br />Design: <a href="https://templatemo.com" target="_parent">TemplateMo</a></p>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
