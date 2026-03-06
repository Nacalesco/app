import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { heroConfig } from '@/config';



export function Hero() {
  if (!heroConfig.name && heroConfig.roles.length === 0) return null;

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen overflow-hidden bg-gradient-premium"
    >
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--exvia-violet-dark) 2px, transparent 0)', backgroundSize: '40px 40px' }} />

      {/* Role labels on sides */}
      {heroConfig.roles[0] && (
        <div
          className={cn(
            'absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 z-30 transition-all duration-[1200ms] ease-out-quart hidden md:block',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          style={{ transitionDelay: '400ms' }}
        >
          <span className="text-[10px] md:text-xs font-geist-mono uppercase tracking-[0.3em] text-exvia-base-black/70 dark:text-exvia-white/70" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            {heroConfig.roles[0]}
          </span>
        </div>
      )}
      {heroConfig.roles[1] && (
        <div
          className={cn(
            'absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-30 transition-all duration-[1200ms] ease-out-quart hidden md:block',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          style={{ transitionDelay: '500ms' }}
        >
          <span className="text-[10px] md:text-xs font-geist-mono uppercase tracking-[0.3em] text-exvia-base-black/70 dark:text-exvia-white/70" style={{ writingMode: 'vertical-rl' }}>
            {heroConfig.roles[1]}
          </span>
        </div>
      )}

      {/* Content Container */}
      <div className="relative z-30 flex flex-col items-center justify-center min-h-screen px-6 lg:px-12 pointer-events-none">
        {/* Main Heading */}
        <div
          className={cn(
            'text-center transition-all duration-[1200ms] ease-out-quart',
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          )}
          style={{ transitionDelay: '200ms' }}
        >
          <h1 className="text-[clamp(3.5rem,10vw,10rem)] font-black tracking-[-0.04em] leading-[0.9] text-exvia-black drop-shadow-sm">
            {heroConfig.name}
          </h1>
          <p className="mt-8 text-[clamp(1rem,2vw,1.5rem)] text-exvia-base-black/80 font-medium tracking-wide max-w-2xl mx-auto uppercase">
            {heroConfig.roles.slice(0, 3).join(' • ')}
          </p>
        </div>
      </div>
    </section>
  );
}
