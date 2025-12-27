import { Link } from 'react-router-dom';
import type { ProfileData } from '../types';

interface ProfileCardProps {
  profile: ProfileData;
}

function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Link
      to="/profile"
      className="block bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
    >
      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          <img
            src={profile.profileImage}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Profile Information */}
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-gray-900">{profile.name}</h3>
        <p className="text-gray-600">Age: {profile.age}</p>
        <p className="text-gray-600">{profile.location}</p>
      </div>
    </Link>
  );
}

export default ProfileCard;
