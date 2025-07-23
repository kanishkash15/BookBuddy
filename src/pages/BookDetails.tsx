
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Book } from "@/types";
import { books } from "@/data/books";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchBook = () => {
      setLoading(true);
      try {
        const foundBook = books.find(b => b.id === parseInt(id || "0"));
        if (foundBook) {
          setBook(foundBook);
        } else {
          navigate("/not-found");
        }
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, navigate]);

  const handleAddToCart = () => {
    toast({
      title: "Added to cart!",
      description: `${book?.title} has been added to your cart`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto py-8 px-4">
          <div className="flex justify-center items-center h-full">
            <div className="animate-pulse flex flex-col md:flex-row gap-8 w-full max-w-4xl">
              <div className="w-full md:w-1/3 bg-gray-200 rounded-lg h-96"></div>
              <div className="w-full md:w-2/3 space-y-4">
                <div className="h-10 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!book) {
    return <p>Book not found</p>;
  }

  const discount = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
          <div className="w-full md:w-1/3">
            <div className="sticky top-24">
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <Badge className="absolute top-4 right-4 bg-bookorange-500">{discount}% OFF</Badge>
                <img 
                  src={book.coverImage} 
                  alt={book.title} 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-2/3 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-bookblue-900">{book.title}</h1>
              <p className="text-lg text-gray-600">by {book.author}</p>
            </div>
            
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-bookblue-800">${book.price.toFixed(2)}</span>
              <span className="text-lg text-gray-500 line-through">${book.originalPrice.toFixed(2)}</span>
              <Badge variant="outline" className="ml-2 text-bookorange-700 bg-bookorange-50 border-bookorange-200">
                Save ${(book.originalPrice - book.price).toFixed(2)}
              </Badge>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{book.condition}</Badge>
              {book.category.map((cat) => (
                <Badge key={cat} variant="outline">{cat}</Badge>
              ))}
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-bookblue-900">Description</h2>
              <p className="text-gray-700">{book.description}</p>
            </div>
            
            <Card className="p-4 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-bookblue-200 flex items-center justify-center">
                  <span className="font-semibold text-bookblue-700">{book.seller.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium">Seller: {book.seller.name}</p>
                  <div className="flex items-center">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(book.seller.rating) ? "text-yellow-400" : "text-gray-300"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-1 text-sm text-gray-600">({book.seller.rating})</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-600">
                <p>Location: {book.campus}</p>
                <p>Posted: {book.postedDate}</p>
              </div>
            </Card>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                size="lg" 
                className="bg-bookblue-700 hover:bg-bookblue-800 flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="border-bookblue-700 text-bookblue-700 hover:bg-bookblue-50 flex-1">
                Contact Seller
              </Button>
            </div>
            
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookDetails;
