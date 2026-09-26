import { Suspense } from "react";
import FilteredCollection from "./components/FilteredCollection";
import { getAllProducts } from "./lib/products";

async function HomeContent() {
  const products = await getAllProducts();

  return (
    <FilteredCollection
      initialProducts={products}
      activeCategory="All"
      showHeroCarousel={true}
      title="All Products"
      description="Experience the essence of tradition with our premium attars and luxury products."
    />
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="section text-center" style={{ padding: "4rem 0" }}>Loading our collection...</div>}>
      <HomeContent />
    </Suspense>
  );
}
