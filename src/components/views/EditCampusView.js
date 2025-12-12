/*==================================================
EditCampusView.js

A form for editing a campus.
Prefills current values and updates on submit.
==================================================*/
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
    width: "100%",
    maxWidth: "520px",
    borderRadius: "10px",
    border: "1px solid #e6e6ef",
    marginTop: "10px",
  },
}));

const EditCampusView = (props) => {
  const { campus, editCampus, history } = props;
  const classes = useStyles();

  // Local state
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  // Populate form once campus loads
  useEffect(() => {
    if (campus && campus.id) {
      setName(campus.name || "");
      setAddress(campus.address || "");
      setDescription(campus.description || "");
      setImageUrl(campus.imageUrl || "");
    }
  }, [campus]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim() || !address.trim()) {
      setError("Name and address are required.");
      return;
    }

    const updatedCampus = {
      id: campus.id,
      name: name.trim(),
      address: address.trim(),
      description: description.trim() || null,
      imageUrl: imageUrl.trim() || null,
    };

    try {
      await editCampus(updatedCampus);
      history.push(`/campus/${campus.id}`);
    } catch (err) {
      console.error(err);
      setError("Failed to update campus.");
    }
  };

  const handleCancel = () => {
    history.push(`/campus/${campus.id}`);
  };

  // Loading state
  if (!campus || !campus.id) {
    return (
      <div className={classes.page}>
        <div className={classes.container}>
          <div className={classes.card}>
            <Typography variant="h5" className={classes.title}>
              Loading campus...
            </Typography>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.page}>
      <div className={classes.container}>
        <div className={classes.card}>
          <Typography variant="h4" className={classes.title}>
            Edit Campus
          </Typography>

          {error ? <div className={classes.error}>{error}</div> : null}

          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              label="Name *"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />

            <TextField
              label="Address *"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
            />

            <TextField
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              minRows={3}
            />

            <TextField
              label="Image URL"
              variant="outlined"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              fullWidth
            />

            {imageUrl.trim() ? (
              <img
                className={classes.previewImg}
                src={imageUrl}
                alt="Campus preview"
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
                onClick={() => history.push("/campuses")}
              >
                Back to Campuses
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

EditCampusView.propTypes = {
  campus: PropTypes.object.isRequired,
  editCampus: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default EditCampusView;

