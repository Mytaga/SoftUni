function Booking (){
    return(
        <section className="section-padding" id="booking">
        <div className="container">
          <div className="row">

            <div className="col-lg-8 col-12 mx-auto">
              <div className="booking-form">

                <h2 className="text-center mb-lg-3 mb-2">Book an appointment</h2>

                <form role="form" action="#booking" method="post">
                  <div className="row">
                    <div className="col-lg-6 col-12">
                      <input type="text" name="name" id="name" className="form-control" placeholder="Full name" required />
                    </div>

                    <div className="col-lg-6 col-12">
                      <input type="email" name="email" id="email" pattern="[^ @]*@[^ @]*" className="form-control" placeholder="Email address" required />
                    </div>

                    <div className="col-lg-6 col-12">
                      <input type="telephone" name="phone" id="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" className="form-control" placeholder="Phone: 123-456-7890" />
                    </div>

                    <div className="col-lg-6 col-12">
                      <input type="date" name="date" id="date" value="" className="form-control" />

                    </div>

                    <div className="col-12">
                      <textarea className="form-control" rows="5" id="message" name="message" placeholder="Additional Message"></textarea>
                    </div>

                    <div className="col-lg-3 col-md-4 col-6 mx-auto">
                      <button type="submit" className="form-control" id="submit-button">Book Now</button>
                    </div>
                  </div>
                </form>

              </div>
            </div>

          </div>
        </div>
      </section>
    );
}

export default Booking;