
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Search for textbooks, novels, study guides..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pr-10 rounded-r-none border-r-0"
        />
      </div>
      <Button type="submit" className="rounded-l-none bg-bookblue-700 hover:bg-bookblue-800">
        <Search className="h-4 w-4" />
        <span className="sr-only md:not-sr-only md:ml-2">Search</span>
      </Button>
    </form>
  );
};

export default SearchBar;
