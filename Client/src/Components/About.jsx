import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-gray-100 py-8 px-4 md:px-8 mt-16">
      {/* About Us Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">
          About BikeCare Hub
        </h2>
        <p className="text-lg text-gray-700">
          BikeCare Hub is your one-stop solution for all bike servicing needs. We connect bike owners with the best service stations in town, ensuring top-quality care for your vehicle. Our platform allows users to easily book services, track their bike’s service status, and get expert advice on maintenance.
        </p>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 bg-gray-200 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg mb-8">
            Our mission is to revolutionize the bike service industry by providing a seamless, trustworthy, and customer-centric platform that caters to all your bike care needs.
          </p>
          <div className="flex justify-center gap-4">
            <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Services Completed</h3>
              <p className="text-lg">5000+</p>
            </div>
            <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Service Stations</h3>
              <p className="text-lg">100+</p>
            </div>
            <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Satisfied Customers</h3>
              <p className="text-lg">3000+</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          <p className="text-lg mb-8">
            At BikeCare Hub, we stand by our core values of quality service, customer satisfaction, and innovation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Quality Service</h3>
              <p>We ensure that every bike receives top-notch care, using the best tools and practices in the industry.</p>
            </div>
            <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Customer Satisfaction</h3>
              <p>Our users are at the heart of everything we do. We aim to exceed expectations with every service.</p>
            </div>
            <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p>We constantly innovate to bring you the latest in bike servicing technology and practices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="w-full md:w-1/4 bg-gray-100 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
              <img className="w-32 h-32 object-cover rounded-full mx-auto mb-4" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80" alt="John Doe" />
              <h3 className="text-xl font-semibold mb-2">John Doe</h3>
              <p className="text-lg">CEO</p>
              <p className="text-gray-600">John is the visionary behind BikeCare Hub, with over 20 years of experience in the bike service industry.</p>
            </div>
            <div className="w-full md:w-1/4 bg-gray-100 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
              <img className="w-32 h-32 object-cover rounded-full mx-auto mb-4" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80" alt="Jane Smith" />
              <h3 className="text-xl font-semibold mb-2">Jane Smith</h3>
              <p className="text-lg">CTO</p>
              <p className="text-gray-600">Jane leads our technology strategy, ensuring that BikeCare Hub stays ahead with the latest innovations.</p>
            </div>
            <div className="w-full md:w-1/4 bg-gray-100 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
              <img className="w-32 h-32 object-cover rounded-full mx-auto mb-4" src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80" alt="Alex Johnson" />
              <h3 className="text-xl font-semibold mb-2">Alex Johnson</h3>
              <p className="text-lg">COO</p>
              <p className="text-gray-600">Alex ensures the smooth operation of our platform, focusing on operational excellence and customer satisfaction.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-gray-200 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Trusted By</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <img className="w-32 h-auto object-contain" src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg" alt="Trusted by Company 1" />
            <img className="w-32 h-auto object-contain" src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg" alt="Trusted by Company 2" />
            <img className="w-32 h-auto object-contain" src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg" alt="Trusted by Company 3" />
            <img className="w-32 h-auto object-contain" src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg" alt="Trusted by Company 4" />
          </div>
        </div>
      </section>

      {/* From the Blog Section */}
      {/* From the Blog Section */}
<section className="mb-12 pt-12 text-center">  {/* Adjusted the minimum height */}
  <h2 className="text-3xl font-bold mb-4 text-gray-800">From the Blog</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {/* Blog Post 1 */}
    <div className="bg-white p-6 rounded-lg shadow-md h-full transform transition-transform duration-300 hover:scale-105">  
      <img src="https://images.unsplash.com/photo-1602845713136-4407964169a4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8TWVjaGFuaWMlMjB3b3JraW5nJTIwb24lMjBhJTIwYmlrZXxlbnwwfHwwfHx8MA%3D%3D" alt="Blog Post 1" className="w-full h-72 object-cover mb-4 rounded-md" />
      <h3 className="text-xl font-semibold mb-2">Maintaining Your Bike</h3>
      <p className="text-gray-600">Learn the best practices for keeping your bike in top condition.</p>
    </div>

    {/* Blog Post 2 */}
    <div className="bg-white p-6 rounded-lg shadow-md h-fulltransform transition-transform duration-300 hover:scale-105 "> 
      <img src="https://content.jdmagicbox.com/v2/comp/bangalore/f4/080pxx80.xx80.200208131308.l2f4/catalogue/sri-sairam-service-centre-nagarbhavi-bangalore-motorcycle-repair-and-services-honda-mm56r6zxyd.jpg" alt="Blog Post 1" className="w-full h-72 object-cover mb-4 rounded-md" />
      <h3 className="text-xl font-semibold mb-2">Choosing the Right Service</h3>
      <p className="text-gray-600">A guide to selecting the right service for your bike's needs.</p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md h-full transform transition-transform duration-300 hover:scale-105"> 
      <img src="https://www.shutterstock.com/image-photo/biker-man-cleaning-motorcycle-polished-260nw-2136433651.jpg" alt="Blog Post 1" className="w-full h-72 object-cover mb-4 rounded-md" />
      <h3 className="text-xl font-semibold mb-2">Bike Care Tips</h3>
      <p className="text-gray-600">Essential tips for maintaining your bike’s performance and longevity.</p>
    </div>
  </div>
</section>

    </div>
  );
};

export default AboutPage;
