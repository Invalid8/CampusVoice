import { useState } from "react";
import { LockIcon, BellIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext"; // Assuming AuthContext is defined in this path
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Settings() {
  const { user } = useAuth();
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);
  const [isEditNotificationsOpen, setEditNotificationsOpen] = useState(false);
  const [isEditPrivacyOpen, setEditPrivacyOpen] = useState(false);

  const handleEditProfileOpen = () => setEditProfileOpen(true);
  const handleEditProfileClose = () => setEditProfileOpen(false);

  const handleEditNotificationsOpen = () => setEditNotificationsOpen(true);
  const handleEditNotificationsClose = () => setEditNotificationsOpen(false);

  const handleEditPrivacyOpen = () => setEditPrivacyOpen(true);
  const handleEditPrivacyClose = () => setEditPrivacyOpen(false);

  const handleSaveProfile = () => {
    // Logic to save the updated user information
    handleEditProfileClose();
  };

  const handleSaveNotifications = () => {
    // Logic to save the updated notification settings
    handleEditNotificationsClose();
  };

  const handleSavePrivacy = () => {
    // Logic to save the updated privacy settings
    handleEditPrivacyClose();
  };

  return (
    <div className="flex-1 max-w-6xl mx-auto py-8 px-6">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500">
            Manage your account settings, notifications, and privacy
            preferences.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Account Settings
          </h2>
          <div className="p-4 border rounded-md shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <UserIcon className="w-6 h-6 text-gray-700 mr-2" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Profile Information
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Update your personal information
                  </p>
                </div>
              </div>
              <Button
                className="bg-gray-900 text-white hover:bg-gray-800"
                onClick={handleEditProfileOpen}
              >
                Edit
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Notification Settings
          </h2>
          <div className="p-4 border rounded-md shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BellIcon className="w-6 h-6 text-gray-700 mr-2" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Notifications
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Manage your notification preferences
                  </p>
                </div>
              </div>
              <Button
                className="bg-gray-900 text-white hover:bg-gray-800"
                onClick={handleEditNotificationsOpen}
              >
                Edit
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Privacy Settings
          </h2>
          <div className="p-4 border rounded-md shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <LockIcon className="w-6 h-6 text-gray-700 mr-2" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Privacy</h3>
                  <p className="text-gray-500 text-sm">
                    Adjust your privacy settings
                  </p>
                </div>
              </div>
              <Button
                className="bg-gray-900 text-white hover:bg-gray-800"
                onClick={handleEditPrivacyOpen}
              >
                Edit
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog for editing profile information */}
      <Dialog open={isEditProfileOpen} onOpenChange={setEditProfileOpen}>
        <DialogContent className="sm:max-w-[425px] bg-background/80 backdrop-blur-sm">
          <DialogTitle className="text-center text-2xl font-bold">
            Edit Personal Information
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-lg font-bold">
            Update your personal information from your Google account.
          </DialogDescription>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <Input
                type="text"
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                defaultValue={user?.displayName || ""}
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                type="email"
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                defaultValue={user?.email || ""}
                disabled
              />
            </div>
            <div>
              <Button
                className="bg-gray-900 text-white hover:bg-gray-800 w-full"
                onClick={handleSaveProfile}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog for editing notification settings */}
      <Dialog
        open={isEditNotificationsOpen}
        onOpenChange={setEditNotificationsOpen}
      >
        <DialogContent className="sm:max-w-[425px] bg-background/80 backdrop-blur-sm">
          <DialogTitle className="text-center text-2xl font-bold">
            Edit Notification Settings
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-lg font-bold">
            Adjust your notification preferences.
          </DialogDescription>
          <form className="space-y-4">
            {/* Add your notification settings fields here */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Notification Email
              </label>
              <Input
                type="email"
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                defaultValue={user?.email || ""}
              />
            </div>
            <div>
              <Button
                className="bg-gray-900 text-white hover:bg-gray-800 w-full"
                onClick={handleSaveNotifications}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog for editing privacy settings */}
      <Dialog open={isEditPrivacyOpen} onOpenChange={setEditPrivacyOpen}>
        <DialogContent className="sm:max-w-[425px] bg-background/80 backdrop-blur-sm">
          <DialogTitle className="text-center text-2xl font-bold">
            Edit Privacy Settings
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-lg font-semibold">
            Adjust your privacy settings.
          </DialogDescription>
          <form className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="block text-sm font-medium text-gray-700">
                Profile Visibility
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a profile visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Button
                className="bg-gray-900 text-white hover:bg-gray-800 w-full"
                onClick={handleSavePrivacy}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Settings;
