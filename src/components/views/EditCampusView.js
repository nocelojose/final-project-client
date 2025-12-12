/*==================================================
EditCampusView.js

A form for editing a campus.
Prefills current values and updates on submit.
==================================================*/
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const EditCampusView = (props) => {
  const { campus, editCampus, history } = props;

  // Local state (initialized empty, then filled via useEffect)
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  // When campus prop changes (loaded from backend), populate form
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

  // If campus hasn't loaded yet, show a loading message
  if (!campus || !campus.id) {
    return <div>Loading campus...</div>;
  }

  return (
    <div>
      <h1>Edit Campus</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name*:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Address*:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Image URL:
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

EditCampusView.propTypes = {
  campus: PropTypes.object.isRequired,
  editCampus: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default EditCampusView;

