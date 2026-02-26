"use client";

import { useState } from 'react';
import Cursor from '@/components/ui/Cursor';
import Portal from '@/components/sections/Portal';
import Nav from '@/components/layout/Nav';
import Hero from '@/components/sections/Hero';
import Manifesto from '@/components/sections/Manifesto';
import MenuSection from '@/components/sections/MenuSection';
import Pickup from '@/components/sections/Pickup';
import Reservation from '@/components/sections/Reservation';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  const [entered, setEntered] = useState(false);

  return (
    <>
      <Cursor />
      <Portal onEnter={() => setEntered(true)} />
      <Nav />
      {/* main content */}
      <main>
        <Hero />
        <Manifesto />
        <MenuSection />
        <Pickup />
        <Reservation />
      </main>
      <Footer />
    </>
  );
}
