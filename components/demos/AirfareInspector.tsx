"use client";

import React, { useState } from "react";
import {
  Plane,
  AlertOctagon,
  Award,
  BarChart3,
  Building2,
  ShieldCheck,
} from "lucide-react";

interface RouteData {
  id: string;
  name: string;
  origin: string;
  destination: string;
  type: string;
  baselineFare: number;
  cleanedMedian: number;
  rawSurgeSpike: number;
  baitFare: number;
  otaMarkupPercent: number;
  carrierPoints: {
    day: string;
    rawPrice: number;
    cleanedPrice: number;
    isSpike?: boolean;
    isBait?: boolean;
    carrier: string;
  }[];
}

export function AirfareInspector() {
  const [selectedRouteId, setSelectedRouteId] = useState<string>("DEL-BOM");
  const [isIqrFilterOn, setIsIqrFilterOn] = useState<boolean>(true);
  const [hoveredPointIdx, setHoveredPointIdx] = useState<number | null>(null);

  const routes: Record<string, RouteData> = {
    "DEL-BOM": {
      id: "DEL-BOM",
      name: "Delhi ✈ Mumbai",
      origin: "DEL (Indira Gandhi Intl)",
      destination: "BOM (Chhatrapati Shivaji Intl)",
      type: "High Frequency Trunk Sector",
      baselineFare: 5200,
      cleanedMedian: 5480,
      rawSurgeSpike: 18450,
      baitFare: 1199,
      otaMarkupPercent: 7.8,
      carrierPoints: [
        { day: "D-14", rawPrice: 4800, cleanedPrice: 4800, carrier: "IndiGo 6E-204" },
        { day: "D-12", rawPrice: 5100, cleanedPrice: 5050, carrier: "Air India AI-805" },
        { day: "D-10", rawPrice: 1199, cleanedPrice: 5200, isBait: true, carrier: "Bait OTA Ad" },
        { day: "D-8", rawPrice: 5350, cleanedPrice: 5300, carrier: "Akasa QP-1102" },
        { day: "D-6", rawPrice: 18450, cleanedPrice: 5450, isSpike: true, carrier: "Surge Bot Spike" },
        { day: "D-4", rawPrice: 5600, cleanedPrice: 5500, carrier: "IndiGo 6E-512" },
        { day: "D-2", rawPrice: 5900, cleanedPrice: 5800, carrier: "Air India AI-660" },
        { day: "D-0", rawPrice: 6200, cleanedPrice: 6100, carrier: "Vistara UK-995" },
      ],
    },
    "CCU-BLR": {
      id: "CCU-BLR",
      name: "Kolkata ✈ Bengaluru",
      origin: "CCU (Netaji Subhash Chandra Bose Intl)",
      destination: "BLR (Kempegowda Intl)",
      type: "Tech Corridor Sector",
      baselineFare: 6100,
      cleanedMedian: 6420,
      rawSurgeSpike: 19800,
      baitFare: 1450,
      otaMarkupPercent: 8.4,
      carrierPoints: [
        { day: "D-14", rawPrice: 5900, cleanedPrice: 5900, carrier: "IndiGo 6E-431" },
        { day: "D-12", rawPrice: 6100, cleanedPrice: 6050, carrier: "Air India AI-771" },
        { day: "D-10", rawPrice: 1450, cleanedPrice: 6200, isBait: true, carrier: "Bait Ad (Sold Out)" },
        { day: "D-8", rawPrice: 6350, cleanedPrice: 6300, carrier: "Akasa QP-1382" },
        { day: "D-6", rawPrice: 19800, cleanedPrice: 6400, isSpike: true, carrier: "Last-seat Bot Spike" },
        { day: "D-4", rawPrice: 6600, cleanedPrice: 6550, carrier: "IndiGo 6E-883" },
        { day: "D-2", rawPrice: 6850, cleanedPrice: 6800, carrier: "Air India AI-775" },
        { day: "D-0", rawPrice: 7200, cleanedPrice: 7100, carrier: "IndiGo 6E-241" },
      ],
    },
    "DEL-DXB": {
      id: "DEL-DXB",
      name: "Delhi ✈ Dubai",
      origin: "DEL (New Delhi)",
      destination: "DXB (Dubai International)",
      type: "High-Demand Gulf Corridor",
      baselineFare: 14200,
      cleanedMedian: 14950,
      rawSurgeSpike: 42000,
      baitFare: 4999,
      otaMarkupPercent: 9.2,
      carrierPoints: [
        { day: "D-14", rawPrice: 13800, cleanedPrice: 13800, carrier: "Air India AI-995" },
        { day: "D-12", rawPrice: 14200, cleanedPrice: 14100, carrier: "IndiGo 6E-1461" },
        { day: "D-10", rawPrice: 4999, cleanedPrice: 14400, isBait: true, carrier: "Ghost Fare Ad" },
        { day: "D-8", rawPrice: 14700, cleanedPrice: 14650, carrier: "SpiceJet SG-11" },
        { day: "D-6", rawPrice: 42000, cleanedPrice: 14900, isSpike: true, carrier: "Predatory Surge Spike" },
        { day: "D-4", rawPrice: 15300, cleanedPrice: 15200, carrier: "Emirates EK-513" },
        { day: "D-2", rawPrice: 15800, cleanedPrice: 15700, carrier: "Air India AI-997" },
        { day: "D-0", rawPrice: 16500, cleanedPrice: 16300, carrier: "Emirates EK-517" },
      ],
    },
  };

  const currentRoute = routes[selectedRouteId];
  const activePoint = hoveredPointIdx !== null ? currentRoute.carrierPoints[hoveredPointIdx] : null;

  // Max price for graph normalization
  const maxPrice = isIqrFilterOn
    ? currentRoute.cleanedMedian * 1.35
    : currentRoute.rawSurgeSpike * 1.1;

  const minPrice = isIqrFilterOn
    ? currentRoute.baselineFare * 0.85
    : currentRoute.baitFare * 0.8;

  const normalizeY = (price: number) => {
    const clamped = Math.max(minPrice, Math.min(maxPrice, price));
    const ratio = (clamped - minPrice) / (maxPrice - minPrice);
    // Invert for SVG (0 is top, 100 is bottom)
    return 100 - ratio * 80 - 10;
  };

  // Generate SVG polyline points
  const cleanedSvgPoints = currentRoute.carrierPoints
    .map((p, idx) => {
      const x = (idx / (currentRoute.carrierPoints.length - 1)) * 100;
      const y = normalizeY(p.cleanedPrice);
      return `${x},${y}`;
    })
    .join(" ");

  const rawSvgPoints = currentRoute.carrierPoints
    .map((p, idx) => {
      const x = (idx / (currentRoute.carrierPoints.length - 1)) * 100;
      const y = normalizeY(p.rawPrice);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Top Banner: SIH Winner Honor & Aviation Problem Statement */}
      <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Award className="w-4 h-4" />
          </span>
          <div>
            <div className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
              <span>SMART INDIA HACKATHON WINNER</span>
              <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[10px]">
                SIH WINNER
              </span>
            </div>
            <div className="text-[11px] text-zinc-400">
              Udaan-Metrics • Real-Time Airfare Price Index & Anomaly Detection Pipeline
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5" />
            <span>Ministry of Civil Aviation / MoSPI</span>
          </span>
        </div>
      </div>

      {/* Main Inspector Dashboard Frame */}
      <div className="rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden p-4 sm:p-6 space-y-6">
        {/* Route Selector & Filter Switch Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          {/* Route Switcher Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none w-full sm:w-auto">
            {Object.values(routes).map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedRouteId(r.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  selectedRouteId === r.id
                    ? "bg-sky-500 text-zinc-950 font-bold shadow-md shadow-sky-500/20"
                    : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                }`}
              >
                <Plane className="w-3.5 h-3.5" />
                <span>{r.name}</span>
              </button>
            ))}
          </div>

          {/* Interactive IQR Anomaly Detection Filter Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-mono text-zinc-400">IQR Anomaly Filter:</span>
            <button
              onClick={() => setIsIqrFilterOn(!isIqrFilterOn)}
              className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors cursor-pointer ${
                isIqrFilterOn ? "bg-emerald-500" : "bg-zinc-800"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isIqrFilterOn ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-xs font-mono font-semibold ${
                isIqrFilterOn ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {isIqrFilterOn ? "ON (Cleaned Index)" : "OFF (Raw Dirty Data)"}
            </span>
          </div>
        </div>

        {/* Route Info Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-zinc-400 bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/80">
          <div>
            <span className="text-zinc-500">Sector: </span>
            <span className="text-zinc-200 font-semibold">{currentRoute.origin}</span>
            <span className="mx-1.5 text-zinc-600">→</span>
            <span className="text-zinc-200 font-semibold">{currentRoute.destination}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-zinc-500">Classification: </span>
            <span className="text-sky-400 font-medium">{currentRoute.type}</span>
          </div>
        </div>

        {/* Real-time Pricing Curve SVG Chart */}
        <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <BarChart3 className="w-4 h-4 text-sky-400" />
                <span>14-DAY ADVANCE PURCHASE PRICE CURVE</span>
              </span>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-0.5 bg-emerald-400 rounded-full inline-block" />
                <span>MoSPI Cleaned Index</span>
              </span>
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="w-2.5 h-0.5 bg-rose-500 border-dashed border-b inline-block" />
                <span>Scraped Outliers</span>
              </span>
            </div>
          </div>

          {/* SVG Price Chart Canvas */}
          <div className="relative h-52 bg-zinc-950 rounded-lg border border-zinc-800 p-3 overflow-hidden select-none">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between p-3 pointer-events-none opacity-20">
              <div className="border-b border-zinc-700 w-full" />
              <div className="border-b border-zinc-700 w-full" />
              <div className="border-b border-zinc-700 w-full" />
              <div className="border-b border-zinc-700 w-full" />
            </div>

            {/* SVG Visual */}
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* If IQR Filter is OFF, show the raw wild curve with spikes and drops */}
              {!isIqrFilterOn && (
                <polyline
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="2.5"
                  strokeDasharray="3 2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={rawSvgPoints}
                />
              )}

              {/* Cleaned MoSPI Index Curve (always clean or emphasized when ON) */}
              <polyline
                fill="none"
                stroke="#10b981"
                strokeWidth={isIqrFilterOn ? "2.5" : "1.5"}
                strokeLinecap="round"
                strokeLinejoin="round"
                points={cleanedSvgPoints}
                opacity={isIqrFilterOn ? 1 : 0.6}
              />

              {/* Data Points */}
              {currentRoute.carrierPoints.map((p, idx) => {
                const x = (idx / (currentRoute.carrierPoints.length - 1)) * 100;
                const priceToShow = isIqrFilterOn ? p.cleanedPrice : p.rawPrice;
                const y = normalizeY(priceToShow);
                const isOutlier = p.isSpike || p.isBait;

                return (
                  <circle
                    key={idx}
                    cx={x}
                    cy={y}
                    r={isOutlier && !isIqrFilterOn ? 5 : 3.5}
                    fill={
                      isOutlier && !isIqrFilterOn
                        ? "#f43f5e"
                        : isIqrFilterOn
                        ? "#10b981"
                        : "#38bdf8"
                    }
                    stroke="#ffffff"
                    strokeWidth="1"
                    className="cursor-pointer hover:scale-150 transition-transform"
                    onMouseEnter={() => setHoveredPointIdx(idx)}
                    onMouseLeave={() => setHoveredPointIdx(null)}
                  />
                );
              })}
            </svg>

            {/* Outlier Alert Tag overlays when filter is OFF */}
            {!isIqrFilterOn && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-rose-950/80 border border-rose-500/40 rounded-lg px-3 py-1.5 flex items-center gap-2 text-rose-300 text-xs font-mono backdrop-blur-md animate-pulse">
                <AlertOctagon className="w-4 h-4 text-rose-400" />
                <span>RAW SCRAPE ANOMALIES DETECTED: ₹{currentRoute.rawSurgeSpike.toLocaleString()} SURGE SPIKE</span>
              </div>
            )}

            {/* Active Hover Point Tooltip */}
            {activePoint && (
              <div className="absolute bottom-2 left-4 bg-zinc-900 border border-zinc-700 rounded-md px-2.5 py-1 text-xs font-mono text-zinc-200 shadow-xl pointer-events-none">
                <span className="text-sky-400 font-bold">{activePoint.carrier}</span>:{" "}
                <span className="tabular-nums font-semibold text-white">
                  ₹{isIqrFilterOn ? activePoint.cleanedPrice.toLocaleString() : activePoint.rawPrice.toLocaleString()}
                </span>{" "}
                ({activePoint.day})
              </div>
            )}
          </div>

          {/* Timeline Days Ticks */}
          <div className="flex justify-between text-[11px] font-mono text-zinc-500 px-1">
            {currentRoute.carrierPoints.map((p, idx) => (
              <span key={idx}>{p.day}</span>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <div className="text-[11px] font-mono text-zinc-500 uppercase">Cleaned Index Median</div>
            <div className="text-xl font-mono font-bold text-white mt-1 tabular-nums">
              ₹{currentRoute.cleanedMedian.toLocaleString()}
            </div>
            <div className="text-[10px] font-mono text-emerald-400 mt-0.5 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>MoSPI Approved Formula</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <div className="text-[11px] font-mono text-zinc-500 uppercase">Filtered Outlier Spike</div>
            <div className="text-xl font-mono font-bold text-rose-400 mt-1 tabular-nums">
              ₹{currentRoute.rawSurgeSpike.toLocaleString()}
            </div>
            <div className="text-[10px] font-mono text-zinc-400 mt-0.5">
              {isIqrFilterOn ? "Filtered by Q3 + 1.5×IQR" : "Unfiltered dynamic surge"}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <div className="text-[11px] font-mono text-zinc-500 uppercase">True OTA Premium Margin</div>
            <div className="text-xl font-mono font-bold text-amber-400 mt-1 tabular-nums">
              +{currentRoute.otaMarkupPercent}%
            </div>
            <div className="text-[10px] font-mono text-zinc-400 mt-0.5">
              Markup vs direct carrier API
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <div className="text-[11px] font-mono text-zinc-500 uppercase">Anomaly Pipeline Health</div>
            <div className="text-xl font-mono font-bold text-sky-400 mt-1 tabular-nums">
              99.4%
            </div>
            <div className="text-[10px] font-mono text-emerald-400 mt-0.5">
              4 Airlines + 2 OTAs active
            </div>
          </div>
        </div>

        {/* Live Scraper Health Monitor Strip */}
        <div className="pt-2 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-zinc-300">Live Scrapers:</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <span className="text-zinc-300">IndiGo (14ms)</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-300">Air India (22ms)</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-300">Akasa (18ms)</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-300">MakeMyTrip (34ms)</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-300">EaseMyTrip (29ms)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
