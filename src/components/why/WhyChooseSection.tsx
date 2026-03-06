import React from 'react';
import type { ActionDispatcher, Action } from '../../engine/ActionDispatcher';
import { useActionDispatch } from '../../engine/hooks/useActionDispatch';

export interface BadgeItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export interface GuaranteePoint {
  headline: string;
  text: string;
}

export interface GuaranteeBlock {
  logoSrc: string;
  logoAlt?: string;
  points: GuaranteePoint[];
}

export interface Testimonial {
  quote: string;
  author: string;
}

export interface WhyChooseSectionProps {
  heading?: string;
  subheading?: string;
  badges: BadgeItem[];
  badgeButtonText?: string;
  guarantee?: GuaranteeBlock;
  testimonial?: Testimonial;
  ctaLabel?: string;
  ctaAction?: Action;
  dispatcher?: ActionDispatcher;
}

const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({
  heading,
  subheading,
  badges,
  badgeButtonText,
  guarantee,
  testimonial,
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
    <section className="py-16 md:py-24 bg-gradient-subtle">
      <div className="container px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {(heading || subheading) && (
            <div className="text-center mb-12 md:mb-16 animate-fade-in">
              {heading && (
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
                  {heading}
                </h2>
              )}
              {subheading && (
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-6">
                  {subheading}
                </p>
              )}
              {badgeButtonText && (
                <div className="inline-block px-6 py-3 bg-primary/10 rounded-full">
                  <p className="text-primary font-bold text-lg">{badgeButtonText}</p>
                </div>
              )}
            </div>
          )}

          {badges.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
              {badges.map((b, idx) => (
                <div
                  key={idx}
                  className="bg-card rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all animate-fade-in"
                  style={{ animationDelay: `${b.delay ?? idx * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      {b.icon}
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                        {b.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {b.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {guarantee && (
            <div className="bg-card rounded-2xl p-8 md:p-12 shadow-xl border-2 border-primary/20 mb-8">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={guarantee.logoSrc}
                    alt={guarantee.logoAlt || 'Logo'}
                    className="w-16 h-16 md:w-20 md:h-20"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    The Guarantee
                  </h3>
                  <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                    {guarantee.points.map((p, i) => (
                      <p key={i}>
                        <strong className="text-foreground">{p.headline}:</strong>{' '}
                        {p.text}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {testimonial && (
            <div className="mt-8 md:mt-12 text-center">
              <blockquote className="text-xl md:text-2xl italic text-foreground max-w-4xl mx-auto">
                "{testimonial.quote}"
              </blockquote>
              <p className="text-muted-foreground mt-4 font-semibold">
                — {testimonial.author}
              </p>
            </div>
          )}

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
      </div>
    </section>
  );
};

export default WhyChooseSection;
