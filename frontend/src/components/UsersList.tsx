import { useState } from 'react';
import { type User } from '../types/user';
import useQuery from '../hooks/useQuery';
import { getDate } from '../utils/date';
import { Preloader } from './Preloader';

const API_URL = 'http://localhost:3000/api/users';

export default function UsersList() {

  const [selectedUsers, setSelectedUsers] = useState<Set<number>>(new Set());
  const {data: users, isLoading, refetch} = useQuery<User[]>(API_URL);
  
  const handleDeleteSelected = async () => {
    try {
      await fetch(`${API_URL}/delete-multiple`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selectedUsers) })
      });
      setSelectedUsers(new Set());
      refetch();
    } catch (error) {
      console.error('Error deleting users:', error);
    }
  };

  const toggleUser = (userId: number) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  const toggleAll = () => {
    if (selectedUsers.size === users?.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(users?.map(u => u.id)));
    }
  };

  if (isLoading) {
    <Preloader/>
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <h1 className="text-3xl font-bold text-white mb-8">Users</h1>

        {/* Button Block */}
        <div className="mb-6 flex gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors">
            Add User
          </button>
          <button 
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={selectedUsers.size === 0}
            onClick={handleDeleteSelected}
          >
            Delete Selected ({selectedUsers.size})
          </button>
        </div>

        {/* Table */}
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-700 border-b border-gray-600">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.size === users?.length && users.length > 0}
                    onChange={toggleAll}
                    className="w-4 h-4 rounded border-gray-500 bg-gray-700 cursor-pointer"
                  />
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-200">Full Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-200">Roles</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-200">Birth Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {users?.map((user) => (
                <tr key={user.id} className="hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.has(user.id)}
                      onChange={() => toggleUser(user.id)}
                      className="w-4 h-4 rounded border-gray-500 bg-gray-700 cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-100">{user.fullName}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 flex-wrap">
                      {user.roles.map((role) => (
                        <span
                          key={role}
                          className="px-2 py-1 text-xs font-medium bg-blue-900 text-blue-200 rounded-full"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {getDate(user.birthDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
