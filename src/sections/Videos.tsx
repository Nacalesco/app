import { useRef, useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { videosConfig } from '@/config';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoPlayerProps {
  video: {
    title: string;
    description: string;
    src: string;
    thumbnail?: string;
  };
  index: number;
}

function VideoPlayer({ video, index }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(true);

  // Schedule controls to hide after 2 seconds
  const scheduleHide = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControls(false), 2000);
  }, []);

  // Cancel any pending hide timer
  const cancelHide = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
  }, []);

  useEffect(() => () => { if (hideTimer.current) clearTimeout(hideTimer.current); }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
        cancelHide();
        setShowControls(true);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
        scheduleHide();
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    cancelHide();
    setShowControls(true);
  };

  // Tapping the video area while playing briefly shows controls then hides
  const handleContainerClick = () => {
    if (isPlaying) {
      setShowControls(true);
      scheduleHide();
    }
  };

  return (
    <div
      className={cn(
        'group relative rounded-2xl overflow-hidden bg-exvia-black/5',
        'border border-exvia-border hover:border-exvia-violet/30',
        'transition-all duration-500'
      )}
      onMouseEnter={() => { cancelHide(); setShowControls(true); }}
      onMouseLeave={() => { if (isPlaying) scheduleHide(); }}
      onClick={handleContainerClick}
    >
      {/* Video Container */}
      <div className="relative w-full aspect-video bg-exvia-base-black">
        <video
          ref={videoRef}
          src={video.src}
          poster={video.thumbnail}
          className="absolute inset-0 w-full h-full object-contain"
          onEnded={handleVideoEnd}
          playsInline
          loop
          muted={isMuted}
        />

        {/* Play/Pause Overlay */}
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center',
            'bg-gradient-to-t from-exvia-black/60 via-transparent to-transparent',
            'transition-opacity duration-300 pointer-events-none',
            !isPlaying ? 'opacity-100' : (showControls ? 'opacity-100' : 'opacity-0')
          )}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className={cn(
              'w-16 h-16 rounded-full flex items-center justify-center pointer-events-auto',
              'bg-exvia-violet/90 hover:bg-exvia-violet text-white',
              'backdrop-blur-sm transition-all duration-300',
              'transform hover:scale-110',
              'shadow-lg shadow-exvia-violet/30'
            )}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-1" />
            )}
          </button>
        </div>

        <div
          className={cn(
            'absolute bottom-4 right-4 flex gap-2',
            'transition-opacity duration-300 pointer-events-none',
            !isPlaying ? 'opacity-100' : (showControls ? 'opacity-100' : 'opacity-0')
          )}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMute();
            }}
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center pointer-events-auto',
              'bg-exvia-black/60 hover:bg-exvia-black/80 text-white',
              'backdrop-blur-sm transition-all duration-300'
            )}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Video Index Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 text-xs font-geist-mono bg-exvia-violet/90 text-white rounded-full backdrop-blur-sm">
            Video {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Video Info */}
      <div className="p-6" style={{ backgroundColor: '#F5EDE2' }}>
        <h3 className="text-h6 font-semibold text-exvia-black mb-2">
          {video.title}
        </h3>
        <p className="text-sm text-exvia-black/60 leading-relaxed">
          {video.description}
        </p>
      </div>
    </div>
  );
}

export function Videos() {
  if (videosConfig.videos.length === 0) return null;

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const { ref: videosRef, isVisible: videosVisible } = useScrollAnimation({ threshold: 0.1 });

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

        {/* Videos Grid */}
        <div
          ref={videosRef}
          className={cn(
            'grid md:grid-cols-2 gap-8 transition-all duration-800 ease-out-quart',
            videosVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          {videosConfig.videos.map((video, index) => (
            <VideoPlayer key={video.title} video={video} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
