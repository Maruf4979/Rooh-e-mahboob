"use client";

import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import HeroCarousel from "./HeroCarousel";
import OfferTicker from "./OfferTicker";
import { Product } from "../lib/products";
import { categories } from "../data/products";

const fragranceTypes = [
  { label: "Light Smell", tags: ["Fresh", "Aquatic", "Clean", "Daily", "Morning", "Floral", "Sweet"] },
  { label: "Hard Smell", tags: ["Intense", "Strong", "Oud", "Woody", "Night", "Smoke", "Spicy"] },
  { label: "Flowers Smell", tags: ["Floral", "Rose", "Jasmine"] },
  { label: "Chocolaty Smell", tags: ["Sweet", "Chocolate", "Vanilla", "Caramel"] },
];

const bookTypes = [
  { label: "Hadith", tags: ["Hadith"] },
  { label: "Tafsheer", tags: ["Tafsheer"] },
  { label: "Quran Hindi Translation", tags: ["Quran Hindi"] },
  { label: "Quran Urdu Translation", tags: ["Quran Urdu"] },
  { label: "Dua & Remembrances", tags: ["Dua"] },
  { label: "Holy Quran", tags: ["Quran"] },
];

const cosmeticTypes = [
  { label: "Eyes", tags: ["Eyes"] },
  { label: "Lips", tags: ["Lips"] },
  { label: "Skincare", tags: ["Skincare"] },
];

const sadiTypes = [
  { label: "Bridal", tags: ["Bridal"] },
  { label: "Groom", tags: ["Groom"] },
  { label: "Favors", tags: ["Favors", "Hamper"] },
  { label: "Decor", tags: ["Decor"] },
];

const priceRanges = [
  { label: "Under ₹500", min: 0, max: 499 },
  { label: "₹500 - ₹1000", min: 500, max: 1000 },
  { label: "₹1000 - ₹2000", min: 1001, max: 2000 },
  { label: "Over ₹2000", min: 2001, max: 999999 },
];

interface FilteredCollectionProps {
  initialProducts: Product[];
  activeCategory: string;
  showHeroCarousel?: boolean;
  title: string;
  description: string;
}

