
import { Book } from "../types";

export const books: Book[] = [
  {
    id: 1,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
    description: "This internationally acclaimed textbook provides a comprehensive introduction to the modern study of computer algorithms. It covers a broad range of algorithms in depth, yet makes their design and analysis accessible to all levels of readers.",
    price: 45.99,
    originalPrice: 89.99,
    condition: "Very Good",
    coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765",
    category: ["Computer Science", "Algorithms", "Textbook"],
    seller: {
      id: 101,
      name: "Alex Johnson",
      rating: 4.8
    },
    postedDate: "2023-04-15",
    campus: "Main Campus"
  },
  {
    id: 2,
    title: "Organic Chemistry",
    author: "Paula Yurkanis Bruice",
    description: "A comprehensive guide to understanding organic chemistry principles with clear explanations and numerous problem-solving strategies.",
    price: 39.50,
    originalPrice: 75.00,
    condition: "Good",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    category: ["Chemistry", "Science", "Textbook"],
    seller: {
      id: 102,
      name: "Jamie Smith",
      rating: 4.5
    },
    postedDate: "2023-05-02",
    campus: "Science Campus"
  },
  {
    id: 3,
    title: "Principles of Economics",
    author: "N. Gregory Mankiw",
    description: "This market-leading text teaches students the principles of economics through relevant examples and applications.",
    price: 35.00,
    originalPrice: 69.99,
    condition: "Like New",
    coverImage: "https://images.unsplash.com/photo-1589998059171-988d887df646",
    category: ["Economics", "Business", "Textbook"],
    seller: {
      id: 103,
      name: "Taylor Rodriguez",
      rating: 4.9
    },
    postedDate: "2023-04-28",
    campus: "Business School"
  },
  {
    id: 4,
    title: "Physics for Scientists and Engineers",
    author: "Raymond A. Serway, John W. Jewett",
    description: "A research-based approach to physics that emphasizes conceptual understanding along with quantitative problem solving.",
    price: 50.25,
    originalPrice: 95.50,
    condition: "Good",
    coverImage: "https://images.unsplash.com/photo-1621944190310-e3cca1564bd7",
    category: ["Physics", "Science", "Textbook"],
    seller: {
      id: 104,
      name: "Morgan Chen",
      rating: 4.7
    },
    postedDate: "2023-05-10",
    campus: "Science Campus"
  },
  {
    id: 5,
    title: "Calculus: Early Transcendentals",
    author: "James Stewart",
    description: "This bestselling calculus textbook provides a solid foundation with precise explanations, superb exercises, and carefully crafted examples.",
    price: 42.75,
    originalPrice: 84.99,
    condition: "Very Good",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    category: ["Mathematics", "Calculus", "Textbook"],
    seller: {
      id: 105,
      name: "Jordan Taylor",
      rating: 4.6
    },
    postedDate: "2023-04-18",
    campus: "Math Department"
  },
  {
    id: 6,
    title: "The Art of Computer Programming",
    author: "Donald E. Knuth",
    description: "A comprehensive treatise on computer programming and algorithms, considered one of the most influential works in the field.",
    price: 60.00,
    originalPrice: 119.99,
    condition: "New",
    coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765",
    category: ["Computer Science", "Programming", "Advanced"],
    seller: {
      id: 106,
      name: "Sam Wilson",
      rating: 5.0
    },
    postedDate: "2023-05-05",
    campus: "Engineering Building"
  },
  {
    id: 7,
    title: "Introduction to Psychology",
    author: "David G. Myers, C. Nathan DeWall",
    description: "A leading psychology textbook that gives students insight into how psychologists think and how to think critically about psychological science.",
    price: 30.50,
    originalPrice: 65.00,
    condition: "Acceptable",
    coverImage: "https://images.unsplash.com/photo-1576872381149-7847515ce5d8",
    category: ["Psychology", "Social Science", "Textbook"],
    seller: {
      id: 107,
      name: "Casey Martin",
      rating: 4.3
    },
    postedDate: "2023-04-25",
    campus: "Liberal Arts Center"
  },
  {
    id: 8,
    title: "Campbell Biology",
    author: "Lisa A. Urry, Michael L. Cain, Steven A. Wasserman, Peter V. Minorsky",
    description: "A trusted and acclaimed biology textbook that helps students develop a deeper understanding of essential biological concepts.",
    price: 55.25,
    originalPrice: 109.99,
    condition: "Very Good",
    coverImage: "https://images.unsplash.com/photo-1530538987395-032d1800fdd4",
    category: ["Biology", "Science", "Textbook"],
    seller: {
      id: 108,
      name: "Riley Green",
      rating: 4.7
    },
    postedDate: "2023-05-08",
    campus: "Science Campus"
  }
];
