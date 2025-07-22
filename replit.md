# Guardiãs das Águas - Website Platform

## Overview

This is a static educational website for the "Guardiãs das Águas" (Water Guardians) project, focused on environmental education about water resources and sanitation in Brazilian communities and schools. The platform showcases student projects from six Brazilian cities across four regions and provides educational materials, quizzes, and contact information for environmental awareness.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Technology Stack**: Pure HTML5, CSS3, and vanilla JavaScript
- **Framework**: Static website without any modern JS frameworks
- **Styling**: Custom CSS with CSS variables for theming and consistent design
- **Typography**: Google Fonts (Poppins family)
- **Icons**: Bootstrap Icons CDN
- **Responsive Design**: Mobile-first approach with responsive navigation

### Key Components

1. **Navigation System**
   - Responsive navigation bar with hamburger menu for mobile
   - ARIA accessibility attributes throughout
   - Active page highlighting
   - Smooth transitions and animations

2. **Quiz System**
   - Interactive educational quiz about water resources and sanitation
   - Multiple difficulty levels (easy, medium, hard)
   - Timer functionality for each question
   - Score tracking and progress indicators
   - Accessibility features for screen readers

3. **Content Pages**
   - Home page with project introduction
   - About page for mission, vision, and values
   - Projects showcase for student work across Brazilian regions
   - Educational materials repository
   - Contact page with environmental reporting channels
   - News section for updates and events

4. **Design System**
   - Purple-based color scheme (#5b289e primary, #8f73b2 secondary)
   - Consistent spacing using CSS custom properties
   - Modern card-based layouts
   - Smooth animations and transitions

### Data Flow

1. **Static Content Delivery**
   - All content is served as static HTML files
   - CSS and JavaScript assets loaded from local files
   - External dependencies loaded from CDN (fonts, icons)

2. **Quiz Interaction Flow**
   - Questions stored in JavaScript object (`questions.js`)
   - Client-side state management for quiz progress
   - Local scoring and results calculation
   - No server-side data persistence

3. **Navigation Flow**
   - Multi-page application with separate HTML files
   - JavaScript handles mobile menu interactions
   - Page-specific styling and functionality

### External Dependencies

1. **CDN Resources**
   - Google Fonts (Poppins font family)
   - Bootstrap Icons for UI elements
   - No other external libraries or frameworks

2. **Static Assets**
   - Logo and images stored in `/assets/` directory
   - Custom CSS in `/css/` directory
   - JavaScript modules in `/js/` directory

### Deployment Strategy

**Current Architecture**: Static website suitable for:
- Traditional web hosting (Apache/Nginx)
- GitHub Pages
- Netlify or Vercel static hosting
- CDN deployment

**Considerations**:
- No server-side processing required
- All interactions handled client-side
- Optimized for fast loading and accessibility
- SEO-friendly with proper meta tags and semantic HTML

### Technical Decisions

1. **Vanilla JavaScript Choice**
   - **Problem**: Need for interactive quiz and navigation
   - **Solution**: Pure JavaScript implementation
   - **Rationale**: Lightweight, fast loading, no build process required
   - **Pros**: Simple deployment, better performance, no framework dependencies
   - **Cons**: More manual DOM manipulation, less structured state management

2. **Static Site Architecture**
   - **Problem**: Need to showcase educational content and student projects
   - **Solution**: Multi-page static website
   - **Rationale**: Content is relatively stable, focus on accessibility and performance
   - **Pros**: Fast loading, simple hosting, SEO-friendly
   - **Cons**: Content updates require manual file editing

3. **CSS Custom Properties**
   - **Problem**: Consistent theming and maintainable styles
   - **Solution**: Extensive use of CSS variables for colors, spacing, and typography
   - **Rationale**: Better maintainability and theme consistency
   - **Pros**: Easy theme modifications, consistent spacing system
   - **Cons**: Limited browser support for very old browsers

4. **Accessibility-First Design**
   - **Problem**: Need to serve diverse educational audiences
   - **Solution**: ARIA attributes, semantic HTML, keyboard navigation
   - **Rationale**: Educational content should be accessible to all users
   - **Pros**: Better usability, compliance with accessibility standards
   - **Cons**: Additional development complexity