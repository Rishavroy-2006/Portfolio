"use client";

import React, { useState, useRef, useEffect } from "react";
import { Zap, Sparkles } from "lucide-react";

interface TerminalLine {
  id: string;
  type: "input" | "output" | "error" | "system" | "success";
  content: string | React.ReactNode;
}

export function EdgeTerminal() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const initialLines: TerminalLine[] = [
    {
      id: "line-welcome-1",
      type: "system",
      content: "PhoneCloud OS v3.2.0-termux (aarch64-linux-android)",
    },
    {
      id: "line-welcome-2",
      type: "system",
      content: "Snapdragon 8-core ARM64 • 8GB LPDDR5 • 184d Uptime • AC Bypass Active",
    },
    {
      id: "line-welcome-3",
      type: "output",
      content: 'Type "help" or click any quick command chip below to explore.',
    },
  ];

  const [lines, setLines] = useState<TerminalLine[]>(initialLines);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const executeCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    // Add to command history
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const inputLine: TerminalLine = {
      id: `in-${Date.now()}`,
      type: "input",
      content: trimmed,
    };

    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(" ");

    let responseLines: TerminalLine[] = [];

    switch (cmd) {
      case "help":
        responseLines = [
          {
            id: `out-${Date.now()}-1`,
            type: "output",
            content: (
              <div className="space-y-1 py-1 font-mono text-xs">
                <div className="text-zinc-400">Available commands:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-zinc-300">
                  <div>
                    <span className="text-sky-400 font-semibold">status</span> — Real-time telemetry (CPU, RAM, Battery, Clients)
                  </div>
                  <div>
                    <span className="text-sky-400 font-semibold">ping</span> — Measure edge network & Cloudflare tunnel latency
                  </div>
                  <div>
                    <span className="text-sky-400 font-semibold">bench</span> — Run NPU/CPU matrix multiplication benchmark
                  </div>
                  <div>
                    <span className="text-sky-400 font-semibold">ai-ask &lt;q&gt;</span> — Ask the on-device lightweight LLM
                  </div>
                  <div>
                    <span className="text-sky-400 font-semibold">ls</span> — List active services & workspace files
                  </div>
                  <div>
                    <span className="text-sky-400 font-semibold">cat &lt;file&gt;</span> — Inspect scripts (e.g. cat battery_bypass.sh)
                  </div>
                  <div>
                    <span className="text-sky-400 font-semibold">clear</span> — Reset terminal screen
                  </div>
                </div>
              </div>
            ),
          },
        ];
        break;

      case "status":
        responseLines = [
          {
            id: `out-${Date.now()}-1`,
            type: "output",
            content: (
              <div className="space-y-1.5 py-1 font-mono text-xs text-zinc-300">
                <div className="text-emerald-400 font-semibold border-b border-zinc-800 pb-1">
                  [SYSTEM TELEMETRY - PHONECLOUD HOST NODE]
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                  <div>• Host OS: <span className="text-white">Android 13 / Termux aarch64</span></div>
                  <div>• Hardware: <span className="text-white">Qualcomm Kryo 585 (8-Core)</span></div>
                  <div>• Battery: <span className="text-emerald-400">78% (AC Bypass Active, 0W net draw)</span></div>
                  <div>• CPU Load: <span className="text-sky-400">14.2% [|||.............]</span></div>
                  <div>• RAM Usage: <span className="text-white">3.2 GB / 7.6 GB (42%)</span></div>
                  <div>• Storage: <span className="text-white">48.2 GB / 128 GB UFS 3.1</span></div>
                  <div>• Uptime: <span className="text-amber-400">184 days, 14 hours, 22 mins</span></div>
                  <div>• Thermal Temp: <span className="text-emerald-400">31.4°C (Ambient passive cooled)</span></div>
                </div>
                <div className="pt-1.5 border-t border-zinc-800 text-zinc-400">
                  <span>Active WebSocket Clients: </span>
                  <span className="text-emerald-400 font-bold">12</span>
                  <span className="mx-2">•</span>
                  <span>Tunnel: </span>
                  <span className="text-sky-400">https://cloud.rishavroy.dev (Connected via QUIC)</span>
                </div>
              </div>
            ),
          },
        ];
        break;

      case "ping":
        responseLines = [
          {
            id: `out-${Date.now()}-1`,
            type: "output",
            content: (
              <div className="space-y-0.5 py-1 font-mono text-xs text-zinc-300">
                <div className="text-zinc-400">PING 127.0.0.1 (127.0.0.1) 56(84) bytes of data.</div>
                <div>64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.078 ms</div>
                <div>64 bytes from local-edge (192.168.1.104): icmp_seq=2 time=1.42 ms</div>
                <div>64 bytes from cloudflare-tunnel: icmp_seq=3 time=14.8 ms</div>
                <div>64 bytes from mumbai-pop: icmp_seq=4 time=18.2 ms</div>
                <div className="text-emerald-400 pt-1">
                  --- edge server ping statistics --- 4 packets transmitted, 0% packet loss, avg = 8.62 ms
                </div>
              </div>
            ),
          },
        ];
        break;

      case "ls":
        responseLines = [
          {
            id: `out-${Date.now()}-1`,
            type: "output",
            content: (
              <div className="space-y-1 py-1 font-mono text-xs">
                <div className="text-zinc-500 text-[11px]">total 48K</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <span className="text-sky-400 font-semibold">📁 services/</span>
                  <span className="text-sky-400 font-semibold">📁 models/</span>
                  <span className="text-sky-400 font-semibold">📁 storage/</span>
                  <span className="text-emerald-400">⚙️ battery_bypass.sh</span>
                  <span className="text-amber-400">📄 docker-compose.yml</span>
                  <span className="text-purple-400">🐍 server.py</span>
                  <span className="text-zinc-400">🔌 tunnel.sock</span>
                  <span className="text-zinc-400">📜 Caddyfile</span>
                </div>
              </div>
            ),
          },
        ];
        break;

      case "cat":
        if (args.includes("battery") || args.includes("bypass")) {
          responseLines = [
            {
              id: `out-${Date.now()}-1`,
              type: "output",
              content: (
                <div className="py-1 font-mono text-xs text-zinc-300 space-y-1">
                  <div className="text-zinc-500"># /usr/local/bin/battery_bypass.sh</div>
                  <div className="text-emerald-400">
                    echo 0 &gt; /sys/class/power_supply/battery/charging_enabled
                  </div>
                  <div className="text-zinc-400">
                    # Hardware power path bypass: Powers motherboard directly via USB-C
                  </div>
                  <div className="text-zinc-400">
                    # Preserves Li-ion battery health indefinitely. Eliminates thermal swelling risk.
                  </div>
                  <div className="text-sky-400">Status: Bypass ACTIVE (Battery capped at 78%)</div>
                </div>
              ),
            },
          ];
        } else if (args.includes("server")) {
          responseLines = [
            {
              id: `out-${Date.now()}-1`,
              type: "output",
              content: (
                <div className="py-1 font-mono text-xs text-zinc-300 space-y-1">
                  <div className="text-zinc-500"># server.py — FastAPI on-device edge gateway</div>
                  <div>from fastapi import FastAPI, WebSocket</div>
                  <div>app = FastAPI(title=&quot;PhoneCloud Edge Gateway&quot;)</div>
                  <div>@app.get(&quot;/api/health&quot;)</div>
                  <div>{'def health(): return {"status": "ok", "host": "snapdragon-865", "battery_bypass": True}'}</div>
                </div>
              ),
            },
          ];
        } else {
          responseLines = [
            {
              id: `out-${Date.now()}-1`,
              type: "output",
              content: `cat: ${args || "file"}: No such file. Try "cat battery_bypass.sh" or "cat server.py"`,
            },
          ];
        }
        break;

      case "bench":
        responseLines = [
          {
            id: `out-${Date.now()}-1`,
            type: "output",
            content: (
              <div className="space-y-1.5 py-1 font-mono text-xs text-zinc-300">
                <div className="text-amber-400 font-semibold">
                  [BENCHMARK] GEMM FP32 (1024x1024) Matrix Multiplication
                </div>
                <div className="text-zinc-400">Target: Qualcomm Kryo 585 CPU + Hexagon 698 DSP/NPU</div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <span>Execution:</span>
                  <div className="w-36 h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-full" />
                  </div>
                  <span className="text-emerald-400 font-semibold">100% COMPLETE</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-zinc-800">
                  <div>• CPU Multi-thread: <span className="text-white">148.6 GFLOPS (13.8ms)</span></div>
                  <div>• Hexagon NPU Accel: <span className="text-emerald-400 font-bold">312.4 GFLOPS (6.4ms)</span></div>
                  <div>• Speedup factor: <span className="text-sky-400 font-bold">2.1x</span></div>
                  <div>• Thermal delta: <span className="text-zinc-400">+0.4°C (Bypass charge prevents heat)</span></div>
                </div>
              </div>
            ),
          },
        ];
        break;

      case "ai-ask": {
        const query = args.trim();
        let answer: string;
        if (!query || query.toLowerCase().includes("architecture") || query.toLowerCase().includes("what is")) {
          answer =
            "PhoneCloud turns an old Android smartphone into a zero-cost 24/7 edge server using Termux, Cloudflare Tunnels for NAT traversal, and hardware battery bypass to safely eliminate battery swelling risk.";
        } else if (query.toLowerCase().includes("battery") || query.toLowerCase().includes("swelling") || query.toLowerCase().includes("power")) {
          answer =
            "Using a custom sysfs battery bypass script (battery_bypass.sh), charging is disabled at 78% so the motherboard draws directly from AC power. This prevents thermal degradation and battery swelling indefinitely.";
        } else if (query.toLowerCase().includes("cost") || query.toLowerCase().includes("why") || query.toLowerCase().includes("vps")) {
          answer =
            "A typical cloud VPS costs $5-$15/month ($60-$180/year). An old 8-core smartphone provides 8GB RAM, UFS 3.1 SSD storage, built-in UPS battery backup, and consumes under 3.5 Watts of electricity.";
        } else {
          answer = `On-Device LLM (Llama 3.2 1B Q4_K_M via Termux): "${query}" is executed locally on the Hexagon NPU with 0 cloud dependencies and 38 tokens/sec inference speed.`;
        }

        responseLines = [
          {
            id: `out-${Date.now()}-1`,
            type: "output",
            content: (
              <div className="space-y-1.5 py-1 font-mono text-xs">
                <div className="flex items-center gap-1.5 text-purple-400 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>[ON-DEVICE LLM INFERENCE • QUALCOMM NPU]</span>
                </div>
                <div className="text-zinc-200 bg-purple-950/20 border border-purple-500/20 rounded p-2.5">
                  {answer}
                </div>
                <div className="text-[10px] text-zinc-500 flex items-center gap-2">
                  <span>Tokens/sec: 38.4 t/s</span>
                  <span>•</span>
                  <span>Quantization: Q4_K_M</span>
                  <span>•</span>
                  <span>Latency to first token: 142ms</span>
                </div>
              </div>
            ),
          },
        ];
        break;
      }

      case "clear":
        setLines([]);
        setInputVal("");
        return;

      default:
        responseLines = [
          {
            id: `err-${Date.now()}`,
            type: "error",
            content: `command not found: ${cmd}. Type "help" or click one of the preset chips below.`,
          },
        ];
        break;
    }

    setLines((prev) => [...prev, inputLine, ...responseLines]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx >= history.length) {
          setHistoryIndex(-1);
          setInputVal("");
        } else {
          setHistoryIndex(nextIdx);
          setInputVal(history[nextIdx]);
        }
      }
    }
  };

  const runPreset = (cmd: string) => {
    executeCommand(cmd);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Top Telemetry Header */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            ARM64 EDGE NODE • ANDROID 13 TERMUX
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
            PORT: 8000
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            ONLINE: 184d
          </span>
        </div>
      </div>

      {/* Terminal Window Shell */}
      <div
        className="rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden font-mono flex flex-col"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Title Bar */}
        <div className="px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600/60" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/60" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/60" />
          </div>

          <div className="text-xs text-zinc-400 font-medium truncate px-2">
            rishav@phonecloud-android: ~ (aarch64)
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
            <Zap className="w-3 h-3 text-amber-400" />
            <span className="hidden sm:inline">AC Bypass</span>
          </div>
        </div>

        {/* Terminal Screen / Output Body */}
        <div className="p-4 min-h-[260px] max-h-[360px] overflow-y-auto space-y-2 text-xs sm:text-sm text-zinc-200 scrollbar-thin scrollbar-thumb-zinc-800">
          {lines.map((l) => (
            <div key={l.id} className="leading-relaxed">
              {l.type === "input" ? (
                <div className="flex items-center gap-2 text-sky-400 font-semibold">
                  <span className="text-emerald-400">rishav@phonecloud:~$</span>
                  <span className="text-white">{l.content}</span>
                </div>
              ) : l.type === "error" ? (
                <div className="text-rose-400 font-mono">{l.content}</div>
              ) : l.type === "system" ? (
                <div className="text-zinc-500 font-mono">{l.content}</div>
              ) : (
                <div className="text-zinc-300">{l.content}</div>
              )}
            </div>
          ))}

          {/* Active Prompt Row */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-emerald-400 font-semibold shrink-0">
              rishav@phonecloud:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white outline-none font-mono text-xs sm:text-sm caret-emerald-400 placeholder:text-zinc-600"
              placeholder="type 'help', 'status', 'ping', or click chips..."
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          <div ref={terminalEndRef} />
        </div>

        {/* Quick Command Chips Toolbar */}
        <div className="p-2.5 bg-zinc-900/60 border-t border-zinc-800 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[11px] text-zinc-500 uppercase tracking-wider mr-1 hidden sm:inline">
            Quick Run:
          </span>
          <button
            onClick={() => runPreset("status")}
            className="px-2 py-1 rounded-md bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700/60 transition-all text-xs cursor-pointer active:scale-95"
          >
            status
          </button>
          <button
            onClick={() => runPreset("ping")}
            className="px-2 py-1 rounded-md bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700/60 transition-all text-xs cursor-pointer active:scale-95"
          >
            ping
          </button>
          <button
            onClick={() => runPreset("bench")}
            className="px-2 py-1 rounded-md bg-zinc-800/80 hover:bg-zinc-700 text-amber-300 hover:text-amber-200 border border-zinc-700/60 transition-all text-xs cursor-pointer active:scale-95"
          >
            bench
          </button>
          <button
            onClick={() => runPreset("ai-ask architecture")}
            className="px-2 py-1 rounded-md bg-purple-950/60 hover:bg-purple-900/80 text-purple-300 hover:text-purple-200 border border-purple-800/50 transition-all text-xs cursor-pointer active:scale-95 flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3" />
            ai-ask
          </button>
          <button
            onClick={() => runPreset("ls")}
            className="px-2 py-1 rounded-md bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700/60 transition-all text-xs cursor-pointer active:scale-95"
          >
            ls
          </button>
          <button
            onClick={() => runPreset("cat battery_bypass.sh")}
            className="px-2 py-1 rounded-md bg-zinc-800/80 hover:bg-zinc-700 text-emerald-300 hover:text-emerald-200 border border-zinc-700/60 transition-all text-xs cursor-pointer active:scale-95 hidden sm:inline-block"
          >
            cat battery
          </button>
          <button
            onClick={() => runPreset("clear")}
            className="px-2 py-1 rounded-md bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 border border-zinc-700/60 transition-all text-xs cursor-pointer active:scale-95 ml-auto"
          >
            clear
          </button>
        </div>
      </div>
    </div>
  );
}
