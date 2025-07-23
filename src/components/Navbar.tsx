import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";
import { BookOpen, User, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Auth } from "@/components/Auth";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-bookblue-800" />
            <span className="font-bold text-xl text-bookblue-800">Eduvault</span>
          </Link>
          
          <div className="hidden md:block flex-1 px-10">
            <SearchBar />
          </div>
          {/* comment */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/search">
              <Button variant="ghost">Browse Books</Button>
            </Link>
            <Link to="/sell">
              <Button variant="ghost">Sell Books</Button>
            </Link>
            {!user && (
              <>
                <Link to="/login">
                  <Button variant="outline" className="flex items-center gap-2">
                    <User className="h-4 w-4" /> Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-bookblue-700 hover:bg-bookblue-800">Sign Up</Button>
                </Link>
              </>
            )}
            {user && (
              <Auth />
            )}
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-bookorange-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-bookblue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <div className="py-2">
              <SearchBar />
            </div>
            <Link to="/search" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              Browse Books
            </Link>
            <Link to="/sell" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              Sell Books
            </Link>
            {!user && (
              <>
                <Link to="/login" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                  Login
                </Link>
                <Link to="/signup" className="block px-3 py-2 text-base font-medium bg-bookblue-700 text-white rounded-md hover:bg-bookblue-800">
                  Sign Up
                </Link>
              </>
            )}
            {user && (
              <Auth />
            )}
            <Link to="/cart" className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md">
              <ShoppingCart className="h-5 w-5 mr-2" /> Cart <span className="ml-1 bg-bookorange-500 text-white rounded-full text-xs px-2">0</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
