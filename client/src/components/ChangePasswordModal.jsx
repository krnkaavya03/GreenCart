import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const ChangePasswordModal = ({ onClose }) => {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const { axios } = useAppContext();

  const handleChange = async (e) => {
    e.preventDefault();

    if (newPass !== confirmPass) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const { data } = await axios.put('/api/user/change-password', {
        oldPassword: oldPass,
        newPassword: newPass,
      });

      if (data.success) {
        toast.success('Password updated');
        onClose();
      } else {
        toast.error(data.message || 'Failed to change password');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Change Password</h2>
        <form onSubmit={handleChange} className="space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            className="w-full border rounded px-3 py-2"
            value={oldPass}
            onChange={(e) => setOldPass(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full border rounded px-3 py-2"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full border rounded px-3 py-2"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded-full"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-primary text-white rounded-full hover:bg-primary-dull"
            >
              Change
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
