import React from 'react';
import '@splinetool/viewer';
import './VocationalGuidance.css';
import { VocationalCard } from '../components/VocationalCard';

export function VocationalGuidance() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Orientación Vocacional</h1>

      <div className="roboAmigo">
        <spline-viewer url="https://prod.spline.design/B8O-mb1DKzVohPvS/scene.splinecode"></spline-viewer>
      </div>

      <VocationalCard />
    </div>
  );
}
