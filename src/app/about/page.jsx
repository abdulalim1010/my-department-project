"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What are the admission requirements for EEE?",
    answer: "Admission is based on University guidelines, including competitive entrance exams and academic eligibility."
  },
  {
    question: "Does the department offer scholarships?",
    answer: "Yes, we offer merit and need-based scholarships, as well as government grants for eligible students."
  },
  {
    question: "What career opportunities are available after graduation?",
    answer: "Our graduates pursue careers in energy, electronics, telecommunication, automation, research, banking (IT), public sector, and postgraduate studies at top universities."
  },
  {
    question: "How can students participate in research or internships?",
    answer: "We provide research assistantships, linkages with local industries, and facilitate internships for hands-on experience."
  },
  {
    question: "Is there support for startups or entrepreneurial projects?",
    answer: "Yes, through our Innovation and Entrepreneurship Cell, students receive mentorship and resources to develop their ideas."
  }
];

const faculty = [
  {
    name: "Dr. Sobhan Mia",
    title: "Professor & Head",
    field: "Power Systems, Renewable Energy"
  },
  {
    name: "Ms. Fatema Akter",
    title: "Associate Professor",
    field: "Electronics, Microprocessors"
  },
  {
    name: "Mr. Rafiqul Islam",
    title: "Assistant Professor",
    field: "Communication, Signal Processing"
  },
  // Add more faculty as needed
];

export default function EEEAbout() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <main className="bg-gray-50 min-h-screen text-gray-800">
      {/* Hero Section */}
      <section className="w-full bg-blue-900 text-white px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Department of Electrical and Electronic Engineering (EEE)
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-2xl mb-6"
          >
            Welcome to the home of innovation, research, and excellence at Begum Rokeya University, Rangpur.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        {/* About */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">About The Department</h2>
          <p className="mb-2">
            The Department of Electrical and Electronic Engineering (EEE) at Begum Rokeya University, Rangpur is committed to offering world-class education in the fields of power, electronics, and communication. Our holistic curriculum and research-based approach help students develop both academic expertise and practical skills.
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>Accredited, forward-thinking undergraduate and graduate programs</li>
            <li>Modern labs (Power Electronics, Microprocessor, etc.)</li>
            <li>Industry partnerships and internships</li>
            <li>Research opportunities in emerging technologies</li>
            <li>Support for student innovation & entrepreneurship</li>
          </ul>
        </motion.div>

        {/* Vision & Mission */}
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-blue-100 p-6 rounded-lg"
          >
            <h3 className="text-xl font-semibold mb-2">Vision</h3>
            <p>To become a leading hub of education, research, and social contribution in Electrical & Electronic Engineering — producing innovators ready for global challenges.</p>
          </motion.div>
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="bg-green-100 p-6 rounded-lg"
          >
            <h3 className="text-xl font-semibold mb-2">Mission</h3>
            <ul className="list-disc ml-5 mt-2 mb-2">
              <li>Impart high-quality, future-ready education</li>
              <li>Advance research for societal benefit</li>
              <li>Value integrity, leadership, and social responsibility</li>
              <li>Promote collaboration with industry and academia</li>
            </ul>
          </motion.div>
        </div>

        {/* Programs */}
        <motion.div
          initial={{ scale: 0.75, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-2">Our Programs</h2>
          <ul className="list-disc pl-6 mb-2">
            <li>B.Sc. in Electrical and Electronic Engineering</li>
            <li>M.Sc. in Electrical and Electronic Engineering</li>
            <li>Short courses in emerging EEE technologies</li>
          </ul>
        </motion.div>

        {/* Faculty */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">Meet Our Faculty</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {faculty.map((f, idx) => (
              <motion.div
                key={f.name}
                whileHover={{ scale: 1.05 }}
                className="rounded-lg bg-white shadow p-4 border border-gray-100"
              >
                <div className="font-semibold text-lg">{f.name}</div>
                <div className="text-blue-700 text-sm">{f.title}</div>
                <div className="mt-1 text-gray-600">{f.field}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Research & Student Life */}
        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-6 rounded-lg border"
          >
            <h3 className="font-bold mb-2 text-lg">Research & Achievements</h3>
            <ul className="list-disc ml-5">
              <li>Funded research projects with national agencies</li>
              <li>Student awards in innovation competitions</li>
              <li>Collaborations with industry and local power utilities</li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white p-6 rounded-lg border"
          >
            <h3 className="font-bold mb-2 text-lg">Student Life</h3>
            <ul className="list-disc ml-5">
              <li>Active clubs: IEEE Student Branch, Robotics Club, EEE Society</li>
              <li>Tech fests, workshops, outreach events</li>
              <li>Strong support for women in STEM</li>
            </ul>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={faq.question} className="border rounded-lg bg-white">
                <button
                  className="w-full text-left flex justify-between items-center p-4 font-medium focus:outline-none"
                  onClick={() => setOpenIndex(idx === openIndex ? null : idx)}
                  aria-expanded={openIndex === idx}
                  aria-controls={`faq-body-${idx}`}
                >
                  <span>{faq.question}</span>
                  <motion.span
                    animate={{ rotate: openIndex === idx ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-2"
                  >&#9654;</motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === idx && (
                    <motion.div
                      key="content"
                      id={`faq-body-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-4 pt-0 text-gray-600">{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact / More Information */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="bg-blue-900 text-white rounded-lg p-8"
        >
          <h2 className="text-xl font-bold mb-4">More Information / Contact Us</h2>
          <ul className="mb-3 space-y-1">
            <li><span className="font-semibold">Email:</span> <a className="underline" href="mailto:eee@brur.ac.bd">eee@brur.ac.bd</a></li>
            <li><span className="font-semibold">Phone:</span> +880-xxx-xxxxxxx</li>
            <li><span className="font-semibold">Address:</span> EEE Department, Academic Building, BRUR, Rangpur</li>
            <li>
              <span className="font-semibold">Website:</span>{' '}
              <a className="underline" href="https://www.brur.ac.bd/eee" target="_blank" rel="noopener noreferrer">
                https://www.brur.ac.bd/eee
              </a>
            </li>
          </ul>
          <div>
            Follow us:
            <a className="underline ml-2" href="#" target="_blank" rel="noopener noreferrer">Facebook</a> | 
            <a className="underline ml-2" href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
