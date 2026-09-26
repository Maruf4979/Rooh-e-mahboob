import { Suspense } from "react";
import FilteredCollection from "../components/FilteredCollection";
import { getAllProducts } from "../lib/products";

function CustomerServiceContent() {
  return (
    <div className="section" style={{ padding: "4rem 1rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem", textAlign: "center" }}>Customer Service</h1>
      
      <div style={{ background: "var(--surface-container-lowest)", padding: "2rem", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)", marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--secondary)" }}>Contact Us</h2>
        <p style={{ marginBottom: "0.5rem" }}><strong>Email:</strong> support@roohemahboob.com</p>
        <p style={{ marginBottom: "0.5rem" }}><strong>Phone:</strong> +91 12345 67890</p>
        <p style={{ marginBottom: "0.5rem" }}><strong>Hours:</strong> Monday - Saturday, 9:00 AM - 6:00 PM (IST)</p>
      </div>

      <div style={{ background: "var(--surface-container-lowest)", padding: "2rem", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)", marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--secondary)" }}>Shipping & Returns</h2>
        <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Shipping Information</h3>
        <p style={{ marginBottom: "1rem", color: "var(--on-surface-variant)" }}>We offer free shipping on all orders above ₹999. Orders are typically processed within 24-48 hours and delivered within 3-7 business days.</p>
        
        <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Returns Policy</h3>
        <p style={{ marginBottom: "0", color: "var(--on-surface-variant)" }}>Due to the nature of our products, we accept returns only for damaged or incorrect items within 7 days of delivery. Please contact our support team to initiate a return.</p>
      </div>

      <div style={{ background: "var(--surface-container-lowest)", padding: "2rem", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--secondary)" }}>Frequently Asked Questions</h2>
        <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Are your attars 100% natural?</h3>
        <p style={{ marginBottom: "1rem", color: "var(--on-surface-variant)" }}>Yes, our premium attars are crafted using traditional methods and natural ingredients without alcohol.</p>

        <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Do you offer Cash on Delivery (COD)?</h3>
        <p style={{ marginBottom: "0", color: "var(--on-surface-variant)" }}>Yes, Cash on Delivery is available for most locations across India.</p>
      </div>
    </div>
  );
}

async function CollectionsContent({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const activeCategory = (searchParams.cat as string) || "All";
  const searchQuery = (searchParams.search as string) || "";

  if (activeCategory === "Customer Service") {
    return <CustomerServiceContent />;
  }

  const products = await getAllProducts();
  let filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter((p) => 
      p.name.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q)) ||
      (p.tags && p.tags.some(tag => tag.toLowerCase().includes(q)))
    );
  }

  const title = activeCategory === "All" && !searchQuery ? "All Products" : 
                searchQuery ? `Search Results for "${searchQuery}"` : activeCategory;
  const description = searchQuery 
    ? `Showing results for your search query: ${searchQuery}`
    : activeCategory === "All" 
      ? "Discover our complete collection of premium attars, perfumes, cosmetics, and more."
      : `Explore our premium collection of ${activeCategory}.`;

  return (
    <FilteredCollection
      initialProducts={filtered}
      activeCategory={activeCategory}
      showHeroCarousel={activeCategory === "All" && !searchQuery}
      title={title}
      description={description}
    />
  );
}

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  
  return (
    <Suspense fallback={<div className="section text-center" style={{ padding: "4rem 0" }}>Loading products...</div>}>
      <CollectionsContent searchParams={resolvedSearchParams} />
    </Suspense>
  );
}
