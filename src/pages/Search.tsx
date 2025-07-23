
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { books as allBooks } from "@/data/books";
import { Book } from "@/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const conditions = ["New", "Like New", "Very Good", "Good", "Acceptable"];

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("relevant");
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    // Extract unique categories from all books
    const categories = new Set<string>();
    allBooks.forEach(book => {
      book.category.forEach(cat => categories.add(cat));
    });
    setAvailableCategories(Array.from(categories));
    
    // Set initial books
    setBooks(allBooks);
  }, []);

  useEffect(() => {
    // Apply filters and search
    let results = [...allBooks];
    
    // Search query filter
    if (searchQuery) {
      results = results.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Price range filter
    results = results.filter(book => 
      book.price >= priceRange[0] && book.price <= priceRange[1]
    );
    
    // Condition filter
    if (selectedConditions.length > 0) {
      results = results.filter(book => 
        selectedConditions.includes(book.condition)
      );
    }
    
    // Category filter
    if (selectedCategories.length > 0) {
      results = results.filter(book => 
        book.category.some(cat => selectedCategories.includes(cat))
      );
    }
    
    // Sorting
    switch (sortBy) {
      case "price-low":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        results.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        results.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
        break;
      // default is "relevant" - no sorting needed
    }
    
    setFilteredBooks(results);
  }, [searchQuery, books, priceRange, selectedConditions, selectedCategories, sortBy]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
  };

  const handleConditionChange = (condition: string, checked: boolean) => {
    setSelectedConditions(prev => 
      checked 
        ? [...prev, condition]
        : prev.filter(c => c !== condition)
    );
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories(prev => 
      checked 
        ? [...prev, category]
        : prev.filter(c => c !== category)
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 100]);
    setSelectedConditions([]);
    setSelectedCategories([]);
    setSortBy("relevant");
    setSearchQuery("");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-64 space-y-6">
            <div>
              <h3 className="font-semibold text-lg text-bookblue-900 mb-4">Filters</h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearFilters}
                className="mb-4 w-full"
              >
                Clear All Filters
              </Button>
            </div>
            
            <div>
              <h4 className="font-medium text-sm text-bookblue-900 mb-2">Price Range</h4>
              <div className="py-4">
                <Slider
                  defaultValue={[0, 100]}
                  max={100}
                  step={5}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-bookblue-900 mb-2">Condition</h4>
              {conditions.map((condition) => (
                <div key={condition} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`condition-${condition}`} 
                    checked={selectedConditions.includes(condition)}
                    onCheckedChange={(checked) => 
                      handleConditionChange(condition, checked === true)
                    }
                  />
                  <Label htmlFor={`condition-${condition}`}>{condition}</Label>
                </div>
              ))}
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-bookblue-900 mb-2">Categories</h4>
              <div className="max-h-48 overflow-y-auto space-y-2">
                {availableCategories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`category-${category}`} 
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) => 
                        handleCategoryChange(category, checked === true)
                      }
                    />
                    <Label htmlFor={`category-${category}`}>{category}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Mobile Filter Button */}
          <div className="md:hidden mb-4">
            <Button 
              variant="outline" 
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="w-full"
            >
              {isMobileFilterOpen ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>
          
          {/* Mobile Filters */}
          {isMobileFilterOpen && (
            <div className="md:hidden space-y-6 bg-white p-4 rounded-lg shadow-md mb-4">
              <div>
                <h3 className="font-semibold text-lg text-bookblue-900 mb-4">Filters</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearFilters}
                  className="mb-4 w-full"
                >
                  Clear All Filters
                </Button>
              </div>
              
              <div>
                <h4 className="font-medium text-sm text-bookblue-900 mb-2">Price Range</h4>
                <div className="py-4">
                  <Slider
                    defaultValue={[0, 100]}
                    max={100}
                    step={5}
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-bookblue-900 mb-2">Condition</h4>
                {conditions.map((condition) => (
                  <div key={condition} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`mobile-condition-${condition}`} 
                      checked={selectedConditions.includes(condition)}
                      onCheckedChange={(checked) => 
                        handleConditionChange(condition, checked === true)
                      }
                    />
                    <Label htmlFor={`mobile-condition-${condition}`}>{condition}</Label>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-bookblue-900 mb-2">Categories</h4>
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {availableCategories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`mobile-category-${category}`} 
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => 
                          handleCategoryChange(category, checked === true)
                        }
                      />
                      <Label htmlFor={`mobile-category-${category}`}>{category}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
              <form onSubmit={handleSearchSubmit} className="w-full md:max-w-md">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search by title, author, or keywords"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-12"
                  />
                  <Button 
                    type="submit" 
                    size="sm"
                    className="absolute right-1 top-1 bg-bookblue-700"
                  >
                    Search
                  </Button>
                </div>
              </form>
              
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Label htmlFor="sort-by" className="whitespace-nowrap">Sort by:</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger id="sort-by" className="w-[180px]">
                    <SelectValue placeholder="Relevance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevant">Relevance</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600">{filteredBooks.length} results found</p>
            </div>
            
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No results found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                <Button 
                  variant="link" 
                  onClick={clearFilters} 
                  className="mt-4 text-bookblue-700"
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
