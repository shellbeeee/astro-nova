import { useEffect, useRef, useState, type ReactNode } from "react";
import { chapters } from "@/lib/story";
import { Button } from "@/components/ui/button";

export function StoryNavigation() {
  const [active, setActive] = useState<string>("launch");
  useEffect(() => {
    const update = () => {
      const current = chapters.filter(({ id }) => {
        const element = document.getElementById(id);
        return element && element.getBoundingClientRect().top <= window.innerHeight * 0.45;
      }).at(-1);
      setActive(current?.id ?? "launch");
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <nav aria-label="Story chapters" className="story-nav">
    <a href="#launch" className="font-display text-sm text-primary">T.R.I.O.’s adventure</a>
    <div className="flex items-center gap-1 sm:gap-3">{chapters.map((chapter) => <Button asChild key={chapter.id} variant="ghost" className="chapter-link" aria-current={active === chapter.id ? "step" : undefined}>
      <a href={`#${chapter.id}`} title={`Chapter ${chapter.number}: ${chapter.label}`}><span className="chapter-number">{chapter.number}</span><span className="hidden sm:inline">{chapter.label}</span></a>
    </Button>)}</div>
  </nav>;
}

export function ScrollScene({ id, className = "", visual, children, label }: { id: string; className?: string; visual: ReactNode; children: ReactNode; label: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - window.innerHeight)));
        element.style.setProperty("--scene-progress", String(progress));
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(frame);
    };
  }, []);
  return <section id={id} ref={ref} aria-label={label} className={`scroll-scene ${className}`}>
    <div className="scene-visual" aria-hidden="true">{visual}</div>
    <div className="scene-content">{children}</div>
  </section>;
}