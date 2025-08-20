import React, { useEffect, useState } from "react";
import "./split-text.css";

/**
 * SplitText
 * - Animates each character in with a stagger.
 * - Props:
 *   text: string
 *   as: "h1" | "h2" | "p" ... (default "h1")
 *   duration: seconds for each char (default 0.6)
 *   stagger: seconds between chars (default 0.035)
 *   delay: initial delay before first char (default 0)
 *   animateFrom: "up" | "down" | "fade" (default "up")
 *   className: extra classes for the wrapper
 */
export default function SplitText({
  text = "",
  as: Tag = "h1",
  duration = 0.6,
  stagger = 0.035,
  delay = 0,
  animateFrom = "up",
  className = "",
  ...rest
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // trigger CSS animation on mount
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, [text]);

  const chars = Array.from(text);

  return (
    <Tag
      className={`split-text ${mounted ? "is-in" : ""} ${className}`}
      data-animate-from={animateFrom}
      style={{ "--stagger": `${stagger}s`, "--dur": `${duration}s`, "--delay": `${delay}s` }}
      {...rest}
    >
      {chars.map((ch, i) => (
        <span
          aria-hidden="true"
          className="char"
          key={`${ch}-${i}`}
          style={{ "--char-i": i }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
      {/* screen reader friendly full text */}
      <span className="sr-only">{text}</span>
    </Tag>
  );
}
