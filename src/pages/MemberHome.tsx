import ProfileCard from '../components/ProfileCard';
import type { ProfileData } from '../types';

function MemberHome() {
  // Dummy data for profile cards
  const dummyProfiles: ProfileData[] = [
    {
      name: 'Sarah Johnson',
      age: '26',
      location: 'New York, NY',
      bio: 'Love hiking, reading, and trying new restaurants.',
      profileImage: 'https://via.placeholder.com/200?text=Sarah',
    },
    {
      name: 'Michael Chen',
      age: '31',
      location: 'Los Angeles, CA',
      bio: 'Photography enthusiast and coffee lover.',
      profileImage: 'https://via.placeholder.com/200?text=Michael',
    },
    {
      name: 'Emily Rodriguez',
      age: '29',
      location: 'Chicago, IL',
      bio: 'Yoga instructor and travel blogger.',
      profileImage: 'https://via.placeholder.com/200?text=Emily',
    },
    {
      name: 'David Kim',
      age: '33',
      location: 'Seattle, WA',
      bio: 'Software engineer and rock climber.',
      profileImage: 'https://via.placeholder.com/200?text=David',
    },
    {
      name: 'Jessica Martinez',
      age: '27',
      location: 'Austin, TX',
      bio: 'Foodie and adventure seeker.',
      profileImage: 'https://via.placeholder.com/200?text=Jessica',
    },
    {
      name: 'Ryan Thompson',
      age: '30',
      location: 'Boston, MA',
      bio: 'Musician and bookworm.',
      profileImage: 'https://via.placeholder.com/200?text=Ryan',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Member Home Page</h1>
      <p className="mt-4">Welcome to your home page!</p>
      <div className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyProfiles.map((profile, index) => (
            <ProfileCard key={index} profile={profile} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MemberHome;
