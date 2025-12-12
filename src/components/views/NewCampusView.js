/*==================================================
/src/components/views/NewCampusView.js

Form view for adding a new campus.
Required fields: name, address
Optional fields: description, imageUrl
==================================================*/
import React, { useState } from "react";
import PropTypes from "prop-types";

const NewCampusView = (props) => {
  const { addCampus, history } = props;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation: name and address are required
    if (!name.trim() || !address.trim()) {
      setError("Name and address are required.");
      return;
    }

    const campusData = {
      name: name.trim(),
      address: address.trim(),
      description: description.trim() || null,
      // imageUrl is optional (Option B)
      imageUrl: imageUrl.trim() || null,
    };

    try {
      await addCampus(campusData);
      // After successful creation, go back to All Campuses
      history.push("/campuses");
    } catch (err) {
      console.error(err);
      setError("Failed to add campus. Please try again.");
    }
  };

  return (
    <div>
      <h1>Add New Campus</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name*:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Campus name"
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
              placeholder="Campus address"
            />
          </label>
        </div>

        <div>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description (optional)"
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
              placeholder="https://example.com/image.jpg (optional)"
            />
          </label>
        </div>

        <br />
        <button type="submit">Add Campus</button>
      </form>
    </div>
  );
};

NewCampusView.propTypes = {
  addCampus: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default NewCampusView;
