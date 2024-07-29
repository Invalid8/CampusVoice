import { EditIcon, SettingsIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Profile() {
  return (
    <div className="flex-1 max-w-6xl mx-auto py-8 px-6">
      <div className="grid md:grid-cols-[1fr_300px] gap-8">
        <div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <p className="text-gray-500">
              View and edit your profile information.
            </p>
            <Button className="bg-gray-900 text-white hover:bg-gray-800">
              <EditIcon className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Activities
              </h2>
              <Link className="text-gray-900 hover:underline" to="/activities">
                View All
              </Link>
            </div>
            <div className="grid gap-4">
              {/* Replace with actual activity components */}
              <div className="p-4 border rounded-md shadow-sm">
                <p className="text-gray-700">Activity 1</p>
                <p className="text-gray-500 text-sm">
                  Details about activity 1
                </p>
              </div>
              <div className="p-4 border rounded-md shadow-sm">
                <p className="text-gray-700">Activity 2</p>
                <p className="text-gray-500 text-sm">
                  Details about activity 2
                </p>
              </div>
              <div className="p-4 border rounded-md shadow-sm">
                <p className="text-gray-700">Activity 3</p>
                <p className="text-gray-500 text-sm">
                  Details about activity 3
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="p-4 border rounded-md shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              Profile Settings
            </h2>
            <Link
              to="/settings"
              className="flex items-center text-gray-900 hover:underline mt-4"
            >
              <SettingsIcon className="w-4 h-4 mr-2" />
              Edit Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
