import React from "react";
import { useNavigate } from "react-router-dom";
import { useLogout, useValidate } from "../hooks/useAuth";

export default function HomePage() {
  const navigate = useNavigate();

  const { data, isFetching } = useValidate();
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (err) {
      console.error(err);
    }
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }

  const user = data?.data?.user;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">Welcome to the Library</h2>
      <p className="text-gray-700 mb-4">Browse and manage books.</p>

      {user ? (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow">
          <p className="text-gray-800">
            Logged in as: <span className="font-semibold">{user.name}</span>
          </p>
          <button
            onClick={handleLogout}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Log out
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <p className="text-gray-500 mb-2">You are not logged in.</p>
          <button
            onClick={() => navigate("/auth/login")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Log in
          </button>
        </div>
      )}
    </div>
  );
}
