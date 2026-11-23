"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  Radio,
  Mic,
  Lock,
  AlertTriangle,
  CheckCircle2,
  Satellite,
  Wifi,
  Sparkles,
  EyeOff,
} from "lucide-react";

export function StealthCalculator() {
  // Calculator State
  const [display, setDisplay] = useState("0");
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [expression, setExpression] = useState("");
  const [keySequence, setKeySequence] = useState<string>("");

  // SOS Mode State
  const [isSosActive, setIsSosActive] = useState(false);
  const [safetyTimer, setSafetyTimer] = useState(180); // 3 minutes countdown
  const [checkInCount, setCheckInCount] = useState(0);
  const [isDuressSent, setIsDuressSent] = useState(false);
  const [packetsSent, setPacketsSent] = useState(342);
  const [audioDbfs, setAudioDbfs] = useState(-28);

  // Audio waveform animation bars
  const [audioBars, setAudioBars] = useState<number[]>([
    15, 30, 45, 20, 60, 85, 40, 70, 90, 50, 30, 65, 80, 45, 25, 55, 75, 35,
  ]);

  // Handle countdown timer in SOS mode
  useEffect(() => {
    if (!isSosActive) return;

    const timer = setInterval(() => {
      setSafetyTimer((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
      setPacketsSent((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isSosActive]);

  // Ambient audio bars fluctuation
  useEffect(() => {
    if (!isSosActive) return;

    const audioInterval = setInterval(() => {
      setAudioBars((prev) =>
        prev.map(() => Math.floor(Math.random() * 70) + 15)
      );
      setAudioDbfs(Math.floor(Math.random() * 12) - 34);
    }, 180);

    return () => clearInterval(audioInterval);
  }, [isSosActive]);

  // Calculator Input Handlers
  const handleDigit = (digit: string) => {
    const newSeq = keySequence + digit;
    setKeySequence(newSeq);

    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const handleDecimal = () => {
    const newSeq = keySequence + ".";
    setKeySequence(newSeq);

    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOperator = (nextOp: string) => {
    const inputValue = parseFloat(display);
    const newSeq = keySequence + nextOp;
    setKeySequence(newSeq);

    if (prevValue === null) {
      setPrevValue(inputValue);
      setExpression(`${display} ${nextOp}`);
    } else if (operator) {
      const current = prevValue || 0;
      let result = current;

      if (operator === "+") result = current + inputValue;
      else if (operator === "-") result = current - inputValue;
      else if (operator === "×") result = current * inputValue;
      else if (operator === "÷") result = inputValue !== 0 ? current / inputValue : 0;

      const roundedResult = Math.round(result * 10000000) / 10000000;
      setPrevValue(roundedResult);
      setDisplay(String(roundedResult));
      setExpression(`${roundedResult} ${nextOp}`);
    }

    setWaitingForOperand(true);
    setOperator(nextOp);
  };

  const handleEquals = () => {
    const newSeq = keySequence + "=";
    setKeySequence(newSeq);

    // Check if current display was 9119 or keySequence matches
    if (display === "9119" || newSeq.endsWith("9119=") || keySequence === "9119") {
      setIsSosActive(true);
      setSafetyTimer(180);
      setKeySequence("");
      return;
    }

    const inputValue = parseFloat(display);

    if (operator && prevValue !== null) {
      let result = prevValue;
      if (operator === "+") result = prevValue + inputValue;
      else if (operator === "-") result = prevValue - inputValue;
      else if (operator === "×") result = prevValue * inputValue;
      else if (operator === "÷") result = inputValue !== 0 ? prevValue / inputValue : 0;

      const roundedResult = Math.round(result * 10000000) / 10000000;
      setDisplay(String(roundedResult));
      setExpression(`${prevValue} ${operator} ${inputValue} =`);
      setPrevValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setExpression("");
    setKeySequence("");
  };

  const handleToggleSign = () => {
    const val = parseFloat(display);
    if (val !== 0) {
      setDisplay(String(-val));
    }
  };

  const handlePercentage = () => {
    const val = parseFloat(display);
    setDisplay(String(val / 100));
  };

  const triggerSecretSosInstantly = () => {
    setIsSosActive(true);
    setSafetyTimer(180);
  };

  const returnToDisguise = () => {
    setIsSosActive(false);
    setDisplay("0");
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setExpression("");
    setKeySequence("");
  };

  const handleCheckIn = () => {
    setSafetyTimer(180);
    setCheckInCount((c) => c + 1);
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Top Context & Stealth Pill */}
      <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 px-1">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            {isSosActive ? "COVERT EMERGENCY BEACON ACTIVE" : "DISGUISED APPLICATION SYSTEM"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!isSosActive ? (
            <button
              onClick={triggerSecretSosInstantly}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-all cursor-pointer active:scale-95"
              title="Shortcut for testing secret SOS PIN without typing"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Secret Trigger: 9119=</span>
            </button>
          ) : (
            <button
              onClick={returnToDisguise}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700 hover:bg-zinc-700 transition-all cursor-pointer active:scale-95"
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span>Engage Calculator Disguise</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Hardware Frame Container */}
      <div className="relative rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden p-3 sm:p-5">
        {/* Subtle device status bar */}
        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pb-3 border-b border-zinc-800/60 mb-4 px-1">
          <div className="flex items-center gap-2">
            <span>{isSosActive ? "SOS_BEACON_V2.4" : "CALC_SECURE_OS"}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-emerald-500 font-semibold flex items-center gap-1">
              <Wifi className="w-3 h-3" /> 4G LTE
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="tabular-nums">BAT: 84%</span>
            <span className="text-zinc-600">•</span>
            <span className="tabular-nums">22°C</span>
          </div>
        </div>

        {/* Morphing Area: Calculator vs SOS Dashboard */}
        <AnimatePresence mode="wait">
          {!isSosActive ? (
            /* --- 1. CALCULATOR DISGUISE MODE --- */
            <motion.div
              key="calculator"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Display Screen */}
              <div className="rounded-xl bg-zinc-900/90 border border-zinc-800/80 p-4 text-right">
                <div className="h-5 text-xs font-mono text-zinc-400 overflow-hidden text-ellipsis whitespace-nowrap">
                  {expression || "Ready"}
                </div>
                <div className="text-3xl sm:text-4xl font-mono font-medium tracking-tight text-white tabular-nums select-none overflow-x-auto scrollbar-none py-1">
                  {display}
                </div>
              </div>

              {/* Calculator Keypad */}
              <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
                {/* Row 1 */}
                <button
                  onClick={handleClear}
                  className="h-12 sm:h-14 rounded-xl bg-zinc-800/90 text-zinc-200 font-medium text-base sm:text-lg hover:bg-zinc-700 active:scale-95 transition-all cursor-pointer"
                >
                  AC
                </button>
                <button
                  onClick={handleToggleSign}
                  className="h-12 sm:h-14 rounded-xl bg-zinc-800/90 text-zinc-200 font-medium text-base sm:text-lg hover:bg-zinc-700 active:scale-95 transition-all cursor-pointer"
                >
                  ±
                </button>
                <button
                  onClick={handlePercentage}
                  className="h-12 sm:h-14 rounded-xl bg-zinc-800/90 text-zinc-200 font-medium text-base sm:text-lg hover:bg-zinc-700 active:scale-95 transition-all cursor-pointer"
                >
                  %
                </button>
                <button
                  onClick={() => handleOperator("÷")}
                  className={`h-12 sm:h-14 rounded-xl font-medium text-lg sm:text-xl active:scale-95 transition-all cursor-pointer ${
                    operator === "÷" ? "bg-amber-400 text-zinc-950" : "bg-amber-600 text-white hover:bg-amber-500"
                  }`}
                >
                  ÷
                </button>

                {/* Row 2 */}
                <button
                  onClick={() => handleDigit("7")}
                  className="h-12 sm:h-14 rounded-xl bg-zinc-900 text-zinc-100 font-medium text-base sm:text-lg hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer border border-zinc-800/40"
                >
                  7
                </button>
                <button
                  onClick={() => handleDigit("8")}
                  className="h-12 sm:h-14 rounded-xl bg-zinc-900 text-zinc-100 font-medium text-base sm:text-lg hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer border border-zinc-800/40"
                >
                  8
                </button>
                <button
                  onClick={() => handleDigit("9")}
                  className="h-12 sm:h-14 rounded-xl bg-zinc-900 text-zinc-100 font-medium text-base sm:text-lg hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer border border-zinc-800/40"
                >
                  9
                </button>
                <button
                  onClick={() => handleOperator("×")}
                  className={`h-12 sm:h-14 rounded-xl font-medium text-lg sm:text-xl active:scale-95 transition-all cursor-pointer ${
                    operator === "×" ? "bg-amber-400 text-zinc-950" : "bg-amber-600 text-white hover:bg-amber-500"
                  }`}
                >
                  ×
                </button>

                {/* Row 3 */}
                <button
                  onClick={() => handleDigit("4")}
                  className="h-12 sm:h-14 rounded-xl bg-zinc-900 text-zinc-100 font-medium text-base sm:text-lg hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer border border-zinc-800/40"
                >
                  4
                </button>
                <button
                  onClick={() => handleDigit("5")}
                  className="h-12 sm:h-14 rounded-xl bg-zinc-900 text-zinc-100 font-medium text-base sm:text-lg hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer border border-zinc-800/40"
                >
                  5
                </button>
                <button
                  onClick={() => handleDigit("6")}
                  className="h-12 sm:h-14 rounded-xl bg-zinc-900 text-zinc-100 font-medium text-base sm:text-lg hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer border border-zinc-800/40"
                >
                  6
                </button>
                <button
                  onClick={() => handleOperator("-")}
                  className={`h-12 sm:h-14 rounded-xl font-medium text-lg sm:text-xl active:scale-95 transition-all cursor-pointer ${
                    operator === "-" ? "bg-amber-400 text-zinc-950" : "bg-amber-600 text-white hover:bg-amber-500"
                  }`}
                >
                  −
                </button>

                {/* Row 4 */}
                <button
                  onClick={() => handleDigit("1")}
                  className="h-12 sm:h-14 rounded-xl bg-zinc-900 text-zinc-100 font-medium text-base sm:text-lg hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer border border-zinc-800/40"
                >
                  1
                </button>
                <button
                  onClick={() => handleDigit("2")}
                  className="h-12 sm:h-14 rounded-xl bg-zinc-900 text-zinc-100 font-medium text-base sm:text-lg hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer border border-zinc-800/40"
                >
                  2
                </button>
                <button
                  onClick={() => handleDigit("3")}
                  className="h-12 sm:h-14 rounded-xl bg-zinc-900 text-zinc-100 font-medium text-base sm:text-lg hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer border border-zinc-800/40"
                >
                  3
                </button>
                <button
                  onClick={() => handleOperator("+")}
                  className={`h-12 sm:h-14 rounded-xl font-medium text-lg sm:text-xl active:scale-95 transition-all cursor-pointer ${
                    operator === "+" ? "bg-amber-400 text-zinc-950" : "bg-amber-600 text-white hover:bg-amber-500"
                  }`}
                >
                  +
                </button>

                {/* Row 5 */}
                <button
                  onClick={() => handleDigit("0")}
                  className="col-span-2 h-12 sm:h-14 rounded-xl bg-zinc-900 text-zinc-100 font-medium text-base sm:text-lg hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer text-left pl-6 border border-zinc-800/40"
                >
                  0
                </button>
                <button
                  onClick={handleDecimal}
                  className="h-12 sm:h-14 rounded-xl bg-zinc-900 text-zinc-100 font-medium text-base sm:text-lg hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer border border-zinc-800/40"
                >
                  .
                </button>
                <button
                  onClick={handleEquals}
                  className="h-12 sm:h-14 rounded-xl bg-amber-500 text-zinc-950 font-bold text-lg sm:text-xl hover:bg-amber-400 active:scale-95 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  =
                </button>
              </div>

              {/* Bottom Educational Hint */}
              <div className="pt-2 text-center">
                <p className="text-xs text-zinc-500 font-mono">
                  Genuine arithmetic engine. Type <span className="text-amber-400 font-semibold">9119=</span> on the keypad or click the top pill to unlock the covert SOS layer.
                </p>
              </div>
            </motion.div>
          ) : (
            /* --- 2. COVERT SOS COMMAND CENTER MODE --- */
            <motion.div
              key="sos-dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {/* Alert Status Banner */}
              <div className="rounded-xl bg-rose-950/40 border border-rose-500/40 p-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400 animate-pulse">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                        EMERGENCY SOS BROADCAST
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-rose-500/20 text-rose-300">
                        ACTIVE
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      Disguise dropped. Live encrypted telemetry relaying to 3 contacts.
                    </p>
                  </div>
                </div>

                <button
                  onClick={returnToDisguise}
                  className="px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Lock Disguise</span>
                </button>
              </div>

              {/* Dual Telemetry Columns: Radar + GPS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Radar Pulse & Coordinates */}
                <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-3.5 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-300">
                      <Satellite className="w-3.5 h-3.5 text-sky-400" />
                      <span>GPS SATELLITE FIX</span>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      14 SATS LOCKED
                    </span>
                  </div>

                  {/* Circular Radar Sweep */}
                  <div className="relative w-32 h-32 mx-auto my-2 rounded-full border border-sky-500/20 bg-sky-950/20 flex items-center justify-center overflow-hidden">
                    {/* Concentric distance rings */}
                    <div className="absolute inset-2 rounded-full border border-sky-500/15" />
                    <div className="absolute inset-6 rounded-full border border-sky-500/20" />
                    <div className="absolute inset-10 rounded-full border border-sky-500/25" />
                    <div className="absolute w-full h-[1px] bg-sky-500/20" />
                    <div className="absolute h-full w-[1px] bg-sky-500/20" />

                    {/* Rotating radar beam */}
                    <div className="absolute inset-0 origin-center animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(56,189,248,0.35)_360deg)] rounded-full" />

                    {/* Center pinpoint blip */}
                    <div className="relative z-10 w-3 h-3 rounded-full bg-rose-500 border-2 border-white shadow-lg shadow-rose-500/80 animate-ping" />
                    <div className="relative z-10 w-2.5 h-2.5 rounded-full bg-rose-500 border border-white" />
                  </div>

                  <div className="pt-2 border-t border-zinc-800/80 text-[11px] font-mono space-y-1">
                    <div className="flex justify-between text-zinc-400">
                      <span>Coordinates:</span>
                      <span className="text-white font-medium">22.5726° N, 88.3639° E</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Location:</span>
                      <span className="text-zinc-300">Kolkata, WB (±2.4m)</span>
                    </div>
                  </div>
                </div>

                {/* Dead-man Check-In & Audio Wiretap */}
                <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-3.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-300">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        <span>DEAD-MAN CHECK-IN</span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400">
                        Checked in: {checkInCount}x
                      </span>
                    </div>

                    {/* Countdown Clock */}
                    <div className="text-center py-2 bg-zinc-950/60 rounded-lg border border-zinc-800 mb-2">
                      <div className="text-3xl font-mono font-bold text-amber-400 tabular-nums">
                        {formatSeconds(safetyTimer)}
                      </div>
                      <p className="text-[10px] font-mono text-zinc-500 mt-0.5">
                        {safetyTimer > 0
                          ? "Distress SMS dispatches automatically at 00:00"
                          : "DISTRESS SMS SENT TO EMERGENCY SERVICES"}
                      </p>
                    </div>

                    {/* Safety Reset Button */}
                    <button
                      onClick={handleCheckIn}
                      className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] transition-all text-xs font-semibold text-white flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>I AM SAFE (RESET TIMER)</span>
                    </button>
                  </div>

                  {/* Silent Audio Waveform Monitor */}
                  <div className="pt-3 border-t border-zinc-800/80 mt-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1.5">
                      <span className="flex items-center gap-1 text-zinc-300">
                        <Mic className="w-3 h-3 text-rose-400 animate-pulse" />
                        <span>SILENT AMBIENT AUDIO</span>
                      </span>
                      <span className="tabular-nums text-zinc-500">{audioDbfs} dBFS</span>
                    </div>

                    {/* Audio Bars */}
                    <div className="h-7 bg-zinc-950 rounded border border-zinc-800 flex items-end justify-between px-2 py-1 gap-1">
                      {audioBars.map((height, i) => (
                        <div
                          key={i}
                          className="w-full bg-rose-500/80 rounded-t-sm transition-all duration-150"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Covert Security Actions */}
              <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-3 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>Encrypted Relay: {packetsSent} packets sent (AES-256-GCM)</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsDuressSent(true);
                      setTimeout(() => setIsDuressSent(false), 3000);
                    }}
                    disabled={isDuressSent}
                    className="px-2.5 py-1 rounded bg-rose-500/20 border border-rose-500/30 text-rose-300 hover:bg-rose-500/30 active:scale-95 transition-all text-[11px] cursor-pointer"
                  >
                    {isDuressSent ? "Duress Ping Broadcasted ✓" : "Send Silent Duress Ping"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
