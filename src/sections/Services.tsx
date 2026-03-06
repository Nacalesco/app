import { ElementType } from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { servicesConfig } from '@/config';
import { Compass, Palette, Camera, TrendingUp, Circle } from 'lucide-react';

const iconMap: Record<string, ElementType> = {
  Compass,
  Palette,
  Camera,
  TrendingUp,
};

function getIcon(iconName: string): ElementType {
  return iconMap[iconName] || Circle;
}

interface ServiceCardProps {
  service: { iconName: string; title: string; description: string; };
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = getIcon(service.iconName);

  return (
    <div className="group relative glass-panel rounded-3xl p-8 lg:p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden border border-exvia-border/50 bg-white/40">
      {/* Hover Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-exvia-violet/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Decorative Violet Line */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-exvia-violet/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header Row: Icon and Index */}
        <div className="flex items-center justify-between mb-8">
          <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-exvia-border/50 group-hover:border-exvia-violet/30 group-hover:shadow-[0_0_20px_rgba(138,43,226,0.15)] transition-all duration-500">
            <Icon className="w-6 h-6 text-exvia-base-black group-hover:text-exvia-violet transition-colors duration-500" />
          </div>
          <div className="text-xl font-geist-mono font-light text-exvia-base-black/20 group-hover:text-exvia-violet/40 transition-colors duration-500">
            0{index + 1}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h3 className="text-2xl font-light tracking-tight text-exvia-base-black group-hover:text-exvia-violet-dark transition-colors duration-500">
            {service.title}
          </h3>
          <p className="text-sm font-medium text-exvia-base-black/60 leading-relaxed md:text-base">
            {service.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Services() {
  if (!servicesConfig.heading && servicesConfig.services.length === 0) return null;

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const { ref: servicesRef, isVisible: servicesVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="services" className="w-full py-24 lg:py-32 bg-exvia-subtle relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-exvia-border to-transparent" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--exvia-base-black) 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div className="container-large px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20 lg:mb-24">
          {servicesConfig.label && (
            <div
              className={cn(
                'transition-all duration-800 ease-out-quart flex items-center justify-center gap-4',
                headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              <div className="w-8 h-px bg-exvia-violet" />
              <span className="text-sm font-geist-mono uppercase tracking-widest text-exvia-violet font-medium">
                {servicesConfig.label}
              </span>
              <div className="w-8 h-px bg-exvia-violet" />
            </div>
          )}

          {servicesConfig.heading && (
            <h2
              className={cn(
                'text-4xl lg:text-5xl font-light text-exvia-base-black mt-6 tracking-tight leading-tight transition-all duration-800 ease-out-quart',
                headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: '100ms' }}
            >
              {servicesConfig.heading}
            </h2>
          )}
        </div>

        {/* Services Grid */}
        {servicesConfig.services.length > 0 && (
          <div
            ref={servicesRef}
            className={cn(
              'grid md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 transition-all duration-800 ease-out-quart',
              servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            )}
          >
            {servicesConfig.services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
