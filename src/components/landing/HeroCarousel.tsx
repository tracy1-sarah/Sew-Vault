import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  { src: '/landing/seamstress-hat.jpg', alt: 'Seamstress sewing wax print fabric at her machine' },
  { src: '/landing/tailor-red-shirt.jpg', alt: 'Tailor working at a sewing machine' },
  { src: '/landing/sewing-wax-print.jpg', alt: 'Close-up of wax print fabric being sewn' },
  { src: '/landing/seamstress-shop.jpg', alt: 'Seamstresses working in a busy shop' },
  { src: '/landing/tailor-plaid.jpg', alt: 'Young tailor focused on his work' },
  { src: '/landing/wax-print-fabrics.jpg', alt: 'Colourful African print fabrics' },
  { src: '/landing/seamstress-machine.jpg', alt: 'Seamstress at an industrial sewing machine' },
  { src: '/landing/tailor-workshop.jpg', alt: 'Tailor in a workshop full of fabric' },
  { src: '/landing/singer-machine.jpg', alt: 'Vintage sewing machine beside fabric' },
  { src: '/landing/seamstress-silhouette.jpg', alt: 'Seamstress silhouetted at her machine' },
];

const STEP = 360 / images.length;

function useRingSize() {
  const [size, setSize] = useState({ radius: 600, cardW: 210, cardH: 280 });
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setSize({ radius: 300, cardW: 120, cardH: 160 });
      else if (w < 1024) setSize({ radius: 420, cardW: 160, cardH: 210 });
      else setSize({ radius: 600, cardW: 210, cardH: 280 });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return size;
}

/**
 * A 3D ring of photos . It spins slowly on its own,
 * follows page scroll, and can be dragged, swiped or scrolled sideways.
 */
export function HeroCarousel() {
  const { radius, cardW, cardH } = useRingSize();
  const ringRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // All animation state lives in refs so the rAF loop never re-renders React.
  const angle = useRef(0);
  const target = useRef(0);
  const dragging = useRef<{ x: number; start: number } | null>(null);
  const lastScroll = useRef(0);
  const idleUntil = useRef(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    lastScroll.current = window.scrollY;

    const onScroll = () => {
      const dy = window.scrollY - lastScroll.current;
      lastScroll.current = window.scrollY;
      target.current -= dy * 0.15;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    let raf = 0;
    let prev = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - prev, 50);
      prev = now;

      if (!reduceMotion && !dragging.current && now > idleUntil.current) {
        target.current -= dt * 0.006;
      }
      angle.current += (target.current - angle.current) * 0.08;

      if (ringRef.current) {
        ringRef.current.style.transform = `translateZ(${-radius * 0.45}px) rotateX(-6deg) rotateY(${angle.current}deg)`;
      }
      // Dim and blur cards as they swing to the back of the ring.
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const theta = ((i * STEP + angle.current) * Math.PI) / 180;
        const facing = (Math.cos(theta) + 1) / 2;
        card.style.filter = `brightness(${0.35 + facing * 0.65}) saturate(${0.6 + facing * 0.4})`;
        card.style.opacity = String(Math.min(1, Math.max(0, (facing - 0.4) * 2.2)));
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, [radius]);

  const pause = (ms = 2500) => {
    idleUntil.current = performance.now() + ms;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragging.current = { x: e.clientX, start: target.current };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    target.current = dragging.current.start + (e.clientX - dragging.current.x) * 0.25;
  };
  const onPointerUp = () => {
    dragging.current = null;
    pause();
  };
  const onWheel = (e: React.WheelEvent) => {
    // Only hijack horizontal scrolling so vertical page scroll still works.
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      target.current -= e.deltaX * 0.2;
      pause();
    }
  };
  const nudge = (dir: 1 | -1) => {
    target.current = Math.round((target.current + dir * STEP) / STEP) * STEP;
    pause(4000);
  };

  return (
    <div className="relative mx-auto w-full">
      <div
        className="relative h-[400px] sm:h-[480px] lg:h-[520px] cursor-grab active:cursor-grabbing select-none touch-pan-y"
        style={{ perspective: '1400px' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
      >
        {/* Glow at the centre of the ring */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7CF29C]/25 blur-[90px]" />

        <div className="absolute left-1/2 top-1/2 h-0 w-0" style={{ transformStyle: 'preserve-3d' }}>
          <div ref={ringRef} style={{ transformStyle: 'preserve-3d' }}>
            {images.map((img, i) => (
              <div
                key={img.src}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="absolute overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10"
                style={{
                  width: cardW,
                  height: cardH,
                  left: -cardW / 2,
                  top: -cardH / 2,
                  transform: `rotateY(${i * STEP}deg) translateZ(${radius}px)`,
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  draggable={false}
                  loading={i < 4 ? 'eager' : 'lazy'}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-20 mt-4 flex items-center justify-center gap-3 text-xs text-white/60">
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label="Previous photo"
          className="grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/15"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span>Drag, swipe or scroll to spin</span>
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label="Next photo"
          className="grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/15"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
