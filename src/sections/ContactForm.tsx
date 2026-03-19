import { useState, type FormEvent } from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Send, Loader2, CheckCircle, Mail, User, MessageSquare } from 'lucide-react';

export function ContactForm() {
    const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) return;
        setStatus('sending');

        // Build mailto link with form data and open email client
        const subject = encodeURIComponent(`Contacto desde portfolo - ${formData.name}`);
        const body = encodeURIComponent(
            `Nombre: ${formData.name}\nEmail: ${formData.email}\n\nMensaje:\n${formData.message}`
        );
        const mailtoUrl = `mailto:valchurastrilla@gmail.com?subject=${subject}&body=${body}`;

        setTimeout(() => {
            window.open(mailtoUrl, '_self');
            setStatus('sent');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 4000);
        }, 600);
    };

    const inputStyles = cn(
        'w-full px-5 py-4 rounded-2xl text-sm text-exvia-black placeholder:text-exvia-base-black/40',
        'bg-exvia-white border border-exvia-border',
        'focus:outline-none focus:border-exvia-violet focus:ring-2 focus:ring-exvia-violet/20',
        'transition-all duration-300'
    );

    return (
        <section id="contact-form" className="w-full py-24 lg:py-32 bg-exvia-subtle/40">
            <div ref={sectionRef} className="container-large px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">

                    {/* Left — Text */}
                    <div
                        className={cn(
                            'transition-all duration-800 ease-out-quart',
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        )}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-px bg-exvia-violet" />
                            <span className="text-sm font-geist-mono uppercase tracking-widest text-exvia-violet">
                                Contacto
                            </span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-exvia-base-black tracking-tight leading-tight mb-6">
                            Hablemos de tu<br />
                            <span className="text-gradient font-medium">próximo proyecto</span>
                        </h2>
                        <p className="text-lg text-exvia-base-black/60 leading-relaxed mb-10">
                            ¿Tenés una idea, un proyecto o simplemente querés consultarme algo?
                            Completá el formulario y te respondo a la brevedad.
                        </p>

                        {/* Contact details */}
                        <div className="space-y-4">
                            <a
                                href="mailto:valchurastrilla@gmail.com"
                                className="flex items-center gap-3 text-exvia-base-black/70 hover:text-exvia-violet transition-colors group"
                            >
                                <div className="w-10 h-10 rounded-full bg-exvia-violet/10 flex items-center justify-center group-hover:bg-exvia-violet group-hover:text-white transition-all duration-300">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <span className="text-sm">valchurastrilla@gmail.com</span>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/valentina-rastrilla-heindl?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-exvia-base-black/70 hover:text-exvia-violet transition-colors group"
                            >
                                <div className="w-10 h-10 rounded-full bg-exvia-violet/10 flex items-center justify-center group-hover:bg-exvia-violet group-hover:text-white transition-all duration-300">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                                        <circle cx="4" cy="4" r="2" />
                                    </svg>
                                </div>
                                <span className="text-sm">LinkedIn — Valentina Rastrilla Heindl</span>
                            </a>
                        </div>
                    </div>

                    {/* Right — Form */}
                    <div
                        className={cn(
                            'transition-all duration-800 ease-out-quart',
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        )}
                        style={{ transitionDelay: '150ms' }}
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="bg-exvia-white rounded-3xl p-8 lg:p-10 shadow-sm border border-exvia-border space-y-5"
                        >
                            {/* Name */}
                            <div className="relative">
                                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-exvia-base-black/30 pointer-events-none" />
                                <input
                                    type="text"
                                    required
                                    placeholder="Tu nombre"
                                    value={formData.name}
                                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                                    className={cn(inputStyles, 'pl-12')}
                                />
                            </div>

                            {/* Email */}
                            <div className="relative">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-exvia-base-black/30 pointer-events-none" />
                                <input
                                    type="email"
                                    required
                                    placeholder="tu@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                                    className={cn(inputStyles, 'pl-12')}
                                />
                            </div>

                            {/* Message */}
                            <div className="relative">
                                <MessageSquare className="absolute left-5 top-5 w-4 h-4 text-exvia-base-black/30 pointer-events-none" />
                                <textarea
                                    required
                                    rows={5}
                                    placeholder="Contame sobre tu proyecto..."
                                    value={formData.message}
                                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                                    className={cn(inputStyles, 'pl-12 resize-none')}
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={status !== 'idle'}
                                className={cn(
                                    'w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-sm font-medium transition-all duration-300',
                                    status === 'sent'
                                        ? 'bg-green-500 text-white'
                                        : 'bg-exvia-violet text-white hover:bg-exvia-violet-dark hover:shadow-lg hover:shadow-exvia-violet/30',
                                    status === 'sending' && 'opacity-80 cursor-not-allowed'
                                )}
                            >
                                {status === 'idle' && (
                                    <>
                                        <Send className="w-4 h-4" />
                                        <span>Enviar Mensaje</span>
                                    </>
                                )}
                                {status === 'sending' && (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Enviando...</span>
                                    </>
                                )}
                                {status === 'sent' && (
                                    <>
                                        <CheckCircle className="w-4 h-4" />
                                        <span>¡Mensaje enviado!</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
