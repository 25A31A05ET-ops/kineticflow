// ============================================================
// KineticFlow — Campus Micro-Energy Prototype
// Digital Proof-of-Concept • EXPOTHON 2026
// ============================================================

import './style.css'
import { initSimulation } from './simulation.js'

// ---------- Icon SVGs ----------
const ICONS = {
  logo: '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
  vehicle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17h14M3 17l2-7h14l2 7M7 17v2M17 17v2"/><circle cx="7.5" cy="14.5" r="1.5" fill="currentColor"/><circle cx="16.5" cy="14.5" r="1.5" fill="currentColor"/></svg>',
  recovery: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v6m0 0l3-3m-3 3L9 5"/><path d="M5 12h14M5 12v6a2 2 0 002 2h10a2 2 0 002-2v-6"/><path d="M9 16h6"/></svg>',
  generator: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.93 4.93l2.12 2.12m9.9 9.9l2.12 2.12M4.93 19.07l2.12-2.12m9.9-9.9l2.12-2.12"/></svg>',
  storage: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="10" rx="2"/><path d="M7 10v4M11 10v4M15 10v4"/><path d="M21 11v4"/></svg>',
  localUse: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2h6l1 6H8z"/><path d="M8 8h8l-1 14H9z"/><path d="M12 12v4"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  arrowDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M6 13l6 6 6-6"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
  reset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 109-9 9 9 0 00-6.36 2.64L3 8"/><path d="M3 3v5h5"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  gate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 11h6"/></svg>',
  parking: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 010 6H9"/></svg>',
  shuttle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 11h18M7 19v2M17 19v2"/><circle cx="7.5" cy="15.5" r="1"/><circle cx="16.5" cy="15.5" r="1"/></svg>',
  cog: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',
  flask: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6M10 3v6L4 20a1 1 0 001 1h14a1 1 0 001-1l-6-11V3"/></svg>',
  zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
}

function icon(name, size = 20) {
  return `<span class="kf-icon" style="display:inline-flex;width:${size}px;height:${size}px">${ICONS[name] || ''}</span>`
}

// ---------- App HTML ----------
const NAV_LINKS = [
  { id: 'overview', label: 'Overview' },
  { id: 'simulation', label: 'Live Simulation' },
  { id: 'zones', label: 'Campus Zones' },
  { id: 'logic', label: 'Energy Logic' },
]

