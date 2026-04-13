'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sliders, X } from 'lucide-react';

interface FilterState {
  rarity: string[];
  priceRange: [number, number];
  sortBy: string;
  collection: string[];
  searchQuery: string;
}

interface AdvancedFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export function AdvancedFilters({ onFilterChange }: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    rarity: [],
    priceRange: [0, 100],
    sortBy: 'newest',
    collection: [],
    searchQuery: '',
  });

  const rarityOptions = ['Common', 'Rare', 'Epic', 'Legendary'];
  const collectionOptions = ['Cyber Minds', 'Digital Dreams', 'Abstract Art', 'AI Genesis'];
  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'trending', label: 'Trending' },
    { value: 'most-liked', label: 'Most Liked' },
  ];

  const handleRarityToggle = (rarity: string) => {
    const newRarity = filters.rarity.includes(rarity)
      ? filters.rarity.filter((r) => r !== rarity)
      : [...filters.rarity, rarity];
    const newFilters = { ...filters, rarity: newRarity };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCollectionToggle = (collection: string) => {
    const newCollection = filters.collection.includes(collection)
      ? filters.collection.filter((c) => c !== collection)
      : [...filters.collection, collection];
    const newFilters = { ...filters, collection: newCollection };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (value: [number, number]) => {
    const newFilters = { ...filters, priceRange: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (value: string) => {
    const newFilters = { ...filters, sortBy: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearchChange = (query: string) => {
    const newFilters = { ...filters, searchQuery: query };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      rarity: [],
      priceRange: [0, 100],
      sortBy: 'newest',
      collection: [],
      searchQuery: '',
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const activeFilterCount =
    filters.rarity.length + filters.collection.length + (filters.searchQuery ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="glass rounded-lg px-4 py-3">
        <input
          type="text"
          placeholder="Search NFTs..."
          value={filters.searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full bg-transparent text-white placeholder-gray-500 outline-none"
        />
      </div>

      {/* Filter Toggle & Sort */}
      <div className="flex gap-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex-1 glass rounded-lg px-4 py-3 flex items-center space-x-2 hover:bg-[rgba(0,217,255,0.08)] transition-colors font-semibold"
        >
          <Sliders className="w-5 h-5 text-cyan-400" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="ml-auto bg-cyan-400/20 text-cyan-400 px-2 py-1 rounded-full text-xs font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>

        <select
          value={filters.sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="flex-1 glass rounded-lg px-4 py-3 bg-transparent text-white font-semibold hover:bg-[rgba(0,217,255,0.08)] transition-colors appearance-none cursor-pointer"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value} className="bg-[#0a0e1f]">
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="glass rounded-lg p-6 space-y-6 overflow-hidden"
          >
            {/* Rarity Filter */}
            <div>
              <h3 className="font-semibold mb-3">Rarity</h3>
              <div className="space-y-2">
                {rarityOptions.map((rarity) => (
                  <label
                    key={rarity}
                    className="flex items-center space-x-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={filters.rarity.includes(rarity)}
                      onChange={() => handleRarityToggle(rarity)}
                      className="w-4 h-4 rounded accent-cyan-400 cursor-pointer"
                    />
                    <span className="text-sm text-gray-300 group-hover:text-cyan-400 transition-colors">
                      {rarity}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <h3 className="font-semibold mb-3">Price Range (ETH)</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.priceRange[0]}
                    onChange={(e) =>
                      handlePriceChange([
                        parseInt(e.target.value),
                        filters.priceRange[1],
                      ])
                    }
                    className="flex-1 h-2 bg-[rgba(0,217,255,0.1)] rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      handlePriceChange([
                        filters.priceRange[0],
                        parseInt(e.target.value),
                      ])
                    }
                    className="flex-1 h-2 bg-[rgba(0,217,255,0.1)] rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{filters.priceRange[0]} ETH</span>
                  <span>{filters.priceRange[1]} ETH</span>
                </div>
              </div>
            </div>

            {/* Collection Filter */}
            <div>
              <h3 className="font-semibold mb-3">Collection</h3>
              <div className="space-y-2">
                {collectionOptions.map((collection) => (
                  <label
                    key={collection}
                    className="flex items-center space-x-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={filters.collection.includes(collection)}
                      onChange={() => handleCollectionToggle(collection)}
                      className="w-4 h-4 rounded accent-cyan-400 cursor-pointer"
                    />
                    <span className="text-sm text-gray-300 group-hover:text-cyan-400 transition-colors">
                      {collection}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            {activeFilterCount > 0 && (
              <button
                onClick={handleReset}
                className="w-full py-2 text-gray-400 hover:text-cyan-400 font-semibold transition-colors border border-[rgba(0,217,255,0.2)] rounded-lg hover:border-cyan-400"
              >
                Reset Filters
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
