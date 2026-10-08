import { useEffect, useState, type RefObject } from "react";

/** True when the visitor asked the OS to reduce motion. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}

/**
 * Steps through `length` stages every `interval` ms while `active`.
 * With reduced motion it stops on `restingIndex` (default: the last stage).
 */
export function useCycle(length: number, interval: number, active = true, restingIndex?: number) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) {
      setIndex(restingIndex ?? length - 1);
      return;
    }
    if (!active) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % length), interval);
    return () => window.clearInterval(id);
  }, [length, interval, active, reduced, restingIndex]);

  return { index, setIndex, reduced };
}

export type Edge = { from: string; to: string; dashed?: boolean };
export type EdgePath = Edge & { d: string };

/**
 * Measures elements marked with `data-node="<id>"` inside `container` and returns smooth
 * horizontal connector paths between them, in the container's pixel space.
 */
export function useEdges(container: RefObject<HTMLElement | null>, edges: Edge[]) {
  const [state, setState] = useState<{ w: number; h: number; paths: EdgePath[] }>({
    w: 0,
    h: 0,
    paths: [],
  });
  const key = edges.map((e) => `${e.from}>${e.to}`).join("|");

  useEffect(() => {
    const root = container.current;
    if (!root) return;

    const measure = () => {
      const box = root.getBoundingClientRect();
      const find = (id: string) =>
        root.querySelector<HTMLElement>(`[data-node="${id}"]`)?.getBoundingClientRect();
      const paths: EdgePath[] = [];
      for (const edge of edges) {
        const a = find(edge.from);
        const b = find(edge.to);
        if (!a || !b || a.width === 0 || b.width === 0) continue;
        const leftToRight = a.left + a.width / 2 < b.left + b.width / 2;
        const x1 = (leftToRight ? a.right : a.left) - box.left;
        const y1 = a.top + a.height / 2 - box.top;
        const x2 = (leftToRight ? b.left : b.right) - box.left;
        const y2 = b.top + b.height / 2 - box.top;
        const dx = (x2 - x1) * 0.5;
        paths.push({
          ...edge,
          d: `M${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`,
        });
      }
      setState({ w: box.width, h: box.height, paths });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [container, key]);

  return state;
}
