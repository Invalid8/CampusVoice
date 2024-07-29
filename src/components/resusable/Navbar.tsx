import { LightbulbIcon } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Navbar() {
  return (
    <header className="bg-gray-900 py-4 px-6 shadow-sm">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-lg text-white"
        >
          <LightbulbIcon className="w-6 h-6 fill-white" />
          <span>Campus Voice</span>
        </Link>
        <nav className="flex items-center gap-4 md:flex">
          <Link to="/" className="text-white hover:underline">
            Home
          </Link>
          <Link to="/suggestions" className="text-white hover:underline">
            Suggestions
          </Link>
          <Link to="/contact" className="text-white hover:underline">
            Contact
          </Link>
        </nav>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JP</AvatarFallback>
              <span className="sr-only">Toggle user menu</span>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>My Account</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <nav className="flex items-center gap-4 mt-4 md:hidden">
        <Link to="/" className="text-white hover:underline">
          Home
        </Link>
        <Link to="/suggestions" className="text-white hover:underline">
          Suggestions
        </Link>
        <Link to="/contact" className="text-white hover:underline">
          Contact
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
