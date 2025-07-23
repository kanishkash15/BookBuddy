import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { addBook, uploadImage } from "@/lib/firebase";

interface BookData {
  title: string;
  author: string;
  isbn: string;
  condition: string;
  price: string;
  description: string;
  category: string;
  imageUrl: string;
}

const initialBookData: BookData = {
  title: "",
  author: "",
  isbn: "",
  condition: "",
  price: "",
  description: "",
  category: "",
  imageUrl: "",
};

export default function Sell() {
  const [bookData, setBookData] = useState<BookData>(initialBookData);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string>("");
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBookData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setBookData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!bookData.title.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a book title",
      });
      return false;
    }

    if (!bookData.author.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter an author name",
      });
      return false;
    }

    if (!bookData.isbn.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter an ISBN",
      });
      return false;
    }

    if (!bookData.category) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a category",
      });
      return false;
    }

    if (!bookData.condition) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a condition",
      });
      return false;
    }

    if (!bookData.price || parseFloat(bookData.price) <= 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid price",
      });
      return false;
    }

    if (!bookData.description.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a description",
      });
      return false;
    }

    return true;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageError("");
    const file = e.target.files?.[0];
    
    if (!file) {
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setImageError('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setImageError('Image size should be less than 5MB');
      return;
    }

    setImageFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You must be logged in to sell books",
      });
      return;
    }

    if (!validateForm()) {
      return;
    }

    if (!imageFile) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please upload an image of your book",
      });
      return;
    }

    setLoading(true);
    try {
      // Upload image and get URL
      const imageUrl = await uploadImage(imageFile);
      
      // Add book to database
      const { id, error } = await addBook({
        ...bookData,
        imageUrl,
        sellerId: user.uid,
        sellerEmail: user.email,
        status: "available",
      });

      if (error) throw new Error(error);

      toast({
        title: "Success",
        description: "Your book has been listed successfully!",
      });

      // Reset form
      setBookData(initialBookData);
      setImageFile(null);
      navigate("/my-listings");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to list book",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Sell Your Book</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Book Title</Label>
              <Input
                id="title"
                name="title"
                value={bookData.title}
                onChange={handleInputChange}
                required
                placeholder="Enter book title"
              />
            </div>

            <div>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                value={bookData.author}
                onChange={handleInputChange}
                required
                placeholder="Enter author name"
              />
            </div>

            <div>
              <Label htmlFor="isbn">ISBN</Label>
              <Input
                id="isbn"
                name="isbn"
                value={bookData.isbn}
                onChange={handleInputChange}
                required
                placeholder="Enter ISBN"
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={bookData.category}
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="textbook">Textbook</SelectItem>
                  <SelectItem value="fiction">Fiction</SelectItem>
                  <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                  <SelectItem value="reference">Reference</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="condition">Condition</Label>
              <Select
                value={bookData.condition}
                onValueChange={(value) => handleSelectChange("condition", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="like-new">Like New</SelectItem>
                  <SelectItem value="very-good">Very Good</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={bookData.price}
                onChange={handleInputChange}
                required
                placeholder="Enter price"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={bookData.description}
                onChange={handleInputChange}
                required
                placeholder="Describe your book's condition, edition, any highlights or notes, etc."
                className="h-32"
              />
            </div>

            <div>
              <Label htmlFor="image">Book Image</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
              />
              {imageError && (
                <p className="text-sm text-red-500 mt-1">{imageError}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                Upload a clear image of your book (max 5MB)
              </p>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading || !!imageError}
          >
            {loading ? "Listing Book..." : "List Book for Sale"}
          </Button>
        </form>
      </div>
    </div>
  );
} 