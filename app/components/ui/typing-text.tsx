"use client";

import { gsap } from "gsap";
import {
  type ElementType,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface TypingTextProps {
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string | React.ReactNode;
  cursorBlinkDuration?: number;
  cursorClassName?: string;
  text: string | string[];
  as?: ElementType;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  textColors?: string[];
  variableSpeed?: { min: number; max: number };
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
}

const TypingText = ({
  text,
  as: Component = "div",
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = "",
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = "|",
  cursorClassName = "",
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}: TypingTextProps & React.HTMLAttributes<HTMLElement>) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const [isMounted, setIsMounted] = useState(false);

  const cursorRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  // CORREÇÃO: Usamos requestAnimationFrame para evitar o erro de setState síncrono no mount
  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);

  const getCurrentTextColor = () => {
    if (textColors.length === 0) return "currentColor";
    return textColors[currentTextIndex % textColors.length];
  };

  useEffect(() => {
    if (!(startOnVisible && containerRef.current)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (isMounted && showCursor && cursorRef.current) {
      const ani = gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
      return () => { ani.kill(); };
    }
  }, [isMounted, showCursor, cursorBlinkDuration]);

  useEffect(() => {
    if (!isVisible || !isMounted) return;

    let timeout: NodeJS.Timeout;
    const currentFullText = textArray[currentTextIndex];
    const processedText = reverseMode
      ? currentFullText.split("").reverse().join("")
      : currentFullText;

    const executeAnimation = () => {
      if (isDeleting) {
        if (displayedText === "") {
          setIsDeleting(false);
          if (currentTextIndex === textArray.length - 1 && !loop) return;
          setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
          setCurrentCharIndex(0);
        } else {
          timeout = setTimeout(() => {
            setDisplayedText((prev) => prev.slice(0, -1));
          }, deletingSpeed);
        }
      } else if (currentCharIndex < processedText.length) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + processedText[currentCharIndex]);
          setCurrentCharIndex((prev) => prev + 1);
        }, variableSpeed ? getRandomSpeed() : typingSpeed);
      } else {
        if (onSentenceComplete) {
          onSentenceComplete(currentFullText, currentTextIndex);
        }
        if (textArray.length > 1 || loop) {
          timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      }
    };

    if (currentCharIndex === 0 && !isDeleting && displayedText === "") {
      timeout = setTimeout(executeAnimation, initialDelay);
    } else {
      executeAnimation();
    }

    return () => clearTimeout(timeout);
  }, [
    currentCharIndex, displayedText, isDeleting, typingSpeed, deletingSpeed,
    pauseDuration, textArray, currentTextIndex, loop, initialDelay, isVisible,
    isMounted, reverseMode, variableSpeed, onSentenceComplete, getRandomSpeed
  ]);

  const currentText = textArray[currentTextIndex];
  const shouldHideCursor = hideCursorWhileTyping && (currentCharIndex < currentText.length || isDeleting);

  if (!isMounted) return <Component className={className} {...props}>&nbsp;</Component>;

  // CORREÇÃO: Atribuir a Component para DynamicTag resolve o erro de "access refs during render"
  const DynamicTag = Component;

  return (
    <DynamicTag
      ref={containerRef}
      className={`inline-block whitespace-pre-wrap tracking-tight ${className}`}
      {...props}
    >
      <span className="inline" style={{ color: getCurrentTextColor() }}>
        {displayedText}
      </span>
      {showCursor && (
        <span
          ref={cursorRef}
          className={`inline-block ${shouldHideCursor ? "opacity-0" : "opacity-100"} ${
            cursorCharacter === "|"
              ? `h-[1em] w-[2px] translate-y-[15%] bg-current ${cursorClassName}`
              : `ml-1 ${cursorClassName}`
          }`}
        >
          {cursorCharacter === "|" ? "" : cursorCharacter}
        </span>
      )}
    </DynamicTag>
  );
};

export default TypingText;