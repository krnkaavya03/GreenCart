import React, { useState } from "react";
import axios from "axios";

const UpdateProfileForm = ({ onSuccess, onError }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        "/api/user/update-profile",
        { name, email },
        { withCredentials: true }
      );
      onSuccess(data.message || "Profile updated successfully!");
    } catch (error) {
      onError(error.response?.data?.message || "Failed to update profile.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="update-profile-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Update Profile
      </button>
    </form>
  );
};

export default UpdateProfileForm;