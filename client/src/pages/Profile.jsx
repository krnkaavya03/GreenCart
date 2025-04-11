import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import ChangePasswordModal from '../components/ChangePasswordModal';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, setUser, axios } = useAppContext();
  const [editMode, setEditMode] = useState(false);
  const [profilePic] = useState(assets.profile_icon); // Avatar is fixed
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleSave = async () => {
    try {
      const { data } = await axios.put('/api/user/update-profile', {
        name,
        email,
      });

      if (data.success) {
        toast.success('Profile updated successfully!');
        setUser({ ...user, name, email });
        setEditMode(false);
      } else {
        toast.error(data.message || 'Update failed');
      }
    } catch (error) {
      toast.error('Update failed: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full">
        <div className="flex flex-col items-center text-center">
          {/* Avatar Display Only - No upload */}
          <div>
            <img
              className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-primary"
              src={profilePic}
              alt="User Avatar"
            />
          </div>

          {editMode ? (
            <>
              <input
                type="text"
                className="border rounded-md py-1 px-3 w-full mt-2 text-center"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                className="border rounded-md py-1 px-3 w-full mt-2 text-center"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-gray-800">{user?.name}</h2>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </>
          )}
        </div>

        <div className="mt-6 border-t pt-6 flex justify-between gap-4">
          {editMode ? (
            <>
              <button
                className="bg-gray-200 px-4 py-2 rounded-full"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
              <button
                className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dull transition"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dull transition"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
              <button
                className="bg-gray-200 px-6 py-2 rounded-full"
                onClick={() => setShowPasswordModal(true)}
              >
                Change Password
              </button>
            </>
          )}
        </div>

        {showPasswordModal && (
          <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
        )}
      </div>
    </div>
  );
};

export default Profile;
