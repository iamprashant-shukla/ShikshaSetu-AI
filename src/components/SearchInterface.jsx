import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, X, SlidersHorizontal, Sparkles } from 'lucide-react';
import { searchEngine } from '../utils/searchEngine';
import PolicyCard from './PolicyCard';

const SearchInterface = ({ onPolicySelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    sortBy: 'relevance'
  });
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const searchRef = useRef();

  useEffect(() => {
    setResults(searchEngine.search('', filters));
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [query, filters]);

  const handleSearch = async () => {
    setIsSearching(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    const searchResults = searchEngine.search(query, filters);
    setResults(searchResults);
    setIsSearching(false);
  };

  const handleQueryChange = (value) => {
    setQuery(value);
    if (value.length > 1) {
      const newSuggestions = searchEngine.getSuggestions(value);
      setSuggestions(newSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const quickSearches = [
    'PM SHRI Schools',
    'Digital Education',
    'Scholarship Programs',
    'Teacher Training'
  ];

  const categories = searchEngine.getCategories();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Premium Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-900">AI-Powered Search Engine</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Policy Search
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore <span className="font-semibold text-blue-600">6 education schemes</span> with 
            <span className="font-semibold text-green-600"> ₹88,410 crores</span> in funding
          </p>
        </div>

        {/* Premium Search Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative">
            <div className="absolute left-5 top-1/2 -translate-y-1/2">
              <Search className={`h-5 w-5 ${isSearching ? 'text-blue-600 animate-pulse' : 'text-gray-400'}`} />
            </div>
            
            <input
              ref={searchRef}
              type="text"
              placeholder="Search by name, category, budget amount..."
              className="w-full pl-14 pr-40 py-4 text-base bg-white border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm hover:shadow-md"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              onFocus={() => setShowSuggestions(suggestions.length > 0)}
            />
            
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
              {query && (
                <button
                  onClick={() => {setQuery(''); setShowSuggestions(false);}}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  title="Clear"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              )}
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all ${
                  showFilters 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span className="text-sm hidden sm:block">Filters</span>
              </button>
            </div>
          </div>

          {/* AI Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden max-w-4xl mx-auto">
              <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
                <p className="text-xs font-semibold text-blue-900 uppercase">Suggestions</p>
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuery(suggestion);
                    setShowSuggestions(false);
                  }}
                  className="w-full text-left px-5 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-800 font-medium">{suggestion}</span>
                    <Search className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Searches */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-gray-600">Quick searches:</span>
            {quickSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => handleQueryChange(search)}
                className="px-4 py-2 bg-white border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-700 hover:text-blue-700 rounded-xl text-sm font-medium transition-all shadow-sm hover:shadow"
              >
                {search}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Filters Panel */}
        {showFilters && (
          <div className="max-w-4xl mx-auto mb-8 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Advanced Filters</h3>
                <button
                  onClick={() => setFilters({ category: 'all', sortBy: 'relevance' })}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Reset
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm font-medium"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm font-medium"
                  >
                    <option value="relevance">Most Relevant</option>
                    <option value="budget_desc">Highest Budget</option>
                    <option value="budget_asc">Lowest Budget</option>
                    <option value="name">Alphabetical (A-Z)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-gray-600">
              Found <span className="font-bold text-gray-900 text-lg">{results.length}</span> {results.length === 1 ? 'policy' : 'policies'}
            </p>
            {query && (
              <p className="text-xs text-gray-500 mt-1">
                Showing results for "<span className="font-medium text-blue-600">{query}</span>"
              </p>
            )}
          </div>
          {(query || filters.category !== 'all' || filters.sortBy !== 'relevance') && (
            <button
              onClick={() => {
                setQuery('');
                setFilters({ category: 'all', sortBy: 'relevance' });
              }}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Results Grid */}
        {isSearching ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-600 font-medium mt-4">Searching policies...</p>
            <p className="text-xs text-gray-500 mt-1">Please wait</p>
          </div>
        ) : results.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((policy) => (
              <PolicyCard
                key={policy.id}
                policy={policy}
                onSelect={() => onPolicySelect(policy)}
                searchQuery={query}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No policies found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Try adjusting your search terms or filters to find what you're looking for
            </p>
            <button
              onClick={() => {
                setQuery('');
                setFilters({ category: 'all', sortBy: 'relevance' });
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              Reset Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchInterface;
