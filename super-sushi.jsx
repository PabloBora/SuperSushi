import { useState, useEffect, useRef, useCallback } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cormorant:wght@300;400&family=Montserrat:wght@200;300;400&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --void: #08080A;
    --carbon: #111110;
    --smoke: #1A1A18;
    --ash: #2A2A27;
    --gold: #C8A45A;
    --gold-dim: #8A6E3A;
    --ivory: #F2EDE4;
    --stone: #7A756C;
    --mist: #4A4540;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--void);
    color: var(--ivory);
    font-family: 'Cormorant Garamond', Georgia, serif;
    overflow-x: hidden;
    cursor: none;
  }

  /* CUSTOM CURSOR */
  .cursor-outer {
    position: fixed;
    width: 32px; height: 32px;
    border: 1px solid rgba(200, 164, 90, 0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: all 0.12s ease;
  }
  .cursor-inner {
    position: fixed;
    width: 4px; height: 4px;
    background: var(--gold);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
  }

  /* PORTAL INTRO */
  .portal {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: var(--void);
    transition: opacity 1.2s cubic-bezier(0.77, 0, 0.175, 1),
                transform 1.2s cubic-bezier(0.77, 0, 0.175, 1);
  }
  .portal.exit {
    opacity: 0;
    pointer-events: none;
    transform: scale(1.04);
  }
  .portal-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(3.5rem, 8vw, 7rem);
    font-weight: 300;
    letter-spacing: 0.3em;
    color: var(--ivory);
    text-transform: uppercase;
    opacity: 0;
    animation: fadeUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
    position: relative;
  }
  .portal-logo::after {
    content: '';
    position: absolute;
    bottom: -6px; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    transform: scaleX(0);
    animation: lineExpand 1s ease 1.5s forwards;
  }
  .portal-sub {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.65rem;
    letter-spacing: 0.5em;
    color: var(--stone);
    text-transform: uppercase;
    margin-top: 1.5rem;
    opacity: 0;
    animation: fadeUp 1s ease 1s forwards;
  }
  .portal-enter {
    margin-top: 5rem;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.6rem;
    letter-spacing: 0.6em;
    color: var(--gold-dim);
    text-transform: uppercase;
    cursor: pointer;
    opacity: 0;
    animation: fadeUp 1s ease 1.8s forwards;
    background: none;
    border: none;
    position: relative;
    padding: 1rem 2rem;
    transition: color 0.4s;
  }
  .portal-enter::before {
    content: '';
    position: absolute;
    inset: 0;
    border: 1px solid rgba(200, 164, 90, 0.2);
    transition: border-color 0.4s, transform 0.4s;
  }
  .portal-enter:hover { color: var(--gold); }
  .portal-enter:hover::before {
    border-color: rgba(200, 164, 90, 0.6);
    transform: scale(0.96);
  }
  .portal-grain {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    opacity: 0.4;
  }

  /* NAV */
  .nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 4rem;
    mix-blend-mode: normal;
    transition: background 0.6s;
  }
  .nav.scrolled {
    background: rgba(8,8,10,0.85);
    backdrop-filter: blur(20px);
    padding: 1.2rem 4rem;
    border-bottom: 1px solid rgba(200, 164, 90, 0.08);
  }
  .nav-logo {
    font-size: 1.1rem;
    font-weight: 300;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: var(--ivory);
  }
  .nav-links {
    display: flex;
    gap: 3rem;
    list-style: none;
  }
  .nav-links a {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.6rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--stone);
    text-decoration: none;
    transition: color 0.3s;
    cursor: pointer;
  }
  .nav-links a:hover { color: var(--gold); }
  .nav-reserve {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.55rem;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: var(--gold);
    background: none;
    border: 1px solid rgba(200, 164, 90, 0.3);
    padding: 0.7rem 1.5rem;
    cursor: pointer;
    transition: all 0.3s;
  }
  .nav-reserve:hover {
    background: rgba(200, 164, 90, 0.1);
    border-color: var(--gold);
  }

  /* HERO */
  .hero {
    height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .hero-bg {
    position: absolute;
    inset: -10%;
    background: 
      radial-gradient(ellipse 80% 60% at 60% 40%, rgba(200, 164, 90, 0.04) 0%, transparent 60%),
      radial-gradient(ellipse 50% 80% at 20% 80%, rgba(200, 164, 90, 0.02) 0%, transparent 50%),
      var(--carbon);
    will-change: transform;
  }
  .hero-visual {
    position: absolute;
    right: 5%;
    top: 50%;
    transform: translateY(-50%);
    width: 45vw;
    max-width: 680px;
    aspect-ratio: 3/4;
  }
  .hero-plate {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .hero-plate-inner {
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(ellipse 60% 40% at 55% 45%, rgba(200, 164, 90, 0.12) 0%, transparent 60%),
      linear-gradient(145deg, #1A1A15 0%, #0F0F0C 50%, #0A0A08 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(200, 164, 90, 0.08);
    position: relative;
  }
  .hero-plate-inner::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(200,164,90,0.4), transparent);
  }
  /* Abstract sushi shape SVG overlay */
  .sushi-art {
    width: 70%;
    opacity: 0.9;
  }

  /* Mirror shimmer */
  .mirror-shimmer {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      transparent 30%,
      rgba(200, 164, 90, 0.03) 50%,
      transparent 70%
    );
    pointer-events: none;
    transition: transform 0.1s linear;
  }
  .hero-reflection {
    position: absolute;
    bottom: 0;
    left: 0; right: 0;
    height: 35%;
    background: linear-gradient(to bottom, transparent, rgba(8,8,10,0.95));
    transform-origin: bottom;
  }

  /* Hero text */
  .hero-content {
    position: relative;
    z-index: 10;
    left: 5%;
    width: 42%;
  }
  .hero-eyebrow {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.55rem;
    letter-spacing: 0.7em;
    color: var(--gold);
    text-transform: uppercase;
    margin-bottom: 2.5rem;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    opacity: 0;
    animation: fadeIn 1s ease 0.5s forwards;
  }
  .hero-eyebrow::before {
    content: '';
    width: 2.5rem;
    height: 1px;
    background: var(--gold-dim);
  }
  .hero-title {
    font-size: clamp(3.5rem, 5.5vw, 7rem);
    font-weight: 300;
    line-height: 0.95;
    letter-spacing: -0.01em;
    margin-bottom: 2.5rem;
    opacity: 0;
    animation: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.7s forwards;
  }
  .hero-title em {
    font-style: italic;
    color: var(--gold);
    font-weight: 300;
  }
  .hero-desc {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.7rem;
    line-height: 2.2;
    letter-spacing: 0.08em;
    color: var(--stone);
    max-width: 28rem;
    margin-bottom: 3.5rem;
    opacity: 0;
    animation: fadeUp 1s ease 1.1s forwards;
  }
  .hero-cta {
    display: flex;
    gap: 2rem;
    align-items: center;
    opacity: 0;
    animation: fadeUp 1s ease 1.3s forwards;
  }
  .btn-primary {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.55rem;
    letter-spacing: 0.5em;
    text-transform: uppercase;
    color: var(--void);
    background: var(--gold);
    border: none;
    padding: 1rem 2.5rem;
    cursor: pointer;
    transition: all 0.3s;
  }
  .btn-primary:hover {
    background: var(--ivory);
    transform: translateY(-2px);
  }
  .btn-ghost {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.55rem;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: var(--stone);
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: color 0.3s;
  }
  .btn-ghost::after {
    content: '→';
    font-size: 0.8rem;
    transition: transform 0.3s;
  }
  .btn-ghost:hover { color: var(--ivory); }
  .btn-ghost:hover::after { transform: translateX(6px); }

  .hero-scroll-indicator {
    position: absolute;
    bottom: 2.5rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    opacity: 0;
    animation: fadeIn 1s ease 2s forwards;
  }
  .scroll-line {
    width: 1px;
    height: 60px;
    background: linear-gradient(to bottom, var(--gold-dim), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }
  .scroll-label {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.45rem;
    letter-spacing: 0.5em;
    color: var(--mist);
    text-transform: uppercase;
  }

  /* MANIFESTO / ANTIGRAVITY SECTION */
  .manifesto {
    min-height: 100vh;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 10rem 0;
  }
  .manifesto-bg {
    position: absolute;
    inset: 0;
    background: var(--void);
  }
  .float-element {
    position: absolute;
    pointer-events: none;
    will-change: transform;
  }
  .float-circle-1 {
    width: 500px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(200,164,90,0.04) 0%, transparent 70%);
    top: -100px; right: -100px;
  }
  .float-circle-2 {
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(200,164,90,0.03) 0%, transparent 70%);
    bottom: 10%; left: 5%;
  }
  .float-text-jp {
    font-size: clamp(8rem, 15vw, 18rem);
    font-weight: 300;
    color: rgba(200, 164, 90, 0.025);
    letter-spacing: -0.05em;
    line-height: 1;
    right: -2rem;
    top: 5%;
    font-family: serif;
  }
  .manifesto-grid {
    position: relative;
    z-index: 10;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
  }
  .manifesto-left {
    padding: 0 6rem 0 8rem;
    border-right: 1px solid rgba(200, 164, 90, 0.08);
  }
  .manifesto-right {
    padding: 0 8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4rem;
  }
  .section-label {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.5rem;
    letter-spacing: 0.7em;
    color: var(--gold-dim);
    text-transform: uppercase;
    margin-bottom: 3rem;
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  .section-label::before {
    content: '';
    width: 2rem;
    height: 1px;
    background: var(--gold-dim);
  }
  .manifesto-headline {
    font-size: clamp(2.5rem, 3.5vw, 5rem);
    font-weight: 300;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: 3rem;
  }
  .manifesto-headline em {
    font-style: italic;
    color: var(--gold);
  }
  .manifesto-body {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.65rem;
    line-height: 2.4;
    color: var(--stone);
    letter-spacing: 0.05em;
    max-width: 36rem;
  }
  .ingredient-card {
    display: flex;
    align-items: flex-start;
    gap: 2rem;
    padding: 2.5rem 0;
    border-bottom: 1px solid rgba(200, 164, 90, 0.06);
    cursor: default;
    transition: padding 0.4s;
  }
  .ingredient-card:first-child { border-top: 1px solid rgba(200, 164, 90, 0.06); }
  .ingredient-card:hover { padding-left: 1rem; }
  .ingredient-num {
    font-size: 0.5rem;
    font-family: 'Montserrat', sans-serif;
    color: var(--gold-dim);
    letter-spacing: 0.3em;
    margin-top: 0.3rem;
    min-width: 2.5rem;
  }
  .ingredient-info h3 {
    font-size: 1.3rem;
    font-weight: 300;
    letter-spacing: 0.05em;
    margin-bottom: 0.5rem;
    transition: color 0.3s;
  }
  .ingredient-card:hover h3 { color: var(--gold); }
  .ingredient-info p {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.55rem;
    letter-spacing: 0.2em;
    color: var(--stone);
    line-height: 1.9;
  }
  .ingredient-origin {
    margin-left: auto;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.45rem;
    letter-spacing: 0.4em;
    color: var(--mist);
    text-transform: uppercase;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    transform: rotate(180deg);
  }

  /* MENU SECTION */
  .menu-section {
    min-height: 100vh;
    background: var(--carbon);
    padding: 10rem 8rem;
    position: relative;
    overflow: hidden;
  }
  .menu-section::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(200,164,90,0.2), transparent);
  }
  .menu-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 6rem;
  }
  .menu-title {
    font-size: clamp(2.8rem, 4vw, 5.5rem);
    font-weight: 300;
    line-height: 1;
    letter-spacing: -0.02em;
  }
  .menu-title em { font-style: italic; color: var(--gold); }
  .menu-desc {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.6rem;
    color: var(--stone);
    letter-spacing: 0.1em;
    max-width: 22rem;
    line-height: 2.2;
    text-align: right;
  }
  .menu-tabs {
    display: flex;
    gap: 0;
    border-bottom: 1px solid rgba(200,164,90,0.12);
    margin-bottom: 4rem;
  }
  .menu-tab {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.55rem;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: var(--mist);
    background: none;
    border: none;
    padding: 1rem 2.5rem 1.2rem;
    cursor: pointer;
    position: relative;
    transition: color 0.3s;
  }
  .menu-tab::after {
    content: '';
    position: absolute;
    bottom: -1px; left: 0; right: 0;
    height: 1px;
    background: var(--gold);
    transform: scaleX(0);
    transition: transform 0.3s;
  }
  .menu-tab.active { color: var(--gold); }
  .menu-tab.active::after { transform: scaleX(1); }
  .menu-tab:hover { color: var(--ivory); }
  .menu-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
  }
  .menu-item {
    padding: 2.5rem 3rem 2.5rem 0;
    border-bottom: 1px solid rgba(200,164,90,0.06);
    cursor: default;
    position: relative;
    transition: padding-left 0.4s;
  }
  .menu-item:hover { padding-left: 1rem; }
  .menu-item::after {
    content: '';
    position: absolute;
    left: 0; top: 50%; bottom: 50%;
    width: 2px;
    background: var(--gold);
    transition: top 0.4s, bottom 0.4s;
  }
  .menu-item:hover::after { top: 20%; bottom: 20%; }
  .menu-item-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.7rem;
  }
  .menu-item-name {
    font-size: 1.2rem;
    font-weight: 300;
    letter-spacing: 0.03em;
  }
  .menu-item-price {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.55rem;
    letter-spacing: 0.2em;
    color: var(--gold);
  }
  .menu-item-desc {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.55rem;
    color: var(--stone);
    letter-spacing: 0.1em;
    line-height: 1.9;
  }
  .menu-item-tag {
    display: inline-block;
    margin-top: 0.8rem;
    font-family: 'Montserrat', sans-serif;
    font-size: 0.4rem;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: var(--gold-dim);
    border: 1px solid rgba(200,164,90,0.2);
    padding: 0.3rem 0.8rem;
  }

  /* RESERVATION SECTION */
  .reservation {
    min-height: 80vh;
    background: var(--void);
    display: flex;
    position: relative;
    overflow: hidden;
  }
  .reservation::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(200,164,90,0.2), transparent);
  }
  .reservation-left {
    width: 45%;
    padding: 8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-right: 1px solid rgba(200,164,90,0.08);
  }
  .reservation-right {
    flex: 1;
    padding: 8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .reservation-title {
    font-size: clamp(2.5rem, 3.5vw, 5rem);
    font-weight: 300;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: 2rem;
  }
  .reservation-title em { font-style: italic; color: var(--gold); }
  .reservation-info {
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .info-row {
    display: flex;
    gap: 1.5rem;
    align-items: baseline;
  }
  .info-label {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.5rem;
    letter-spacing: 0.5em;
    color: var(--gold-dim);
    text-transform: uppercase;
    min-width: 5rem;
  }
  .info-val {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.6rem;
    letter-spacing: 0.1em;
    color: var(--stone);
    line-height: 1.8;
  }
  .form-step {
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
  }
  .form-row { display: flex; gap: 1.5rem; }
  .form-group {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }
  .form-label {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.5rem;
    letter-spacing: 0.5em;
    text-transform: uppercase;
    color: var(--mist);
  }
  .form-input {
    background: none;
    border: none;
    border-bottom: 1px solid rgba(200,164,90,0.15);
    color: var(--ivory);
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem;
    font-weight: 300;
    padding: 0.7rem 0;
    width: 100%;
    transition: border-color 0.3s;
    outline: none;
    cursor: text;
  }
  .form-input:focus { border-color: var(--gold); }
  .form-input::placeholder { color: var(--ash); }
  .form-select {
    background: none;
    border: none;
    border-bottom: 1px solid rgba(200,164,90,0.15);
    color: var(--ivory);
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem;
    font-weight: 300;
    padding: 0.7rem 0;
    width: 100%;
    outline: none;
    cursor: pointer;
    transition: border-color 0.3s;
  }
  .form-select:focus { border-color: var(--gold); }
  .form-select option { background: var(--carbon); color: var(--ivory); }
  .form-submit {
    width: 100%;
    padding: 1.2rem;
    background: transparent;
    border: 1px solid rgba(200,164,90,0.3);
    color: var(--gold);
    font-family: 'Montserrat', sans-serif;
    font-size: 0.55rem;
    letter-spacing: 0.6em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.4s;
    margin-top: 1rem;
  }
  .form-submit:hover {
    background: var(--gold);
    color: var(--void);
    border-color: var(--gold);
  }
  .form-success {
    text-align: center;
    padding: 2rem 0;
  }
  .form-success-icon {
    width: 48px; height: 48px;
    border: 1px solid var(--gold-dim);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 2rem;
    color: var(--gold);
    font-size: 1.2rem;
  }
  .form-success h3 {
    font-size: 1.8rem;
    font-weight: 300;
    margin-bottom: 1rem;
  }
  .form-success p {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.6rem;
    color: var(--stone);
    letter-spacing: 0.1em;
    line-height: 2;
  }

  /* FOOTER */
  .footer {
    background: var(--carbon);
    padding: 5rem 8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(200,164,90,0.08);
  }
  .footer-logo {
    font-size: 1.8rem;
    font-weight: 300;
    letter-spacing: 0.4em;
    text-transform: uppercase;
  }
  .footer-copy {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.5rem;
    letter-spacing: 0.3em;
    color: var(--mist);
  }
  .footer-links {
    display: flex;
    gap: 2.5rem;
    list-style: none;
  }
  .footer-links a {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.5rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--mist);
    text-decoration: none;
    transition: color 0.3s;
    cursor: pointer;
  }
  .footer-links a:hover { color: var(--gold); }

  /* ANIMATIONS */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes lineExpand {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }
  @keyframes scrollPulse {
    0%, 100% { opacity: 0.3; transform: scaleY(1); }
    50% { opacity: 1; transform: scaleY(0.7); }
  }
  @keyframes float1 {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(1deg); }
  }
  @keyframes float2 {
    0%, 100% { transform: translateY(0px); }
    33% { transform: translateY(-14px); }
    66% { transform: translateY(8px); }
  }
  .anim-float-1 { animation: float1 8s ease-in-out infinite; }
  .anim-float-2 { animation: float2 11s ease-in-out infinite; }

  /* REVEAL ANIMATION */
  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.35s; }
  .reveal-delay-4 { transition-delay: 0.5s; }

  @media (max-width: 1024px) {
    .nav { padding: 1.5rem 2rem; }
    .nav.scrolled { padding: 1rem 2rem; }
    .nav-links { display: none; }
    .hero-content { width: 90%; left: 5%; }
    .hero-visual { display: none; }
    .manifesto-grid { grid-template-columns: 1fr; }
    .manifesto-left { padding: 0 3rem; border-right: none; border-bottom: 1px solid rgba(200,164,90,0.08); padding-bottom: 4rem; margin-bottom: 4rem; }
    .manifesto-right { padding: 0 3rem; }
    .menu-section { padding: 6rem 3rem; }
    .menu-grid { grid-template-columns: 1fr; }
    .menu-header { flex-direction: column; gap: 2rem; align-items: flex-start; }
    .menu-desc { text-align: left; }
    .reservation { flex-direction: column; }
    .reservation-left, .reservation-right { width: 100%; padding: 5rem 3rem; }
    .reservation-left { border-right: none; border-bottom: 1px solid rgba(200,164,90,0.08); }
    .footer { flex-direction: column; gap: 2rem; text-align: center; padding: 4rem 3rem; }
  }
