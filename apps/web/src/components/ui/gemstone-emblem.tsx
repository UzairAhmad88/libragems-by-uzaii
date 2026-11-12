import * as React from "react";

export function GemstoneEmblem({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="emblemTable" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#FFF5DE" />
          <stop offset="70%" stopColor="#EED7A1" />
          <stop offset="100%" stopColor="#D4B26F" />
        </linearGradient>

        <linearGradient id="emblemHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#FCECC7" />
          <stop offset="100%" stopColor="#DEB86C" />
        </linearGradient>

        <linearGradient id="emblemGoldLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF8E7" />
          <stop offset="50%" stopColor="#E5C57E" />
          <stop offset="100%" stopColor="#C5A66A" />
        </linearGradient>

        <linearGradient id="emblemGoldMid" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D8B266" />
          <stop offset="50%" stopColor="#B88F44" />
          <stop offset="100%" stopColor="#9E752D" />
        </linearGradient>

        <linearGradient id="emblemGoldDeep" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A47D32" />
          <stop offset="50%" stopColor="#7A5818" />
          <stop offset="100%" stopColor="#543A0A" />
        </linearGradient>

        <linearGradient id="emblemPavilionCenter" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FFF2D1" />
          <stop offset="40%" stopColor="#DEB768" />
          <stop offset="85%" stopColor="#B28838" />
          <stop offset="100%" stopColor="#6E4F14" />
        </linearGradient>

        <linearGradient id="emblemPavilionDeepL" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9C772F" />
          <stop offset="60%" stopColor="#6B4D13" />
          <stop offset="100%" stopColor="#3D2905" />
        </linearGradient>

        <linearGradient id="emblemPavilionDeepR" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#B89045" />
          <stop offset="60%" stopColor="#785517" />
          <stop offset="100%" stopColor="#422D07" />
        </linearGradient>
      </defs>

      {/* Crown Table */}
      <polygon
        points="156,92 356,92 408,168 408,204 356,236 156,236 104,204 104,168"
        fill="url(#emblemTable)"
        stroke="#805B16"
        strokeWidth="3"
      />

      {/* Crown Star & Kite Facets */}
      <polygon
        points="156,92 356,92 396,44 116,44"
        fill="url(#emblemHighlight)"
        stroke="#9E752D"
        strokeWidth="3"
      />
      <polygon
        points="356,92 408,168 468,110 396,44"
        fill="url(#emblemGoldLight)"
        stroke="#8A631E"
        strokeWidth="3"
      />
      <polygon
        points="156,92 104,168 44,110 116,44"
        fill="#FFFDF5"
        stroke="#9E752D"
        strokeWidth="3"
      />

      {/* Girdle Upper Facets */}
      <polygon
        points="104,168 104,204 28,196 44,110"
        fill="url(#emblemGoldMid)"
        stroke="#7A5515"
        strokeWidth="3"
      />
      <polygon
        points="408,168 408,204 484,196 468,110"
        fill="url(#emblemGoldDeep)"
        stroke="#593C07"
        strokeWidth="3"
      />

      {/* Girdle Side Bevels */}
      <polygon
        points="104,204 156,236 96,256 28,196"
        fill="url(#emblemGoldDeep)"
        stroke="#593C07"
        strokeWidth="3"
      />
      <polygon
        points="408,204 356,236 416,256 484,196"
        fill="#4A3105"
        stroke="#3D2703"
        strokeWidth="3"
      />

      {/* Lower Crown Triangles */}
      <polygon
        points="156,236 256,256 96,256"
        fill="url(#emblemGoldLight)"
        stroke="#8A631E"
        strokeWidth="3"
      />
      <polygon
        points="356,236 256,256 416,256"
        fill="url(#emblemGoldMid)"
        stroke="#704E12"
        strokeWidth="3"
      />
      <polygon
        points="156,236 356,236 256,256"
        fill="#FFF6DC"
        stroke="#8A631E"
        strokeWidth="3"
      />

      {/* Girdle Edge Line */}
      <polygon points="28,196 96,256 416,256 484,196 416,260 96,260" fill="#6B4A0E" />

      {/* Pavilion Facets */}
      <polygon
        points="28,196 96,260 256,474"
        fill="url(#emblemPavilionDeepL)"
        stroke="#3D2703"
        strokeWidth="3"
      />
      <polygon
        points="96,260 176,260 256,474"
        fill="url(#emblemGoldLight)"
        stroke="#7A5515"
        strokeWidth="3"
      />
      <polygon
        points="176,260 256,260 256,474"
        fill="url(#emblemPavilionCenter)"
        stroke="#8A631E"
        strokeWidth="3"
      />
      <polygon
        points="256,260 336,260 256,474"
        fill="url(#emblemGoldMid)"
        stroke="#704E12"
        strokeWidth="3"
      />
      <polygon
        points="336,260 416,260 256,474"
        fill="url(#emblemPavilionDeepR)"
        stroke="#593C07"
        strokeWidth="3"
      />
      <polygon
        points="416,260 484,196 256,474"
        fill="#3D2703"
        stroke="#2B1A02"
        strokeWidth="3"
      />

      {/* Optical Sparkle Glints */}
      <g transform="translate(196, 126)">
        <polygon points="0,-32 7,-8 32,0 7,7 0,32 -8,7 -32,0 -8,-8" fill="#FFFFFF" opacity="0.95" />
        <circle cx="0" cy="0" r="8" fill="#FFFFFF" />
      </g>
      <g transform="translate(346, 108)">
        <polygon points="0,-18 4,-4 18,0 4,4 0,18 -4,4 -18,0 -4,-4" fill="#FFFFFF" opacity="0.8" />
        <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
      </g>
      <circle cx="256" cy="470" r="4" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
}

