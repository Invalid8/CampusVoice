import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Filter() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [urgency, setUrgency] = useState("");
  const [status, setStatus] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleSubmit(e: any) {
    e.preventDefault();
    const query = new URLSearchParams({
      category,
      urgency,
      status,
    }).toString();
    navigate(`/suggestions?${query}`);
  }

  const isDisabled = !category && !urgency && !status;

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Filter Suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Select onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="infrastructure">Infrastructure</SelectItem>
                <SelectItem value="academics">Academics</SelectItem>
                <SelectItem value="campus-life">Campus Life</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setUrgency}>
              <SelectTrigger>
                <SelectValue placeholder="Urgency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="bg-gray-900 text-white hover:bg-gray-800"
            disabled={isDisabled}
          >
            Apply Filters
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export default Filter;
