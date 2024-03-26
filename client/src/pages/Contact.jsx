import React, { useState } from 'react';
//Edited from: https://tailwindflex.com/@ron-hicks/responsive-contact-us-section
const Contact = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
      event.preventDefault(); // Prevent default form submission behavior
      setShowModal(true);

  };

  const closeModal = () => {
      setShowModal(false);
  };

  return (
      <div className="max-w-screen-lg mx-auto p-5">
          <div className="grid grid-cols-1 md:grid-cols-12 border">
              <div className="bg-orange-400 md:col-span-4 p-10 text-white">
                  <p className="mt-4 text-sm leading-7 font-regular uppercase">
                      Contact
                  </p>
                  <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight">
                      Get In <span className="text-indigo-600">Touch</span>
                  </h3>
                  <p className="mt-4 leading-7 text-gray-200">
                      Please fill out the form below to send us an email and we will get back to you as soon as possible. We love to hear about how we can make our user interface more user friendly or how we can improve our services.
                  </p>

                  <div className="flex items-center mt-5">
                      <svg className="h-6 mr-2 text-indigo-600" fill="currentColor" version="1.1"
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 489.536 489.536"
                          xmlnsXlink="http://www.w3.org/1999/xlink" enableBackground="new 0 0 489.536 489.536">
                          {/* SVG Path */}
                      </svg>
                      <span className="text-sm">Address: 1320 S Dixie Hwy, Coral Gables, FL 33146</span>
                  </div>
                  <div className="flex items-center mt-5">
                      <svg className="h-6 mr-2 text-indigo-600" fill="currentColor" version="1.1" id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                          viewBox="0 0 60.002 60.002" style={{ enableBackground: 'new 0 0 60.002 60.002' }}
                          xmlSpace="preserve">
                          {/* SVG Path */}
                      </svg>
                      <span className="text-sm">Phone: 111-111-1111</span>
                  </div>
                  <div className="flex items-center mt-5">
                      <svg className="h-6 mr-2 text-indigo-600" fill="currentColor" version="1.1" id="Capa_1"
                          xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                          viewBox="0 0 300.988 300.988" style={{ enableBackground: 'new 0 0 300.988 300.988' }}
                          xmlSpace="preserve">
                          {/* SVG Path */}
                      </svg>
                      <span className="text-sm">24/7</span>
                  </div>
              </div>
              <form className="md:col-span-8 p-10">
                  <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-first-name">
                              First Name
                          </label>
                          <input
                              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                              id="grid-first-name" type="text" placeholder="Jane" />
                          <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-last-name">
                              Last Name
                          </label>
                          <input
                              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="grid-last-name" type="text" placeholder="Doe" />
                      </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password">
                              Email Address
                          </label>
                          <input
                              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="grid-email" type="email" placeholder="********@*****.**" />
                      </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password">
                              Your Message
                          </label>
                          <textarea rows="10"
                              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"></textarea>
                      </div>
                      <div className="flex justify-between w-full px-3">
                          <div className="md:flex md:items-center">
                              <label className="block text-gray-500 font-bold">
                                  <input className="mr-2 leading-tight" type="checkbox" />
                                  <span className="text-sm">
                                      Sign up for daily stock updates and predictions!
                                  </span>
                              </label>
                          </div>
                          <button
                              className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                              type="submit"
                              onClick={openModal}>
                              Send Message
                          </button>
                      </div>
                  </div>
              </form>
          </div>
          {/* Modal */}
          {showModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                  <div className="relative w-auto max-w-3xl mx-auto my-6">
                      {/* Modal                        {/* Modal content */}
                        <div className="relative bg-white w-full p-8 rounded-lg shadow-lg">
                            {/* Modal header */}
                            <div className="flex justify-between items-center pb-3">
                                <h3 className="text-lg font-semibold text-gray-800">Form Submitted</h3>
                                <button
                                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                    onClick={closeModal}
                                    aria-label="Close Modal"
                                >
                                    <svg
                                        className="h-6 w-6 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M12.7071 7.29289C13.0976 7.68342 13.0976 8.31658 12.7071 8.70711L9.41421 12L12.7071 15.2929C13.0976 15.6834 13.0976 16.3166 12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L8 13.4142L4.70711 16.7071C4.31658 17.0976 3.68342 17.0976 3.29289 16.7071C2.90237 16.3166 2.90237 15.6834 3.29289 15.2929L6.58579 12L3.29289 8.70711C2.90237 8.31658 2.90237 7.68342 3.29289 7.29289C3.68342 6.90237 4.31658 6.90237 4.70711 7.29289L8 10.5858L11.2929 7.29289C11.6834 6.90237 12.3166 6.90237 12.7071 7.29289Z"
                                        />
                                    </svg>
                                </button>
                            </div>
                            {/* Modal body */}
                            <div className="relative p-6 flex-auto">
                                <p className="text-gray-700 text-base">
                                    Thank you for your response! We will get back to you as soon as possible.
                                </p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Contact;