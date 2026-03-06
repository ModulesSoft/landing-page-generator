import React from 'react';
import type { ActionDispatcher, Action } from '../../engine/ActionDispatcher';
import { useActionDispatch } from '../../engine/hooks/useActionDispatch';

export interface StepItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export interface StepsSectionProps {
  heading?: string;
  subheading?: string;
  steps: StepItem[];
  ctaLabel?: string;
  ctaAction?: Action;
  dispatcher?: ActionDispatcher;
}

const StepsSection: React.FC<StepsSectionProps> = ({
  heading,
  subheading,
  steps,
  ctaLabel,
  ctaAction,
  dispatcher,
}) => {
  const { dispatchWithLoading, loading } = useActionDispatch(dispatcher);

  const handleCta = () => {
    if (ctaAction) {
      dispatchWithLoading('cta', ctaAction);
    }
  };

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {(heading || subheading) && (
          <div className="text-center mb-12 md:mb-16">
            {heading && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                {subheading}
              </p>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto relative">
          <div className="hidden md:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 -z-10" />
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="relative text-center animate-fade-in"
              style={{ animationDelay: `${s.delay ?? idx * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-6 shadow-lg">
                {idx + 1}
              </div>
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-muted">
                  {s.icon}
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                {s.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>

        {ctaLabel && (
          <div className="flex justify-center mt-8 md:mt-12">
            <button
              onClick={handleCta}
              disabled={loading.cta}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-xl font-bold rounded-md group px-6 md:px-10 text-base md:text-lg h-12 md:h-14 max-w-[90%] md:max-w-none"
            >
              {ctaLabel}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default StepsSection;
