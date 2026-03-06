import { } from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { ArrowUpRight, FileText, CheckCircle2 } from 'lucide-react';
import { portfolioConfig } from '@/config';

const scrollTo = (id: string) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

function ProjectCard({ project, index, isVisible }: { project: any; index: number; isVisible: boolean }) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden bg-white/60 glass-panel rounded-3xl p-8 lg:p-10 border border-exvia-border/50 transition-all duration-700 ease-out-quart hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full',
        project.featured ? 'lg:col-span-2' : '',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Hover Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-exvia-violet/5 via-transparent to-exvia-violet/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Decorative Violet Accent */}
      <div className="absolute top-0 right-8 left-8 h-1 bg-gradient-to-r from-transparent via-exvia-violet/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header: Category & Year */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-geist-mono uppercase tracking-widest text-exvia-violet font-medium px-4 py-1.5 bg-exvia-violet/10 rounded-full">
            {project.category}
          </span>
          <span className="text-sm font-geist-mono text-exvia-base-black/40">
            {project.year}
          </span>
        </div>

        {/* Title & Description */}
        <div className="mb-8">
          <h3 className="text-3xl font-light tracking-tight text-exvia-base-black group-hover:text-exvia-violet-dark transition-colors duration-500 mb-4">
            {project.title}
          </h3>
          <p className="text-base text-exvia-base-black/70 leading-relaxed min-h-[4rem]">
            {project.description}
          </p>
        </div>

        {/* Details section (only for featured or if objectives/strategies exist) */}
        {(project.objectives || project.strategies) && (
          <div className="mt-auto pt-6 border-t border-exvia-border/50 space-y-6 flex-1">
            {project.objectives && project.objectives.length > 0 && (
              <div>
                <h4 className="text-sm font-geist-mono uppercase tracking-widest text-exvia-base-black/40 mb-3">Objetivos Clave</h4>
                <ul className="space-y-2">
                  {project.objectives.slice(0, project.featured ? 4 : 2).map((obj: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-exvia-base-black/70">
                      <CheckCircle2 className="w-4 h-4 text-exvia-violet mt-0.5 shrink-0" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.results && project.featured && (
              <div>
                <h4 className="text-sm font-geist-mono uppercase tracking-widest text-exvia-base-black/40 mb-2">Impacto</h4>
                <p className="text-sm font-medium text-exvia-violet-dark bg-exvia-violet/5 p-4 rounded-xl border border-exvia-violet/10">
                  {project.results}
                </p>
              </div>
            )}
          </div>
        )}

        {/* PDF Button */}
        {project.pdf && (
          <div className="mt-8 pt-6 border-t border-exvia-border/50">
            <a
              href={project.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-exvia-violet text-white rounded-full font-medium text-sm hover:bg-exvia-violet-dark transition-colors group/btn"
            >
              <FileText className="w-4 h-4" />
              <span>Ver Documento PDF</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export function Portfolio() {
  if (!portfolioConfig.heading && portfolioConfig.projects.length === 0) return null;

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const { containerRef: gridRef, visibleItems } = useStaggerAnimation(portfolioConfig.projects.length + 1, 120);

  return (
    <section id="portfolio" className="w-full py-24 lg:py-32 bg-white relative">
      <div className="absolute inset-0 bg-exvia-subtle/20" />

      <div className="container-large px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-16">
          {portfolioConfig.label && (
            <div
              className={cn(
                'transition-all duration-800 ease-out-quart flex items-center gap-4',
                headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              <div className="w-12 h-px bg-exvia-violet" />
              <span className="text-sm font-geist-mono uppercase tracking-widest text-exvia-violet font-medium">
                {portfolioConfig.label}
              </span>
            </div>
          )}

          {portfolioConfig.heading && (
            <h2
              className={cn(
                'text-4xl lg:text-5xl font-light text-exvia-base-black mt-6 tracking-tight leading-tight transition-all duration-800 ease-out-quart',
                headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: '100ms' }}
            >
              {portfolioConfig.heading}
            </h2>
          )}

          {portfolioConfig.description && (
            <p
              className={cn(
                'mt-6 text-lg text-exvia-base-black/60 leading-relaxed transition-all duration-800 ease-out-quart max-w-2xl',
                headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: '200ms' }}
            >
              {portfolioConfig.description}
            </p>
          )}
        </div>

        {/* Projects Grid - Bento Style */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {/* Row 1: Featured (2 cols) + Small (1 col) */}
          {portfolioConfig.projects[0] && (
            <ProjectCard
              project={portfolioConfig.projects[0]}
              index={0}
              isVisible={visibleItems[0]}
            />
          )}
          {portfolioConfig.projects[1] && (
            <ProjectCard
              project={portfolioConfig.projects[1]}
              index={1}
              isVisible={visibleItems[1]}
            />
          )}

          {/* Row 2: Two small + CTA card */}
          {portfolioConfig.projects[2] && (
            <ProjectCard
              project={portfolioConfig.projects[2]}
              index={2}
              isVisible={visibleItems[2]}
            />
          )}
          {portfolioConfig.projects[3] && (
            <ProjectCard
              project={portfolioConfig.projects[3]}
              index={3}
              isVisible={visibleItems[3]}
            />
          )}

          {/* Decorative CTA Card */}
          {portfolioConfig.cta.heading && (
            <div
              className={cn(
                'relative overflow-hidden bg-gradient-to-br from-exvia-violet-dark to-exvia-violet rounded-3xl p-10 flex flex-col justify-between transition-all duration-700 ease-out-quart lg:col-span-1 md:col-span-2 shadow-2xl',
                visibleItems[portfolioConfig.projects.length] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="relative z-10">
                {portfolioConfig.cta.label && (
                  <span className="text-xs font-geist-mono uppercase tracking-widest text-white/70 block mb-4">
                    {portfolioConfig.cta.label}
                  </span>
                )}
                <h3 className="text-3xl font-light text-white leading-tight mb-8">
                  {portfolioConfig.cta.heading}
                </h3>
              </div>
              <div className="relative z-10 mt-auto">
                {portfolioConfig.cta.linkText && (
                  <button
                    type="button"
                    onClick={() => scrollTo(portfolioConfig.cta.linkHref || '#contact')}
                    className="inline-flex items-center gap-3 px-6 py-3 bg-white text-exvia-violet rounded-full font-medium hover:bg-exvia-subtle transition-colors cursor-pointer group"
                  >
                    <span>{portfolioConfig.cta.linkText}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                )}
              </div>
              {/* Decorative circles */}
              <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-white/10 blur-xl" />
            </div>
          )}

          {/* Row 3: Full width featured */}
          {portfolioConfig.projects[4] && (
            <div className="lg:col-span-3 md:col-span-2">
              <ProjectCard
                project={portfolioConfig.projects[4]}
                index={5}
                isVisible={visibleItems[4]}
              />
            </div>
          )}
        </div>

        {/* View All Button */}
        {portfolioConfig.viewAllLabel && (
          <div
            className={cn(
              'mt-16 text-center transition-all duration-800 ease-out-quart',
              visibleItems[portfolioConfig.projects.length] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
            style={{ transitionDelay: '600ms' }}
          >
            <button
              onClick={() => scrollTo('#contact')}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-exvia-subtle/50 text-exvia-violet rounded-full font-medium hover:bg-exvia-violet hover:text-white transition-all duration-300 border border-exvia-violet/20 hover:shadow-lg cursor-pointer"
            >
              <span>{portfolioConfig.viewAllLabel}</span>
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
