import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { FaArrowUp } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
import LoginModal from '../pages/authPage/LoginModal';
import RegisterModal from '../pages/authPage/RegisterModal';

const courseData = [
  {
    title: "Mathematics",
    description: "In-depth math coaching from basics to advanced. Perfect for school & competitive exams.",
    price: "₹4999",
    offer: "₹2999 (40% OFF)",
    image: "https://cdn-icons-png.flaticon.com/512/1157/1157037.png"
  },
  {
    title: "Science",
    description: "Physics, Chemistry & Biology made easy with real-world applications.",
    price: "₹5999",
    offer: "₹3499 (42% OFF)",
    image: "https://cdn-icons-png.flaticon.com/512/3014/3014085.png"
  },
  {
    title: "English",
    description: "Grammar, comprehension & communication skill-building for all levels.",
    price: "₹3999",
    offer: "₹2499 (38% OFF)",
    image: "https://cdn-icons-png.flaticon.com/512/4052/4052984.png"
  },
  {
    title: "Coding for Kids",
    description: "Fun-filled programming classes using Scratch, Python & games.",
    price: "₹6999",
    offer: "₹3999 (43% OFF)",
    image: "https://cdn-icons-png.flaticon.com/512/1006/1006360.png"
  },
  {
    title: "Competitive Exams",
    description: "Expert coaching for NEET, JEE, UPSC & more with mock tests & strategy.",
    price: "₹9999",
    offer: "₹5999 (40% OFF)",
    image: "https://cdn-icons-png.flaticon.com/512/4697/4697260.png"
  },
  {
    title: "Spoken English",
    description: "Boost confidence & fluency with interactive spoken English classes.",
    price: "₹4999",
    offer: "₹2999 (40% OFF)",
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  },
];

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState(null);
  // Disable scroll when modal is open
  useEffect(() => {
    if (selectedCourse) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedCourse]);

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full bg-gray-100 font-sans scroll-smooth">
      {/* Top Bar */}
      <div className="bg-orange-500 text-white text-sm py-2 px-4 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-1 sm:gap-0 text-center">
        <span className="text-xs sm:text-sm">ALWAYS OPEN! We provide support 24/7</span>
        <span className="text-xs sm:text-sm font-bold">CALL NOW! 123-456-7890</span>
      </div>

      {/* Navbar */}
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <div className="text-2xl text-orange-500 font-bold">📘</div>
          <h1 className="text-xl font-bold text-gray-800">Divine Knowledge Hub Academy</h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-4">
          <button
            onClick={() => setShowLoginModal(true)}
            className="bg-orange-500 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-orange-600 transition duration-300"
          >
            Sign in
          </button>
          <button
            onClick={() => setShowRegisterModal(true)}
            className="bg-white border-2 border-orange-500 text-orange-500 px-5 py-2 rounded-lg font-semibold hover:bg-orange-500 hover:text-white transition"
          >
            Enroll Now
          </button>

          <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
          <RegisterModal isOpen={showRegisterModal} onClose={() => setShowRegisterModal(false)} />
        </nav>


        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(true)} className="text-3xl text-orange-500 font-bold">
            ☰
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full bg-white z-50 shadow-lg p-6"
          >
            {/* Close Button */}
            <div className="flex justify-end">
              <button onClick={() => setMenuOpen(false)} className="text-2xl text-gray-600 hover:text-red-500">
                ✕
              </button>
            </div>

            <div className="mt-60 flex flex-col items-center gap-6">
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-orange-500 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-orange-600 transition duration-300"
              >
                Sign in
              </button>
              <button
                onClick={() => setShowRegisterModal(true)}
                className="bg-white border-2 border-orange-500 text-orange-500 px-5 py-2 rounded-lg font-semibold hover:bg-orange-500 hover:text-white transition"
              >
                Enroll Now
              </button>
              <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
              <RegisterModal isOpen={showRegisterModal} onClose={() => setShowRegisterModal(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16">
        <div className="md:w-1/2 space-y-4">
          <div className="text-orange-400 text-lg font-semibold">📍Malangwa-08,  Sarlahi</div>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            IN-PERSON AND ONLINE COACHING SERVICES,<br /> SINCE 2010
          </h2>
          <p className="text-lg">Empowering students with divine knowledge for a brighter future.</p>
          <a href="tel:1234567890" className="inline-block">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg mt-4">
              Call 123-456-7890
            </button>
          </a>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
            alt="Learning Icon"
            className="w-72 h-72 object-contain"
          />
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-16 px-6 md:px-20 bg-white">
        <h3 className="text-3xl font-bold text-center mb-10 text-gray-800">Our Courses</h3>
        <div className="cursor-pointer grid md:grid-cols-3 gap-8">
          {courseData.map((course, i) => (
            <div
              key={i}
              onClick={() => setSelectedCourse(course)}
              className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition duration-300"
            >
              <h4 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h4>
              <p className="text-gray-600">{course.description.slice(0, 60)}...</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-[500px] p-6 relative animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-xl"
            >
              &times;
            </button>

            {/* Course Image */}
            <div className="w-full flex justify-center mb-4">
              <img
                src={selectedCourse.image}
                alt={selectedCourse.title}
                className="w-28 h-28 object-contain"
              />
            </div>

            {/* Course Info */}
            <h2 className="text-2xl font-bold text-orange-600 mb-4 text-center">{selectedCourse.title}</h2>
            <p className="text-gray-700 mb-2 text-center">{selectedCourse.description}</p>
            <p className="text-gray-800 font-semibold mb-1 text-center">
              Original Price: <span className="line-through">{selectedCourse.price}</span>
            </p>
            <p className="text-green-600 font-bold text-lg mb-4 text-center animate-bounce">
              <motion.span
                initial={{ opacity: 0, y: 20 }}  // Starts off with no opacity and slightly lower
                animate={{ opacity: 1, y: 0 }}   // Animates to full opacity and original position
                transition={{ duration: 0.6, ease: 'easeOut' }} // Smooth transition
              >
                Offer Price: {selectedCourse.offer}
              </motion.span>
            </p>
            {/* Buttons */}
            <button
              onClick={() => alert("Redirect to payment/purchase")}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg w-full mb-3"
            >
              Purchase Course
            </button>

          </div>
        </div>
      )}


      {/* Why Choose Us Section */}
      <section id="why" className="py-16 px-6 md:px-20 bg-orange-50">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-10">Why Choose Us?</h3>
        <div className="grid md:grid-cols-3 gap-8 text-gray-700">
          {[
            { title: "📚 Experienced Teachers", desc: "Our mentors are passionate professionals with years of teaching experience." },
            { title: "💻 Online & Offline Support", desc: "Attend classes from anywhere or visit our centers for in-person sessions." },
            { title: "🎯 Personalized Attention", desc: "Small batch sizes ensure every student gets the attention they deserve." },
          ].map((item, i) => (
            <div key={i}>
              <h4 className="font-semibold text-lg">{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6 md:px-20 bg-white">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">About Divine Knowledge Hub</h3>
        <p className="max-w-4xl mx-auto text-gray-700 text-center">
          Established in 2010, Divine Knowledge Hub Academy is dedicated to building a strong foundation for students in both academics and real-world skills. With a divine vision to uplift young minds, we focus on delivering quality education, moral values, and a futuristic learning environment.
        </p>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 px-6 md:px-20 bg-orange-100">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-10">What Our Students Say</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              quote: "I improved my grades and gained confidence in just a few months. The teachers are really supportive!",
              author: "Jack Richer.",
            },
            {
              quote: "Amazing place for preparation. I cleared my competitive exam with their guidance!",
              author: "Sam Parker.",
            },
          ].map((t, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow">
              <p className="italic text-gray-700">"{t.quote}"</p>
              <p className="text-right mt-4 font-semibold">- {t.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-6 md:px-20 bg-white">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-10">Get In Touch</h3>
        <div className="max-w-2xl mx-auto text-center text-gray-700">
          <p className="mb-2">📍Malangwa-08,  Sarlahi</p>
          <p className="mb-2">📞 <a href="tel:1234567890" className="hover:underline cursor-pointer">123-456-7890</a></p>
          <p className="mb-2">📧 <a href="mailto:info@divineknowledgehub.com" className="hover:underline cursor-pointer">info@divineknowledgehub.com</a></p>
          <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg">
            Send Message
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6">
        <p>© {new Date().getFullYear()} Divine Knowledge Hub Academy. All rights reserved.</p>
      </footer>
      {/* Scroll To Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 p-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg transition duration-300 animate-bounce opacity-90 hover:opacity-100"
          aria-label="Scroll to top"
        >
          <FaArrowUp size={20} />
        </button>
      )}


    </div>
  );
};

export default Home;
