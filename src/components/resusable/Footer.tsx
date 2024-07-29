import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 py-4 px-6 shadow-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-white">
        <p>&copy; 2024 Campus Voice. All rights reserved.</p>
        <nav className="flex items-center gap-4 mt-4 md:mt-0">
          <Link to="#" className="hover:underline">
            Privacy Policy
          </Link>
          <Link to="#" className="hover:underline">
            Terms of Service
          </Link>
          <Link to="#" className="hover:underline">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
