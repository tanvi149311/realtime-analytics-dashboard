/**
 * @file components/layout/Header.tsx
 * @description Top navigation bar for the dashboard.
 * Shows the app title, connection status, and current time.
 */

import { useEffect, useState } from "react";
import { Activity } from "lucide-react";
import { type ConnectionStatus } from "../../types";
import { format } from "date-fns";

// ─────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────

/** Shape of each status config entry */
interface StatusConfig {
    dot: string;
    text: string;
    label: string;
  }
  
  /** Returns styles and label for each connection status. */
  const STATUS_CONFIG: { [key in ConnectionStatus]: StatusConfig } = {
    connected: {
      dot:   "bg-green-500",
      text:  "text-green-600",
      label: "Live",
    },
    connecting: {
      dot:   "bg-amber-400 animate-pulse",
      text:  "text-amber-500",
      label: "Connecting",
    },
    disconnected: {
      dot:   "bg-red-500",
      text:  "text-red-600",
      label: "Disconnected",
    },
  };

// ─────────────────────────────────────────
// PROPS
// ─────────────────────────────────────────

interface HeaderProps {
  /** Current WebSocket connection status */
  status: ConnectionStatus;
}

// ─────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────

/**
 * Header
 * Displays dashboard title, live clock, and connection status.
 *
 * @example
 * <Header status="connected" />
 */
const Header = ({ status }: HeaderProps) => {
  const [currentTime, setCurrentTime] = useState<string>(
    format(new Date(), "HH:mm:ss")
  );

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(format(new Date(), "HH:mm:ss"));
    }, 1000);

    // Cleanup on unmount to prevent memory leaks
    return () => clearInterval(timer);
  }, []);

  const { dot, text, label } = STATUS_CONFIG[status];

  return (
    <header className="bg-white border-b border-slate-100 px-8 py-4 mb-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Left — Logo & Title */}
        <div className="flex items-center gap-2">
          <Activity size={22} className="text-indigo-500" />
          <h1 className="text-lg font-bold text-slate-800">
            Analytics Dashboard
          </h1>
        </div>

        {/* Right — Status & Clock */}
        <div className="flex items-center gap-4">
          {/* Connection Status */}
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${dot}`} />
            <span className={`text-xs font-medium ${text}`}>
              {label}
            </span>
          </div>

          {/* Live Clock */}
          <span className="text-xs text-slate-400 font-mono">
            {currentTime}
          </span>
        </div>

      </div>
    </header>
  );
};

export default Header;