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
      <form onSubmit={handleSearchSubmit} className="relative w-full">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="w-full p-2.5 rounded border-none text-sm text-black focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => searchQuery && setIsOpen(true)}
        />
        <button
          type="submit"
          className="absolute right-0 top-0 h-full w-10 border-none bg-[#ddd] cursor-pointer rounded-r hover:bg-[#ccc] transition"
        >
          <i className="fa fa-search" />
        </button>

        {/* Autocomplete Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border border-[#ddd] shadow-xl rounded-b mt-0 z-[1001] max-h-[500px] overflow-y-auto">
            {isLoading && (
              <div className="p-4 text-center text-gray-500 text-sm">
                Đang tìm kiếm...
              </div>
            )}

            {!isLoading && suggestions.length > 0 && (
              <>
                <div className="px-4 py-2 bg-gray-100 border-b border-gray-200 text-xs text-gray-600 font-semibold">
                  SẢN PHẨM
                </div>
                {suggestions.map((suggestion, index) => (
                  <div
                    key={suggestion._id || index}
                    onClick={() => handleSelectSuggestion(suggestion)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 transition ${
                      selectedIndex === index
                        ? "bg-blue-50"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="text-sm text-gray-800 font-medium truncate">
                      {suggestion.name}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {suggestion.slug}
                    </div>
                  </div>
                ))}
              </>
            )}

            {!isLoading && searchQuery && suggestions.length === 0 && (
              <div className="p-4 text-center text-gray-500 text-sm">
                Không tìm thấy sản phẩm nào
              </div>
            )}

            {searchQuery && suggestions.length > 0 && (
              <div
                onClick={handleSearchSubmit}
                className="px-4 py-3 bg-blue-500 text-white text-sm cursor-pointer hover:bg-blue-600 transition text-center font-medium"
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
