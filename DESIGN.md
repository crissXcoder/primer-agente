---
name: Industrial Electromechanical B2B UI
colors:
  surface: '#f5fafd'
  surface-dim: '#d5dbde'
  surface-bright: '#f5fafd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4f7'
  surface-container: '#e9eff1'
  surface-container-high: '#e3e9ec'
  surface-container-highest: '#dee3e6'
  on-surface: '#171c1f'
  on-surface-variant: '#3d494d'
  inverse-surface: '#2b3134'
  inverse-on-surface: '#ecf2f4'
  outline: '#6d797e'
  outline-variant: '#bcc9ce'
  surface-tint: '#00677d'
  primary: '#00677d'
  on-primary: '#ffffff'
  primary-container: '#00b4d8'
  on-primary-container: '#00414f'
  inverse-primary: '#4cd6fb'
  secondary: '#006399'
  on-secondary: '#ffffff'
  secondary-container: '#67bafd'
  on-secondary-container: '#004972'
  tertiary: '#006875'
  on-tertiary: '#ffffff'
  tertiary-container: '#60b1bf'
  on-tertiary-container: '#00424a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b3ebff'
  primary-fixed-dim: '#4cd6fb'
  on-primary-fixed: '#001f27'
  on-primary-fixed-variant: '#004e5f'
  secondary-fixed: '#cde5ff'
  secondary-fixed-dim: '#94ccff'
  on-secondary-fixed: '#001d32'
  on-secondary-fixed-variant: '#004b74'
  tertiary-fixed: '#9feffe'
  tertiary-fixed-dim: '#83d3e1'
  on-tertiary-fixed: '#001f24'
  on-tertiary-fixed-variant: '#004f59'
  background: '#f5fafd'
  on-background: '#171c1f'
  surface-variant: '#dee3e6'
typography:
  headline-lg:
    fontFamily: IBM Plex Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: IBM Plex Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: IBM Plex Sans
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  grid-columns: '12'
  gutter: 16px
  margin: 24px
  space-xs: 4px
  space-sm: 8px
  space-md: 16px
  space-lg: 24px
  space-xl: 32px
  space-2xl: 48px
---

## Brand & Style

The design system embodies precision, technical reliability, and authority tailored for B2B industrial electromechanical operations. It communicates uncompromising safety, efficiency, and engineering excellence to plant managers, electrical engineers, and industrial operators. 

The aesthetic style is a refined hybrid of **Corporate / Modern** and structured **Minimalism**. It prioritizes high legibility, dense data density, structured information architecture, and an aura of high-performance machinery. Surfaces are clean, light, and utilitarian, utilizing strict alignment and high-contrast indicators for critical operational statuses.

## Colors

The color palette is derived directly from industrial electrical themes, anchoring heavily on deep marine blues and vibrant conductive cyan accents. A light mode default ensures optimal clarity and reduced glare in well-lit control-room environments, emphasizing high-contrast operational indicators.

- **Primary (`#00B4D8`):** High-visibility cyan used for primary actions, active states, and critical electrical pathways.
- **Secondary (`#0077B6`):** Deep industrial blue for structural UI containers, secondary buttons, and headers.
- **Tertiary (`#90E0EF`):** Ice blue accent for data highlights, hovering states, and subtle focal points.
- **Neutral Dark (`#03045E`):** Deep navy base, offering exceptional contrast for data tables and telemetry.
- **Neutral Light (`#CAF0F8`):** Pale sky tone for primary typography, icons, and high-contrast structural borders.

## Typography

Typography establishes an authoritative, systematic hierarchy suited for complex industrial dashboards. **IBM Plex Sans** provides robust, engineered headings; **Inter** ensures crystal-clear readability for high-density operational data and body text; and **JetBrains Mono** delivers precise numeric telemetry for meters, metrics, and code snippets.

All font sizes above 32px must adopt fluid scaling on viewports under 768px to prevent truncation of critical telemetry headers.

## Layout & Spacing

The design system utilizes a **Fixed grid** model tailored for expansive control dashboards and responsive B2B web applications. 

- **Grid System:** 12-column fluid grid encapsulated within responsive max-width containers.
- **Gutters & Margins:** Standardized 16px gutters between modular components and 24px outer page margins to maintain structural breathing room.
- **Breakpoints:** Mobile (<768px, single column reflow), Tablet (768px - 1200px, 6-column adaptation), and Desktop (>1200px, full 12-column layout).

## Elevation & Depth

Visual hierarchy is achieved through **low-contrast outlines** combined with **tonal layering** (light base surfaces elevated with structured containers). 

Avoid heavy drop shadows. Instead, rely on crisp 1px borders using `#90E0EF` at low opacity to demarcate panels, control cards, and modal windows. Active or warning states use precise, high-contrast border glows utilizing the primary cyan `#00B4D8`.

## Shapes

The design system adopts a **Soft** shape language (`roundedness`: 1). 

Corners feature a subtle 0.25rem radius for standard UI components (inputs, buttons, table rows) and up to 0.5rem (`rounded-lg`) for container cards and modals. This restrained corner radius avoids overly playful aesthetics, maintaining the disciplined, rugged precision expected in industrial engineering environments.

## Components

- **Buttons:** High-contrast solid fills using primary cyan (`#00B4D8`) with dark text for primary actions; ghost or outlined variants with `#90E0EF` borders for secondary actions. Incorporate distinct active and disabled states.
- **Chips / Badges:** Pill-shaped or softly rounded tags utilizing monospace text (`JetBrains Mono`) to display system status (e.g., *Operational*, *Standby*, *Fault*).
- **Lists & Data Tables:** High-density rows with alternating tonal backgrounds to maximize readability of complex electrical telemetry and inventory metrics.
- **Checkboxes & Radio Buttons:** Crisp, square-cornered selection controls with distinct primary-colored check states.
- **Input Fields:** Outlined containers featuring `#0077B6` borders, shifting to `#00b4d8` on focus, with persistent floating labels in monospace typography.
- **Cards:** Structural data containers featuring subtle background shading, thin structural outlines, and top-aligned metric headers.