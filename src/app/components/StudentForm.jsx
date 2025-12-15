"use client";

import { useState } from "react";
import Swal from "sweetalert2";

export default function StudentForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    phone: "",
    email: "",
    session: "",
    year: "",
    semester: "",
    gender: "",
    religion: "",
    address: "",
    district: "",
  });

  const sessions = [];
  for (let y = 2010; y <= 2024; y++) {
    sessions.push(`${y}-${y + 1}`);
  }

  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
  const semesters = ["1st Semester", "2nd Semester"];
  const genders = ["Male", "Female"];
  const religions = ["Islam", "Hindu", "Christian", "Buddhist", "Others"];

  const districts = [
    "Bagerhat","Bandarban","Barguna","Barishal","Bhola","Bogura","Brahmanbaria",
    "Chandpur","Chattogram","Chuadanga","Cox’s Bazar","Cumilla","Dhaka","Dinajpur",
    "Faridpur","Feni","Gaibandha","Gazipur","Gopalganj","Habiganj","Jamalpur",
    "Jashore","Jhalokathi","Jhenaidah","Joypurhat","Khagrachhari","Khulna",
    "Kishoreganj","Kurigram","Kushtia","Lakshmipur","Lalmonirhat","Madaripur",
    "Magura","Manikganj","Meherpur","Moulvibazar","Munshiganj","Mymensingh",
    "Naogaon","Narail","Narayanganj","Narsingdi","Natore","Netrokona",
    "Nilphamari","Noakhali","Pabna","Panchagarh","Patuakhali","Pirojpur",
    "Rajbari","Rajshahi","Rangamati","Rangpur","Satkhira","Shariatpur",
    "Sherpur","Sirajganj","Sunamganj","Sylhet","Tangail","Thakurgaon"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirm = await Swal.fire({
      title: "Submit your information?",
      text: "Please make sure all information is correct.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Submit",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    onSubmit?.(formData);

    Swal.fire({
      icon: "success",
      title: "Submitted Successfully!",
      timer: 2000,
      showConfirmButton: false,
    });

    setFormData({
      name: "",
      studentId: "",
      phone: "",
      email: "",
      session: "",
      year: "",
      semester: "",
      gender: "",
      religion: "",
      address: "",
      district: "",
    });
  };

  return (
    <div className="p-10 bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Students of  (EEE) BRUR
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="inputField"
          required
        />

        {/* Student ID */}
        <input
          type="text"
          name="studentId"
          placeholder="Student ID"
          value={formData.studentId}
          onChange={handleChange}
          className="inputField"
          required
        />

        {/* Phone */}
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="inputField"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="inputField"
          required
        />

        {/* Session */}
        <select
          name="session"
          value={formData.session}
          onChange={handleChange}
          className="inputField"
          required
        >
          <option value="" disabled>Select Session</option>
          {sessions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        {/* Year */}
        <select
          name="year"
          value={formData.year}
          onChange={handleChange}
          className="inputField"
          required
        >
          <option value="" disabled>Select Year</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        {/* Semester */}
        <select
          name="semester"
          value={formData.semester}
          onChange={handleChange}
          className="inputField"
          required
        >
          <option value="" disabled>Select Semester</option>
          {semesters.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        {/* Gender */}
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="inputField"
          required
        >
          <option value="" disabled>Select Gender</option>
          {genders.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        {/* Religion */}
        <select
          name="religion"
          value={formData.religion}
          onChange={handleChange}
          className="inputField"
          required
        >
          <option value="" disabled>Select Religion</option>
          {religions.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        {/* District */}
        <select
          name="district"
          value={formData.district}
          onChange={handleChange}
          className="inputField"
          required
        >
          <option value="" disabled>Select District</option>
          {districts.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        {/* Address */}
        <input
          type="text"
          name="address"
          placeholder="Full Address"
          value={formData.address}
          onChange={handleChange}
          className="inputField md:col-span-2"
          required
        />

        {/* Submit */}
        <button
          type="submit"
          className="md:col-span-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:scale-[1.02] transition"
        >
         Save Your Information
        </button>
      </form>
    </div>
  );
}
