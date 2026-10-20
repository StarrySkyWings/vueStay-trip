export default function smoothScrollTo(container, targetTop, duration = 300) {
  const start = container.scrollTop;
  const diff = targetTop - start;
  const startTime = performance.now();

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    container.scrollTop = start + diff * easeOutCubic(progress);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
