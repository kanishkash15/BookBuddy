
import { useEffect, useState } from 'react';
import { Book } from '@/types';
import BookCard from './BookCard';
import { books } from '@/data/books';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FeaturedBooks = () => {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  
  useEffect(() => {
    // In a real app, this would fetch from API
    // For now, we'll just use the mock data
    setFeaturedBooks(books.slice(0, 4));
  }, []);
  
  return (
    <div className="py-12 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-bookblue-900">Featured Books</h2>
          <Link to="/search">
            <Button variant="outline" className="border-bookblue-700 text-bookblue-700 hover:bg-bookblue-50">
              View All
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedBooks;
