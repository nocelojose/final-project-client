/*==================================================
StudentView.js

Displays a single student's details.
================================================== */
import React from "react";
import { Link } from "react-router-dom";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  page: {
    minHeight: "calc(100vh - 64px)",
    padding: "30px 20px",
    backgroundColor: "#f5f6fa",
  },
  container: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "18px",
    border: "1px solid #e6e6ef",
  },
  title: {
    fontWeight: "bold",
    color: "#11153e",
  },
  meta: {
    color: "#333",
    marginTop: "10px",
  },
  campusLink: {
    textDecoration: "none",
    color: "#11153e",
    fontWeight: "bold",
  },
  image: {
    width: "220px",
    height: "220px",
    objectFit: "cover",
    borderRadius: "10px",
    border: "1px solid #e6e6ef",
    marginTop: "14px",
  },
  buttonRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "16px",
  },
}));

const StudentView = (props) => {
  const { student, deleteStudent, history } = props;
  const classes = useStyles();

  // If student data is not loaded yet
  if (!student || !student.id) {
    return (
      <div className={classes.page}>
        <div className={classes.container}>
          <div className={classes.card}>
            <Typography variant="h5" className={classes.title}>
              Loading student...
            </Typography>
          </div>
        </div>
      </div>
    );
  }

  const fullName = `${student.firstname} ${student.lastname}`;

  const handleDelete = () => {
    deleteStudent(student.id);
    history.push("/students");
  };

  return (
    <div className={classes.page}>
      <div className={classes.container}>
        <div className={classes.card}>
          <Typography variant="h4" className={classes.title}>
            {fullName}
          </Typography>

          {/* Campus info */}
          <Typography variant="body1" className={classes.meta}>
            <strong>Campus:</strong>{" "}
            {student.campus ? (
              <Link className={classes.campusLink} to={`/campus/${student.campus.id}`}>
                {student.campus.name}
              </Link>
            ) : (
              "No campus assigned"
            )}
          </Typography>

          {/* Fields */}
          <Typography variant="body1" className={classes.meta}>
            <strong>Email:</strong> {student.email ? student.email : "N/A"}
          </Typography>

          <Typography variant="body1" className={classes.meta}>
            <strong>GPA:</strong>{" "}
            {student.gpa !== null && student.gpa !== undefined ? student.gpa : "N/A"}
          </Typography>

          {/* Image */}
          {student.imageUrl ? (
            <img className={classes.image} src={student.imageUrl} alt={fullName} />
          ) : (
            <Typography variant="body1" className={classes.meta}>
              <strong>Image:</strong> N/A
            </Typography>
          )}

          {/* Buttons */}
          <div className={classes.buttonRow}>
            <Link to={`/editstudent/${student.id}`} style={{ textDecoration: "none" }}>
              <Button variant="outlined" color="primary">
                Edit Student
              </Button>
            </Link>

            <Button variant="contained" color="secondary" onClick={handleDelete}>
              Delete Student
            </Button>

            <Link to="/students" style={{ textDecoration: "none" }}>
              <Button variant="outlined" color="primary">
                Back to Students
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentView;
