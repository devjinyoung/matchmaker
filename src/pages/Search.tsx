import { useState } from 'react';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold underline mb-4">Search</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for people..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <p className="text-gray-600">
        Search for people and discover new connections.
      </p>
    </div>
  );
}

export default Search;
