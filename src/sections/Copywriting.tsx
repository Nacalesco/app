import { cn } from '@/lib/utils';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { ExternalLink } from 'lucide-react';
import { copywritingConfig } from '@/config';

const { experiences } = copywritingConfig;

export function Copywriting() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 });
  const { containerRef: cardsRef, visibleItems } = useStaggerAnimation(experiences.length, 120);

  return (
    <section id="copywriting" className="w-full py-24 lg:py-32 bg-exvia-base-black overflow-hidden">
      <div className="container-large px-6 lg:px-12">

        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <div
            className={cn(
              'flex items-center gap-4 mb-6 transition-all duration-800 ease-out-quart',
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <div className="w-12 h-px bg-exvia-violet" />
            <span className="text-sm font-geist-mono uppercase tracking-widest text-exvia-violet">
              {copywritingConfig.label}
            </span>
          </div>
          <h2
            className={cn(
              'text-3xl sm:text-4xl lg:text-5xl font-light text-exvia-white tracking-tight leading-tight transition-all duration-800 ease-out-quart max-w-3xl',
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
            style={{ transitionDelay: '100ms' }}
          >
            {copywritingConfig.heading.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="text-gradient">{copywritingConfig.heading.split(' ').slice(-1)}</span>
          </h2>
          <p
            className={cn(
              'mt-6 text-base text-white/60 max-w-2xl leading-relaxed transition-all duration-800 ease-out-quart',
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
            style={{ transitionDelay: '200ms' }}
          >
            {copywritingConfig.description}
          </p>
        </div>

        {/* Experience Cards */}
        <div ref={cardsRef} className="space-y-6">
          {experiences.map((exp, i) => (
            <div
              key={exp.id}
              className={cn(
                'group relative rounded-2xl border border-white/10 bg-white/5 p-6 lg:p-8',
                'hover:border-exvia-violet/40 hover:bg-white/8',
                'transition-all duration-400 ease-out-quart',
                visibleItems[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Company header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
                <div>
                  <h3 className="text-lg font-medium text-exvia-white">{exp.company}</h3>
                  <p className="text-sm font-geist-mono text-exvia-violet">{exp.role}</p>
                  {exp.client && (
                    <p className="text-xs text-white/40 mt-1">Cliente: {exp.client}</p>
                  )}
                </div>
              </div>

              {/* Items list */}
              <ul className="space-y-2 mb-5">
                {exp.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-white/70">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-exvia-violet shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Links */}
              {exp.links.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {exp.links.map((link, j) => (
                    <a
                      key={j}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-geist-mono',
                        'bg-white/5 border border-white/10 text-white/60',
                        'hover:bg-exvia-violet/20 hover:border-exvia-violet/40 hover:text-exvia-violet',
                        'transition-all duration-300'
                      )}
                    >
                      <ExternalLink size={12} />
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
