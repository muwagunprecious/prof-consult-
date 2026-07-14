import React from 'react';
import { Svg, Defs, LinearGradient, Stop, Path, Rect, Circle, G, Text } from '@react-pdf/renderer';
import { colors } from '../theme';

export const OouLogo = ({ scale = 1 }) => (
  <G transform={`scale(${scale})`}>
    <Text x="0" y="0" style={{ fontSize: 18, fontFamily: 'Helvetica-Bold', fill: colors.white }}>OOU</Text>
    <G transform="translate(0, 5)">
      <Text x="0" y="10" style={{ fontSize: 18, fontFamily: 'Helvetica-Bold', fill: colors.red }}>Future</Text>
      <Text x="58" y="10" style={{ fontSize: 18, fontFamily: 'Helvetica-Bold', fill: colors.white }}>Tech</Text>
    </G>
    <Text x="0" y="30" style={{ fontSize: 10, fontFamily: 'Helvetica', fill: colors.white, letterSpacing: 0.5 }}>Conference</Text>
  </G>
);

export const RedGeometricArt = () => (
  <Svg width="400" height="400" viewBox="0 0 400 400">
    <G transform="translate(50, 50)">
      {/* Recreating the stylized 'M' / boxes pattern from the screenshot */}
      <Path
        d="M0 250 L80 150 L160 250 L160 350 L80 450 L0 350 Z"
        fill="none"
        stroke={colors.red}
        strokeWidth="2"
      />
      <Path
        d="M100 250 L180 150 L260 250 L260 350 L180 450 L100 350 Z"
        fill="none"
        stroke={colors.red}
        strokeWidth="2"
      />
      <Path
        d="M200 250 L280 150 L360 250 L360 350 L280 450 L200 350 Z"
        fill="none"
        stroke={colors.red}
        strokeWidth="2"
      />
      
      {/* Adding more lines to match the complex 3D box look */}
      <Path d="M0 250 L0 350" stroke={colors.red} strokeWidth="2" />
      <Path d="M80 150 L80 450" stroke={colors.red} strokeWidth="2" />
      <Path d="M160 250 L160 350" stroke={colors.red} strokeWidth="2" />
      
      <Path d="M100 250 L100 350" stroke={colors.red} strokeWidth="2" />
      <Path d="M180 150 L180 450" stroke={colors.red} strokeWidth="2" />
      <Path d="M260 250 L260 350" stroke={colors.red} strokeWidth="2" />
      
      <Path d="M200 250 L200 350" stroke={colors.red} strokeWidth="2" />
      <Path d="M280 150 L280 450" stroke={colors.red} strokeWidth="2" />
      <Path d="M360 250 L360 350" stroke={colors.red} strokeWidth="2" />
    </G>
  </Svg>
);

export const PageHeader = ({ date = "27 MARCH 2026" }) => (
  <G transform="translate(40, 40)">
     <OouLogo scale={0.8} />
     <Text x="400" y="15" style={{ fontSize: 14, fontFamily: 'Helvetica-Bold', fill: colors.white, letterSpacing: 1 }}>{date}</Text>
  </G>
);

// Minimal background - just pure black is handled by the page style
export const EmptyBackground = () => null;
