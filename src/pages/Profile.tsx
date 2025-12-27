import { useState } from 'react';
import EditProfileForm from '../components/EditProfileForm';
import type { ProfileData } from '../types';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'John Doe',
    age: '28',
    location: 'San Francisco, CA',
    bio: 'Love hiking, reading, and trying new restaurants. Looking for someone who shares my passion for adventure and good conversation. Coffee enthusiast and weekend traveler.',
    profileImage: 'https://via.placeholder.com/200',
  });

  const handleSave = (data: ProfileData) => {
    setProfileData(data);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold underline">My Profile</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Edit Profile
          </button>
        )}
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        {isEditing ? (
          <EditProfileForm
            profileData={profileData}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <>
            {/* Profile Image */}
            <div className="flex justify-center mb-6">
              <div className="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <img
                  src={profileData.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Profile Information */}
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Name
                </label>
                <p className="text-lg text-gray-900">{profileData.name}</p>
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Age
                </label>
                <p className="text-lg text-gray-900">{profileData.age}</p>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Location
                </label>
                <p className="text-lg text-gray-900">{profileData.location}</p>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Bio
                </label>
                <p className="text-gray-900 leading-relaxed">
                  {profileData.bio}
                </p>
              </div>
            </div>
          </>
        )}
        <button>Send to friend</button>
      </div>
    </div>
  );
}

export default Profile;
