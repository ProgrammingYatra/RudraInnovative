import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      <header className="text-center mt-5">
        <h1>Welcome to My Website</h1>
        <p className="lead">Discover the amazing world of React and Bootstrap.</p>
      </header>

      <section className="features mt-5">
        <div className="row">
          <div className="col-lg-4">
            <div className="feature-item text-center">
              <i className="fas fa-cogs fa-3x mb-4"></i>
              <h3>Feature 1</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nullam semper consequat nisl, ut eleifend tortor tristique in.
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="feature-item text-center">
              <i className="fas fa-chart-line fa-3x mb-4"></i>
              <h3>Feature 2</h3>
              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="feature-item text-center">
              <i className="fas fa-rocket fa-3x mb-4"></i>
              <h3>Feature 3</h3>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta mt-5">
        <div className="row">
          <div className="col-lg-8 mx-auto text-center">
            <h2>Call to Action</h2>
            <p className="lead">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium.
            </p>
            <Link to="/about" className="btn btn-primary btn-lg">About us</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;