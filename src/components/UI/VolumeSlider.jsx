import React, { useState, useEffect, useRef } from 'react';
import './volumeSlider.css';

const VolumeSlider = ({
  value,
  defaultValue = 50,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  className = '',
  ariaLabel = 'Volume',
  title,
  expanded = false,
  autoHide = true,
  autoHideDelay = 2000,
  muted = false,
  onToggleMute,
}) => {
  const isControlled = typeof value === 'number';
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [forceExpanded, setForceExpanded] = useState(false);
  const hideTimerRef = useRef(null);

  useEffect(() => {
    if (isControlled) return;
    setInternalValue(defaultValue);
  }, [defaultValue]);

  const currentValue = isControlled ? value : internalValue;

  const handleChange = (e) => {
    const next = Number(e.target.value);
    if (!isControlled) setInternalValue(next);
    if (onChange) onChange(next);

    if (autoHide) {
      setForceExpanded(true);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => setForceExpanded(false), autoHideDelay);
    }
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  useEffect(() => () => hideTimerRef.current && clearTimeout(hideTimerRef.current), []);

  const isExpanded = expanded || isHovered || isFocused || forceExpanded;

  // Global keyboard shortcut: 'm' to toggle mute
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        if (onToggleMute) onToggleMute();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToggleMute]);

  return (
    <label
      className={`slider ${isExpanded ? 'expanded' : ''} ${className}`}
      aria-label={ariaLabel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={(e) => {
        // Prevent clicking inside label from toggling unintended things
        e.stopPropagation();
      }}
    >
      <div className="level-wrapper">
        <input
          type="range"
          className="level"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleChange}
        />
      </div>
      {muted ? (
        <svg
          className="volume"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-1.5 0 19 19"
          width="30"
          height="30"
          fill="currentColor"
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onToggleMute) onToggleMute();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              if (onToggleMute) onToggleMute();
            }
          }}
          aria-label="Unmute"
        >
          <path d="M7.676 4.938v9.63c0 .61-.353.756-.784.325l-2.896-2.896H2.02A1.111 1.111 0 0 1 .911 10.89V8.618a1.112 1.112 0 0 1 1.108-1.109h1.977l2.896-2.896c.43-.43.784-.284.784.325zm7.251 6.888a.554.554 0 1 1-.784.784l-2.072-2.073-2.073 2.073a.554.554 0 1 1-.784-.784l2.073-2.073L9.214 7.68a.554.554 0 0 1 .784-.783L12.07 8.97l2.072-2.073a.554.554 0 0 1 .784.783l-2.072 2.073z" />
        </svg>
      ) : (
        <svg
          className="volume"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onToggleMute) onToggleMute();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              if (onToggleMute) onToggleMute();
            }
          }}
          aria-label={muted ? 'Unmute' : 'Mute'}
        >
          <g>
            <path
              d="M18.36 19.36a1 1 0 0 1-.705-1.71C19.167 16.148 20 14.142 20 12s-.833-4.148-2.345-5.65a1 1 0 1 1 1.41-1.419C20.958 6.812 22 9.322 22 12s-1.042 5.188-2.935 7.069a.997.997 0 0 1-.705.291z"
              fill="currentColor"
            ></path>
            <path
              d="M15.53 16.53a.999.999 0 0 1-.703-1.711C15.572 14.082 16 13.054 16 12s-.428-2.082-1.173-2.819a1 1 0 1 1 1.406-1.422A6 6 0 0 1 18 12a6 6 0 0 1-1.767 4.241.996.996 0 0 1-.703.289zM12 22a1 1 0 0 1-.707-.293L6.586 17H4c-1.103 0-2-.897-2-2V9c0-1.103.897-2 2-2h2.586l4.707-4.707A.998.998 0 0 1 13 3v18a1 1 0 0 1-1 1z"
              fill="currentColor"
            ></path>
          </g>
        </svg>
      )}
    </label>
  );
};

export default VolumeSlider;


