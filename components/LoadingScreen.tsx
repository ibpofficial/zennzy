"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function LoadingScreen({
  autoDismiss = true,
  duration = 1800,
  onComplete,
}: {
  autoDismiss?: boolean;
  duration?: number;
  onComplete?: () => void;
}) {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Trigger exit after initial load or when autoDismiss becomes false -> true
  useEffect(() => {
    if (!autoDismiss) return;
    const timer = setTimeout(() => {
      setExiting(true);
      const exitTimer = setTimeout(() => {
        setVisible(false);
        setExiting(false);
        if (onComplete) onComplete();
      }, 500);
      return () => clearTimeout(exitTimer);
    }, duration);
    return () => clearTimeout(timer);
  }, [autoDismiss, duration, onComplete]);

  // Show on route changes (only when autoDismiss is true)
  useEffect(() => {
    if (!autoDismiss) return;
    setVisible(true);
    setExiting(false);

    const timer = setTimeout(() => {
      setExiting(true);
      const exitTimer = setTimeout(() => {
        setVisible(false);
        setExiting(false);
        if (onComplete) onComplete();
      }, 500);
      return () => clearTimeout(exitTimer);
    }, 1200);

    return () => clearTimeout(timer);
  }, [pathname, searchParams, autoDismiss, onComplete]);

  if (!visible) return null;

  return (
    <div
      className={`loading-screen ${exiting ? "loading-screen--exit" : ""}`}
      aria-label="Loading"
      role="status"
    >
      <div className="loading-content">
        {/* Logo Mark */}
        <div className="loading-logo-wrap">
          <div className="loading-logo-ring" />
          <div className="loading-logo-ring loading-logo-ring--2" />
          <h1 className="loading-logo-text">
            zenzy
            <span className="loading-dot" />
          </h1>
        </div>

        {/* Progress bar */}
        <div className="loading-bar-track">
          <div className="loading-bar-fill" />
        </div>
      </div>
    </div>
  );
}
