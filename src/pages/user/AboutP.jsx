import img1 from "../../assets/images/about1.png";
import img2 from "../../assets/images/about2.png";
const AboutP = () => {
  return (
    <section id="about">
      <div className="container">
        <div className="row-about">
          <div className="left">
            <span>Our mision</span>
            <h2>
              Creating valuable content for creatives all around the world
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
              blandit massa enim nec. Scelerisque viverra mauris in aliquam sem.
              At risus viverra adipiscing at in tellus.
            </p>
          </div>
          <div className="right">
            <span>Our mision</span>
            <h2>
              Creating valuable content for creatives all around the world
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
              blandit massa enim nec. Scelerisque viverra mauris in aliquam sem.
              At risus viverra adipiscing at in tellus.
            </p>
          </div>
        </div>
        <div className="about-row-img-left">
          <div className="left">
            <span>Our mision</span>
            <h2>
              Creating valuable content for creatives all around the world
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat.
            </p>
          </div>

          <div className="right">
            <img src={img1} alt="logo" />
          </div>

          <div className="right">
            <img src={img2} alt="logo" />
          </div>

          <div className="left">
            <span>Our mision</span>
            <h2>
              Creating valuable content for creatives all around the world
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutP;
