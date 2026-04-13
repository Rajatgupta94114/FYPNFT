# PromptOwn - Quick Start Guide

## Start the Development Server

```bash
npm run dev
# or
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## What You'll See

### First Visit
- **Loading Screen** (3 seconds) - Animated PromptOwn logo with "Generating AI Art..." text
- Smooth fade-out transition
- Loading screen won't show again during your session

### Home Page
- Hero section with "Turn Your Prompt Into Ownable AI Art"
- 3 feature pills
- "How it Works" section (scroll to see)
- 2 prominent CTA buttons

### Navigation
Use the sticky navbar to navigate:
- **Logo** - Back to home
- **Generate** - Create AI art
- **Marketplace** - Browse NFTs
- **How it Works** - Scroll to section
- **Profile** - View user profile
- **Connect Wallet** - Simulated wallet connection

## Page Features

### 1. Generate Page (`/generate`)
- Write a prompt in the textarea
- Choose an AI model:
  - DALL-E 3: Highly detailed
  - Midjourney: Artistic
  - Stable Diffusion: Fast
- Select aspect ratio (1:1, 16:9, 9:16)
- Click "Generate Art" (2-second simulation)
- Preview appears with gradient background
- Heart icon to favorite
- "Mint as NFT" to mint
- Hover to see Download/Copy options

**Try this**: Type "A cosmic landscape with neon waterfalls" and generate!

### 2. Marketplace Page (`/marketplace`)
- **8 NFTs** with realistic data
- Search by title or artist
- Filter by: All, Trending, Newest, Most Liked
- Trending badges on popular NFTs
- Hover to see Like/Buy options
- Each NFT shows:
  - Title and artist name
  - Price in ETH
  - Like count
  - Buy button

**Try this**: Search for "cosmic" or filter by "Trending"

### 3. Profile Page (`/profile`)
- Profile header with avatar and stats
- **My NFTs Tab**: 4 NFTs you've created
- **Earnings Tab**: 
  - 3 stats cards (Total, This Month, This Week)
  - Transaction history table with 5 sales

**Try this**: Switch between tabs to see different data

## Design Features

### Dark Theme
- Deep navy background (#0a0e1f)
- Neon cyan accents (#00d9ff)
- Neon purple accents (#b800ff)
- Glassmorphic cards with backdrop blur

### Animations
- Smooth page transitions
- Hover effects on buttons and cards
- Rotating gradient backgrounds
- Pulsing neon glows
- Floating animations
- Scale transformations on interaction

### Mobile Responsive
- Hamburger menu on mobile
- Stacked layouts on small screens
- Touch-friendly buttons
- Optimized spacing and text sizes

## Customize the App

### Change Colors
Edit `/app/globals.css`:
```css
--neon-cyan: #00d9ff;      /* Change to any hex color */
--neon-purple: #b800ff;    /* Change to any hex color */
--neon-pink: #ff006e;
```

### Add More NFTs
In `/components/marketplace.tsx`, add to the `mockNFTs` array:
```javascript
{
  id: 9,
  title: 'Your NFT Title',
  artist: 'Your Name',
  price: 2.5,
  likes: 300,
  image: 'linear-gradient(135deg, #00d9ff, #b800ff)',
  trending: true,
}
```

### Update User Profile
In `/components/profile.tsx`, modify `userProfile`:
```javascript
const userProfile = {
  username: 'YourUsername',
  address: '0xYourAddress',
  bio: 'Your bio here',
  followers: 1000,
  following: 500,
  totalEarnings: 25.0,
}
```

### Change Animation Speed
In any component, adjust Framer Motion duration:
```typescript
transition={{ duration: 0.8 }}  // Change 0.8 to your value
```

## File Editing Tips

### Add a New Navigation Link
Edit `/components/navbar.tsx`:
```typescript
const navLinks = [
  { label: 'New Page', href: '/new-page' },
  // ...rest of links
]
```

### Create a New Page
1. Create `/app/new-page/page.tsx`
2. Copy structure from existing pages
3. Add to navbar links

### Modify Component Styling
All components use:
- Tailwind classes (e.g., `px-4 py-2`)
- Custom CSS classes (e.g., `glass`, `neon-glow`)
- Inline styles for gradients

## Keyboard Shortcuts

- **Tab** - Navigate through links and buttons
- **Enter** - Click focused button
- **Escape** - Close mobile menu
- **Scroll** - Smooth scrolling enabled

## Browser DevTools Tips

### View Responsive Design
1. Press F12 or right-click → Inspect
2. Click device toolbar icon (top-left)
3. Choose device size to preview

### Slow Motion Animations
1. Go to Animations tab
2. Set playback rate to 0.25x
3. Watch animations in slow motion

### Console Notes
- No errors should appear
- Check for "promptown_visited" in localStorage

## Testing Interactions

### Try These:
1. Hover over buttons (they glow and scale)
2. Click buttons (they tap/scale)
3. Resize browser (layouts adapt)
4. Search for "quantum" in marketplace
5. Like NFTs by hovering and clicking heart
6. Switch profile tabs
7. Generate AI art (2-second delay)
8. Navigate using navbar

## Performance

- First paint: < 1s
- Interactive: < 2s
- All animations GPU-accelerated
- Smooth 60fps animations
- Loading screen skips on revisits

## Build for Production

```bash
npm run build
npm start
```

## Troubleshooting

### Components not appearing?
- Clear cache: Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
- Restart dev server

### Animations not smooth?
- Ensure GPU acceleration: DevTools → Performance tab
- Check browser is up to date

### Mobile menu not working?
- Check window width in DevTools (< 768px)
- Mobile mode requires actual resize or device testing

## Next Steps

1. **Customize**: Change colors, add your NFTs, update profile
2. **Extend**: Add more pages, features, or animations
3. **Deploy**: Use `npm run build` then deploy to Vercel
4. **Connect**: Integrate real APIs and blockchain (Web3)

## Project Structure at a Glance

```
/app
  ├── page.tsx (Home)
  ├── layout.tsx (Root)
  ├── globals.css (Styles & theme)
  ├── generate/page.tsx
  ├── marketplace/page.tsx
  ├── profile/page.tsx
  └── not-found.tsx (404)

/components
  ├── navbar.tsx
  ├── footer.tsx
  ├── loading-screen.tsx
  ├── landing.tsx
  ├── generate-page.tsx
  ├── marketplace.tsx
  ├── profile.tsx
  └── ui/ (shadcn components)

/hooks
  └── use-mobile.tsx
```

## Useful Links

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [shadcn/ui](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)

---

Happy coding! 🚀

For more details, see README.md or PROJECT_STRUCTURE.md
