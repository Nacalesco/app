import { } from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Search, Lightbulb, Rocket, BarChart3 } from 'lucide-react';

const steps = [
    {
        number: '01',
        icon: Search,
        title: 'Análisis',
        description:
            'Investigación profunda del mercado, la competencia y el público objetivo. Identificación de oportunidades y definición del punto de partida estratégico.',
        tags: ['Auditoría digital', 'Benchmarking', 'Buyer persona'],
    },
    {
        number: '02',
        icon: Lightbulb,
        title: 'Estrategia',
        description:
            'Diseño del plan de acción con objetivos claros, KPIs medibles y canales prioritarios. Cada decisión está fundamentada en datos y alineada con el negocio.',
        tags: ['KPIs', 'Planificación', 'Presupuesto'],
    },
    {
        number: '03',
        icon: Rocket,
        title: 'Ejecución',
        description:
            'Implementación de campañas, contenidos y acciones de comunicación. Coordinación de cada pieza para que el mensaje llegue al público correcto.',
        tags: ['Campañas', 'Contenido', 'Community'],
    },
    {
        number: '04',
        icon: BarChart3,
        title: 'Resultados',
        description:
            'Medición del desempeño, análisis de métricas y optimización continua. Los resultados guían las decisiones para maximizar el retorno de cada acción.',
        tags: ['Analytics', 'Reportes', 'Optimización'],
    },
];

export function Process() {
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 });
    const { ref: stepsRef, isVisible: stepsVisible } = useScrollAnimation({ threshold: 0.1 });

    return (
        <section id="process" className="w-full py-24 lg:py-32 bg-exvia-subtle/30">
            <div className="container-large px-6 lg:px-12">

                {/* Header */}
                <div ref={headerRef} className="max-w-2xl mb-20">
                    <div
                        className={cn(
                            'flex items-center gap-4 mb-6 transition-all duration-800 ease-out-quart',
                            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        )}
                    >
                        <div className="w-12 h-px bg-exvia-violet" />
                        <span className="text-sm font-geist-mono uppercase tracking-widest text-exvia-violet">
                            Mi Proceso
                        </span>
                    </div>
                    <h2
                        className={cn(
                            'text-4xl lg:text-5xl font-light text-exvia-base-black tracking-tight leading-tight transition-all duration-800 ease-out-quart',
                            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                        )}
                        style={{ transitionDelay: '100ms' }}
                    >
                        Cómo creo estrategias que
                        <span className="text-gradient font-medium"> generan resultados</span>
                    </h2>
                </div>

                {/* Steps */}
                <div ref={stepsRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, i) => {
                        const Icon = step.icon;
                        return (
                            <div
                                key={step.number}
                                className={cn(
                                    'group relative rounded-3xl p-8 bg-exvia-white border border-exvia-border',
                                    'hover:border-exvia-violet/30 hover:shadow-xl hover:shadow-exvia-violet/5 hover:-translate-y-2',
                                    'transition-all duration-500 ease-out-quart flex flex-col gap-6',
                                    stepsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                )}
                                style={{ transitionDelay: `${i * 120}ms` }}
                            >
                                {/* Number & Icon */}
                                <div className="flex items-start justify-between">
                                    <span className="text-5xl font-black text-exvia-violet/15 group-hover:text-exvia-violet/25 transition-colors duration-500 leading-none">
                                        {step.number}
                                    </span>
                                    <div className="w-12 h-12 rounded-2xl bg-exvia-violet/10 group-hover:bg-exvia-violet flex items-center justify-center transition-all duration-500">
                                        <Icon className="w-5 h-5 text-exvia-violet group-hover:text-white transition-colors duration-500" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex flex-col gap-3 flex-1">
                                    <h3 className="text-xl font-semibold text-exvia-base-black group-hover:text-exvia-violet-dark transition-colors duration-500">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-exvia-base-black/60 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 pt-2 border-t border-exvia-border">
                                    {step.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-[10px] font-geist-mono uppercase tracking-wider text-exvia-violet/70 bg-exvia-violet/8 px-3 py-1 rounded-full border border-exvia-violet/20"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Connector arrow (hidden on last) */}
                                {i < steps.length - 1 && (
                                    <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                                        <div className="w-8 h-px bg-exvia-violet/30" />
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-exvia-violet/40 rotate-45" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
