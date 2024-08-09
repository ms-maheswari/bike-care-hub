import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-gray-100 py-8 px-4 md:px-8 mt-16">
      {/* About Us Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">About Us</h2>
        <p className="text-lg text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vehicula, dui vel auctor posuere, odio libero bibendum nisi, eget malesuada libero odio sed ex. Vestibulum ac urna non felis consectetur cursus non id ante.
        </p>
      </section>
      <section className="py-16 bg-gray-200 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                    <p className="text-lg mb-8">Aliquet nec orci mattis amet quisque ullamcorper, et posuere risus ultricies.</p>
                    <div className="flex justify-center gap-4">
                        <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">Transaction</h3>
                            <p className="text-lg">1000+</p>
                        </div>
                        <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">Assets</h3>
                            <p className="text-lg">200+</p>
                        </div>
                        <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">New Users</h3>
                            <p className="text-lg">500+</p>
                        </div>
                    </div>
                </div>
            </section>

      {/* Our Values Section */}
      <section className="py-16 bg-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-4">Our Values</h2>
                    <p className="text-lg mb-8">We stand by our core values of integrity, innovation, and customer satisfaction.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">Integrity</h3>
                            <p>We adhere to the highest ethical standards and practice transparency in all our dealings.</p>
                        </div>
                        <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                            <p>We embrace new ideas and technologies to stay ahead in a rapidly changing world.</p>
                        </div>
                        <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">Customer Satisfaction</h3>
                            <p>We strive to exceed customer expectations through dedicated service and support.</p>
                        </div>
                        <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-2">Customer Satisfaction</h3>
                            <p>We strive to exceed customer expectations through dedicated service and support.</p>
                        </div>
                    </div>
                </div>
            </section>

      {/* Team Section */}
      <section className="py-16 bg-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
                    <div className="flex flex-wrap justify-center gap-6">
                        <div className="w-full md:w-1/4 bg-gray-100 p-6 rounded-lg shadow-lg">
                            <img className="w-32 h-32 object-cover rounded-full mx-auto mb-4" src="https://via.placeholder.com/150" alt="John Doe" />
                            <h3 className="text-xl font-semibold mb-2">John Doe</h3>
                            <p className="text-lg">CEO</p>
                            <p className="text-gray-600">John has over 20 years of experience in the tech industry and is passionate about innovation and leadership.</p>
                        </div>
                        <div className="w-full md:w-1/4 bg-gray-100 p-6 rounded-lg shadow-lg">
                            <img className="w-32 h-32 object-cover rounded-full mx-auto mb-4" src="https://via.placeholder.com/150" alt="Jane Smith" />
                            <h3 className="text-xl font-semibold mb-2">Jane Smith</h3>
                            <p className="text-lg">CTO</p>
                            <p className="text-gray-600">Jane leads our technology strategy with a focus on cutting-edge solutions and system optimization.</p>
                        </div>
                        <div className="w-full md:w-1/4 bg-gray-100 p-6 rounded-lg shadow-lg">
                            <img className="w-32 h-32 object-cover rounded-full mx-auto mb-4" src="https://via.placeholder.com/150" alt="Alex Johnson" />
                            <h3 className="text-xl font-semibold mb-2">Alex Johnson</h3>
                            <p className="text-lg">COO</p>
                            <p className="text-gray-600">Alex ensures the smooth operation of our daily activities and works to improve our operational efficiency.</p>
                        </div>
                        <div className="w-full md:w-1/4 bg-gray-100 p-6 rounded-lg shadow-lg">
                            <img className="w-32 h-32 object-cover rounded-full mx-auto mb-4" src="https://via.placeholder.com/150" alt="Emily Davis" />
                            <h3 className="text-xl font-semibold mb-2">Emily Davis</h3>
                            <p className="text-lg">CMO</p>
                            <p className="text-gray-600">Emily drives our marketing efforts with a keen eye on trends and customer engagement strategies.</p>
                        </div>
                        <div className="w-full md:w-1/4 bg-gray-100 p-6 rounded-lg shadow-lg">
                            <img className="w-32 h-32 object-cover rounded-full mx-auto mb-4" src="https://via.placeholder.com/150" alt="Emily Davis" />
                            <h3 className="text-xl font-semibold mb-2">Emily Davis</h3>
                            <p className="text-lg">CMO</p>
                            <p className="text-gray-600">Emily drives our marketing efforts with a keen eye on trends and customer engagement strategies.</p>
                        </div>
                        <div className="w-full md:w-1/4 bg-gray-100 p-6 rounded-lg shadow-lg">
                            <img className="w-32 h-32 object-cover rounded-full mx-auto mb-4" src="https://via.placeholder.com/150" alt="Emily Davis" />
                            <h3 className="text-xl font-semibold mb-2">Emily Davis</h3>
                            <p className="text-lg">CMO</p>
                            <p className="text-gray-600">Emily drives our marketing efforts with a keen eye on trends and customer engagement strategies.</p>
                        </div>
                    </div>
                </div>
            </section>
     {/* Trusted By Section */}
            <section className="py-16 bg-gray-200 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-4">Trusted By</h2>
                    <div className="flex flex-wrap justify-center gap-6">
                        <img className="w-32 h-auto object-contain" src="https://via.placeholder.com/200x100?text=Company+1" alt="Trusted by Company 1" />
                        <img className="w-32 h-auto object-contain" src="https://via.placeholder.com/200x100?text=Company+2" alt="Trusted by Company 2" />
                        <img className="w-32 h-auto object-contain" src="https://via.placeholder.com/200x100?text=Company+3" alt="Trusted by Company 3" />
                        <img className="w-32 h-auto object-contain" src="https://via.placeholder.com/200x100?text=Company+4" alt="Trusted by Company 4" />
                    </div>
                </div>
            </section>
      {/* From the Blog Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">From the Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Blog Post 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src="https://via.placeholder.com/400x200" alt="Blog Post 1" className="w-full h-32 object-cover mb-4 rounded-md" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Blog Post Title 1</h3>
            <p className="text-gray-600">Brief description of the blog post. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <a href="#" className="text-blue-500 hover:underline mt-2 inline-block">Read More</a>
          </div>
          {/* Blog Post 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src="https://via.placeholder.com/400x200" alt="Blog Post 2" className="w-full h-32 object-cover mb-4 rounded-md" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Blog Post Title 2</h3>
            <p className="text-gray-600">Brief description of the blog post. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <a href="#" className="text-blue-500 hover:underline mt-2 inline-block">Read More</a>
          </div>
          {/* Blog Post 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src="https://via.placeholder.com/400x200" alt="Blog Post 3" className="w-full h-32 object-cover mb-4 rounded-md" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Blog Post Title 3</h3>
            <p className="text-gray-600">Brief description of the blog post. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <a href="#" className="text-blue-500 hover:underline mt-2 inline-block">Read More</a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
