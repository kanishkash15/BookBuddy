
import { Link } from 'react-router-dom';
import { Book } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const discount = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute top-0 right-0 z-10">
          <Badge className="m-2 bg-bookorange-500">{discount}% OFF</Badge>
        </div>
        <Link to={`/book/${book.id}`}>
          <img 
            src={book.coverImage} 
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </Link>
      </div>
      <CardContent className="flex-1 p-4">
        <div className="space-y-2">
          <Link to={`/book/${book.id}`} className="block">
            <h3 className="font-semibold text-lg line-clamp-1 hover:text-bookblue-700">{book.title}</h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-1">by {book.author}</p>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-muted/50">{book.condition}</Badge>
            <Badge variant="outline" className="bg-muted/50">{book.campus}</Badge>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-lg font-bold text-bookblue-800">${book.price.toFixed(2)}</span>
            <span className="text-sm text-muted-foreground line-through">${book.originalPrice.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <div className="w-full flex gap-2">
          <Button className="w-full text-xs md:text-sm bg-bookblue-700 hover:bg-bookblue-800">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
