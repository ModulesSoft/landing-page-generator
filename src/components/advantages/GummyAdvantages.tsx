import React from 'react';
import type { ActionDispatcher, Action } from '../../engine/ActionDispatcher';
import { useActionDispatch } from '../../engine/hooks/useActionDispatch';

export interface GridFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export interface ComparisonCell {
  /** optional icon rendered above text */
  icon?: React.ReactNode;
  text: string;
}

export interface ComparisonRow {
  feature: string;
  ours: ComparisonCell;
  theirs: ComparisonCell;
}

export interface CalloutBlock {
  headline: string;
  copy: string;
  highlight?: string;
}

export interface ImageBlock {
  src: string;
  alt?: string;
  ctaLabel?: string;
  ctaAction?: Action;
}

export interface GummyAdvantagesProps {
  heading?: string;
  subheading?: string;
  features?: GridFeature[];
  image?: ImageBlock;
  comparisons?: ComparisonRow[];
  callout?: CalloutBlock;
  dispatcher?: ActionDispatcher;
}

const GummyAdvantages: React.FC<GummyAdvantagesProps> = ({
  heading,
  subheading,
  features = [],
  image,
  comparisons = [],
  callout,
  dispatcher,
}) => {
  const { dispatchWithLoading, loading } = useActionDispatch(dispatcher);

  const handleImageCta = () => {
    if (image?.ctaAction) {
      dispatchWithLoading('imageCta', image.ctaAction);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-background">
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
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  {subheading}
                </p>
              )}
            </div>
          )}

          {features.length > 0 && (
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
              <div className="order-2 md:order-1">
                <div className="space-y-6">
                  {features.map((f, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-all animate-fade-in"
                      style={{ animationDelay: `${f.delay ?? idx * 0.1}s` }}
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        {f.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {f.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {f.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {image && (
                <div className="order-1 md:order-2">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-auto"
                    />
                    {image.ctaLabel && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-6 flex justify-center">
                        <button
                          onClick={handleImageCta}
                          disabled={loading.imageCta}
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-md hover:shadow-lg h-11 rounded-md px-8 font-bold bg-background text-foreground hover:bg-background/90"
                        >
                          {image.ctaLabel}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {comparisons.length > 0 && (
            <div className="mb-12 md:mb-16">
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
                <h3 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-8">
                  Compare Features
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="pb-4 text-left text-muted-foreground font-medium">
                          Feature
                        </th>
                        <th className="pb-4 text-center">
                          <div className="text-primary font-bold text-lg">
                            Ours
                          </div>
                        </th>
                        <th className="pb-4 text-center">
                          <div className="text-muted-foreground font-medium text-lg">
                            Theirs
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisons.map((row, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-border last:border-0"
                        >
                          <td className="py-4 font-medium text-foreground">
                            {row.feature}
                          </td>
                          <td className="py-4">
                            <div className="flex flex-col items-center gap-1">
                              {row.ours.icon}
                              <span className="text-sm text-center text-muted-foreground">
                                {row.ours.text}
                              </span>
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="flex flex-col items-center gap-1">
                              {row.theirs.icon}
                              <span className="text-sm text-center text-muted-foreground">
                                {row.theirs.text}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {callout && (
            <div className="bg-primary/5 border-2 border-primary/20 rounded-2xl p-8 md:p-12 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {callout.headline}
              </h3>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {callout.copy}{' '}
                {callout.highlight && (
                  <strong className="text-foreground">
                    {callout.highlight}
                  </strong>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GummyAdvantages;
