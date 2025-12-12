/*==================================================
NewStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new student page.
================================================== */
import React, { useState } from "react";

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
    marginTop: "6px",
  },
}));

const NewStudentView = (props) => {
  const { handleChange, handleSubmit, error } = props;
  const classes = useStyles();

  // purely for preview (doesn't change your container logic)
  const [imagePreview, setImagePreview] = useState("");

  const onChange = (e) => {
    handleChange(e);
    if (e.target.name === "imageUrl") {
      setImagePreview(e.target.value);
    }
  };

  return (
    <div className={classes.page}>
      <div className={classes.container}>
        <div className={classes.card}>
          <Typography variant="h4" className={classes.title}>
            Add New Student
          </Typography>

          {error ? <div className={classes.error}>{error}</div> : null}

          <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
            <TextField
              label="First Name *"
              variant="outlined"
              name="firstname"
              onChange={onChange}
              fullWidth
            />

            <TextField
              label="Last Name *"
              variant="outlined"
              name="lastname"
              onChange={onChange}
              fullWidth
            />

            <TextField
              label="Email *"
              variant="outlined"
              name="email"
              onChange={onChange}
              fullWidth
            />

            <TextField
              label="GPA (0.0 - 4.0) *"
              variant="outlined"
              name="gpa"
              onChange={onChange}
              fullWidth
            />

            <TextField
              label="Image URL (optional)"
              variant="outlined"
              name="imageUrl"
              onChange={onChange}
              fullWidth
            />

            {imagePreview.trim() ? (
              <img
                className={classes.previewImg}
                src={imagePreview}
                alt="Student preview"
                onError={(ev) => {
                  ev.currentTarget.style.display = "none";
                }}
              />
            ) : null}

            <TextField
              label="Campus ID"
              variant="outlined"
              name="campusId"
              onChange={onChange}
              fullWidth
            />

            <div className={classes.buttonRow}>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewStudentView;