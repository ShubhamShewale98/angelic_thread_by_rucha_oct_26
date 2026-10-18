import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "./FestiveTrends.css";

const WHATSAPP_NUMBER = "917057354437";

const festiveIdeas = [
  {
    eyebrow: "OLD TO NEW",
    title: "Don't dye & tie... recreate & shine",
    description:
      "Give your traditional outfits a fresh new look with stylish blouse designs, creative styling and festive finishing touches.",
    image: "./Hero11.png",
    imageAlt: "Festive Indian ethnic fashion styling",
    enquiry: "Old to New Garba Styling",
    button: "Enquire about Garba styling",
  },
  {
    eyebrow: "DIWALI EDIT",
    title: "Light up every celebration",
    description:
      "Find your Diwali look, from elegant sarees and statement blouses to festive details made for the season of lights.",
    image: "/diwali_image.png",
    imageAlt: "Diwali festive outfit inspiration",
    enquiry: "Diwali outfit ideas",
    button: "Enquire about Diwali looks",
  },
];

function FestiveTrends() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const currentIdea = festiveIdeas[activeSlide];

  const showSlide = (index) => {
    setActiveSlide((index + festiveIdeas.length) % festiveIdeas.length);
  };

  useEffect(() => {
    if (isPaused) return undefined;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % festiveIdeas.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  const enquire = (item) => {
    const message = `Hi Rucha! I am interested in ${item}. Please share the designs and prices.`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section className="festive-section" id="festive-trends" aria-label="Festive trends">
      <div className="festive-container">
        <div className="festive-heading">
          <span className="festive-eyebrow">THE FESTIVE EDIT</span>
          <h2>Festive <span>Trends</span></h2>
          <p>
            From traditional Garba looks to Diwali celebrations, find your
            perfect festive style with Angelic Thread Boutique by Rucha.
          </p>
        </div>

        <div
          className="festive-carousel"
          aria-roledescription="carousel"
          aria-label="Festive outfit ideas"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
          }}
        >
          <article className="garba-feature" aria-live="polite" key={currentIdea.eyebrow}>
            <div className="garba-image">
              <img src={currentIdea.image} alt={currentIdea.imageAlt} loading="lazy" />
              <span className="festive-slide-count">0{activeSlide + 1} / 0{festiveIdeas.length}</span>
            </div>

            <div className="garba-content">
              <span className="festive-eyebrow">{currentIdea.eyebrow}</span>
              <h3>{currentIdea.title}</h3>
              <p>{currentIdea.description}</p>

              <div className="festive-slide-footer">
                <button className="festive-button" onClick={() => enquire(currentIdea.enquiry)}>
                  {currentIdea.button} <span><ArrowRight size={16} aria-hidden="true" /></span>
                </button>

                <div className="festive-controls" aria-label="Carousel controls">
                  <div className="festive-dots" aria-label="Choose a festive idea">
                    {festiveIdeas.map((idea, index) => (
                      <button
                        key={idea.eyebrow}
                        className={`festive-dot${index === activeSlide ? " active" : ""}`}
                        onClick={() => showSlide(index)}
                        aria-label={`Show ${idea.eyebrow.toLowerCase()} idea`}
                        aria-current={index === activeSlide ? "true" : undefined}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <button
              className="festive-arrow festive-arrow-side festive-arrow-left"
              onClick={() => showSlide(activeSlide - 1)}
              aria-label="Previous festive idea"
            >
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
            <button
              className="festive-arrow festive-arrow-side festive-arrow-right"
              onClick={() => showSlide(activeSlide + 1)}
              aria-label="Next festive idea"
            >
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}

export default FestiveTrends;
