import React, { useState } from "react";
import axios from "axios";

function AddSemester() {
  const [subjects, setSubjects] = useState([
    { subjectCode: "", subjectName: "", subjectCredit: "" },
  ]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [semester, setSemester] = useState("");

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

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newSubjects = [...subjects];
    newSubjects[index][name] = value;
    setSubjects(newSubjects);
  };

  const handleAddSubject = () => {
    setSubjects([
      ...subjects,
      { subjectCode: "", subjectName: "", subjectCredit: "" },
    ]);
  };

  const handleRemoveSubject = (index) => {
    const newSubjects = subjects.filter((_, idx) => idx !== index);
    setSubjects(newSubjects);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/staff/addSem", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ subjects, selectedBatch, semester }),
      });
      console.log("Data saved successfully:", response.data);
    } catch (error) {
      console.error("There was an error saving the data:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
          required
        >
          <option value="" disabled>
            Select Batch
          </option>
          {batches.map((batch) => (
            <option key={batch} value={batch}>
              {batch}
            </option>
          ))}
        </select>
        <br />
        <input
          type="text"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          placeholder="Enter Semester Number"
          required
        />
        <br></br>
        {subjects.map((subject, index) => (
          <div key={index}>
            <input
              type="text"
              name="subjectCode"
              value={subject.subjectCode}
              placeholder="Enter subject code"
              onChange={(e) => handleChange(index, e)}
              required
            />
            &nbsp;
            <input
              type="text"
              name="subjectName"
              value={subject.subjectName}
              placeholder="Enter Subject Name"
              onChange={(e) => handleChange(index, e)}
              required
            />
            &nbsp;
            <input
              type="text"
              name="subjectCredit"
              value={subject.subjectCredit}
              placeholder="Enter subject credit"
              onChange={(e) => handleChange(index, e)}
              required
            />
            &nbsp;
            <button type="button" onClick={() => handleRemoveSubject(index)}>
              Remove
            </button>
            <br></br>
          </div>
        ))}
        <button type="button" onClick={handleAddSubject}>
          Add Subject
        </button>
        <br />
        <button type="submit">Upload</button>
      </form>
    </>
  );
}

export default AddSemester;
