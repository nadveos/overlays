import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Panel } from './pages/Panel';
import { Invitacion } from './pages/Invitacion';
import { OverlaySoloVertical } from './pages/overlays/OverlaySoloVertical';
import { OverlayVertical } from './pages/overlays/OverlayVertical';
import { OverlayPrincipal } from './pages/overlays/OverlayPrincipal';
import { Transition } from './pages/overlays/Transition';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/panel" element={<Panel />} />
      <Route path="/invitacion" element={<Invitacion />} />
      <Route path="/overlay-solo-vertical" element={<OverlaySoloVertical />} />
      <Route path="/overlay-vertical" element={<OverlayVertical />} />
      <Route path="/overlay" element={<OverlayPrincipal />} />
      <Route path="/transition" element={<Transition />} />
    </Routes>
  );
}

export default App;
