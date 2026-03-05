import React from 'react';
import type { ActionDispatcher, Action } from '../../engine/ActionDispatcher';
import { useActionDispatch } from '../../engine/hooks/useActionDispatch';

export interface BenefitItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  /** animation delay in seconds (optional) */
  delay?: number;
}

export interface BundleItem {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  subtitle?: string;
  includes?: string[];
  description: string;
  price: string;
  originalPrice?: string;
  saveText?: string;
  badge?: string;
  ctaLabel: string;
  ctaAction?: Action;
}

export interface ScienceBlock {
  headline: string;
  copy: string;
  highlight?: string; // bolded portion inside copy
  boxCopy?: string; // additional text shown in the blue card
  boxIcon?: React.ReactNode; // defaults to 📊 if omitted
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BenefitsSectionProps {
  id?: string;
  heading?: string;
  subheading?: string;
  benefits: BenefitItem[];
  bundles?: BundleItem[];
  science?: ScienceBlock;
  faqs?: FAQItem[];
  cta?: { label: string; action?: Action };
  backgroundImage?: string;
  dispatcher?: ActionDispatcher;
}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({
  id,
  heading,
  subheading,
  benefits,
  bundles = [],
  science,
  faqs = [],
  cta,
  backgroundImage,
  dispatcher,
}) => {
  const { dispatchWithLoading, loading } = useActionDispatch(dispatcher);

  const handleCta = () => {
    if (cta?.action) {
      dispatchWithLoading('cta', cta.action);
    }
  };

  const handleBundleClick = (action?: Action) => {
    if (action) dispatchWithLoading('bundle', action);
  };

  return (
    <section
      id={id}
      className="scroll-mt-16 py-16 md:py-24 bg-gradient-subtle relative overflow-hidden"
    >
      {backgroundImage && (
        <div
          className="absolute inset-0 opacity-5 bg-cover bg-center"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        />
      )}
      <div className="container relative z-10 px-4 md:px-6">
        {heading && (
          <div className="text-center mb-12 md:mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
              {heading}
            </h2>
            {subheading && (
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                {subheading}
              </p>
            )}
          </div>
        )}

        {benefits.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 md:mb-16">
            {benefits.map((b, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-all animate-fade-in"
                style={{ animationDelay: `${b.delay ?? idx * 0.1}s` }}
              >
                <div className="p-3 rounded-full bg-primary/10 mb-4">{b.icon}</div>
                <h4 className="font-bold text-foreground mb-2 text-lg">{b.title}</h4>
                <p className="text-sm text-muted-foreground">{b.description}</p>
              </div>
            ))}
          </div>
        )}

        {bundles.length > 0 && (
          <>
            <div className="mb-12 md:mb-16">
              <div className="text-center mb-8 md:mb-12">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  Level Up Your Results
                </h3>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                  Get more from creatine with these powerful combinations designed to maximize your results
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {bundles.map((b, idx) => (
                <div
                  key={idx}
                  className="rounded-lg bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 animate-fade-in"
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
                  <div className="relative">
                    <img
                      src={b.imageSrc}
                      alt={b.imageAlt}
                      className="w-full h-64 object-cover"
                    />
                    {b.badge && (
                      <div className="inline-flex items-center rounded-full border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1">
                        {b.badge}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <h4 className="text-xl md:text-2xl font-bold text-foreground mb-2">{b.title}</h4>
                      {b.subtitle && <p className="text-sm font-medium text-primary mb-3">{b.subtitle}</p>}
                      {b.includes && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="text-sm text-muted-foreground font-medium">Includes:</span>
                          {b.includes.map((inc, i) => (
                            <div
                              key={i}
                              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-muted/50 text-foreground border-border"
                            >
                              {inc}
                            </div>
                          ))}
                        </div>
                      )}
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {b.description}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-bold text-foreground">{b.price}</span>
                        {b.originalPrice && (
                          <span className="text-lg text-muted-foreground line-through">
                            {b.originalPrice}
                          </span>
                        )}
                        {b.saveText && (
                          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 bg-primary/10 text-primary">
                            {b.saveText}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleBundleClick(b.ctaAction)}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-xl font-bold text-base h-11 rounded-md px-8 w-full group"
                      >
                        {b.ctaLabel}
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
                          className="lucide lucide-circle-check w-5 h-5 ml-2 group-hover:scale-110 transition-transform"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="m9 12 2 2 4-4"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {science && (
          <div className="bg-card rounded-2xl p-6 md:p-10 shadow-xl mb-8 md:mb-12">
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {science.headline}
              </h3>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {science.copy}{' '}
                {science.highlight && <strong className="text-foreground">{science.highlight}</strong>}
              </p>
            </div>
            {science.boxCopy && (
              <div className="bg-primary/5 border-2 border-primary/20 rounded-xl p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <span className="text-4xl">
                    {science.boxIcon || '📊'}
                  </span>
                  <div>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                      {science.boxCopy}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {faqs.length > 0 && (
          <div className="bg-muted/30 rounded-2xl p-6 md:p-10">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
              Let&rsquo;s Address Your Concerns
            </h3>
            <div className="space-y-6">
              {faqs.map((q, i) => (
                <div key={i} className="bg-card rounded-xl p-6 border border-border">
                  <h4 className="text-xl font-bold text-primary mb-3">{q.question}</h4>
                  <p className="text-muted-foreground leading-relaxed">{q.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {cta && (
          <div className="flex justify-center mt-8 md:mt-12">
            <button
              onClick={handleCta}
              disabled={loading.cta}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-xl font-bold rounded-md group px-6 md:px-10 text-base md:text-lg h-12 md:h-14 max-w-[90%] md:max-w-none"
            >
              {cta.label}
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
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BenefitsSection;
