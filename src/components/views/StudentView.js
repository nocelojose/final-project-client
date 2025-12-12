/*==================================================
StudentView.js

Displays a single student's details.
================================================== */
import React from "react";
import { Link } from "react-router-dom";

const StudentView = (props) => {
  const { student, deleteStudent, history } = props;

  // If student data is not loaded yet
  if (!student || !student.id) {
    return <div>Loading student...</div>;
  }

  const fullName = `${student.firstname} ${student.lastname}`;

  const handleDelete = () => {
    deleteStudent(student.id);
    history.push("/students");
  };

  return (
    <div>
      <h1>{fullName}</h1>

      {/* Campus info */}
      {student.campus ? (
        <h3>
          <Link to={`/campus/${student.campus.id}`}>
            {student.campus.name}
          </Link>
        </h3>
      ) : (
        <h3>No campus assigned</h3>
      )}

      {/* NEW fields */}
      <p><strong>Email:</strong> {student.email ? student.email : "N/A"}</p>
      <p><strong>GPA:</strong> {student.gpa !== null && student.gpa !== undefined ? student.gpa : "N/A"}</p>

      {student.imageUrl ? (
        <div>
          <p><strong>Image:</strong></p>
          <img
            src={student.imageUrl}
            alt={fullName}
            style={{ width: "200px" }}
          />
        </div>
      ) : (
        <p><strong>Image:</strong> N/A</p>
      )}

      {/* Buttons */}
      <div>
        <Link to={`/editstudent/${student.id}`}>
          <button>Edit Student</button>
        </Link>

        <button onClick={handleDelete}>
          Delete Student
        </button>
      </div>
    </div>
  );
};

export default StudentView;
