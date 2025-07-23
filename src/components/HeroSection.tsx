
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-b from-fffbeb to-white py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-bookblue-900 leading-tight">
            Trade Books, <span className="text-bookorange-500">Save Money</span>, 
            <br className="hidden md:block" /> Help Fellow Students
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-xl">
            The student-friendly marketplace for affordable textbooks. 
            Buy, sell, and trade with students on your campus.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/search">
              <Button className="bg-bookblue-700 hover:bg-bookblue-800 text-lg py-6 px-8">
                Find Books
              </Button>
            </Link>
            <Link to="/sell">
              <Button variant="outline" className="border-bookblue-700 text-bookblue-700 hover:bg-bookblue-50 hover:text-bookblue-800 text-lg py-6 px-8">
                Sell Your Books
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-bookblue-200 flex items-center justify-center text-xs text-bookblue-800">S</div>
              <div className="w-8 h-8 rounded-full bg-bookorange-200 flex items-center justify-center text-xs text-bookorange-800">J</div>
              <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center text-xs text-green-800">M</div>
            </div>
            <p className="text-sm text-gray-600">Join 1,200+ students already trading!</p>
          </div>
        </div>
        <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-64 h-64 bg-bookorange-400 rounded-lg transform rotate-6"></div>
            <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-bookblue-300 rounded-lg transform -rotate-6"></div>
            <img 
              src="https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=600&h=400&fit=crop" 
              alt="Students trading books"
              className="relative z-10 w-80 h-80 object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
