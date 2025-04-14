import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { FaEnvelope, FaUserCircle, FaLocationArrow, FaCalendarAlt } from 'react-icons/fa'; // For Icons

const Profile = () => {
  const { user } = useAppContext();
  const [bio, setBio] = useState(user?.bio || '');
  const [dob, setDob] = useState(user?.dob || '');
  const [location, setLocation] = useState(user?.location || '');
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    if (user) {
      setBio(user.bio || '');
      setDob(user.dob || '');
      setLocation(user.location || '');
    }
  }, [user]);

  const handleSaveProfile = () => {
    // Save profile logic, potentially update the backend here
    alert('Profile Saved');
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-xl w-full relative transform transition-all duration-500 hover:scale-105">
        {/* Removed the grey background panel */}
        
        <div className="flex flex-col items-center text-center mt-12">
          {/* Fixed Profile Picture (Avatar) */}
          <img
            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gradient-to-br from-primary to-secondary shadow-lg transform hover:scale-110 transition-all duration-300"
            src={assets.profile_icon} // The avatar remains fixed
            alt="User Avatar"
          />

          <h2 className="text-3xl font-semibold text-gray-800 mt-2 hover:text-primary transition-all duration-300">
            {user?.name}
          </h2>
          <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
            <FaEnvelope className="text-primary" />
            {user?.email}
          </p>
        </div>

        {/* Editable Profile Info */}
        {isEditing ? (
          <div className="mt-6">
            <textarea
              className="border rounded-md p-2 w-full text-gray-700 focus:ring-2 focus:ring-primary"
              placeholder="Write a short bio..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <div className="flex flex-col mt-4 gap-2">
              <input
                type="date"
                className="border rounded-md p-2 w-full focus:ring-2 focus:ring-primary"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
              <input
                type="text"
                className="border rounded-md p-2 w-full focus:ring-2 focus:ring-primary"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <p className="text-lg font-medium text-gray-700">Bio</p>
            <p className="text-gray-600">{bio || 'No bio available'}</p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-primary" />
                <span>{dob ? `Born: ${dob}` : 'Date of Birth: Not set'}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaLocationArrow className="text-primary" />
                <span>{location || 'Location: Not set'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Profile Completion Bar */}
        <div className="mt-6 border-t pt-6 text-center">
          <div className="flex justify-center items-center gap-8">
            <div className="flex flex-col items-center">
              <span className="text-lg font-semibold text-gray-800">Profile Completion</span>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          {isEditing ? (
            <>
              <button
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-300 transition"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dull transition"
                onClick={handleSaveProfile}
              >
                Save Changes
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dull transition"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
              <button
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-300 transition"
                onClick={() => alert("Coming Soon!")}
              >
                Settings
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

