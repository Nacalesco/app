import { } from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { aboutConfig } from '@/config';

export function About() {
  if (!aboutConfig.description && aboutConfig.stats.length === 0) return null;

  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="about" className="w-full py-24 lg:py-32 bg-exvia-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-exvia-violet/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-exvia-border/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="container-large px-6 lg:px-12 relative z-10">
        <div ref={sectionRef} className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">

          {/* Left Column - Main Content (Spans 7 columns) */}
          <div className="lg:col-span-7 space-y-12">
            {/* Section Label */}
            {aboutConfig.label && (
              <div
                className={cn(
                  'transition-all duration-800 ease-out-quart flex items-center gap-4',
                  sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}
              >
                <div className="w-12 h-px bg-exvia-violet" />
                <span className="text-sm font-geist-mono uppercase tracking-widest text-exvia-violet font-medium">
                  {aboutConfig.label}
                </span>
              </div>
            )}

            {/* Main Text */}
            {aboutConfig.description && (
              <div
                className={cn(
                  'transition-all duration-800 ease-out-quart',
                  sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                )}
                style={{ transitionDelay: '100ms' }}
              >
                <h2 className="text-3xl lg:text-4xl xl:text-5xl text-exvia-base-black leading-tight font-light tracking-tight">
                  {aboutConfig.description.split('. ').map((sentence, i, arr) => (
                    <span key={i}>
                      {sentence}{i < arr.length - 1 ? '. ' : ''}
                    </span>
                  ))}
                </h2>
              </div>
            )}
          </div>

          {/* Right Column - Stats & Experience (Spans 5 columns) */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 grid gap-6">

              {/* Experience Card */}
              {aboutConfig.experienceValue && (
                <div
                  className={cn(
                    'bg-white rounded-3xl p-8 border border-exvia-border shadow-sm flex items-center justify-between transition-all duration-800 ease-out-quart',
                    sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  )}
                  style={{ transitionDelay: '200ms' }}
                >
                  <div className="space-y-1">
                    <span className="block text-sm font-geist-mono text-exvia-base-black/60 uppercase tracking-wider">
                      {aboutConfig.experienceLabel?.split('\n')[0]}
                    </span>
                    <span className="block text-sm font-geist-mono text-exvia-base-black/60 uppercase tracking-wider">
                      {aboutConfig.experienceLabel?.split('\n')[1] || ''}
                    </span>
                  </div>
                  <span className="text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-exvia-violet to-exvia-violet-light leading-none">
                    {aboutConfig.experienceValue}
                  </span>
                </div>
              )}

              {/* Stats Grid */}
              {aboutConfig.stats.length > 0 && (
                <div className="grid grid-cols-2 gap-6">
                  {aboutConfig.stats.map((stat, index) => (
                    <div
                      key={index}
                      className={cn(
                        'bg-exvia-subtle/50 rounded-3xl p-8 border border-exvia-border/50 transition-all duration-800 ease-out-quart',
                        sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      )}
                      style={{ transitionDelay: `${300 + index * 100}ms` }}
                    >
                      <span className="block text-4xl font-bold text-exvia-base-black mb-2">{stat.value}</span>
                      <span className="text-sm font-medium text-exvia-base-black/70 uppercase tracking-wide leading-snug block">
                        {stat.label.split('\n').map((l, i) => <span key={i} className="block">{l}</span>)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

            </div>


          </div>

        </div>
      </div>
    </section>
  );
}
