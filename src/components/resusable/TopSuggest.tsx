import { ThumbsUpIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

function TopSuggest() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Suggestions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ThumbsUpIcon className="w-4 h-4 text-gray-900" />
              <span className="font-medium">Improve campus WiFi</span>
            </div>
            <span className="text-sm text-gray-500">12 Votes</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ThumbsUpIcon className="w-4 h-4 text-gray-900" />
              <span className="font-medium">Extend library hours</span>
            </div>
            <span className="text-sm text-gray-500">8 Votes</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ThumbsUpIcon className="w-4 h-4 text-gray-900" />
              <span className="font-medium">Improve campus security</span>
            </div>
            <span className="text-sm text-gray-500">6 Votes</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TopSuggest;
