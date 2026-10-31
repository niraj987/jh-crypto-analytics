'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { RecommendationAction } from '@/lib/types';

interface GaugeMeterProps {
  score: number; // 0 to 100
  action: RecommendationAction;
  confidence: number; // 0 to 100
}

export default function GaugeMeter({ score, action, confidence }: GaugeMeterProps) {
  const needleRef = useRef<SVGGElement>(null);
  const scoreTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Map score 0-100 to angle -90deg to +90deg
    const targetAngle = -90 + (score / 100) * 180;

    if (needleRef.current) {
      gsap.to(needleRef.current, {
        rotation: targetAngle,
        transformOrigin: '50% 100%',
        duration: 1.6,
        ease: 'elastic.out(1, 0.45)',
      });
    }

    if (scoreTextRef.current) {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: score,
        duration: 1.3,
        ease: 'power2.out',
        onUpdate: () => {
          if (scoreTextRef.current) {
            scoreTextRef.current.innerText = Math.round(obj.val).toString();
          }
        },
      });
    }
  }, [score]);

  // Color mapping with calm natural tones
  const getBadgeStyle = () => {
    switch (action) {
      case 'STRONG BUY':
        return 'bg-mint-deep/25 text-mint-light border-mint/50 shadow-[0_0_20px_rgba(16,185,129,0.35)]';
      case 'BUY':
        return 'bg-mint-deep/20 text-mint-light border-mint/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]';
      case 'HOLD':
        return 'bg-golden-deep/20 text-golden-light border-golden/40 shadow-[0_0_15px_rgba(251,191,36,0.2)]';
      case 'SELL':
        return 'bg-coral-deep/20 text-coral-light border-coral/40 shadow-[0_0_15px_rgba(244,63,94,0.2)]';
      case 'STRONG SELL':
        return 'bg-coral-deep/30 text-coral-light border-coral/60 shadow-[0_0_25px_rgba(244,63,94,0.35)]';
      default:
        return 'bg-sky-deep/20 text-sky-light border-sky/40';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-3 select-none">
      {/* Semi-circular gauge SVG */}
      <div className="relative w-68 h-38 flex items-center justify-center">
        <svg viewBox="0 0 200 115" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="calmGaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f43f5e" />     {/* Coral red */}
              <stop offset="30%" stopColor="#fbbf24" />    {/* Golden yellow */}
              <stop offset="70%" stopColor="#10b981" />    {/* Mint green */}
              <stop offset="100%" stopColor="#38bdf8" />   {/* Sky blue */}
            </linearGradient>
            <filter id="gaugeSoftGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background track arc with realistic inset depth */}
          <path
            d="M 20 102 A 80 80 0 0 1 180 102"
            fill="none"
            stroke="rgba(15, 23, 42, 0.9)"
            strokeWidth="18"
            strokeLinecap="round"
          />
          <path
            d="M 20 102 A 80 80 0 0 1 180 102"
            fill="none"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="18"
            strokeLinecap="round"
          />

          {/* Colored gradient arc */}
          <path
            d="M 20 102 A 80 80 0 0 1 180 102"
            fill="none"
            stroke="url(#calmGaugeGradient)"
            strokeWidth="13"
            strokeLinecap="round"
            filter="url(#gaugeSoftGlow)"
          />

          {/* Ticks */}
          <line x1="20" y1="102" x2="30" y2="102" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.4" />
          <line x1="60" y1="46" x2="68" y2="52" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.4" />
          <line x1="100" y1="22" x2="100" y2="32" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.5" />
          <line x1="140" y1="46" x2="132" y2="52" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.4" />
          <line x1="180" y1="102" x2="170" y2="102" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.4" />

          {/* Needle Group */}
          <g ref={needleRef} style={{ transformOrigin: '100px 102px' }}>
            <polygon points="98,102 102,102 100,28" fill="#f8fafc" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))" />
            <circle cx="100" cy="102" r="7.5" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
            <circle cx="100" cy="102" r="2.5" fill="#38bdf8" />
          </g>
        </svg>

        {/* Real-time score readout inside gauge center (Perfect Center, No 100, Chance of Buy) */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2 pointer-events-none">
          <div className="flex flex-col items-center text-center">
            <span ref={scoreTextRef} className="text-4xl font-black font-mono text-white tracking-tight drop-shadow-md">
              {score}%
            </span>
            <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider mt-0.5">
              Chance of Buy
            </span>
          </div>
        </div>
      </div>

      {/* Decision Pill with Pop-up Glow */}
      <div className="mt-3 flex flex-col items-center">
        <span className={`px-6 py-2 rounded-xl text-sm font-extrabold font-mono tracking-wider border transition-all duration-300 hover:scale-105 cursor-pointer shadow-sm ${getBadgeStyle()}`}>
          {action}
        </span>
      </div>
    </div>
  );
}
