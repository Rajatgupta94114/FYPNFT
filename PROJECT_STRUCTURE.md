# PromptOwn - Project Structure & Navigation Guide

## Quick Navigation

### Routes
- **Home** → `/` - Landing page with hero and how it works
- **Generate** → `/generate` - AI art generation interface
- **Marketplace** → `/marketplace` - Browse and filter NFTs
- **Profile** → `/profile` - User profile with NFTs and earnings
- **Not Found** → Any invalid route shows custom 404 page

## Component Hierarchy

```
Root Layout (app/layout.tsx)
├── Dark theme provider
├── Font configuration
└── Global styles

Pages
├── Home Page (/)
│   ├── Navbar
│   ├── LoadingScreen
│   ├── Landing
│   │   ├── Hero Section
│   │   ├── Feature Pills
│   │   └── How it Works Section
│   └── Footer
│
├── Generate (/generate)
│   ├── Navbar
│   ├── GeneratePage
│   │   ├── Prompt Input
│   │   ├── Model Selector
│   │   ├── Aspect Ratio Buttons
│   │   ├── Generate Button
│   │   ├── Image Preview
│   │   ├── Favorite Button
│   │   └── Mint NFT Button
│   └── Footer
│
├── Marketplace (/marketplace)
│   ├── Navbar
│   ├── Marketplace
│   │   ├── Search Bar
│   │   ├── Filter Buttons
│   │   └── NFT Grid (4 columns)
│   │       ├── NFT Card
│   │       ├── Image
│   │       ├── Title & Artist
│   │       ├── Price & Likes
│   │       └── Buy Button
│   └── Footer
│
├── Profile (/profile)
│   ├── Navbar
│   ├── Profile
│   │   ├── Profile Header
│   │   │   ├── Avatar
│   │   │   ├── Username & Stats
│   │   │   └── Action Buttons
│   │   ├── Tabs
│   │   │   ├── My NFTs Tab
│   │   │   │   └── NFT Grid
│   │   │   └── Earnings Tab
│   │   │       ├── Stats Cards
│   │   │       └── Earnings Table
│   │   └── Footer
│
└── Not Found (404)
    ├── Navbar
    ├── 404 Content
    │   ├── Animated 404
    │   ├── Error Message
    │   ├── Quick Links
    │   └── Return Button
    └── Footer
```

## File Structure

### /app
```
app/
├── layout.tsx              # Root layout with metadata & dark mode
├── page.tsx               # Home/landing page
├── globals.css            # Global styles, theme, animations
├── not-found.tsx          # 404 page
├── generate/
│   └── page.tsx          # Generate route
├── marketplace/
│   └── page.tsx          # Marketplace route
└── profile/
    └── page.tsx          # Profile route
```

### /components
```
components/
├── navbar.tsx             # Sticky header with navigation
├── footer.tsx             # Footer with links and socials
├── loading-screen.tsx     # Animated loading screen (3s)
├── landing.tsx            # Hero section and how it works
├── generate-page.tsx      # Generation interface
├── marketplace.tsx        # NFT marketplace grid
├── profile.tsx            # User profile with tabs
├── page-wrapper.tsx       # Page transition wrapper
└── ui/
    ├── neon-button.tsx    # Custom neon button component
    └── [shadcn components]
```

### /hooks
```
hooks/
├── use-mobile.tsx         # Mobile viewport detection
└── [other shadcn hooks]
```

## Key Features by Page

### Home Page (/)
- Animated loading screen (3 seconds)
- Hero section with "Turn Your Prompt Into Ownable AI Art"
- Feature pills (Instant Generation, Unlimited Creativity, Blockchain Secured)
- How it Works (3 steps)
- Call-to-action buttons (Start Generating, Connect Wallet)
- Footer with links

