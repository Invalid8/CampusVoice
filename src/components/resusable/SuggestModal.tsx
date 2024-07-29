import { CalendarIcon, ThumbsUpIcon } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const SuggestModal = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Extend library hours</CardTitle>
        <CardDescription>
          The library closes too early, especially during exam periods. We need
          extended hours to allow students more time to study and access
          resources.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <CalendarIcon className="w-4 h-4" />
          <span>5 days ago</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <ThumbsUpIcon className="w-4 h-4 fill-gray-900" />
          <span>8 Votes</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SuggestModal;
