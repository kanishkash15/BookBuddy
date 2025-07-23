
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedBooks from "@/components/FeaturedBooks";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturedBooks />
        
        {/* How it works section */}
        <div className="bg-bookblue-50 py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-bookblue-900 mb-12">How Eduvault Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-bookorange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-bookorange-600 text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-bookblue-800">List Your Books</h3>
                <p className="text-gray-600">Take photos of your books, set your price, and create a listing in minutes.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-bookorange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-bookorange-600 text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-bookblue-800">Connect with Buyers</h3>
                <p className="text-gray-600">Students on your campus will contact you through our secure messaging system.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-bookorange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-bookorange-600 text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-bookblue-800">Make the Exchange</h3>
                <p className="text-gray-600">Meet on campus to exchange the book for payment or ship it using our tools.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA section */}
        <div className="bg-gradient-to-r from-bookblue-800 to-bookblue-900 text-white py-16 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to save on textbooks?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">Join Eduvault today and connect with students on your campus to buy and sell textbooks at reasonable prices.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup">
                <Button className="bg-bookorange-500 hover:bg-bookorange-600 text-white py-6 px-8 text-lg">
                  Sign Up Now
                </Button>
              </Link>
              <Link to="/search">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-bookblue-900 py-6 px-8 text-lg">
                  Browse Books
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
