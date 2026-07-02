import { useRef, useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { videosConfig } from '@/config';
import type { VideoItem } from '@/config';
import { Play, Pause, Volume2, VolumeX, X, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';

// ─── Helpers ───────────────────────────────────────────────────────────────────

function formatTime(seconds: number): string {
  if (!seconds || !isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ─── VideoProgressBar ──────────────────────────────────────────────────────────

interface VideoProgressBarProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  className?: string;
}

function VideoProgressBar({ videoRef, className }: VideoProgressBarProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onLoadedMetadata = () => setDuration(video.duration);
    const onProgress = () => {
      if (video.buffered.length > 0) {
        setBuffered((video.buffered.end(video.buffered.length - 1) / video.duration) * 100);
      }
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('progress', onProgress);

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('progress', onProgress);
    };
  }, [videoRef]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = Number(e.target.value);
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={cn('flex items-center gap-3 w-full', className)}>
      <span className="text-xs font-geist-mono text-white/70 w-10 text-right tabular-nums">
        {formatTime(currentTime)}
      </span>
      <div className="relative flex-1 group">
        <div
          className="absolute inset-y-0 left-0 bg-white/10 rounded-full"
          style={{ width: `${buffered}%` }}
        />
        <div
          className="absolute inset-y-0 left-0 bg-exvia-violet rounded-full transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        />
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="video-progress-bar relative z-10"
        />
      </div>
      <span className="text-xs font-geist-mono text-white/70 w-10 tabular-nums">
        {formatTime(duration)}
      </span>
    </div>
  );
}

// ─── VideoLightbox ─────────────────────────────────────────────────────────────

interface VideoLightboxProps {
  video: VideoItem;
  isOpen: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

function VideoLightbox({ video, isOpen, onClose, onPrev, onNext, hasPrev, hasNext }: VideoLightboxProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Mount/unmount animation
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsVisible(true));
      });
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setShouldRender(false), 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('video-modal-no-scroll');
      return () => document.body.classList.remove('video-modal-no-scroll');
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev?.();
      if (e.key === 'ArrowRight' && hasNext) onNext?.();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose, onPrev, onNext, hasPrev, hasNext]);

  // Auto-play on open
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      scheduleHide();
    }
    return () => { cancelHide(); };
  }, [isOpen, video.src]);

  const scheduleHide = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControls(false), 3000);
  }, []);

  const cancelHide = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
  }, []);

  useEffect(() => () => { if (hideTimer.current) clearTimeout(hideTimer.current); }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (isPlaying) {
      v.pause();
      setIsPlaying(false);
      cancelHide();
      setShowControls(true);
    } else {
      v.play();
      setIsPlaying(true);
      scheduleHide();
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = async () => {
    const container = videoRef.current?.parentElement?.parentElement;
    if (!container) return;
    if (!document.fullscreenElement) {
      await container.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    cancelHide();
    setShowControls(true);
  };

  const handleContainerMouseMove = () => {
    setShowControls(true);
    if (isPlaying) scheduleHide();
  };

  if (!shouldRender) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center',
        'transition-opacity duration-300',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
    >
      {/* Backdrop */}
      <div
        className={cn(
          'absolute inset-0 bg-exvia-black/90',
          'transition-all duration-300',
          isVisible ? 'backdrop-blur-xl' : 'backdrop-blur-0'
        )}
        onClick={onClose}
      />

      {/* Content */}
      <div
        className={cn(
          'relative z-10 w-full max-w-5xl mx-4',
          'transition-all duration-350 ease-out-quart',
          isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-3'
        )}
        onMouseMove={handleContainerMouseMove}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-14 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Navigation arrows */}
        {hasPrev && (
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200 z-20 backdrop-blur-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        {hasNext && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200 z-20 backdrop-blur-sm"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Video */}
        <div className="relative rounded-xl overflow-hidden bg-black shadow-2xl">
          <video
            ref={videoRef}
            src={video.src}
            className="w-full aspect-video object-contain"
            playsInline
            muted={isMuted}
            onEnded={handleVideoEnd}
          />

          {/* Controls overlay */}
          <div
            className={cn(
              'absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30',
              'transition-opacity duration-300 pointer-events-none',
              showControls ? 'opacity-100' : 'opacity-0'
            )}
          >
            {/* Center play/pause */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
              <button
                onClick={togglePlay}
                className={cn(
                  'w-20 h-20 rounded-full flex items-center justify-center',
                  'bg-exvia-violet/80 hover:bg-exvia-violet',
                  'transition-all duration-300 hover:scale-110',
                  'shadow-lg shadow-exvia-violet/40'
                )}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-white" />
                ) : (
                  <Play className="w-8 h-8 text-white ml-1" />
                )}
              </button>
            </div>

            {/* Bottom controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 pointer-events-auto">
              <VideoProgressBar videoRef={videoRef} />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="text-white hover:text-exvia-violet transition-colors"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-exvia-violet transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <span className="text-sm text-white/80 font-medium">{video.title}</span>
                </div>
                <button
                  onClick={toggleFullscreen}
                  className="text-white hover:text-exvia-violet transition-colors"
                >
                  {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── VideoCard ─────────────────────────────────────────────────────────────────

interface VideoCardProps {
  video: VideoItem;
  isFeatured?: boolean;
  onClick: () => void;
}

function VideoCard({ video, isFeatured, onClick }: VideoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        'group relative cursor-pointer',
        'rounded-2xl overflow-hidden',
        'border border-exvia-border',
        'transition-all duration-500 ease-out-quart',
        isHovered && 'border-exvia-violet/50 shadow-xl shadow-exvia-violet/10'
      )}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateY(${mousePos.x * 5}deg) rotateX(${-mousePos.y * 5}deg) scale(1.01)`
          : 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)',
        transition: 'transform 0.15s ease-out, border-color 0.5s ease, box-shadow 0.5s ease',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0, y: 0 }); }}
      onClick={onClick}
    >
      {/* Video thumbnail/poster area */}
      <div className={cn('relative overflow-hidden', isFeatured ? 'aspect-[16/9]' : 'aspect-video')}>
        <video
          src={video.src}
          poster={video.thumbnail}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out-quart group-hover:scale-105"
          muted
          playsInline
          preload="metadata"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-exvia-black/80 via-exvia-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={cn(
              'w-16 h-16 rounded-full flex items-center justify-center',
              'bg-exvia-violet/80 backdrop-blur-sm',
              'group-hover:bg-exvia-violet group-hover:scale-110',
              'transition-all duration-500 ease-out-quart',
              'shadow-lg group-hover:shadow-xl group-hover:shadow-exvia-violet/40'
            )}
          >
            <Play className="w-7 h-7 text-white ml-0.5" />
          </div>
        </div>

        {/* Category badge */}
        {video.category && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 text-xs font-geist-mono uppercase tracking-wider bg-exvia-violet/90 text-white rounded-full backdrop-blur-sm">
              {video.category}
            </span>
          </div>
        )}

        {/* Duration badge */}
        {video.duration && (
          <div className="absolute top-4 right-4">
            <span className="px-2.5 py-1 text-xs font-geist-mono bg-exvia-black/60 text-white/90 rounded-md backdrop-blur-sm">
              {video.duration}
            </span>
          </div>
        )}

        {/* Bottom info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className={cn('font-semibold text-white mb-1', isFeatured ? 'text-h5' : 'text-h6')}>
            {video.title}
          </h3>
          <p className="text-sm text-white/70 line-clamp-2 leading-relaxed">
            {video.description}
          </p>
        </div>
      </div>

      {/* Hover ring */}
      <div
        className={cn(
          'absolute inset-0 rounded-2xl pointer-events-none',
          'transition-all duration-500',
          isHovered && 'ring-2 ring-exvia-violet/30'
        )}
      />
    </div>
  );
}

// ─── Videos (main section) ─────────────────────────────────────────────────────

export function Videos() {
  if (videosConfig.videos.length === 0) return null;

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const { ref: videosRef, isVisible: videosVisible } = useScrollAnimation({ threshold: 0.1 });
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null);

  const featuredIndex = videosConfig.videos.findIndex((v) => v.featured);
  const featuredVideo = featuredIndex >= 0 ? videosConfig.videos[featuredIndex] : videosConfig.videos[0];
  const featuredIdx = featuredIndex >= 0 ? featuredIndex : 0;
  const secondaryVideos = videosConfig.videos.filter((_, i) => i !== featuredIdx);

  const handleOpen = (index: number) => setSelectedVideoIndex(index);
  const handleClose = () => setSelectedVideoIndex(null);
  const handlePrev = () => setSelectedVideoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
  const handleNext = () =>
    setSelectedVideoIndex((prev) => (prev !== null && prev < videosConfig.videos.length - 1 ? prev + 1 : prev));

  return (
    <section id="videos" className="w-full py-24 lg:py-32" style={{ backgroundColor: '#EBE1D5' }}>
      <div className="container-large px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="max-w-2xl mb-16">
          {videosConfig.label && (
            <div
              className={cn(
                'transition-all duration-800 ease-out-quart',
                headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              <span className="text-xs font-geist-mono uppercase tracking-widest text-exvia-violet">
                {videosConfig.label}
              </span>
            </div>
          )}

          {videosConfig.heading && (
            <h2
              className={cn(
                'text-h2 font-semibold text-exvia-black mt-4 transition-all duration-800 ease-out-quart',
                headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: '100ms' }}
            >
              {videosConfig.heading}
            </h2>
          )}

          {videosConfig.description && (
            <p
              className={cn(
                'text-body text-exvia-black/60 mt-4 transition-all duration-800 ease-out-quart',
                headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: '200ms' }}
            >
              {videosConfig.description}
            </p>
          )}
        </div>

        {/* Asymmetric video layout */}
        <div
          ref={videosRef}
          className={cn(
            'grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 transition-all duration-800 ease-out-quart',
            videosVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          {/* Featured video — full width */}
          <div className="col-span-full" style={{ transitionDelay: '100ms' }}>
            <VideoCard
              video={featuredVideo}
              isFeatured
              onClick={() => handleOpen(featuredIdx)}
            />
          </div>

          {/* Secondary videos */}
          {secondaryVideos.map((video) => {
            const originalIndex = videosConfig.videos.indexOf(video);
            return (
              <div key={video.title} style={{ transitionDelay: `${200 + originalIndex * 100}ms` }}>
                <VideoCard
                  video={video}
                  onClick={() => handleOpen(originalIndex)}
                />
              </div>
            );
          })}
        </div>

        {/* Lightbox */}
        {selectedVideoIndex !== null && (
          <VideoLightbox
            video={videosConfig.videos[selectedVideoIndex]}
            isOpen
            onClose={handleClose}
            onPrev={selectedVideoIndex > 0 ? handlePrev : undefined}
            onNext={selectedVideoIndex < videosConfig.videos.length - 1 ? handleNext : undefined}
            hasPrev={selectedVideoIndex > 0}
            hasNext={selectedVideoIndex < videosConfig.videos.length - 1}
          />
        )}
      </div>
    </section>
  );
}
