import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { getMyListings, deleteBook } from "@/lib/firebase";
import { Pencil, Trash2 } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  price: string;
  condition: string;
  imageUrl: string;
  status: string;
  createdAt: string;
}

export default function MyListings() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadBooks();
  }, [user]);

  const loadBooks = async () => {
    if (!user) return;
    try {
      const listings = await getMyListings(user.uid);
      setBooks(listings as Book[]);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to load listings",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookId: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;

    try {
      const { error } = await deleteBook(bookId);
      if (error) throw new Error(error);
      
      toast({
        title: "Success",
        description: "Book listing deleted successfully",
      });
      
      setBooks(books.filter(book => book.id !== bookId));
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete listing",
      });
    }
  };

  const handleEdit = (bookId: string) => {
    navigate(`/edit-book/${bookId}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">My Listings</h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Listings</h1>
          <Button onClick={() => navigate("/sell")}>
            Add New Book
          </Button>
        </div>

        {books.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">You haven't listed any books yet.</p>
            <Button onClick={() => navigate("/sell")}>
              List Your First Book
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="aspect-w-3 aspect-h-4">
                  <img
                    src={book.imageUrl || "/placeholder-book.png"}
                    alt={book.title}
                    className="object-cover w-full h-48"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1 truncate">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{book.author}</p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-lg">${book.price}</span>
                    <span className="text-sm text-gray-500 capitalize">
                      {book.condition}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm px-2 py-1 rounded ${
                      book.status === "available"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
                    </span>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(book.id)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(book.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 