import { CalendarIcon, ThumbsUpIcon } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Link } from "react-router-dom";
import data from "@/data/SuggestionInfo.json";
import { SuggestionTypes } from "@/types";

const SuggestModal = () => {
  return (
    <Link to={"/suggestion"}>
      {data.map((data: SuggestionTypes) => {
        return (
          <Card>
            <CardHeader>
              <CardTitle>{data.title}</CardTitle>
              <CardDescription>{data.description}</CardDescription>
              <div className=" flex flex-row gap-2 items-center text-sm">
                <span className=" p-1 bg-gray-200 rounded-md">{data.category}</span>
                <span className=" p-1 bg-gray-200 rounded-md"> {data.urgency} </span>
                <span className=" p-1 bg-gray-200 rounded-md"> {data.status} </span>
              </div>
            </CardHeader>
            <CardFooter className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CalendarIcon className="w-4 h-4" />
                <span>{data.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <ThumbsUpIcon className="w-4 h-4 fill-gray-900" />
                <span>{data.votes} votes</span>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </Link>
  );
};

export default SuggestModal;
