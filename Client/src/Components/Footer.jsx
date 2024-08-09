import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Company</h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <Link to="#" className="hover:underline">About</Link>
              </li>
              <li className="mb-4">
                <Link to="#" className="hover:underline">Careers</Link>
              </li>
              <li className="mb-4">
                <Link to="#" className="hover:underline">Brand Center</Link>
              </li>
              <li className="mb-4">
                <Link to="#" className="hover:underline">Blog</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Help center</h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <Link to="#" className="hover:underline">Discord Server</Link>
              </li>
              <li className="mb-4">
                <Link to="#" className="hover:underline">Twitter</Link>
              </li>
              <li className="mb-4">
                <Link to="#" className="hover:underline">Facebook</Link>
              </li>
              <li className="mb-4">
                <Link to="#" className="hover:underline">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <Link to="#" className="hover:underline">Privacy Policy</Link>
              </li>
              <li className="mb-4">
                <Link to="#" className="hover:underline">Licensing</Link>
              </li>
              <li className="mb-4">
                <Link to="#" className="hover:underline">Terms & Conditions</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Download</h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <Link to="#" className="hover:underline">iOS</Link>
              </li>
              <li className="mb-4">
                <Link to="#" className="hover:underline">Android</Link>
              </li>
              <li className="mb-4">
                <Link to="#" className="hover:underline">Windows</Link>
              </li>
              <li className="mb-4">
                <Link to="#" className="hover:underline">MacOS</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
            © 2023 <Link to="/">Ride</Link>. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
            <Link to="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
              </svg>
              <span className="sr-only">Facebook page</span>
            </Link>
            <Link to="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
                <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
              </svg>
              <span className="sr-only">Discord community</span>
            </Link>
            <Link to="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                <path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.824A8.285 8.285 0 0 1 0 14.524a11.73 11.73 0 0 0 6.29 1.834c7.547 0 11.674-6.131 11.674-11.446 0-.175-.004-.35-.012-.523A8.24 8.24 0 0 0 20 1.892Z" clipRule="evenodd" />
              </svg>
              <span className="sr-only">Twitter page</span>
            </Link>
            <Link to="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0a10 10 0 1 0 0 20A10 10 0 0 0 10 0Zm0 18.125A8.125 8.125 0 1 1 10 1.875a8.125 8.125 0 0 1 0 16.25Zm-2.243-8.037a2.244 2.244 0 1 0 0-4.488 2.244 2.244 0 0 0 0 4.488Zm4.486 0a2.244 2.244 0 1 0 0-4.488 2.244 2.244 0 0 0 0 4.488ZM10 5.112A4.888 4.888 0 1 0 10 14.887a4.888 4.888 0 0 0 0-9.775Zm0 8.125a3.238 3.238 0 1 1 0-6.476 3.238 3.238 0 0 1 0 6.476Zm5.243-7.8a1.038 1.038 0 1 0 0-2.075 1.038 1.038 0 0 0 0 2.075ZM12.7 10a.7.7 0 1 1-1.4 0 .7.7 0 0 1 1.4 0Zm-4.002 0a.7.7 0 1 1-1.4 0 .7.7 0 0 1 1.4 0Zm-3.05-5.388a1.038 1.038 0 1 1-2.075 0 1.038 1.038 0 0 1 2.075 0Z" clipRule="evenodd" />
              </svg>
              <span className="sr-only">Instagram page</span>
            </Link>
            <Link to="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0a10 10 0 1 0 0 20A10 10 0 0 0 10 0Zm3.85 7.437h-1.35c-.105 0-.21.135-.21.24v1.35h1.56c-.135.675-.24 1.215-.54 1.755-.54 1.08-1.755 1.89-3.045 1.89a3.608 3.608 0 0 1-3.6-3.6 3.61 3.61 0 0 1 3.6-3.6c.9 0 1.65.285 2.34.825.09.06.15.105.255.105.09 0 .21-.06.285-.135l.885-.885c.135-.135.135-.33 0-.465A5.888 5.888 0 0 0 10 4.125a5.88 5.88 0 0 0-5.875 5.88A5.88 5.88 0 0 0 10 15.875a5.88 5.88 0 0 0 5.88-5.88v-2.44c0-.135-.105-.24-.24-.24Zm-6.66 3.15c0 1.08.9 1.98 1.98 1.98s1.98-.9 1.98-1.98a1.97 1.97 0 0 0-1.98-1.98 1.97 1.97 0 0 0-1.98 1.98Z" clipRule="evenodd" />
              </svg>
              <span className="sr-only">GitHub account</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
