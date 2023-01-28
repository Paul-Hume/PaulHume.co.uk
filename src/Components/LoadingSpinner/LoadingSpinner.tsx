import { useEffect,useRef } from 'react';

import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

export const LoadingSpinner = ({ size = 30, className = '' }: LoadingSpinnerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('class', 'loading-spinner');
    circle.setAttribute('cx', '50');
    circle.setAttribute('cy', '50');
    circle.setAttribute('r', '45');
    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke', 'currentColor');
    circle.setAttribute('stroke-width', '10');
    circle.setAttribute('stroke-dasharray', '50');
    circle.setAttribute('stroke-dashoffset', '0');
    circle.setAttribute('class', 'loading-spinner__circle');

    svg.appendChild(circle);
    containerRef.current!.appendChild(svg);

    const circleLength = 2 * Math.PI * 45;
    circle.style.strokeDasharray = circleLength.toString();
    circle.style.strokeDashoffset = circleLength.toString();

    const animate = () => {
      circle.style.strokeDashoffset = `${parseInt(circle.style.strokeDashoffset) - 5}`;

      if (parseInt(circle.style.strokeDashoffset) < circleLength) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, []);

  return <div className={`${styles.container} ${className}`} ref={containerRef} style={{ width: `${size}px`, height: `${size}px`}} />;
};
