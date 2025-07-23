
export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  price: number;
  originalPrice: number;
  condition: 'New' | 'Like New' | 'Very Good' | 'Good' | 'Acceptable';
  coverImage: string;
  category: string[];
  seller: {
    id: number;
    name: string;
    rating: number;
  };
  postedDate: string;
  campus: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  rating: number;
  campus: string;
}