document.querySelector('#app').innerHTML = `
  <!-- Navigation -->
  <nav class="kf-nav" id="kfNav">
    <div class="kf-nav-inner">
      <a href="#hero" class="kf-nav-brand">
        <span class="kf-nav-logo">${ICONS.logo}</span>
        KineticFlow
      </a>
      <ul class="kf-nav-links" id="kfNavLinks">
        ${NAV_LINKS.map(l => `<li><a href="#${l.id}" data-nav="${l.id}">${l.label}</a></li>`).join('')}
        <li><span class="kf-nav-badge">DIGITAL PROTOTYPE v1.0</span></li>
      </ul>
      <button class="kf-nav-toggle" id="kfNavToggle" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

  <!-- Hero -->
  <section class="kf-hero" id="hero">
    <div class="kf-hero-bg"></div>
    <div class="kf-hero-grid"></div>
    <div class="kf-container kf-hero-content">
      <div class="kf-hero-badge">
        <span class="dot"></span>
        Campus Micro-Energy Concept
      </div>
      <h1 class="kf-hero-title">KineticFlow</h1>
      <p class="kf-hero-subtitle">Turning everyday vehicle movement into useful campus micro-energy</p>
      <div class="kf-hero-concept">Digital Prototype &bull; v1.0</div>

      <div class="kf-hero-flow">
        <div class="kf-flow-step">
          <div class="kf-flow-icon">${ICONS.vehicle}</div>
          <div class="kf-flow-label">Vehicle<br>Movement</div>
        </div>
        <span class="kf-flow-arrow">${ICONS.arrow}</span>
        <div class="kf-flow-step">
          <div class="kf-flow-icon">${ICONS.recovery}</div>
          <div class="kf-flow-label">Energy<br>Recovery</div>
        </div>
        <span class="kf-flow-arrow">${ICONS.arrow}</span>
        <div class="kf-flow-step">
          <div class="kf-flow-icon">${ICONS.storage}</div>
          <div class="kf-flow-label">Storage</div>
        </div>
        <span class="kf-flow-arrow">${ICONS.arrow}</span>
        <div class="kf-flow-step">
          <div class="kf-flow-icon">${ICONS.localUse}</div>
          <div class="kf-flow-label">Local<br>Use</div>
        </div>
      </div>

      <div class="kf-hero-actions">
        <a href="#simulation" class="kf-btn kf-btn-primary">
          ${icon('play', 18)} Try Live Simulation
        </a>
        <a href="#logic" class="kf-btn kf-btn-secondary">
          ${icon('zap', 18)} How It Works
        </a>
      </div>
    </div>
  </section>

  <!-- Overview -->
  <section class="kf-section" id="overview">
    <div class="kf-container">
      <div class="kf-section-label kf-reveal">${icon('info', 16)} Overview</div>
      <h2 class="kf-section-title kf-reveal">The Problem &amp; The Concept</h2>
      <p class="kf-section-subtitle kf-reveal">
        Campuses have constant vehicle traffic — cars at gates, parking areas, and shuttle stops.
        Most of that kinetic energy is lost as heat and noise. KineticFlow explores recovering a small
        fraction of it for low-power campus applications.
      </p>

      <div class="kf-overview-grid">
        <div class="kf-overview-text kf-reveal">
          <h3>Everyday motion, micro-energy</h3>
          <p>
            Vehicles slow down, stop, and move through campus checkpoints hundreds of times per day.
            KineticFlow proposes a controlled mechanism that converts a small portion of that motion
            into electrical energy — not to power vehicles, but to run low-power campus devices.
          </p>
          <ul class="kf-problem-list">
            <li>${icon('check', 18)} Gate indicators &amp; entry displays</li>
            <li>${icon('check', 18)} Parking sensors &amp; occupancy displays</li>
            <li>${icon('check', 18)} Environmental sensors (temperature, air quality)</li>
            <li>${icon('check', 18)} Shuttle-stop displays &amp; low-power lighting</li>
          </ul>
        </div>
        <div class="kf-overview-visual kf-reveal">
          <div class="kf-stat-grid">
            <div class="kf-stat">
              <span class="kf-stat-value">0.12 Wh</span>
              <span class="kf-stat-label">Illustrative energy<br>per vehicle pass</span>
            </div>
            <div class="kf-stat">
              <span class="kf-stat-value">5+</span>
              <span class="kf-stat-label">Potential campus<br>applications</span>
            </div>
            <div class="kf-stat">
              <span class="kf-stat-value">Low</span>
              <span class="kf-stat-label">Target power<br>requirement</span>
            </div>
            <div class="kf-stat">
              <span class="kf-stat-value">Digital</span>
              <span class="kf-stat-label">Proof-of-concept<br>stage</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Live Simulation -->
  <section class="kf-section" id="simulation">
    <div class="kf-container">
      <div class="kf-section-label kf-reveal">${icon('zap', 16)} Live Simulation</div>
      <h2 class="kf-section-title kf-reveal">Interactive Vehicle Energy Recovery</h2>
      <p class="kf-section-subtitle kf-reveal">
        Watch a vehicle pass through the KineticFlow recovery zone. Energy particles flow from the
        mechanism to storage, then onward to a local campus device. All values are illustrative.
      </p>

      <div class="kf-sim-wrapper kf-reveal">
        <div class="kf-sim-canvas" id="kfSimCanvas">
          <div class="kf-sim-use">
            <div class="kf-sim-use-icon" id="kfSimUseIcon">${ICONS.localUse}</div>
            <div class="kf-sim-use-label">Local Use</div>
          </div>
          <div class="kf-sim-storage">
            <div class="kf-sim-storage-icon" id="kfSimStorageIcon">${ICONS.storage}</div>
            <div class="kf-sim-storage-label">Storage</div>
          </div>
          <div class="kf-zone-label">Recovery Zone</div>
          <div class="kf-recovery-zone" id="kfRecoveryZone"></div>
          <div class="kf-road"></div>
          <div class="kf-vehicle" id="kfVehicle">
            <div class="kf-vehicle-body">${ICONS.vehicle}</div>
          </div>
        </div>

        <div class="kf-sim-controls">
          <button class="kf-btn kf-btn-primary" id="kfSimOne">
            ${icon('play', 18)} Simulate Vehicle
          </button>
          <button class="kf-btn kf-btn-secondary" id="kfSimTen">
            ${icon('vehicle', 18)} Simulate 10 Vehicles
          </button>
          <button class="kf-btn kf-btn-ghost" id="kfSimReset">
            ${icon('reset', 18)} Reset
          </button>
        </div>

        <div class="kf-sim-stats">
          <div class="kf-sim-stat">
            <span class="kf-sim-stat-label">Vehicles Passed</span>
            <span class="kf-sim-stat-value count" id="kfStatCount">0</span>
          </div>
          <div class="kf-sim-stat">
            <span class="kf-sim-stat-label">Energy Recovered</span>
            <span class="kf-sim-stat-value energy" id="kfStatEnergy">0.00 Wh</span>
          </div>
          <div class="kf-sim-stat">
            <span class="kf-sim-stat-label">Status</span>
            <span class="kf-sim-stat-value" id="kfStatStatus" style="font-size:1rem;color:var(--kf-text-3)">Idle</span>
          </div>
        </div>

        <div class="kf-sim-disclaimer">
          ${icon('alert', 16)}
          <span>Illustrative / Simulated values. Energy per pass is an assumed 0.12 Wh for demonstration purposes — not a measured result.</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Campus Zones -->
  <section class="kf-section" id="zones">
    <div class="kf-container">
      <div class="kf-section-label kf-reveal">${icon('gate', 16)} Campus Zones</div>
      <h2 class="kf-section-title kf-reveal">Where KineticFlow Could Operate</h2>
      <p class="kf-section-subtitle kf-reveal">
        Three campus locations where controlled vehicle movement could support a local low-power device.
        Each zone shows the full flow: vehicle movement &rarr; energy recovery &rarr; local application.
      </p>

      <div class="kf-zones-grid">
        <div class="kf-zone-card kf-reveal">
          <div class="kf-zone-header">
            <div class="kf-zone-icon">${ICONS.gate}</div>
            <div>
              <div class="kf-zone-title">Main Gate</div>
              <div class="kf-zone-subtitle">Vehicle entry &amp; exit checkpoint</div>
            </div>
          </div>
          <div class="kf-zone-flow">
            <div class="kf-zone-flow-step"><span class="kf-flow-dot"></span> Vehicles slow at gate barrier</div>
            <div class="kf-zone-flow-step"><span class="kf-flow-dot"></span> Recovery mechanism captures energy</div>
            <div class="kf-zone-flow-step"><span class="kf-flow-dot"></span> Stored energy powers local device</div>
          </div>
          <div class="kf-zone-app">
            <strong>Application:</strong> Gate indicators &amp; entry displays
          </div>
        </div>

        <div class="kf-zone-card kf-reveal">
          <div class="kf-zone-header">
            <div class="kf-zone-icon">${ICONS.parking}</div>
            <div>
              <div class="kf-zone-title">Parking</div>
              <div class="kf-zone-subtitle">Parking area entry &amp; speed bumps</div>
            </div>
          </div>
          <div class="kf-zone-flow">
            <div class="kf-zone-flow-step"><span class="kf-flow-dot"></span> Vehicles enter &amp; traverse speed bumps</div>
            <div class="kf-zone-flow-step"><span class="kf-flow-dot"></span> Recovery mechanism captures energy</div>
            <div class="kf-zone-flow-step"><span class="kf-flow-dot"></span> Stored energy powers local device</div>
          </div>
          <div class="kf-zone-app">
            <strong>Application:</strong> Parking sensors &amp; occupancy indicators
          </div>
        </div>

        <div class="kf-zone-card kf-reveal">
          <div class="kf-zone-header">
            <div class="kf-zone-icon">${ICONS.shuttle}</div>
            <div>
              <div class="kf-zone-title">Shuttle Stop</div>
              <div class="kf-zone-subtitle">Campus shuttle arrival &amp; departure</div>
            </div>
          </div>
          <div class="kf-zone-flow">
            <div class="kf-zone-flow-step"><span class="kf-flow-dot"></span> Shuttles slow to stop &amp; depart</div>
            <div class="kf-zone-flow-step"><span class="kf-flow-dot"></span> Recovery mechanism captures energy</div>
            <div class="kf-zone-flow-step"><span class="kf-flow-dot"></span> Stored energy powers local device</div>
          </div>
          <div class="kf-zone-app">
            <strong>Application:</strong> Shuttle-stop display &amp; environmental sensors
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Energy Logic -->
  <section class="kf-section" id="logic">
    <div class="kf-container">
      <div class="kf-section-label kf-reveal">${icon('cog', 16)} Energy Logic</div>
      <h2 class="kf-section-title kf-reveal">How the System Works</h2>
      <p class="kf-section-subtitle kf-reveal">
        The energy flow from vehicle movement to a local low-power device, step by step.
      </p>

      <div class="kf-logic-wrapper kf-reveal">
        <div class="kf-logic-flow">
          <div class="kf-logic-step">
            <div class="kf-logic-num">1</div>
            <div class="kf-logic-text">
              <h4>Vehicle Movement</h4>
              <p>A vehicle slows or passes through a controlled campus zone</p>
            </div>
          </div>
          <div class="kf-logic-arrow">${ICONS.arrowDown}</div>
          <div class="kf-logic-step">
            <div class="kf-logic-num">2</div>
            <div class="kf-logic-text">
              <h4>Proposed Mechanical Recovery</h4>
              <p>A mechanism converts part of the motion into rotational energy</p>
            </div>
          </div>
          <div class="kf-logic-arrow">${ICONS.arrowDown}</div>
          <div class="kf-logic-step">
            <div class="kf-logic-num">3</div>
            <div class="kf-logic-text">
              <h4>Generator</h4>
              <p>A small generator converts rotation into electrical energy</p>
            </div>
          </div>
          <div class="kf-logic-arrow">${ICONS.arrowDown}</div>
          <div class="kf-logic-step">
            <div class="kf-logic-num">4</div>
            <div class="kf-logic-text">
              <h4>Storage</h4>
              <p>Energy is stored in a buffer (battery or capacitor)</p>
            </div>
          </div>
          <div class="kf-logic-arrow">${ICONS.arrowDown}</div>
          <div class="kf-logic-step">
            <div class="kf-logic-num">5</div>
            <div class="kf-logic-text">
              <h4>Local Low-Power Device</h4>
              <p>Stored energy powers a nearby campus sensor or display</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Prototype Status -->
  <section class="kf-section" id="status">
    <div class="kf-container">
      <div class="kf-section-label kf-reveal">${icon('flask', 16)} Prototype Status</div>
      <h2 class="kf-section-title kf-reveal">Engineering Credibility</h2>
      <p class="kf-section-subtitle kf-reveal">
        This is a digital proof-of-concept. The following points clarify what is and is not claimed.
      </p>

      <div class="kf-status-grid">
        <div class="kf-status-card kf-reveal">
          <div class="kf-status-icon">${ICONS.info}</div>
          <div>
            <h4>Digital Proof-of-Concept</h4>
            <p>This prototype demonstrates the concept and flow digitally. No physical mechanism has been built or deployed.</p>
          </div>
        </div>
        <div class="kf-status-card kf-reveal">
          <div class="kf-status-icon">${ICONS.info}</div>
          <div>
            <h4>Illustrative Energy Values</h4>
            <p>All energy values shown are simulated for demonstration. Real output depends on vehicle mass, displacement, mechanism efficiency, traffic volume, and control strategy.</p>
          </div>
        </div>
        <div class="kf-status-card warn kf-reveal">
          <div class="kf-status-icon">${ICONS.alert}</div>
          <div>
            <h4>No Efficiency Claims</h4>
            <p>No specific efficiency, electricity generation, or cost savings figures are claimed. Real-world performance is not asserted.</p>
          </div>
        </div>
        <div class="kf-status-card warn kf-reveal">
          <div class="kf-status-icon">${ICONS.flask}</div>
          <div>
            <h4>Physical Validation Required</h4>
            <p>Physical deployment would require mechanical, electrical, and safety validation before any real installation.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Safety -->
  <section class="kf-section" id="safety">
    <div class="kf-container">
      <div class="kf-section-label kf-reveal">${icon('shield', 16)} Safety</div>
      <h2 class="kf-section-title kf-reveal">Safety Consideration</h2>
      <p class="kf-section-subtitle kf-reveal">
        Any physical mechanism must not compromise vehicle or pedestrian safety.
      </p>

      <div class="kf-safety kf-reveal">
        <div class="kf-safety-icon">${ICONS.shield}</div>
        <div>
          <h4>Safety Note</h4>
          <p>
            The mechanism should only be installed where it does not create unsafe resistance or
            encourage unnecessary braking. Physical implementation requires engineering and safety
            validation before deployment.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="kf-footer">
    <div class="kf-container">
      <p>KineticFlow &mdash; Campus Micro-Energy Prototype</p>
      <p>Turning everyday vehicle movement into useful campus micro-energy</p>
      <span class="kf-footer-badge">Digital Prototype &bull; v1.0 &bull; EXPOTHON 2026</span>
    </div>
  </footer>
`

// ---------- Navigation ----------
const navToggle = document.getElementById('kfNavToggle')
const navLinks = document.getElementById('kfNavLinks')
const nav = document.getElementById('kfNav')

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open')
  navLinks.classList.toggle('open')
})

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open')
    navLinks.classList.remove('open')
  })
})

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.classList.add('scrolled')
  } else {
    nav.classList.remove('scrolled')
  }
}, { passive: true })

// Active nav link on scroll
const sections = NAV_LINKS.map(l => document.getElementById(l.id))
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 100
  let activeId = null
  for (const sec of sections) {
    if (sec && sec.offsetTop <= scrollPos) {
      activeId = sec.id
    }
  }
  document.querySelectorAll('.kf-nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.nav === activeId)
  })
}, { passive: true })

// ---------- Scroll Reveal ----------
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        revealObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
)

document.querySelectorAll('.kf-reveal').forEach((el) => {
  revealObserver.observe(el)
})

// ---------- Init Simulation ----------
initSimulation()
