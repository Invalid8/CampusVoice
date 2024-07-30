import { SuggestModal, Filter, TopSuggest } from "@/components/resusable";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex-1 max-w-6xl mx-auto py-8 px-6">
      <div className="grid md:grid-cols-[1fr_300px] gap-8">
        <div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">Suggestions</h1>
            <p className="text-gray-500">
              Share your ideas and feedback to help improve our university.
            </p>
            <Button className="bg-gray-900 text-white hover:bg-gray-800">
              <PlusIcon className="w-4 h-4 mr-2" />
              Submit Suggestion
            </Button>
          </div>
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Suggestions
              </h2>
              <Link className="text-gray-900 hover:underline" to="/suggestions">
                View All
              </Link>
            </div>
            <div className="grid gap-4">
              <SuggestModal />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <Filter />
          <TopSuggest />
        </div>
      </div>
    </div>
  );
}

export default Home;