`;

const menuData = {
  "Omakase": [
    { name: "Otoro Nigiri", desc: "Atún de aleta azul, jengibre encurtido, wasabi fresco", price: "$380", tag: "Chef's Selection" },
    { name: "Uni Gunkan", desc: "Erizo de mar Hokkaido, alga nori tostada, flor de sal", price: "$420", tag: "Temporada" },
    { name: "Wagyu Roll", desc: "Res Wagyu A5, trufa negra, oro comestible, shiso morado", price: "$680", tag: "Signature" },
    { name: "Hamachi Sashimi", desc: "Pez limón japonés, yuzu kosho, microgreens", price: "$320", tag: "" },
    { name: "Hotate Carpaccio", desc: "Vieira del Pacífico, aceite de sésamo blanco, shichimi", price: "$360", tag: "" },
    { name: "Dragon Roll", desc: "Anguila, aguacate Hass, sriracha ahumada, caviar", price: "$520", tag: "Best Seller" },
  ],
  "Sashimi": [
    { name: "Salmón Sake", desc: "Salmón Atlántico, cítrico yuzu, cebollín", price: "$280", tag: "" },
    { name: "Atún Maguro", desc: "Atún rojo de aleta azul, sal de Okinawa", price: "$350", tag: "Premium" },
    { name: "Pargo Tai", desc: "Pargo rojo japonés, ponzu ligero, sésamo dorado", price: "$310", tag: "Temporada" },
    { name: "Pulpo Tako", desc: "Pulpo gallego, aceite de oliva, pimentón ahumado", price: "$290", tag: "" },
    { name: "Langostino Ebi", desc: "Langostino tigre, mayonesa wasabi, ikura", price: "$330", tag: "" },
    { name: "Hirame", desc: "Halibut del Pacífico norte, yuzu, perlas de aceite", price: "$370", tag: "Chef's Choice" },
  ],
  "Temaki": [
    { name: "Spicy Tuna", desc: "Atún picante, pepino, aguacate, tobiko naranja", price: "$180", tag: "" },
    { name: "California Supreme", desc: "Cangrejo real, aguacate, pepino, masago", price: "$160", tag: "Clásico" },
    { name: "Salmon Avocado", desc: "Salmón marinado, aguacate Hass, julianas de pepino", price: "$170", tag: "" },
    { name: "Black Dragon", desc: "Anguila, pepino, tempura crunch, unagi glaze", price: "$210", tag: "Signature" },
    { name: "Rainbow", desc: "Mix de peces del día, aguacate, pepino, naranja", price: "$195", tag: "Chef's Selection" },
    { name: "Vegetariano", desc: "Aguacate, mango, pepino, rábano encurtido, sésamo", price: "$145", tag: "Vegano" },
  ]
};

const ingredients = [
  { num: "01", name: "Atún de Aleta Azul", desc: "Importado directamente de los mercados Tsukiji y Toyosu. Cada pieza certificada y seleccionada manualmente.", origin: "Tokio · Japón" },
  { num: "02", name: "Arroz Koshihikari", desc: "Variedad premium de Niigata, perfeccionada por décadas de cultivo en tierras volcánicas del norte de Japón.", origin: "Niigata · Japón" },
  { num: "03", name: "Wasabi Natural", desc: "Rizoma cultivado en aguas puras de montaña. Rallado al momento, sin conservadores ni colorantes artificiales.", origin: "Shizuoka · Japón" },
  { num: "04", name: "Uni Hokkaido", desc: "Erizo de mar de las frías aguas del norte. Textura cremosa y sabor oceánico que no admite mediocre compañía.", origin: "Hokkaido · Japón" },
];

export default function SuperSushi() {
  const [portalExit, setPortalExit] = useState(false);
  const [portalDone, setPortalDone] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("Omakase");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", date: "", time: "", guests: "2" });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorDelayed, setCursorDelayed] = useState({ x: -100, y: -100 });
  const heroBgRef = useRef(null);
  const cursorAnimRef = useRef(null);

  const enterPortal = () => {
    setPortalExit(true);
    setTimeout(() => setPortalDone(true), 1300);
  };

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouse = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      setCursorPos({ x, y });
      setMousePos({ x: (x / window.innerWidth - 0.5) * 2, y: (y / window.innerHeight - 0.5) * 2 });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // Smooth cursor follower
  useEffect(() => {
    let rafId;
    let current = { x: -100, y: -100 };
    const animate = () => {
      current.x += (cursorPos.x - current.x) * 0.12;
      current.y += (cursorPos.y - current.y) * 0.12;
      setCursorDelayed({ x: current.x, y: current.y });
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [cursorPos]);

  // Parallax hero bg
  useEffect(() => {
    if (heroBgRef.current) {
      heroBgRef.current.style.transform = `translate(${mousePos.x * 8}px, ${mousePos.y * 8}px)`;
    }
  }, [mousePos]);

  // Intersection observer for reveals
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    reveals.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [portalDone]);

  const shimmerStyle = {
    transform: `translate(${mousePos.x * 15}%, ${mousePos.y * 15}%) rotate(${mousePos.x * 3}deg)`,
    background: `linear-gradient(${135 + mousePos.x * 20}deg, transparent 30%, rgba(200, 164, 90, 0.06) 50%, transparent 70%)`
  };

  const handleFormChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleFormSubmit = (e) => { e.preventDefault(); setFormSubmitted(true); };

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <>
      <style>{style}</style>

      {/* Custom cursor */}
      <div className="cursor-outer" style={{ left: cursorDelayed.x, top: cursorDelayed.y }} />
      <div className="cursor-inner" style={{ left: cursorPos.x, top: cursorPos.y }} />

      {/* Portal Intro */}
      {!portalDone && (
        <div className={`portal ${portalExit ? "exit" : ""}`}>
          <div className="portal-grain" />
          <div className="portal-logo">Super Sushi</div>
          <div className="portal-sub">Alta Gastronomía Japonesa · Ciudad de México</div>
          <button className="portal-enter" onClick={enterPortal}>Ingresar al Restaurante</button>
        </div>
      )}

      {/* Navigation */}
      <nav className={`nav ${navScrolled ? "scrolled" : ""}`}>
        <div className="nav-logo">Super Sushi</div>
        <ul className="nav-links">
          <li><a onClick={() => scrollTo("manifesto")}>Filosofía</a></li>
          <li><a onClick={() => scrollTo("menu")}>Menú</a></li>
          <li><a onClick={() => scrollTo("reservacion")}>Reservación</a></li>
        </ul>
        <button className="nav-reserve" onClick={() => scrollTo("reservacion")}>Reservar Mesa</button>
      </nav>

      {/* Hero */}
      <section className="hero" id="hero">
        <div className="hero-bg" ref={heroBgRef} />
        
        {/* Abstract visual */}
        <div className="hero-visual">
          <div className="hero-plate">
            <div className="hero-plate-inner">
              <div className="mirror-shimmer" style={shimmerStyle} />
              <svg className="sushi-art" viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Decorative plate */}
                <ellipse cx="200" cy="430" rx="160" ry="28" fill="rgba(200,164,90,0.06)" stroke="rgba(200,164,90,0.2)" strokeWidth="0.5"/>
                {/* Main piece - otoro */}
                <rect x="90" y="280" width="100" height="58" rx="8" fill="rgba(160,90,80,0.45)" stroke="rgba(200,164,90,0.12)" strokeWidth="0.8"/>
                <rect x="94" y="290" width="92" height="14" rx="2" fill="rgba(200,120,110,0.35)"/>
                <rect x="90" y="330" width="100" height="18" rx="4" fill="rgba(240,230,200,0.12)" stroke="rgba(200,164,90,0.1)" strokeWidth="0.5"/>
                {/* Wasabi */}
                <ellipse cx="240" cy="295" rx="22" ry="14" fill="rgba(80,130,80,0.6)" stroke="rgba(120,180,90,0.2)" strokeWidth="0.5"/>
                {/* Ginger */}
                <path d="M260 310 Q275 295 285 310 Q278 325 265 320 Z" fill="rgba(240,180,160,0.55)" stroke="rgba(200,120,100,0.2)" strokeWidth="0.5"/>
                {/* Second piece */}
                <rect x="210" y="340" width="90" height="52" rx="7" fill="rgba(70,100,160,0.4)" stroke="rgba(200,164,90,0.1)" strokeWidth="0.8"/>
                <rect x="214" y="352" width="82" height="12" rx="2" fill="rgba(100,140,200,0.3)"/>
                <rect x="210" y="385" width="90" height="16" rx="4" fill="rgba(240,230,200,0.1)"/>
                {/* Decorative lines */}
                <line x1="80" y1="420" x2="320" y2="420" stroke="rgba(200,164,90,0.15)" strokeWidth="0.5"/>
                {/* Gold accent dots */}
                <circle cx="145" cy="265" r="3" fill="rgba(200,164,90,0.6)"/>
                <circle cx="260" cy="265" r="2" fill="rgba(200,164,90,0.4)"/>
                <circle cx="310" cy="355" r="2" fill="rgba(200,164,90,0.3)"/>
                {/* Chopsticks */}
                <line x1="330" y1="230" x2="300" y2="420" stroke="rgba(200,164,90,0.25)" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="345" y1="225" x2="315" y2="415" stroke="rgba(200,164,90,0.2)" strokeWidth="1.5" strokeLinecap="round"/>
                {/* Steam lines */}
                <path d="M140 260 Q145 245 140 230" stroke="rgba(240,230,200,0.1)" strokeWidth="1" fill="none"/>
                <path d="M160 255 Q166 238 160 222" stroke="rgba(240,230,200,0.08)" strokeWidth="1" fill="none"/>
                {/* Top decoration */}
                <text x="200" y="140" textAnchor="middle" fontFamily="serif" fontSize="80" fill="rgba(200,164,90,0.05)">鮨</text>
                <circle cx="200" cy="120" r="80" stroke="rgba(200,164,90,0.08)" strokeWidth="0.5" fill="none"/>
                <circle cx="200" cy="120" r="60" stroke="rgba(200,164,90,0.05)" strokeWidth="0.5" fill="none"/>
              </svg>
              <div className="hero-reflection" />
            </div>
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-eyebrow">Experiencia Gastronómica</div>
          <h1 className="hero-title">
            El Arte del<br />
            <em>Sushi</em><br />
            Elevado
          </h1>
          <p className="hero-desc">
            Una sinfonía de ingredientes seleccionados en Japón, técnica ancestral 
            y visión contemporánea. Cada pieza, una obra efímera.
          </p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => scrollTo("reservacion")}>
              Reservar Mesa
            </button>
            <button className="btn-ghost" onClick={() => scrollTo("menu")}>
              Ver Menú
            </button>
          </div>
        </div>

        <div className="hero-scroll-indicator">
          <div className="scroll-line" />
          <span className="scroll-label">Descubrir</span>
        </div>
      </section>

      {/* Manifesto / Antigravity */}
      <section className="manifesto" id="manifesto">
        <div className="manifesto-bg">
          <div className="float-element float-circle-1 anim-float-1" />
          <div className="float-element float-circle-2 anim-float-2" />
          <div className="float-element float-text-jp">鮨</div>
        </div>
        <div className="manifesto-grid">
          <div className="manifesto-left">
            <div className="section-label reveal">Nuestra Filosofía</div>
            <h2 className="manifesto-headline reveal reveal-delay-1">
              La <em>pureza</em><br />
              es la forma<br />
              más alta del arte
            </h2>
            <p className="manifesto-body reveal reveal-delay-2">
              En Super Sushi creemos que la excelencia no se encuentra en 
              la complejidad, sino en la claridad. Cada ingrediente habla 
              por sí mismo; nuestra labor es crear el silencio adecuado 
              para que lo escuches.
              <br /><br />
              Trabajamos directamente con los mercados de Tsukiji y Toyosu, 
              seleccionando cada pieza a mano. Sin intermediarios. Sin compromiso.
            </p>
          </div>
          <div className="manifesto-right">
            {ingredients.map((ing, i) => (
              <div className={`ingredient-card reveal reveal-delay-${i % 3 + 1}`} key={ing.num}>
                <span className="ingredient-num">{ing.num}</span>
                <div className="ingredient-info">
                  <h3>{ing.name}</h3>
                  <p>{ing.desc}</p>
                </div>
                <span className="ingredient-origin">{ing.origin}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="menu-section" id="menu">
        <div className="menu-header">
          <div>
            <div className="section-label reveal">Carta de Temporada</div>
            <h2 className="menu-title reveal reveal-delay-1">
              Nuestro<br /><em>Menú</em>
            </h2>
          </div>
          <p className="menu-desc reveal reveal-delay-2">
            Diseñado por nuestro Chef para celebrar los mejores 
            productos del Pacífico. Precios incluyen impuestos.
          </p>
        </div>
        <div className="menu-tabs reveal">
          {Object.keys(menuData).map(tab => (
            <button
              key={tab}
              className={`menu-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="menu-grid">
          {menuData[activeTab].map((item, i) => (
            <div className={`menu-item reveal reveal-delay-${(i % 3) + 1}`} key={item.name}>
              <div className="menu-item-header">
                <span className="menu-item-name">{item.name}</span>
                <span className="menu-item-price">{item.price}</span>
              </div>
              <p className="menu-item-desc">{item.desc}</p>
              {item.tag && <span className="menu-item-tag">{item.tag}</span>}
            </div>
          ))}
        </div>
      </section>

      {/* Reservation */}
      <section className="reservation" id="reservacion">
        <div className="reservation-left">
          <div className="section-label reveal">Reservaciones</div>
          <h2 className="reservation-title reveal reveal-delay-1">
            Reserve su<br /><em>experiencia</em>
          </h2>
          <p className="manifesto-body reveal reveal-delay-2">
            Cada servicio es íntimo y personalizado. 
            Le recomendamos reservar con al menos 48 horas de anticipación.
          </p>
          <div className="reservation-info">
            {[
              { label: "Horario", val: "Mar–Dom\n13:00 – 23:00 hrs" },
              { label: "Teléfono", val: "+52 55 1234 5678" },
              { label: "Dirección", val: "Polanco, CDMX\nMéxico" },
              { label: "Dress Code", val: "Smart Casual" },
            ].map(info => (
              <div className="info-row reveal" key={info.label}>
                <span className="info-label">{info.label}</span>
                <span className="info-val" style={{ whiteSpace: "pre-line" }}>{info.val}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="reservation-right">
          {formSubmitted ? (
            <div className="form-success reveal">
              <div className="form-success-icon">✓</div>
              <h3>Reservación Confirmada</h3>
              <p>
                Gracias, {formData.name}.<br />
                Le esperamos el {formData.date} a las {formData.time}.<br />
                Recibirá una confirmación en {formData.email}.
              </p>
            </div>
          ) : (
            <form className="form-step" onSubmit={handleFormSubmit}>
              <div className="section-label reveal">Datos de Reservación</div>
              <div className="form-row reveal reveal-delay-1">
                <div className="form-group">
                  <label className="form-label">Nombre Completo</label>
                  <input className="form-input" name="name" placeholder="Su nombre" value={formData.name} onChange={handleFormChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Correo Electrónico</label>
                  <input className="form-input" name="email" type="email" placeholder="correo@ejemplo.com" value={formData.email} onChange={handleFormChange} required />
                </div>
              </div>
              <div className="form-row reveal reveal-delay-2">
                <div className="form-group">
                  <label className="form-label">Fecha</label>
                  <input className="form-input" name="date" type="date" value={formData.date} onChange={handleFormChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Hora</label>
                  <select className="form-select" name="time" value={formData.time} onChange={handleFormChange} required>
                    <option value="">Seleccionar</option>
                    {["13:00", "14:00", "15:00", "19:00", "20:00", "21:00", "22:00"].map(t => (
                      <option key={t} value={t}>{t} hrs</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Comensales</label>
                  <select className="form-select" name="guests" value={formData.guests} onChange={handleFormChange}>
                    {["1","2","3","4","5","6","7","8"].map(n => (
                      <option key={n} value={n}>{n} {n === "1" ? "persona" : "personas"}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button type="submit" className="form-submit reveal reveal-delay-3">
                Confirmar Reservación
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">Super Sushi</div>
        <ul className="footer-links">
          <li><a onClick={() => scrollTo("manifesto")}>Filosofía</a></li>
          <li><a onClick={() => scrollTo("menu")}>Menú</a></li>
          <li><a onClick={() => scrollTo("reservacion")}>Reservaciones</a></li>
        </ul>
        <p className="footer-copy">© 2026 Super Sushi · Todos los derechos reservados</p>
      </footer>
    </>
  );
}
