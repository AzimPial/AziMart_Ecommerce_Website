# AziMart E-Commerce Platform

A modern, full-featured e-commerce platform built with Next.js 15, React19, and MongoDB.

## 🚀 Features

- **Authentication**: Secure login/signup with NextAuth.js
- **Product Catalog**: Browse, filter, and search products
- **Shopping Cart**: Add items, update quantities, apply coupons
- **Wishlist**: Save favorite products for later
- **Checkout**: Multi-step checkout with address management
- **User Account**: Profile, orders, addresses, notifications
- **Reviews& Ratings**: Product reviews with star ratings
- **Responsive Design**: Mobile-first with Tailwind CSS
- **Animations**: Smooth transitions with Framer Motion

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19, TypeScript 5
- **Styling**: Tailwind CSS 3
- **Database**: MongoDB Atlas + Mongoose 8
- **Auth**: NextAuth v5 (Auth.js)
- **State**: Zustand 5
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion 11
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd AziMart
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Update `.env.local` with your values:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/azimart
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

4. **Seed the database**
```bash
npx tsx scripts/seed.ts
```

5. **Start the development server**
```bash
npm run dev
```

## 🔐 Test Accounts

After seeding the database:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@azimart.com | admin123 |
| Customer | john@example.com | user123 |

## 📁 Project Structure

```
AziMart/
├── app/                    # Next.js App Router pages
│   ├── (shop)/            # Shop routes (home, shop, cart, etc.)
│   ├── (auth)/            # Auth routes (signin, signup)
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/                # Base UI components
│   ├── layout/            # Layout components
│   ├── home/              # Home page components
│   ├── shop/              # Shop components
│   ├── product/           # Product components
│   ├── cart/              # Cart components
│   ├── wishlist/          # Wishlist components
│   └── user/              # User account components
├── lib/                    # Utilities and config
│   ├── db.ts              # Database connection
│   ├── auth.ts            # Auth.js configuration
│   ├── validations.ts     # Zod schemas
│   └── utils.ts           # Helper functions
├── models/                # Mongoose models
├── stores/                 # Zustand stores
├── hooks/                  # Custom React hooks
└── scripts/                # Scripts (seed, etc.)
```

## 🎨 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx tsx scripts/seed.ts` | Seed database |

## 📱 Pages

- `/` - Home page with featured products
- `/shop` - Product listing with filters
- `/shop/[slug]` - Product detail page
- `/cart` - Shopping cart
- `/wishlist` - Wishlist
- `/checkout` - Multi-step checkout
- `/checkout/success` - Order confirmation
- `/auth/signin` - Sign in
- `/auth/signup` - Create account
- `/account/*` - User account pages

## 🔧 API Routes

- `GET/POST /api/products` - Products CRUD
- `GET /api/products/[slug]` - Single product
- `GET/POST /api/orders` - Orders
- `POST /api/reviews` - Create review
- `POST /api/coupons/validate` - Validate coupon
- `GET/PATCH /api/user/profile` - User profile
- `POST /api/user/change-password` - Change password

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.