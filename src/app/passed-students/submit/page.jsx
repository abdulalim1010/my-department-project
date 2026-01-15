"use client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Swal from "sweetalert2";

export default function SubmitPassedStudent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const photoInputRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    await fetch("/api/passed-students", {
      method: "POST",
      body: formData,
    });

    setLoading(false);

    Swal.fire({
      icon: "success",
      title: "Request Sent",
      text: "Admin approval required before showing on website",
      confirmButtonColor: "#2563eb",
    });

    // Reset form fields and photo preview
    e.target.reset();
    setPhotoPreview(null);

    // Optionally redirect after short delay
    setTimeout(() => router.push("/"), 1700);
  }

  // For photo selection/preview
  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPhotoPreview(fileReader.result);
      fileReader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <section className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-3 text-center">
          🎓 Add Your Name
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Let us know about your achievement as a passed student!
        </p>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          autoComplete="off"
        >
          <input
            name="name"
            required
            placeholder="Full Name"
            className="block w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-blue-50 font-medium text-lg transition"
          />
          <input
            name="batch"
            required
            placeholder="Batch (e.g. EEE 2018-19)"
            className="block w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-blue-50 font-medium text-lg transition"
          />
          <input
            name="designation"
            placeholder="Designation"
            className="block w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-blue-50 font-medium text-lg transition"
          />
          <input
            name="company"
            placeholder="Company / Organization"
            className="block w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none bg-blue-50 font-medium text-lg transition"
          />

          {/* Photo Input with Preview */}
          <div className="flex flex-col items-center">
            <label
              htmlFor="photo"
              className="cursor-pointer flex flex-col items-center justify-center w-36 h-36 bg-blue-100 hover:bg-blue-200 border-2 border-dashed border-blue-300 rounded-full overflow-hidden transition mb-2 group"
            >
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-blue-400 text-6xl group-hover:text-blue-500">
                  +
                </span>
              )}
              <input
                type="file"
                name="photo"
                accept="image/*"
                required
                id="photo"
                ref={photoInputRef}
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
            <span className="text-sm text-gray-400">
              {photoPreview ? "Photo Selected" : "Choose your photo"}
            </span>
          </div>

          <button
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold text-lg 
              ${loading
                ? "bg-blue-300 cursor-wait"
                : "bg-blue-600 hover:bg-blue-700 transition text-white"
              }`}
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </section>
    </main>
  );
}
