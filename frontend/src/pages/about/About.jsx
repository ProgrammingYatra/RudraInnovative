import React from 'react';

const About = () => {
  return (
    <div className="container">
      <h1 className="mt-4 mb-3">About Us</h1>
      <div className="row">
        <div className="col-lg-6">
          <img
            src="Rupam.jpg"
            alt="About Us"
            className="img-fluid rounded"
          />
        </div>
        <div className="col-lg-6">
          <h2>Our Story</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a
            ligula eget nisl placerat accumsan. Sed tincidunt, nisl nec
            ultricies varius, sem tortor eleifend justo, id consequat felis
            ex ac erat. Fusce viverra nibh at velit placerat, vel rhoncus
            massa consectetur. Aliquam fringilla orci sed elit commodo, in
            pharetra dui sagittis.
          </p>
          <p>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia Curae; Sed congue, sapien nec pulvinar elementum,
            erat mi mattis leo, eu accumsan turpis mauris eget neque. Sed
            consequat tellus id lectus lacinia, in rhoncus lacus consequat.
            Suspendisse potenti.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;