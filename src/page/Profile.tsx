import { SettingsIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SuggestModal } from "@/components/resusable";
import { Loader } from "@/components/ui/loader";
import { useEffect, useState } from "react";
import { getUserSuggestions, Suggestion } from "@/lib/suggestion";
import { useAuth } from "@/context/AuthContext";

function Profile() {
  const [allSuggestions, setAllSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTopSuggestions = async () => {
      setLoading(true);

      try {
        const allSuggestions = await getUserSuggestions(user?.uid ?? "");
        setAllSuggestions(allSuggestions);
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
      }

      setLoading(false);
    };

    fetchTopSuggestions();
  }, [user]);

  return (
    <div className="flex-1 max-w-6xl mx-auto py-8 px-6">
      <div className="grid gap-8">
        <div className="grid gap-4">
          <div className="justify-between flex items-center gap-6 flex-wrap">
            <h1 className="text-3xl font-bold text-gray-900"></h1>

            <Link to="/settings">
              <Button className="bg-gray-900 text-white hover:bg-gray-800">
                <SettingsIcon className="w-4 h-4 mr-2" />
                Edit Settings
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-center">My Suggestions</h1>
          <div className="grid gap-8 h-full">
            {loading && (
              <div className="div py-8 px-6">
                <Loader />
              </div>
            )}
            {!loading && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {allSuggestions.map((suggestion) => (
                  <SuggestModal suggestion={suggestion} key={suggestion.id} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
