import { } from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';

const tools = [
    { name: 'Meta Ads', category: 'Publicidad', icon: '📣', color: 'from-blue-500/20 to-blue-600/10' },
    { name: 'Instagram', category: 'Social Media', icon: '📸', color: 'from-pink-500/20 to-purple-500/10' },
    { name: 'Facebook', category: 'Social Media', icon: '👥', color: 'from-blue-600/20 to-blue-700/10' },
    { name: 'Canva', category: 'Diseño', icon: '🎨', color: 'from-teal-400/20 to-cyan-500/10' },
    { name: 'TikTok', category: 'Social Media', icon: '🎵', color: 'from-slate-400/20 to-slate-500/10' },
    { name: 'Trello', category: 'Planificación', icon: '📋', color: 'from-blue-400/20 to-blue-500/10' },
];

const skills = [
    { label: 'Estrategia Digital', level: 92, cert: null },
    { label: 'Social Media', level: 90, cert: null },
    { label: 'Creación de Contenido', level: 88, cert: null },
    { label: 'Análisis de Datos', level: 78, cert: null },
    { label: 'Branding & Identidad', level: 82, cert: null },
    { label: 'Inglés', level: 0, cert: '/media/certificado-ingles.pdf' },
];

export function Skills() {
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 });
    const { containerRef: toolsRef, visibleItems } = useStaggerAnimation(tools.length, 80);
    const { ref: skillsRef, isVisible: skillsVisible } = useScrollAnimation({ threshold: 0.2 });

    return (
        <section id="skills" className="w-full py-24 lg:py-32 bg-exvia-base-black overflow-hidden">
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
                            Herramientas & Habilidades
                        </span>
                    </div>
                    <h2
                        className={cn(
                            'text-4xl lg:text-5xl font-light text-exvia-white tracking-tight leading-tight transition-all duration-800 ease-out-quart max-w-2xl',
                            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                        )}
                        style={{ transitionDelay: '100ms' }}
                    >
                        Tecnologías y herramientas que{' '}
                        <span className="text-gradient">uso a diario</span>
                    </h2>
                </div>

                {/* Tools Grid */}
                <div ref={toolsRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-20">
                    {tools.map((tool, i) => (
                        <div
                            key={tool.name}
                            className={cn(
                                'group relative rounded-2xl p-5 border border-white/10 bg-white/5',
                                'hover:border-exvia-violet/40 hover:bg-white/10 hover:-translate-y-1',
                                'transition-all duration-400 ease-out-quart cursor-default',
                                visibleItems[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                            )}
                            style={{ transitionDelay: `${i * 60}ms` }}
                        >
                            {/* Hover gradient */}
                            <div className={cn('absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-400', tool.color)} />
                            <div className="relative z-10 flex flex-col items-center text-center gap-2">
                                <span className="text-2xl">{tool.icon}</span>
                                <span className="text-xs font-medium text-exvia-white leading-tight">{tool.name}</span>
                                <span className="text-[10px] font-geist-mono text-white/40 uppercase tracking-wider">{tool.category}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Skills bars */}
                <div ref={skillsRef} className="grid lg:grid-cols-2 gap-x-20 gap-y-4">
                    {skills.map((skill, i) => (
                        <div
                            key={skill.label}
                            className={cn(
                                'transition-all duration-800 ease-out-quart flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10',
                                skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            )}
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >
                            <span className="text-base font-medium text-exvia-white">{skill.label}</span>
                            {skill.cert && (
                                <a
                                    href={skill.cert}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-3 shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-geist-mono uppercase tracking-wider bg-exvia-violet/20 border border-exvia-violet/40 text-exvia-violet hover:bg-exvia-violet hover:text-white transition-all duration-300"
                                >
                                    <span>🎓</span> Ver certificado
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
