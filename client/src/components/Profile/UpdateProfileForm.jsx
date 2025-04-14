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
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
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
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
      </div>
      <button type="submit" className="btn btn-primary" style={{ padding: "10px", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "4px" }}>
        Update Profile
      </button>
    </form>
  );
};

export default UpdateProfileForm;