### Generate Page (/generate)
- Prompt textarea (500 char limit)
- AI model selector (DALL-E 3, Midjourney, Stable Diffusion)
- Aspect ratio buttons (1:1, 16:9, 9:16)
- 2-second generation delay with loading animation
- Gradient preview box (simulated AI output)
- Favorite/Heart toggle
- Mint NFT button
- Download and Copy buttons on hover

### Marketplace Page (/marketplace)
- Search by title or artist
- Filter buttons (All, Trending, Newest, Most Liked)
- 8 dummy NFTs:
  - Cosmic Horizon (2.5 ETH, trending)
  - Neon Dreams (1.8 ETH)
  - Digital Aurora (3.2 ETH, trending)
  - Ethereal Void (1.5 ETH)
  - Quantum State (4.1 ETH, trending)
  - Synthetic Soul (2.1 ETH)
  - Pixel Paradise (1.2 ETH)
  - Luminal Flow (2.9 ETH, trending)
- Dynamic sorting and filtering
- NFT cards with buy buttons
- Hover effects with like/buy overlay

### Profile Page (/profile)
- User profile card with avatar, stats, and buttons
- Two tabs: My NFTs and Earnings
- My NFTs tab shows 4 user-created NFTs
- Earnings tab shows:
  - 3 stat cards (Total, This Month, This Week)
  - Transaction history table with 5 entries
- Actions: Share Profile, Edit Profile, View NFT details

### Common Features
- Sticky navbar with logo, nav links, and wallet button
- Mobile hamburger menu
- Smooth page transitions
- Glassmorphic card design
- Neon cyan and purple color accents
- Framer Motion animations
- Fully responsive layouts
- Custom scrollbar styling

## Color Scheme

### Dark Theme
- **Background**: #0a0e1f (Deep navy)
- **Surface**: #1a1f3a (Card backgrounds)
- **Borders**: #2a2f4a (Subtle borders)
- **Neon Cyan**: #00d9ff (Primary accent)
- **Neon Purple**: #b800ff (Secondary accent)
- **Neon Pink**: #ff006e (Destructive/highlight)
- **Text Primary**: #f1f5f9 (White)
- **Text Secondary**: #94a3b8 (Gray)

## Animation Patterns

### Entrance Animations
- Container stagger: 0.1s delay between children
- Fade + Slide: opacity and Y translation
- Duration: 0.5-0.8s

### Interactive Animations
- Hover: Scale 1.05x with subtle glow
- Tap: Scale 0.95x
- Transitions: 0.3s all properties

### Background Elements
- Rotating gradients: 20-35s duration
- Pulsing glows: 2-3s opacity animation
- Float effect: 6-8s vertical movement

### Loading States
- Spinning loader: 2s rotation
- Gradient scanning: 1.5s horizontal sweep

## Responsive Breakpoints

- **Mobile**: 0-640px (sm)
- **Tablet**: 640px-1024px (md)
- **Desktop**: 1024px+ (lg)

Grid adapts:
- Mobile: 1 column (NFT cards, items)
- Tablet: 2 columns
- Desktop: 4 columns

## Tech Stack Summary

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS 4 with custom theme
- **Animations**: Framer Motion 11
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Language**: TypeScript
- **Fonts**: Geist (sans), Geist Mono (mono)

## How to Extend

### Add a New Page
1. Create `/app/[page-name]/page.tsx`
2. Import Navbar and Footer
3. Create component in `/components/[page-name].tsx`
4. Add to navbar links in `/components/navbar.tsx`

### Add NFT Data
- Modify `mockNFTs` array in marketplace.tsx or profile.tsx
- Update `myNFTs` or `earningsHistory` arrays as needed

### Change Colors
- Edit CSS variables in `/app/globals.css`
- Update Tailwind classes in components

### Modify Animations
- Adjust Framer Motion `transition` and `variants` in components
- Update CSS keyframes in globals.css

## Performance Notes

- Smooth scrolling enabled globally
- Custom scrollbar styling
- GPU-accelerated animations
- Optimized re-renders with React hooks
- Session storage for loading screen optimization

---

For detailed documentation, see README.md
