/*==================================================
/src/components/views/NewCampusView.js

Form view for adding a new campus.
Required fields: name, address
Optional fields: description, imageUrl
==================================================*/
import React, { useState } from "react";
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

const NewCampusView = (props) => {
  const { addCampus, history } = props;
  const classes = useStyles();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim() || !address.trim()) {
      setError("Name and address are required.");
      return;
    }

    const campusData = {
      name: name.trim(),
      address: address.trim(),
      description: description.trim() || null,
      imageUrl: imageUrl.trim() || null,
    };

    try {
      await addCampus(campusData);
      history.push("/campuses");
    } catch (err) {
      console.error(err);
      setError("Failed to add campus. Please try again.");
    }
  };

  const handleCancel = () => {
    history.push("/campuses");
  };

  return (
    <div className={classes.page}>
      <div className={classes.container}>
        <div className={classes.card}>
          <Typography variant="h4" className={classes.title}>
            Add New Campus
          </Typography>

          {error ? <div className={classes.error}>{error}</div> : null}

          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              label="Name *"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              placeholder="Campus name"
            />

            <TextField
              label="Address *"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              placeholder="Campus address"
            />

            <TextField
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              minRows={3}
              placeholder="Short description (optional)"
            />

            <TextField
              label="Image URL"
              variant="outlined"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              fullWidth
              placeholder="https://example.com/image.jpg (optional)"
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
                Add Campus
              </Button>

              <Button variant="outlined" color="primary" onClick={handleCancel}>
                Cancel
              </Button>

              <Button
                variant="outlined"
                color="primary"
                onClick={() => history.push("/")}
              >
                Home
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

NewCampusView.propTypes = {
  addCampus: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default NewCampusView;
