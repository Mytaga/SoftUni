function Gallery (){
    return(
        <section className="gallery">
        <div className="container">
          <div className="row">

            <div className="col-lg-6 col-6 ps-0">
              <img src="images/gallery/medium-shot-man-getting-vaccine.jpg" className="img-fluid galleryImage" alt="get a vaccine" title="get a vaccine for yourself"/>
            </div>

            <div className="col-lg-6 col-6 pe-0">
              <img src="images/gallery/female-doctor-with-presenting-hand-gesture.jpg" className="img-fluid galleryImage" alt="wear a mask" title="wear a mask to protect yourself"/>
            </div>

          </div>
        </div>
      </section>
    );
}

export default Gallery;