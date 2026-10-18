import { useState } from "react";
import "./App.css";
import FestiveTrends from "./FestiveTrends";
import products from "./data/products.json";

const WHATSAPP_NUMBER = "917057354437";

export default function App() {
  const [category, setCategory] = useState("All");
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];
  const visibleProducts = products.filter(
    (product) => category === "All" || product.category === category
  );

  return (
    <main className="storefront" id="top">
      <header className="site-header">
        <a href="#top" className="brand">
          <span className="brand-name">Angelic Thread</span>
          <span className="brand-subtitle">BY RUCHA · MADE WITH LOVE</span>
        </a>
        <a
          className="header-link"
          href="https://www.instagram.com/__.hot.__.cupid.___25?rpxt=eWhwYXhnZGk1ZHZw"
          target="_blank"
          rel="noreferrer"
        >
          Instagram ↗
        </a>
      </header>

      <section className="hero" aria-label="Angelic Thread boutique" />
      <FestiveTrends />

      <section id="collection" className="collection section">
        <p className="eyebrow">THE LATEST EDIT</p>
        <h2>Our Collection</h2>
        <p className="section-description">
          Find something that feels uniquely you.
        </p>

        <div className="category-list">
          {categories.map((item) => (
            <button
              key={item}
              className={`category-button ${category === item ? "active" : ""}`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {visibleProducts.length === 0 ? (
          <p className="empty-state">No products here yet. Please check back soon.</p>
        ) : (
          <div className="product-grid">
            {visibleProducts.map((product) => {
              const name = product.title ?? product.name ?? "Product";
              const message = `Hi, I'm interested in ${name} priced at ₹${product.price}. Please share more details.`;

              return (
                <article className="product-card" key={product.id}>
                  <div className="product-image-wrap">
                    <img
                      className="product-image"
                    src={`/image_${product.id}.jpeg`}
                      alt={`/image_${product.id}.png`}
                      loading="lazy"
                      onError={(event) => {
                        const jsonImage = product.image?.trim();
                        if (jsonImage && !event.currentTarget.dataset.fallbackUsed) {
                          event.currentTarget.dataset.fallbackUsed = "true";
                          event.currentTarget.src = jsonImage;
                        }
                      }}
                    />
                    {product.tag && (
                      <span className="product-tag">{product.tag}</span>
                    )}
                  </div>

                  <div className="product-info">
                    <p className="product-category">{product.category}</p>
                    <h3>{name}</h3>
                    {product.description && (
                      <p className="product-description" title={product.description}>
                        {product.description}
                      </p>
                    )}
                    <p className="product-price">₹{product.price}</p>
                    <a
                      className="enquire-link"
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Enquire on WhatsApp ↗
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <footer className="site-footer">
        <a href="#top" className="footer-brand">Angelic Thread by Rucha</a>
        <p>Made with love. Worn with confidence.</p>
      </footer>
    </main>
  );
}
