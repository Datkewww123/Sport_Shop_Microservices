import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchApi } from "../utils/api";

export default function SearchAutocomplete() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Fetch autocomplete suggestions
  const fetchSuggestions = useCallback(async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetchApi(
        `/products/autocomplete?q=${encodeURIComponent(query)}`
      );
      setSuggestions(response || []);
      setIsOpen(true);
      setSelectedIndex(-1);
    } catch (error) {
      console.error("Lỗi khi tải gợi ý:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSuggestions(searchQuery);
    }, 300); // Wait 300ms after user stops typing

    return () => clearTimeout(timer);
  }, [searchQuery, fetchSuggestions]);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSelectSuggestion(suggestions[selectedIndex]);
        } else if (searchQuery.trim()) {
          handleSearchSubmit(e);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
  };

  // Handle suggestion selection
  const handleSelectSuggestion = (suggestion) => {
    navigate(`/san-pham/${suggestion.slug}`);
    setSearchQuery("");
    setSuggestions([]);
    setIsOpen(false);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tim-kiem?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="flex-grow mx-10 relative hidden lg:block w-full md:w-auto">
      <form onSubmit={handleSearchSubmit} className="search-bar-wrapper flex items-center bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg overflow-hidden relative w-full shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="search-input w-full py-2.5 pl-4 pr-12 text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 bg-transparent focus:outline-none border-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => searchQuery && setIsOpen(true)}
        />
        <button
          type="submit"
          className="search-button absolute right-0 top-0 h-full w-11 flex items-center justify-center bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 border-l border-gray-200 dark:border-l-slate-700 text-gray-600 dark:text-slate-300 transition cursor-pointer"
        >
          <i className="fa fa-search" />
        </button>

        {/* Autocomplete Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-2xl rounded-b-xl mt-0.5 z-[1001] max-h-[500px] overflow-y-auto">
            {isLoading && (
              <div className="p-4 text-center text-gray-500 dark:text-slate-400 text-sm">
                Đang tìm kiếm...
              </div>
            )}

            {!isLoading && suggestions.length > 0 && (
              <>
                <div className="px-4 py-2 bg-gray-50 dark:bg-slate-900/60 border-b border-gray-100 dark:border-slate-700 text-xs text-gray-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                  SẢN PHẨM
                </div>
                {suggestions.map((suggestion, index) => (
                  <div
                    key={suggestion._id || index}
                    onClick={() => handleSelectSuggestion(suggestion)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`px-4 py-3 cursor-pointer border-b border-gray-50 dark:border-slate-700/50 last:border-b-0 transition-colors duration-150 ${
                      selectedIndex === index
                        ? "bg-red-50 dark:bg-slate-700/50"
                        : "hover:bg-gray-50 dark:hover:bg-slate-700/20"
                    }`}
                  >
                    <div className="text-sm text-gray-800 dark:text-slate-200 font-semibold truncate">
                      {suggestion.name}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-slate-500 truncate mt-0.5">
                      {suggestion.slug}
                    </div>
                  </div>
                ))}
              </>
            )}

            {!isLoading && searchQuery && suggestions.length === 0 && (
              <div className="p-4 text-center text-gray-500 dark:text-slate-400 text-sm">
                Không tìm thấy sản phẩm nào
              </div>
            )}

            {searchQuery && suggestions.length > 0 && (
              <div
                onClick={handleSearchSubmit}
                className="px-4 py-3 bg-primary hover:bg-red-700 text-white text-sm cursor-pointer transition text-center font-bold"
              >
                Xem tất cả kết quả tìm kiếm ({searchQuery})
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
