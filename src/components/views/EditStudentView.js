/*==================================================
EditStudentView.js

Form for editing a student's info.
================================================== */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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
  form: {
    marginTop: "14px",
    display: "grid",
    gap: "14px",
  },
  buttonRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "16px",
  },
  error: {
    marginTop: "10px",
    color: "crimson",
    fontWeight: "bold",
  },
  previewImg: {
    width: "220px",
    height: "220px",
    objectFit: "cover",
    borderRadius: "10px",
    border: "1px solid #e6e6ef",
    marginTop: "10px",
  },
}));

const EditStudentView = (props) => {
  const { student, editStudent, history } = props;
  const classes = useStyles();

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
      setGpa(
        student.gpa !== null && student.gpa !== undefined ? String(student.gpa) : ""
      );
      setImageUrl(student.imageUrl || "");
    }
  }, [student]);

  // If student not loaded yet
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

  const handleCancel = () => {
    history.push(`/student/${student.id}`);
  };

  return (
    <div className={classes.page}>
      <div className={classes.container}>
        <div className={classes.card}>
          <Typography variant="h4" className={classes.title}>
            Edit Student
          </Typography>

          {error ? <div className={classes.error}>{error}</div> : null}

          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              label="First Name *"
              variant="outlined"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              fullWidth
            />

            <TextField
              label="Last Name *"
              variant="outlined"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              fullWidth
            />

            <TextField
              label="Email *"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />

            <TextField
              label="GPA (0.0 - 4.0) *"
              variant="outlined"
              value={gpa}
              onChange={(e) => setGpa(e.target.value)}
              fullWidth
            />

            <TextField
              label="Image URL (optional)"
              variant="outlined"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              fullWidth
            />

            {imageUrl.trim() ? (
              <img
                className={classes.previewImg}
                src={imageUrl}
                alt="Student preview"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : null}

            <div className={classes.buttonRow}>
              <Button variant="contained" color="primary" type="submit">
                Save Changes
              </Button>

              <Button variant="outlined" color="primary" onClick={handleCancel}>
                Cancel
              </Button>

              <Button
                variant="outlined"
                color="primary"
                onClick={() => history.push("/students")}
              >
                Back to Students
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

EditStudentView.propTypes = {
  student: PropTypes.object.isRequired,
  editStudent: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default EditStudentView;