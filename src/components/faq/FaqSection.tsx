import React from 'react';
import Accordion from '../accordion/Accordion';
import type { ActionDispatcher } from '../../engine/ActionDispatcher';

export interface FaqItem {
  question: string;
  answer: string;
  id?: string;
}

export interface FaqSectionProps {
  heading?: string;
  subheading?: string;
  faqs: FaqItem[];
  dispatcher?: ActionDispatcher;
}

const FaqSection: React.FC<FaqSectionProps> = ({
  heading,
  subheading,
  faqs,
  dispatcher,
}) => {
  const accordionItems = faqs.map((f, i) => ({
    id: f.id || `faq-${i}`,
    title: f.question,
    content: f.answer,
  }));

  return (
    <section id="faq" className="scroll-mt-16 py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
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
        <div className="max-w-3xl mx-auto">
          <Accordion items={accordionItems} dispatcher={dispatcher} />
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
