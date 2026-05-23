import { motion } from 'framer-motion';

interface SceneImageProps {
  src: string;
  alt: string;
  caption?: string;
  completed?: boolean;
  fragmentLabel?: string;
  className?: string;
}

export function SceneImage({
  src,
  alt,
  caption,
  completed,
  fragmentLabel,
  className = '',
}: SceneImageProps) {
  return (
    <figure className={`group relative overflow-hidden rounded-lg border border-cyber-border ${className}`}>
      <div className="relative aspect-[21/9] w-full bg-black sm:aspect-[2.4/1]">
        <motion.img
          src={src}
          alt={alt}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          loading="eager"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.04) 2px, rgba(0,240,255,0.04) 4px)',
          }}
          aria-hidden
        />
        {completed && fragmentLabel && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute right-3 top-3 rounded border border-cyber-green/50 bg-black/70 px-3 py-1.5 backdrop-blur-sm"
          >
            <span className="text-xs text-cyber-green">Fragment secured</span>
            <p className="terminal-text text-lg font-bold text-cyber-cyan">{fragmentLabel}</p>
          </motion.div>
        )}
      </div>
      {caption && (
        <figcaption className="border-t border-cyber-border bg-cyber-panel/90 px-4 py-2.5 text-xs text-cyber-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