export default function FilteredCollection({
  initialProducts,
  activeCategory,
  showHeroCarousel = false,
  title,
  description
}: FilteredCollectionProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFragrances, setSelectedFragrances] = useState<string[]>([]);
  const [selectedBookTypes, setSelectedBookTypes] = useState<string[]>([]);
  const [selectedCosmeticTypes, setSelectedCosmeticTypes] = useState<string[]>([]);
  const [selectedSadiTypes, setSelectedSadiTypes] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);

  const isAll = activeCategory === "All";
  const showFragranceFilter = isAll || ["Attars", "Perfumes", "Luxury Perfumes", "Oud Combos", "Gift Hampers"].includes(activeCategory);
  const showBookFilter = isAll || activeCategory === "Islamic Books";
  const showCosmeticFilter = isAll || activeCategory === "Cosmetics";
  const showSadiFilter = isAll || activeCategory === "Sadi Items (Nikah)" || activeCategory === "Sadi Nikah Special";
  const showCategoryFilter = isAll;

  // Filtering logic
  const filtered = useMemo(() => {
    return initialProducts.filter((p) => {
      // Category filter (only used in "All" view)
      if (showCategoryFilter && selectedCategories.length > 0 && !selectedCategories.includes(p.category)) {
        return false;
      }
      
      // Fragrance Type filter
      if (showFragranceFilter && selectedFragrances.length > 0) {
        const matchesFragrance = selectedFragrances.some(fragLabel => {
          const fragType = fragranceTypes.find(f => f.label === fragLabel);
          return fragType && fragType.tags.some(tag => p.tags.includes(tag));
        });
        if (!matchesFragrance) return false;
      }

      // Book Type filter
      if (showBookFilter && selectedBookTypes.length > 0) {
        const matchesBook = selectedBookTypes.some(bookLabel => {
          const bookType = bookTypes.find(f => f.label === bookLabel);
          return bookType && bookType.tags.some(tag => p.tags.includes(tag));
        });
        if (!matchesBook) return false;
      }

      // Cosmetic Type filter
      if (showCosmeticFilter && selectedCosmeticTypes.length > 0) {
        const matchesCosmetic = selectedCosmeticTypes.some(cosmeticLabel => {
          const cosmeticType = cosmeticTypes.find(f => f.label === cosmeticLabel);
          return cosmeticType && cosmeticType.tags.some(tag => p.tags.includes(tag));
        });
        if (!matchesCosmetic) return false;
      }

      // Sadi Type filter
      if (showSadiFilter && selectedSadiTypes.length > 0) {
        const matchesSadi = selectedSadiTypes.some(sadiLabel => {
          const sadiType = sadiTypes.find(f => f.label === sadiLabel);
          return sadiType && sadiType.tags.some(tag => p.tags.includes(tag));
        });
        if (!matchesSadi) return false;
      }
      
      // Price filter
      if (selectedPriceRanges.length > 0) {
        const matchesPrice = selectedPriceRanges.some(rangeLabel => {
          const range = priceRanges.find(r => r.label === rangeLabel);
          return range && p.price >= range.min && p.price <= range.max;
        });
        if (!matchesPrice) return false;
      }
      
      return true;
    });
  }, [
    initialProducts, selectedCategories, selectedFragrances, selectedBookTypes, 
    selectedCosmeticTypes, selectedSadiTypes, selectedPriceRanges,
    showCategoryFilter, showFragranceFilter, showBookFilter, showCosmeticFilter, showSadiFilter
  ]);

  const toggleFilter = (setter: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setter(prev => prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedFragrances([]);
    setSelectedBookTypes([]);
    setSelectedCosmeticTypes([]);
    setSelectedSadiTypes([]);
    setSelectedPriceRanges([]);
  };

  const hasAnyFilter = selectedCategories.length > 0 || selectedFragrances.length > 0 || 
                       selectedBookTypes.length > 0 || selectedCosmeticTypes.length > 0 || 
                       selectedSadiTypes.length > 0 || selectedPriceRanges.length > 0;

  return (
    <>
      {showHeroCarousel && (
        <>
          <HeroCarousel />
          <OfferTicker />
        </>
      )}
      
      <div className="collections-layout section" style={{ paddingTop: showHeroCarousel ? "2rem" : undefined }}>
        {/* Sticky Filter Sidebar */}
        <aside className="collections-sidebar">
          <div className="filter-header">
            <h3>Filters</h3>
            {hasAnyFilter && (
              <button onClick={clearFilters} className="clear-filters-btn">Clear All</button>
            )}
          </div>
          
          {showCategoryFilter && (
            <div className="filter-section">
              <h4>Categories</h4>
              <div className="filter-options">
                {categories.filter(c => c !== "All").map(cat => (
                  <label key={cat} className="filter-checkbox">
                    <input 
                      type="checkbox" 
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleFilter(setSelectedCategories, cat)}
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {showFragranceFilter && (
            <div className="filter-section">
              <h4>Fragrance Type</h4>
              <div className="filter-options">
                {fragranceTypes.map(frag => (
                  <label key={frag.label} className="filter-checkbox">
                    <input 
                      type="checkbox" 
                      checked={selectedFragrances.includes(frag.label)}
                      onChange={() => toggleFilter(setSelectedFragrances, frag.label)}
                    />
                    <span>{frag.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {showBookFilter && (
            <div className="filter-section">
              <h4>Book Type</h4>
              <div className="filter-options">
                {bookTypes.map(book => (
                  <label key={book.label} className="filter-checkbox">
                    <input 
                      type="checkbox" 
                      checked={selectedBookTypes.includes(book.label)}
                      onChange={() => toggleFilter(setSelectedBookTypes, book.label)}
                    />
                    <span>{book.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {showCosmeticFilter && (
            <div className="filter-section">
              <h4>Product Type</h4>
              <div className="filter-options">
                {cosmeticTypes.map(cos => (
                  <label key={cos.label} className="filter-checkbox">
                    <input 
                      type="checkbox" 
                      checked={selectedCosmeticTypes.includes(cos.label)}
                      onChange={() => toggleFilter(setSelectedCosmeticTypes, cos.label)}
                    />
                    <span>{cos.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {showSadiFilter && (
            <div className="filter-section">
              <h4>Sadi / Nikah Special</h4>
              <div className="filter-options">
                {sadiTypes.map(sadi => (
                  <label key={sadi.label} className="filter-checkbox">
                    <input 
                      type="checkbox" 
                      checked={selectedSadiTypes.includes(sadi.label)}
                      onChange={() => toggleFilter(setSelectedSadiTypes, sadi.label)}
                    />
                    <span>{sadi.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="filter-section">
            <h4>Price Range</h4>
            <div className="filter-options">
              {priceRanges.map(range => (
                <label key={range.label} className="filter-checkbox">
                  <input 
                    type="checkbox" 
                    checked={selectedPriceRanges.includes(range.label)}
                    onChange={() => toggleFilter(setSelectedPriceRanges, range.label)}
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Product Grid Area */}
        <div className="collections-main">
          <div className="page-header" style={{ paddingTop: "0", paddingBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h1 style={{ textAlign: "left", fontSize: "1.8rem" }}>{title}</h1>
              <p style={{ textAlign: "left", margin: "0" }}>{description}</p>
            </div>
            
          </div>

          <div className="product-grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center" style={{ padding: "4rem 0" }}>
              <p style={{ color: "var(--on-surface-variant)" }}>
                No products found matching your filters in this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
