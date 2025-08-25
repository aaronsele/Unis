import React from 'react';
import '@splinetool/viewer';
import './VocationalGuidance.css';
import { VocationalCard } from '../components/VocationalCard';
import { VocationalChat } from '../components/VocationalChat';

export function VocationalGuidance() {
  return (
    <div className="p-4">
      <h1>Orientación Vocacional</h1>

      <div className="layout-orientacion">
        <VocationalCard />

        <div className="roboAmigo">
          <spline-viewer url="https://prod.spline.design/B8O-mb1DKzVohPvS/scene.splinecode"></spline-viewer>
        </div>
        <VocationalChat />
      </div>
    </div>
  );
}
