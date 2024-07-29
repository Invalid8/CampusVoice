import { Link } from "react-router-dom";
import { HomeIcon } from "lucide-react";

function PageNotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center bg-muted py-12 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold md:text-6xl">Page Not Found</h1>
          <p className="text-muted-foreground text-lg md:text-xl">
            Oops! The page you are looking for does not exist.
          </p>

          <div className="space-y-4 md:space-y-0 md:flex md:items-center md:justify-center md:gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-md py-2 px-4"
            >
              <HomeIcon className="h-5 w-5" />
              <span>Go to Home</span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-primary text-primary rounded-md py-2 px-4"
            >
              <span>Contact Support</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PageNotFound;
