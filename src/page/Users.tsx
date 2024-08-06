import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  makeUserModerator,
  removeModeratorRole,
  deleteUserAccount,
} from "@/lib/users";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowDown, ArrowUp, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

type User = {
  id: string;
  email: string;
  role: string;
  photoURL?: string;
  displayName?: string;
};

const UsersPage: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/"); // Redirect non-admin users
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersList = await getAllUsers();
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handlePromote = async (userId: string) => {
    try {
      await makeUserModerator(userId);
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, role: "moderator" } : user
        )
      );
    } catch (error) {
      console.error("Error promoting user:", error);
    }
  };

  const handleDemote = async (userId: string) => {
    try {
      await removeModeratorRole(userId);
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, role: "user" } : user
        )
      );
    } catch (error) {
      console.error("Error demoting user:", error);
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      await deleteUserAccount(userId);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto py-8 px-6 flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-gray-900">Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow-md rounded-lg p-4 flex items-center gap-2 w-fit"
          >
            <Avatar
              className={cn(
                "h-11 w-11 border-4 border-blue-900",
                user.role !== "user" && "border-purple-900"
              )}
            >
              <AvatarImage src={user.photoURL ?? "/placeholder-user.jpg"} />
              <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <h2 className="text-md font-semibold">{user.displayName}</h2>
              <p className="text-gray-600 text-xs">{user.email}</p>
            </div>

            <div className="flex space-x-2 mt-4">
              {user.role === "user" && (
                <Button
                  className="bg-green-500 text-white "
                  size={"sm"}
                  onClick={() => handlePromote(user.id)}
                  title="Upgrade to moderator"
                >
                  <ArrowUp size={16} />
                </Button>
              )}
              {user.role === "moderator" && (
                <Button
                  className="bg-yellow-500 text-white "
                  size={"sm"}
                  onClick={() => handleDemote(user.id)}
                  title="Demote to user"
                >
                  <ArrowDown size={16} />
                </Button>
              )}
              <Button
                className="bg-red-500 text-white "
                size={"sm"}
                onClick={() => handleDelete(user.id)}
                title="Delete account"
              >
                <Trash size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
