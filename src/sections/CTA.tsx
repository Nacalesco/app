import { } from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { AnimatedButton } from '@/components/AnimatedButton';
import { ArrowRight, Mail } from 'lucide-react';
import { ctaConfig } from '@/config';

export function CTA() {
  if (!ctaConfig.heading && !ctaConfig.description) return null;

  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section id="contact" className="relative w-full py-32 lg:py-48 overflow-hidden bg-exvia-base-black">
      {/* Premium Gradient Background replacing the image */}
      <div className="absolute inset-0 bg-gradient-to-br from-exvia-violet-dark/80 via-exvia-base-black to-exvia-violet/40" />

      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-exvia-violet/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-exvia-violet/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      {/* Abstract Grid Pattern overlay */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      {/* Content */}
      <div ref={sectionRef} className="relative z-10 container-large px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Role Tags */}
          {ctaConfig.tags.length > 0 && (
            <div
              className={cn(
                'flex flex-wrap justify-center gap-3 mb-10 transition-all duration-800 ease-out-quart',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              {ctaConfig.tags.map((tag, index) => (
                <span key={index} className="px-5 py-2 text-xs font-geist-mono text-white tracking-widest uppercase border border-white/20 rounded-full bg-white/5 backdrop-blur-md">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Main Heading */}
          {ctaConfig.heading && (
            <h2
              className={cn(
                'text-5xl lg:text-7xl font-light text-white tracking-tight leading-tight transition-all duration-800 ease-out-quart',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: '100ms' }}
            >
              {ctaConfig.heading}
            </h2>
          )}

          {/* Subtext */}
          {ctaConfig.description && (
            <p
              className={cn(
                'mt-8 text-xl lg:text-2xl font-light text-white/70 max-w-2xl mx-auto leading-relaxed transition-all duration-800 ease-out-quart',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: '200ms' }}
            >
              {ctaConfig.description}
            </p>
          )}

          {/* CTA Buttons */}
          <div
            className={cn(
              'flex flex-col sm:flex-row items-center justify-center gap-6 mt-16 transition-all duration-800 ease-out-quart',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: '300ms' }}
          >
            {ctaConfig.buttonText && (
              <AnimatedButton
                href={ctaConfig.buttonHref}
                variant="primary"
                size="lg"
                showIcon
                className="bg-white text-exvia-violet-dark hover:bg-exvia-subtle hover:text-exvia-violet text-lg px-8 py-4 !rounded-full shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              >
                {ctaConfig.buttonText}
              </AnimatedButton>
            )}

            {ctaConfig.email && (
              <a
                href={`mailto:${ctaConfig.email}`}
                className="inline-flex items-center gap-3 text-base text-white hover:text-white/80 transition-colors group px-6 py-4 border border-white/20 rounded-full bg-white/5 backdrop-blur-md"
              >
                <Mail className="w-5 h-5" />
                <span>{ctaConfig.email}</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
