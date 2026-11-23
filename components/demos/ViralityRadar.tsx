"use client";

import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  Flame,
  Volume2,
  Video,
  Type,
  Maximize2,
} from "lucide-react";

type LayoutMode = "stacked" | "blur-fill" | "action-crop";

interface TimelinePoint {
  timeSec: number;
  zScore: number;
  label?: string;
  subtitle: string;
  activeWordIdx: number;
  words: string[];
}

export function ViralityRadar() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(24); // Start at viral peak
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("stacked");
  const [showSubtitles, setShowSubtitles] = useState(true);

  // Timeline data: 60 sample points representing a 120-second stream segment
  // Peak excitement threshold is 2.4 sigma
  const timelinePoints: TimelinePoint[] = [
    { timeSec: 0, zScore: 0.8, subtitle: "Welcome back everyone to the stream", activeWordIdx: 0, words: ["Welcome", "back", "everyone", "to", "the", "stream"] },
    { timeSec: 6, zScore: 1.1, subtitle: "Today we are attempting the impossible run", activeWordIdx: 1, words: ["Today", "we", "are", "attempting", "the", "impossible", "run"] },
    { timeSec: 12, zScore: 1.4, subtitle: "Check the loadout real quick", activeWordIdx: 2, words: ["Check", "the", "loadout", "real", "quick"] },
    { timeSec: 18, zScore: 2.1, subtitle: "Wait... did you hear that footstep behind us?", activeWordIdx: 3, words: ["Wait...", "did", "you", "hear", "that", "footstep"] },
    { timeSec: 24, zScore: 3.12, label: "VIRAL HOOK", subtitle: "NO WAY! HE ACTUALLY DROPPED FROM THE ROOF!", activeWordIdx: 2, words: ["NO", "WAY!", "HE", "ACTUALLY", "DROPPED", "FROM", "THE", "ROOF!"] },
    { timeSec: 30, zScore: 2.7, label: "CLIMAX", subtitle: "CLIP THAT RIGHT NOW CHAT! 360 NO-SCOPE!", activeWordIdx: 4, words: ["CLIP", "THAT", "RIGHT", "NOW", "CHAT!", "360", "NO-SCOPE!"] },
    { timeSec: 38, zScore: 1.6, subtitle: "Hands are literally shaking right now", activeWordIdx: 1, words: ["Hands", "are", "literally", "shaking", "right", "now"] },
    { timeSec: 46, zScore: 1.2, subtitle: "Let's reload and rotate into zone", activeWordIdx: 2, words: ["Let's", "reload", "and", "rotate", "into", "zone"] },
    { timeSec: 54, zScore: 2.85, label: "PUNCHLINE", subtitle: "I CANNOT BELIEVE THE LUCK ON THAT BOUNCE!", activeWordIdx: 3, words: ["I", "CANNOT", "BELIEVE", "THE", "LUCK", "ON", "THAT", "BOUNCE!"] },
    { timeSec: 64, zScore: 1.9, subtitle: "GGs to that squad in the tunnel", activeWordIdx: 0, words: ["GGs", "to", "that", "squad", "in", "the", "tunnel"] },
    { timeSec: 72, zScore: 1.3, subtitle: "Healing up before the final circle closes", activeWordIdx: 1, words: ["Healing", "up", "before", "the", "final", "circle"] },
    { timeSec: 80, zScore: 2.6, label: "VICTORY", subtitle: "LETS GOOOOO! FLLAWLESS VICTORY ON THE EDGE NODE!", activeWordIdx: 2, words: ["LETS", "GOOOOO!", "FLAWLESS", "VICTORY", "ON", "THE", "EDGE!"] },
  ];

  const totalDuration = 90;

  // Find current timeline point
  const currentPoint =
    [...timelinePoints].reverse().find((p) => currentTime >= p.timeSec) || timelinePoints[0];

  // Playback loop simulation
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= totalDuration) return 0;
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const jumpToTime = (sec: number) => {
    setCurrentTime(sec);
    setIsPlaying(true);
  };

  const isViralPeak = currentPoint.zScore >= 2.4;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Top Header & Telemetry */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            CLIPIT STUDIO • LOCAL MULTI-LAYOUT BROADCAST ENGINE
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
            FFmpeg NVENC: 4.2x RT
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold">
            $0 Cloud GPU Cost
          </span>
        </div>
      </div>

      {/* Main Studio Frame */}
      <div className="rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden p-4 sm:p-6 space-y-6">
        {/* Layout Mode Controls Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800/80">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
            <span className="text-xs font-mono text-zinc-400 mr-1 shrink-0">Layout:</span>
            <button
              onClick={() => setLayoutMode("stacked")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                layoutMode === "stacked"
                  ? "bg-sky-500 text-zinc-950 font-semibold shadow-md shadow-sky-500/20"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              Stacked (Facecam + Game)
            </button>
            <button
              onClick={() => setLayoutMode("blur-fill")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                layoutMode === "blur-fill"
                  ? "bg-sky-500 text-zinc-950 font-semibold shadow-md shadow-sky-500/20"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              Letterbox Blur-Fill
            </button>
            <button
              onClick={() => setLayoutMode("action-crop")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                layoutMode === "action-crop"
                  ? "bg-sky-500 text-zinc-950 font-semibold shadow-md shadow-sky-500/20"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              9:16 Action Crop
            </button>
          </div>

          {/* Subtitle & Style Toggles */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowSubtitles(!showSubtitles)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer border ${
                showSubtitles
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                  : "bg-zinc-900 border-zinc-800 text-zinc-500"
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>Kinetic Captions: {showSubtitles ? "ON" : "OFF"}</span>
            </button>
          </div>
        </div>

        {/* Video Canvas & Live Inspector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column: 9:16 Smartphone Preview (5 cols on lg) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-[240px] sm:w-[260px] h-[440px] rounded-[32px] bg-zinc-900 border-4 border-zinc-800 shadow-2xl overflow-hidden flex flex-col justify-between p-2.5">
              {/* Simulated Phone Notch / Dynamic Island */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-4 bg-zinc-950 rounded-full z-30" />

              {/* Dynamic Video Render Content based on Layout Mode */}
              <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-black flex flex-col">
                {layoutMode === "stacked" && (
                  /* Stacked: Top Facecam, Bottom Gameplay */
                  <div className="w-full h-full flex flex-col">
                    {/* Top 38%: Streamer Facecam */}
                    <div className="h-[38%] bg-gradient-to-br from-indigo-950 via-zinc-900 to-sky-950 relative overflow-hidden flex items-center justify-center border-b-2 border-sky-500/40">
                      <div className="w-16 h-16 rounded-full bg-indigo-500/30 border-2 border-indigo-400 flex items-center justify-center text-white font-mono text-xs">
                        LIVE
                      </div>
                      <div className="absolute top-6 left-3 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur text-[9px] font-mono text-zinc-300">
                        FACE_TRACK: OK
                      </div>
                      <div className="absolute bottom-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-rose-500/80 text-white text-[9px] font-bold">
                        <Flame className="w-2.5 h-2.5" /> REC
                      </div>
                    </div>

                    {/* Bottom 62%: Gameplay Action */}
                    <div className="h-[62%] bg-gradient-to-t from-zinc-950 via-zinc-900 to-slate-900 relative overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15)_0,transparent_70%)]" />
                      <div className="w-28 h-20 rounded-lg border border-white/10 bg-white/5 flex flex-col items-center justify-center text-center p-2">
                        <Video className="w-5 h-5 text-sky-400 mb-1" />
                        <span className="text-[10px] font-mono text-zinc-300">GAMEPLAY FEED</span>
                        <span className="text-[9px] text-zinc-500">1080p 60fps</span>
                      </div>
                    </div>
                  </div>
                )}

                {layoutMode === "blur-fill" && (
                  /* Letterbox Blur-Fill: Blurred background, 16:9 centered in middle */
                  <div className="relative w-full h-full flex items-center justify-center bg-zinc-950 overflow-hidden">
                    {/* Blurred backdrop video simulation */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-sky-900 via-indigo-950 to-purple-950 opacity-60 blur-xl scale-125" />
                    {/* Centered 16:9 frame */}
                    <div className="relative z-10 w-full aspect-video bg-zinc-900/90 border border-white/20 rounded shadow-2xl flex flex-col items-center justify-center text-center p-3">
                      <div className="w-10 h-10 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center mb-1 text-sky-400">
                        <Video className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono text-zinc-200">LETTERBOX 16:9</span>
                      <span className="text-[8px] font-mono text-zinc-400">Pillar Blur Padding</span>
                    </div>
                  </div>
                )}

                {layoutMode === "action-crop" && (
                  /* 9:16 Action Crop: Full bleed crop centered on action */
                  <div className="relative w-full h-full bg-gradient-to-b from-indigo-950 via-zinc-900 to-zinc-950 flex flex-col items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(129,140,248,0.25)_0,transparent_60%)]" />
                    <div className="relative z-10 text-center p-4">
                      <div className="w-14 h-14 mx-auto rounded-2xl bg-sky-500/20 border border-sky-400 flex items-center justify-center text-sky-400 mb-2">
                        <Maximize2 className="w-6 h-6 animate-pulse" />
                      </div>
                      <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                        9:16 ACTION CROP
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">
                        Dynamic Motion Tracking
                      </span>
                    </div>
                  </div>
                )}

                {/* Kinetic Subtitles Overlay */}
                {showSubtitles && (
                  <div className="absolute bottom-10 left-3 right-3 z-20 text-center pointer-events-none">
                    <div className="inline-block bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 shadow-xl max-w-full">
                      <div className="flex flex-wrap items-center justify-center gap-1 text-xs font-black tracking-wide uppercase">
                        {currentPoint.words.map((word, idx) => {
                          const isWordActive = idx === currentPoint.activeWordIdx;
                          return (
                            <span
                              key={idx}
                              className={`transition-all duration-100 ${
                                isWordActive
                                  ? "text-amber-300 scale-110 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                                  : "text-white"
                              }`}
                            >
                              {word}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom Video Progress Bar */}
                <div className="absolute bottom-2 left-3 right-3 z-20">
                  <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-rose-500 transition-all duration-300"
                      style={{ width: `${(currentTime / totalDuration) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Audio Excitement Curve & Metrics (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Realtime Virality Scorecard */}
            <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`p-1.5 rounded-lg ${
                      isViralPeak ? "bg-rose-500/20 text-rose-400" : "bg-sky-500/20 text-sky-400"
                    }`}
                  >
                    <Flame className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-xs font-mono font-bold text-white uppercase">
                      VIRALITY RETENTION RADAR
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      Audio energy Z-Score algorithm analyzing laughter & scream decibels
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`text-lg font-mono font-bold tabular-nums ${
                      isViralPeak ? "text-rose-400 animate-pulse" : "text-sky-400"
                    }`}
                  >
                    {currentPoint.zScore.toFixed(2)}σ
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500">
                    Threshold: &gt; 2.40σ
                  </div>
                </div>
              </div>

              {/* Status Pill */}
              <div className="flex items-center gap-2 pt-2 border-t border-zinc-800 text-xs font-mono">
                <span className="text-zinc-400">Active Segment:</span>
                <span
                  className={`px-2 py-0.5 rounded font-semibold ${
                    isViralPeak
                      ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                      : "bg-zinc-800 text-zinc-300"
                  }`}
                >
                  {currentPoint.label || "Standard Conversation (1.2σ)"}
                </span>
                <span className="text-zinc-500 ml-auto tabular-nums">
                  {formatTime(currentTime)} / {formatTime(totalDuration)}
                </span>
              </div>
            </div>

            {/* Scrubbable Audio Excitement Timeline */}
            <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-4 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-1.5 text-zinc-200">
                  <Volume2 className="w-3.5 h-3.5 text-sky-400" />
                  <span>AUDIO ENERGY WAVEFORM TIMELINE</span>
                </span>
                <span className="text-[11px] text-zinc-500">Click anywhere to scrub</span>
              </div>

              {/* Visual SVG Waveform with 2.4 sigma threshold */}
              <div
                className="relative h-24 bg-zinc-950 rounded-lg border border-zinc-800/80 p-2 cursor-pointer select-none overflow-hidden"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                  jumpToTime(Math.round(ratio * totalDuration));
                }}
              >
                {/* 2.4 sigma Threshold Line */}
                <div
                  className="absolute left-0 right-0 border-b border-dashed border-rose-500/50 z-10 flex items-center justify-end px-2"
                  style={{ top: "32%" }}
                >
                  <span className="text-[9px] font-mono bg-zinc-950 text-rose-400 px-1 rounded border border-rose-500/30">
                    2.4σ VIRAL THRESHOLD
                  </span>
                </div>

                {/* SVG Graph */}
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                  {/* Waveform curve */}
                  <polyline
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="0,80 8,75 16,65 24,15 32,30 40,68 48,78 56,22 64,60 72,75 80,28 90,70 100,80"
                  />
                  {/* Gradient fill under curve */}
                  <polygon
                    fill="url(#waveGrad)"
                    opacity="0.2"
                    points="0,80 8,75 16,65 24,15 32,30 40,68 48,78 56,22 64,60 72,75 80,28 90,70 100,80 100,100 0,100"
                  />
                  <defs>
                    <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f43f5e" />
                      <stop offset="60%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#09090b" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Active Playhead Cursor */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg shadow-white z-20 transition-all duration-200 pointer-events-none"
                  style={{ left: `${(currentTime / totalDuration) * 100}%` }}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-white -ml-1 -mt-0.5 shadow" />
                </div>
              </div>

              {/* Play / Pause & Quick Jump Chips */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-3 py-1.5 rounded-lg bg-white text-zinc-950 font-bold text-xs flex items-center gap-1.5 hover:bg-zinc-200 active:scale-95 transition-all cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? "Pause Preview" : "Play Timeline"}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => jumpToTime(24)}
                    className="px-2 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-mono transition-all cursor-pointer"
                  >
                    ⚡ Jump to 3.12σ Hook
                  </button>
                  <button
                    onClick={() => jumpToTime(54)}
                    className="px-2 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono transition-all cursor-pointer hidden sm:inline-block"
                  >
                    🎯 Jump to 2.85σ Punchline
                  </button>
                </div>
              </div>
            </div>

            {/* Architecture Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                <div className="text-zinc-500 text-[10px]">LOCAL INFERENCE</div>
                <div className="text-white font-bold mt-0.5">Whisper Large-v3</div>
                <div className="text-[10px] text-emerald-400">0.8s word alignment</div>
              </div>

              <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800">
                <div className="text-zinc-500 text-[10px]">VIDEO ENCODE</div>
                <div className="text-white font-bold mt-0.5">NVENC / Metal</div>
                <div className="text-[10px] text-sky-400">4.2x realtime speed</div>
              </div>

              <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800 col-span-2 sm:col-span-1">
                <div className="text-zinc-500 text-[10px]">RETENTION OPTIMIZER</div>
                <div className="text-white font-bold mt-0.5">TikTok / Reels Alg.</div>
                <div className="text-[10px] text-purple-400">Dynamic 9:16 Crop</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
