/*==================================================
EditStudentView.js

Form for editing a student's info.
================================================== */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const EditStudentView = (props) => {
  const { student, editStudent, history } = props;

  // Local state
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [gpa, setGpa] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  // Populate form when student loads
  useEffect(() => {
    if (student && student.id) {
      setFirstname(student.firstname || "");
      setLastname(student.lastname || "");
      setEmail(student.email || "");
      setGpa(student.gpa !== null && student.gpa !== undefined ? String(student.gpa) : "");
      setImageUrl(student.imageUrl || "");
    }
  }, [student]);

  // If student not loaded yet
  if (!student || !student.id) {
    return <div>Loading student...</div>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!firstname.trim() || !lastname.trim()) {
      setError("First name and last name are required.");
      return;
    }

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    const gpaNum = Number(gpa);
    if (Number.isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4) {
      setError("GPA must be a number between 0.0 and 4.0.");
      return;
    }

    const updatedStudent = {
      id: student.id,
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      email: email.trim(),
      gpa: gpaNum,
      imageUrl: imageUrl.trim() || null,
    };

    try {
      await editStudent(updatedStudent);
      history.push(`/student/${student.id}`);
    } catch (err) {
      console.error(err);
      setError("Failed to update student.");
    }
  };

  return (
    <div>
      <h1>Edit Student</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            First Name*:
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Last Name*:
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Email*:
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            GPA (0.0 - 4.0)*:
            <input
              type="text"
              value={gpa}
              onChange={(e) => setGpa(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Image URL (optional):
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
        </div>

        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

EditStudentView.propTypes = {
  student: PropTypes.object.isRequired,
  editStudent: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default EditStudentView;

