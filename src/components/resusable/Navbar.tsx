import { LightbulbIcon, PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { SuggestionForm } from ".";
import { useState } from "react";

function Navbar() {
  const { user, showLogin, signOut } = useAuth();

  const [open, setOpen] = useState<boolean>(false);

  return (
    <header className="bg-gray-900 py-4 px-6 shadow-sm">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-lg text-white"
        >
          <LightbulbIcon className="w-6 h-6 fill-white" />
          <span className="font-semibold">
            <span className="sm:flex hidden">Campus Voice</span>
            <span className="sm:hidden flex ">CV</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-4 lg:gap-6 md:flex">
          <Link to="/" className="text-white hover:underline">
            Home
          </Link>
          <Link to="/about" className="text-white hover:underline">
            About
          </Link>
          <Link to="/suggestions" className="text-white hover:underline">
            Suggestions
          </Link>
          <Link to="/contact" className="text-white hover:underline">
            Contact
          </Link>
        </nav>
        {user && (
          <div className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user.photoURL ?? "/placeholder-user.jpg"} />
                  <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
                  <span className="sr-only">Toggle user menu</span>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="hover:bg-transparent hover:bg-none">
                  <div className="flex flex-col gap-1">
                    <h5 className="font-bold">{user.displayName}</h5>
                    <p>{user.email}</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => (window.location.href = "/profile")}
                >
                  My Account
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => (window.location.href = "/settings")}
                >
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => signOut()}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant={"secondary"}
              className="gap-1"
              onClick={() => setOpen(true)}
            >
              <PlusIcon className="w-4 h-4" />
              <span className="hidden sm:flex">Create Suggestion</span>
            </Button>
            <SuggestionForm
              open={open}
              onClose={() => {
                setOpen(!open);
              }}
            />
          </div>
        )}
        {!user && (
          <Button
            className="flex h-10 items-center gap-1.5 w-auto justify-center rounded-md bg-primary-foreground px-6 text-sm font-medium text-primary shadow transition-colors hover:bg-primary-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            onClick={() => showLogin()}
          >
            <span>Sign in</span>
          </Button>
        )}
      </div>
      <nav className="flex items-center gap-4 mt-4 md:hidden">
        <Link to="/" className="text-white hover:underline">
          Home
        </Link>
        <Link to="/about" className="text-white hover:underline">
          About
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
