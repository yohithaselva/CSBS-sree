import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function GradeSheet() {
  const [regNo, setRegisterNo] = useState("");
  const [studentDetails, setStudentDetails] = useState([]);
  const [semester, setSemester] = useState();
  const [semesterDetails, setSemesterDetails] = useState([]);
  const [subjectDetails, setSubjectDetails] = useState([]);
  const [postImage, setPostImage] = useState({ myFile: "" });

  const [grades, setGrades] = useState({});
  const [files, setFiles] = useState({});

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleInputChange = (e, subjectCode) => {
    const { value } = e.target;
    setGrades((prevGrades) => ({
      ...prevGrades,
      [subjectCode]: value,
    }));
  };

  const fetchStudentDetails = async () => {
    const res = await fetch(
      `http://localhost:3000/student/getStudent/${regNo}`
    );
    const data = await res.json();
    if (!res.ok) {
      toast.info(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "light",
      });
    }

    setStudentDetails(data.student);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("batch", JSON.stringify(studentDetails.batch));
    form.append("subjectDetails", JSON.stringify(subjectDetails));
    form.append("semester", JSON.stringify(semester));
    form.append("grades", JSON.stringify(grades)); // Convert grades object to JSON string
    form.append("image", JSON.stringify(postImage));

    try {
      const response = await fetch(
        `http://localhost:3000/student/updateSemMarks/${regNo}`,
        {
          method: "POST",
          body: form,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const result = await response.json();
      toast.success("Data submitted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "light",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to submit data", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "light",
      });
    }
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64);
    setPostImage({ ...postImage, myFile: base64 });
  };

  useEffect(() => {
    const fetchSemesterDetails = async () => {
      const res = await fetch(
        `http://localhost:3000/staff/${studentDetails.batch}`
      );
      const data = await res.json();

      const filledSemester = studentDetails.semesterDetails.map((item) =>
        JSON.parse(item.semester)
      );

      const filteredSemesterDetails =
        data.batchDetails[0].semesterDetails.filter(
          (item) => !filledSemester.includes(item.semester)
        );
      setSemesterDetails(filteredSemesterDetails);
    };

    fetchSemesterDetails();

    if (semester) {
      const semIndex = semesterDetails.findIndex(
        (sem) => sem.semester === semester
      );
      setSubjectDetails(semesterDetails[semIndex]?.subjects || []);
    }
  }, [studentDetails, semester]);
  return (
    <>
      <ToastContainer />
      <input
        type="text"
        value={regNo}
        onChange={(e) => setRegisterNo(e.target.value)}
      />
      <button onClick={fetchStudentDetails}>Fetch</button>
      <br />
      {studentDetails && (
        <>
          <label htmlFor="studentName">Student Name: </label>
          <p>{studentDetails.name}</p>
          &nbsp;
          <label htmlFor="studentRollNo">Roll No: </label>
          <p>{studentDetails.rollNo}</p>
          &nbsp;
          <label htmlFor="studentBatch">Batch: </label>
          <p>{studentDetails.batch}</p>
          &nbsp;
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            <option value="">Select Semester</option>
            {semesterDetails.map((sem) => (
              <option value={sem.semester}>{sem.semester}</option>
            ))}
          </select>
          <br />
        </>
      )}
      {semester && (
        <>
          <form onSubmit={handleSubmit}>
            {subjectDetails.map((subject) => (
              <>
                <label htmlFor={subject.subjectName}>
                  {subject.subjectCode + " - " + subject.subjectName}{" "}
                </label>
                <br />
                <input
                  type="text"
                  id={subject.subjectName}
                  name={subject.subjectName}
                  value={grades[subject.subjectCode] || ""}
                  onChange={(e) => handleInputChange(e, subject.subjectCode)}
                  required
                />
                <br />
              </>
            ))}
            <label htmlFor="markSheet10" className="text-xl">
              Attach your semester {semester} Marksheet:
            </label>
            <input
              type="file"
              name="semesterMarksheet"
              className="text-center rounded-xl outline-none mt-1"
              onChange={handleFileUpload}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </>
  );
}
