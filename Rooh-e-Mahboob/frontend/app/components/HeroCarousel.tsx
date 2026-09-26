"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const slides = [
  {
    id: 1,
    title: "Mega Deal Days",
    subtitle: "Artisanal Pure Attars",
    desc: "Centuries of olfactory tradition bottled into timeless essences. Up to 40% Off.",
    image: "/attar-luxury.png",
    link: "/collections?cat=Attars",
    color: "#e8f3f8",
    bg: "linear-gradient(135deg, #063b36 0%, #0d5c46 100%)", /* Emerald/Teal */
  },
  {
    id: 2,
    title: "Luxury Perfumes",
    subtitle: "Sun on. Savings on. Live Now",
    desc: "Modern sprays and EDPs — elegant and long-lasting.",
    image: "/perfume-spray.png",
    link: "/collections?cat=Perfumes",
    color: "#f8f3e8",
    bg: "linear-gradient(135deg, #091a38 0%, #183c66 100%)", /* Sapphire/Navy */
  },
  {
    id: 3,
    title: "Premium Gift Sets",
    subtitle: "Curated hampers",
    desc: "Perfect gift boxes for every occasion with up to 10% Savings.",
    image: "/gift-set.png",
    link: "/collections?cat=Gifts",
    color: "#f8e8e8",
    bg: "linear-gradient(135deg, #380b0b 0%, #5e181c 100%)", /* Ruby/Maroon */
  }
];

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="hero-carousel-section">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide) => (
            <div className="embla__slide" key={slide.id}>
              <div 
                className="carousel-slide-inner"
                style={{ background: slide.bg }}
              >
                <div className="carousel-content">
                  <span className="carousel-subtitle">{slide.subtitle}</span>
                  <h2 className="carousel-title">{slide.title}</h2>
                  <p className="carousel-desc">{slide.desc}</p>
                  <Link href={slide.link} className="btn-primary">
                    Shop Now
                  </Link>
                </div>
                <div className="carousel-image-wrapper">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="carousel-nav-btn prev" onClick={scrollPrev}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button className="carousel-nav-btn next" onClick={scrollNext}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      <div className="carousel-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === selectedIndex ? "active" : ""}`}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
          />
        ))}
      </div>
    </section>
  );
}
