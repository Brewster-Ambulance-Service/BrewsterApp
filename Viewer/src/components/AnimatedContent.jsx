// src/components/AnimatedContent.jsx
import React, { useEffect, useRef, useState } from "react";
import "./animated-content.css";

export default function AnimatedContent({
  children,
  delay = 0,
  duration = 0.5,
  animateFrom = "up",     // accepted: "up", "down", "left", "right", "fade"
}) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Trigger animation on mount
    const id = requestAnimationFrame(() => setInView(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      ref={ref}
      className={`animated-content ${inView ? "is-in" : ""} from-${animateFrom}`}
      style={{ "--ac-delay": `${delay}s`, "--ac-duration": `${duration}s` }}
    >
      {children}
    </div>
  );
}
