import React from "react";
import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Sympo from "../Components/Sympo";
import axios from "axios";

const Student = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    regNo: "",
    batch: "",
    mail: "",
    age: "",
    dob: "",
    gender: "",
    phoneNo: "",
    fatherName: "",
    fatherPhone: "",
    motherName: "",
    motherPhone: "",
    address: "",
    tenthPercentage: "",
    twelthPercentage: "",
    polytechnicPercentage: "",
    semesterMarksheets: [],
  });
  const [files, setFiles] = useState({
    tenthMarksheet: null,
    twelthMarksheet: null,
    polytechnicMarksheet: null,
  });

  const [batches, setBatches] = useState([]);

  useEffect(() => {
    const fetchBatchDetails = async () => {
      const res = await fetch(`http://localhost:3000/staff/getBatch`);
      const data = await res.json();
      const durations = data.map((item) => item.duration);
      setBatches([...batches, ...durations]);
    };
    fetchBatchDetails();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }
    for (const key in files) {
      if (files[key]) {
        form.append(key, files[key]);
      }
    }

    try {
      await axios.post("http://localhost:3000/student", form);
      alert("Student and files uploaded successfully");
    } catch (error) {
      console.error("Error uploading student data and files:", error);
      alert("Failed to upload student data and files");
    }
  };

  return (
    <div className="font-popins p-5 flex justify-center items-center">
      <div className="max-w-lg w-full max-sm:max-w-[320px] max-sm:mx-auto ">
        <h1 className="font-popins text-3xl text-center border-2">
          Student Form
        </h1>
        <form onSubmit={handleSubmit} className="py-8 border-2  px-2">
          <div className="flex flex-col gap-8">
            <div className="flex justify-between">
              <label htmlFor="username" className="text-xl">
                Name:
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleInputChange}
                className="text-center rounded-md outline-none mt-1 h-8"
                required
              />
            </div>
            <div className="flex justify-between">
              <label htmlFor="rollNo" className="text-xl">
                Roll no:
              </label>
              <input
                type="text"
                name="rollNo"
                placeholder="Roll no"
                onChange={handleInputChange}
                className="text-center rounded-md outline-none mt-1 h-8"
                required
              />
            </div>
            <div className="flex justify-between">
              <label htmlFor="registerNo" className="text-xl">
                Register no:
              </label>
              <input
                type="text"
                name="regNo"
                placeholder="Register no"
                onChange={handleInputChange}
                className="text-center rounded-md outline-none mt-1 h-8"
                required
              />
            </div>
            <div className="flex justify-between">
              <label htmlFor="email" className="text-xl">
                Email ID:
              </label>
              <input
                type="email"
                name="mail"
                placeholder="Email ID"
                onChange={handleInputChange}
                className="text-center rounded-md outline-none mt-1 h-8"
                required
              />
            </div>
            <div className=" flex justify-between">
              <label htmlFor="age" className="text-xl">
                Age:
              </label>
              <input
                type="number"
                name="age"
                placeholder="Age"
                onChange={handleInputChange}
                className="text-center rounded-md outline-none mt-1 h-8"
                required
              />
            </div>
            <div className="flex justify-between">
              <label htmlFor="age" className="text-xl">
                Batch:
              </label>
              <select
                name="batch"
                className="w-48"
                onChange={handleInputChange}
              >
                <option value="">Select the batch</option>
                {batches.map((batch) => (
                  <option value={batch}>{batch}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-between">
              <label htmlFor="dob" className="text-xl">
                Date of birth:
              </label>
              <input
                type="date"
                name="dob"
                onChange={handleInputChange}
                className="text-center rounded-md outline-none mt-1 h-8 w-48"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xl">Gender:</label>
              <div className="flex justify-around">
                <label className="text-xl">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={handleInputChange}
                    className="mr-2"
                    required
                  />
                  Male
                </label>
                <label className="text-xl">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={handleInputChange}
                    className="mr-2"
                    required
                  />
                  Female
                </label>
              </div>
            </div>
            <div className="flex justify-between">
              <label htmlFor="photo" className="text-xl">
                Upload your professional photo:
              </label>
              <input
                type="file"
                name="photo"
                className="text-center lg:ml-36 rounded-md outline-none mt-1 h-8 "
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="flex justify-between">
              <label htmlFor="studentPhone" className="text-xl">
                Student Phone no:
              </label>
              <input
                type="number"
                name="phoneNo"
                placeholder="Student phone no"
                onChange={handleInputChange}
                className="text-center rounded-md outline-none mt-1 h-8"
                required
              />
            </div>
            <div className="flex justify-between">
              <label htmlFor="fatherName" className="text-xl">
                Father Name:
              </label>
              <input
                type="text"
                name="fatherName"
                placeholder="Father Name"
                onChange={handleInputChange}
                className="text-center rounded-md outline-none mt-1 h-8"
                required
              />
            </div>
            <div className="flex justify-between">
              <label htmlFor="fatherPhone" className="text-xl">
                Father phone no:
              </label>
              <input
                type="tel"
                name="fatherPhone"
                placeholder="Father phone no"
                onChange={handleInputChange}
                className="text-center rounded-md outline-none mt-1 h-8"
                required
              />
            </div>
            <div className="flex justify-between">
              <label htmlFor="fatheroccup" className="text-xl">
                Enter the father occupation:
              </label>
              <input
                type="text"
                name="fatheroccup"
                placeholder="Father Occupation"
                className="text-center rounded-md outline-none mt-1 h-8"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex justify-between">
              <label htmlFor="motherName" className="text-xl">
                Mother Name:
              </label>
              <input
                type="text"
                name="motherName"
                placeholder="Mother Name"
                className="text-center rounded-md outline-none mt-1 h-8"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex justify-between">
              <label htmlFor="motherPhone" className="text-xl">
                Mother phone no:
              </label>
              <input
                type="tel"
                name="motherPhone"
                placeholder="Mother phone no"
                onChange={handleInputChange}
                className="text-center rounded-md outline-none mt-1 h-8"
                required
              />
            </div>
            <div className="flex justify-between">
              <label htmlFor="motheroccup" className="text-xl">
                Enter the father occupation:
              </label>
              <input
                type="text"
                name="motheroccup"
                placeholder="Mother Occupation"
                className="text-center rounded-md outline-none mt-1 h-8"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex justify-between">
              <label htmlFor="annualin" className="text-xl">
                Enter the Annual Income:
              </label>
              <input
                type="number"
                name="annualin"
                placeholder="Annual Income"
                className="text-center rounded-md outline-none mt-1 h-8"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex justify-between">
              <label htmlFor="address" className="text-xl">
                Address:
              </label>
              <input
                type="text"
                name="address"
                placeholder="Address"
                onChange={handleInputChange}
                className="text-center rounded-md outline-none mt-1 h-8"
                required
              />
            </div>
            <div className="flex justify-between">
              <label htmlFor="community" className="text-xl">
                Enter the Community:
              </label>
              <input
                type="text"
                name="community"
                placeholder="Enter the community"
                className="text-center rounded-md outline-none mt-1 h-8"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex justify-between">
              <label htmlFor="emisno" className="text-xl">
                EMIS no:
              </label>
              <input
                type="text"
                name="emisno"
                placeholder="Enter your emis no"
                onChange={handleInputChange}
                className="text-center rounded-md outline-none mt-1 h-8"
                required
              />
            </div>
            <div className="flex justify-between">
              <label htmlFor="aadhar" className="text-xl">
                Enter the Aadhar Card No:
              </label>
              <input
                type="text"
                name="aadhar"
                placeholder="Aadhar No"
                className="text-center rounded-md outline-none mt-1 h-8"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xl">First Graduate:</label>
              <div className="flex justify-around">
                <label className="text-xl">
                  <input
                    type="radio"
                    name="1stgraduate"
                    value="Yes"
                    onChange={handleInputChange}
                    className="mr-2"
                    required
                  />
                  Yes
                </label>
                <label className="text-xl">
                  <input
                    type="radio"
                    name="2ndgraduate"
                    value="No"
                    onChange={handleInputChange}
                    className="mr-2"
                    required
                  />
                  No
                </label>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-xl">Quota:</label>
              <div className="flex justify-around">
                <label className="text-xl">
                  <input
                    type="radio"
                    name="Quota"
                    value="govt"
                    onChange={handleInputChange}
                    className="mr-2"
                    required
                  />
                  govt
                </label>
                <label className="text-xl">
                  <input
                    type="radio"
                    name="Quotamgt"
                    value="Management"
                    onChange={handleInputChange}
                    className="mr-2"
                    required
                  />
                  management
                </label>
              </div>
            </div>
            <div className="flex justify-between">
              <label htmlFor="mark10" className="text-xl">
                Enter your 10th percentage:
              </label>
              <input
                type="number"
                name="tenthPercentage"
                placeholder="10th Mark"
                className="text-center rounded-md outline-none mt-1 h-8"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex justify-between">
              <label htmlFor="markSheet10" className="text-xl">
                Your 10th mark Sheet:
              </label>
              <input
                type="file"
                name="tenthMarksheet"
                className="text-center lg:ml-40 rounded-md outline-none mt-1 h-8 "
                onChange={handleFileChange}
                required
              />
            </div>
            <div className="flex justify-between">
              <label htmlFor="mark12" className="text-xl">
                Enter your 12th mark and percentage:
              </label>
              <input
                type="number"
                name="twelthPercentage"
                placeholder="12th Mark"
                onChange={handleInputChange}
                className="text-center rounded-md outline-none mt-1 h-8"
              />
            </div>
            <div className="flex justify-between">
              <label htmlFor="markSheet12" className="text-xl">
                Your 12th mark Sheet:
              </label>
              <input
                type="file"
                name="twelthMarksheet"
                onChange={handleFileChange}
                className=" text-center lg:ml-40 rounded-md  outline-none mt-1 h-8"
              />
            </div>
            <div className="flex justify-between">
              <label htmlFor="mark12" className="text-xl">
                Enter your polytechnic mark and percentage:
              </label>
              <input
                type="number"
                name="polytechnicPercentage"
                placeholder="12th Mark"
                onChange={handleInputChange}
                className="text-center rounded-md outline-none mt-1 h-8"
              />
            </div>
            <div className="flex justify-between">
              <label htmlFor="markSheet12" className="text-xl">
                Your polytechnic mark Sheet:
              </label>
              <input
                type="file"
                name="polytechnicMarksheet"
                onChange={handleFileChange}
                className="text-center lg:ml-32 rounded-md outline-none mt-1 h-8"
              />
            </div>
            <button
              type="submit"
              className="py-2 mt-8 flex items-center justify-center gap-2 bg-blue2 hover:bg-black text-white px-6 rounded-2xl duration-300 hover:duration-500"
            >
              Click
              <FaArrowRight />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Student;
