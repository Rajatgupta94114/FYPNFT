# PromptOwn - AI Prompt to Ownable NFT Platform

A stunning, modern single-page application for generating AI art from text prompts and minting them as NFTs. Built with Next.js, React, Tailwind CSS, Framer Motion, and shadcn/ui components.

## Features

✨ **Beautiful Loading Screen** - Animated logo with neon glows and "Generating AI Art..." text

🎨 **Landing Page** - Hero section with tagline "Turn Your Prompt Into Ownable AI Art", smooth animations, and prominent CTAs

🚀 **Generate Page** - Large textarea for prompts, AI model selector (DALL-E 3, Midjourney, Stable Diffusion), aspect ratio buttons, live image preview, and Mint NFT button

🛍️ **Marketplace** - NFT grid with search, trending filters, likes counter, and dynamic sorting

👤 **Profile Page** - User stats, My NFTs tab with collection display, Earnings tab with transaction history

🌟 **Design System**
- Dark theme with neon cyan (#00d9ff) and purple (#b800ff) accents
- Glassmorphism effects with backdrop blur
- Smooth Framer Motion animations throughout
- Fully responsive mobile-first design
- Custom CSS animations and neon glows

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **UI Library**: shadcn/ui components
- **Styling**: Tailwind CSS v4 with custom theme
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### Installation

```bash
# Install dependencies
npm install
# or
pnpm install
# or
yarn install
```

### Development

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── page.tsx              # Home/Landing page
├── generate/
│   └── page.tsx         # Generate page route
├── marketplace/
│   └── page.tsx         # Marketplace page route
├── profile/
│   └── page.tsx         # Profile page route
├── not-found.tsx        # 404 page
├── layout.tsx           # Root layout with dark mode
└── globals.css          # Global styles, theme tokens, animations

components/
├── navbar.tsx           # Sticky navigation with wallet button
├── loading-screen.tsx   # Animated loading screen
├── landing.tsx          # Hero section and How it Works
├── generate-page.tsx    # AI art generation interface
├── marketplace.tsx      # NFT marketplace with grid
├── profile.tsx          # User profile with tabs
├── footer.tsx           # Footer with links
├── page-wrapper.tsx     # Page transition wrapper
└── ui/
    └── neon-button.tsx  # Custom neon button component
```

## Design Highlights

### Color Palette
- **Background**: Deep navy (#0a0e1f)
- **Neon Cyan**: #00d9ff
- **Neon Purple**: #b800ff
- **Neon Pink**: #ff006e

### Components
- Glassmorphic cards with backdrop blur
- Neon glows and shadow effects
- Smooth hover and tap animations
- Gradient text for branding
- Responsive grid layouts

### Animations
- Floating elements with Framer Motion
- Rotating gradients and pulsing effects
- Page transitions and staggered children
- Interactive button states
- Smooth scrolling

## Features Included

### Landing Page
- Animated hero section
- Feature pills with icons
- "How it Works" section with 3-step process
- Smooth scroll animations
- Call-to-action buttons

### Generate Page
- Large textarea for creative prompts
- Model selector with descriptions
- Aspect ratio options (1:1, 16:9, 9:16)
- Live gradient preview (simulated)
- Favorite/Heart toggle
- Mint NFT button

### Marketplace
- 8 dummy NFTs with realistic data
- Search functionality
- Filter by trending, newest, most liked
- NFT cards with artist info and pricing
- Like counter and buy buttons
- Responsive grid (1-4 columns)

### Profile
- User avatar and stats
- Followers/following count
- Earnings display
- Tabs for NFTs and Earnings
- NFT collection view
- Earnings history table with transaction details

### Responsive Design
- Mobile-first approach
- Hamburger menu for mobile nav
- Touch-friendly button sizes
- Optimized grid layouts for all screen sizes
- Smooth transitions between breakpoints

## Dummy Data

All data is hardcoded for demonstration:
- 8 marketplace NFTs with varying prices and likes
- 4 user-created NFTs in profile
- 5 earnings transactions
- User profile with mock stats

## Customization

### Modify Theme Colors
Edit `/app/globals.css` CSS variables:
```css
--neon-cyan: #00d9ff;
--neon-purple: #b800ff;
--neon-pink: #ff006e;
```

### Update NFT Data
Modify the `mockNFTs` arrays in:
- `/components/marketplace.tsx`
- `/components/profile.tsx`

### Change Animation Timing
Adjust Framer Motion `transition` props in any component

### Add Real Connections
- Replace dummy data with API calls
- Integrate Web3 wallet connection
- Connect to real NFT minting contracts
- Add authentication

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized images and assets
- CSS animations using GPU acceleration
- Smooth scrolling with scroll-behavior
- Responsive images with proper sizing
- Efficient re-renders with React optimization

## Future Enhancements

- Real AI model integration (DALL-E, Midjourney API)
- Blockchain/Web3 integration for actual NFT minting
- User authentication and profiles
- Real marketplace backend
- Payment processing
- Social features (following, comments)
- Advanced filtering and search
- User-generated content storage

## License

MIT License - feel free to use this project for personal or commercial use.

## Support

For issues, questions, or suggestions, please reach out or open an issue.

---

Built with ❤️ using Next.js, React, and Framer Motion
