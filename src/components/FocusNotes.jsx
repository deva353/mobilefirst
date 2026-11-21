import { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const FOCUS_SLIDES = [
  {
    id: 1,
    tag: 'DAILY FOCUS',
    title: 'Plan your top three priorities first',
    body: 'Tackle high-priority engineering and design tasks before opening low-urgency threads or routine reviews.',
    accentClass: 'focus-notes--indigo',
  },
  {
    id: 2,
    tag: 'EXECUTION RHYTHM',
    title: 'Keep work-in-progress strictly bounded',
    body: 'Limit active tasks to two items at once. Finishing in-progress work raises completion velocity faster than starting new tickets.',
    accentClass: 'focus-notes--teal',
  },
  {
    id: 3,
    tag: 'END-OF-DAY AUDIT',
    title: 'Close completed loops and verify due dates',
    body: 'Update task statuses immediately after verification so your dashboard metrics reflect real delivery progress.',
    accentClass: 'focus-notes--amber',
  },
];

export default function FocusNotes() {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = FOCUS_SLIDES.length;
  const currentSlide = FOCUS_SLIDES[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  };

  return (
    <section
      className={`focus-notes ${currentSlide.accentClass}`}
      aria-roledescription="carousel"
      aria-label="Focus Notes"
    >
      <div className="focus-notes__header">
        <div className="focus-notes__eyebrow">
          <Sparkles size={15} aria-hidden="true" />
          <span>
            FOCUS NOTES · {activeIndex + 1} OF {totalSlides}
          </span>
          <span className="focus-notes__pill">{currentSlide.tag}</span>
        </div>

        <div className="focus-notes__controls">
          <button
            type="button"
            className="focus-notes__nav-btn"
            onClick={handlePrev}
            aria-label="Previous focus note"
          >
            <ChevronLeft size={18} />
            <span className="focus-notes__nav-label">Previous</span>
          </button>

          <button
            type="button"
            className="focus-notes__nav-btn"
            onClick={handleNext}
            aria-label="Next focus note"
          >
            <span className="focus-notes__nav-label">Next</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="focus-notes__body" aria-live="polite">
        <h2 className="focus-notes__title">{currentSlide.title}</h2>
        <p className="focus-notes__text">{currentSlide.body}</p>
      </div>

      <div
        className="focus-notes__dots"
        role="tablist"
        aria-label="Select a Focus Note slide"
      >
        {FOCUS_SLIDES.map((slide, index) => {
          const isSelected = index === activeIndex;
          return (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-label={`Slide ${index + 1}: ${slide.title}`}
              className={`focus-notes__dot ${
                isSelected ? 'focus-notes__dot--active' : ''
              }`}
              onClick={() => setActiveIndex(index)}
            />
          );
        })}
      </div>
    </section>
  );
}