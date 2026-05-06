# Remote Center Kenya — E-commerce Platform

Premium electronics e-commerce app for Remote Center Kenya
(Mithoo Business Center, Moi Avenue opposite Bazaar, 1st Floor Shop F84,
Nairobi · WhatsApp 0757541507 · IG @remote_center.ke).

Monorepo with two apps:

    backend/   Node.js + Express + MongoDB + Socket.io  (REST API + realtime)
    frontend/  React + Vite + Tailwind + Framer Motion  (storefront + admin)

================================================================
QUICK START (local dev)
================================================================

Prereqs: Node 18+, npm, a MongoDB instance (local or Atlas).

1) Backend

    cd backend
    cp .env.example .env          # then fill in MONGO_URI + JWT secrets at minimum
    npm install
    npm run seed                  # creates 40 products, categories, brands, admin + customer
    npm run dev                   # starts http://localhost:5000  (API at /api/v1, Socket.io at /)

   Seeded credentials:
     admin    admin@remotecenter.ke / Admin@123
     customer jane@example.com     / Pass@123

2) Frontend (new terminal)

    cd frontend
    cp .env.example .env          # VITE_API_URL=http://localhost:5000/api/v1 already set
    npm install
    npm run dev                   # http://localhost:5173

================================================================
ENVIRONMENT VARIABLES
================================================================

backend/.env  (see backend/.env.example)

    PORT=5000
    MONGO_URI=mongodb://127.0.0.1:27017/remote_center_ke
    CLIENT_URL=http://localhost:5173

    JWT_ACCESS_SECRET=change-me
    JWT_REFRESH_SECRET=change-me-too
    JWT_ACCESS_EXPIRES=15m
    JWT_REFRESH_EXPIRES=30d

    # Cloudinary (image uploads — leave blank to disable)
    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=

    # Stripe (card payments — leave blank to disable)
    STRIPE_SECRET_KEY=
    STRIPE_WEBHOOK_SECRET=

    # M-Pesa Daraja (sandbox first)
    MPESA_ENV=sandbox
    MPESA_CONSUMER_KEY=
    MPESA_CONSUMER_SECRET=
    MPESA_SHORTCODE=174379
    MPESA_PASSKEY=
    MPESA_CALLBACK_URL=https://YOUR-PUBLIC-URL/api/v1/payments/mpesa/callback

    # Email (Nodemailer SMTP — leave blank to log emails to console)
    SMTP_HOST=
    SMTP_PORT=587
    SMTP_USER=
    SMTP_PASS=
    EMAIL_FROM="Remote Center Kenya <noreply@remotecenter.ke>"

frontend/.env

    VITE_API_URL=http://localhost:5000/api/v1
    VITE_SOCKET_URL=http://localhost:5000
    VITE_STRIPE_PUBLISHABLE_KEY=

================================================================
THIRD-PARTY SETUP
================================================================

MongoDB
- Local: install Mongo Community, set MONGO_URI=mongodb://127.0.0.1:27017/remote_center_ke
- Atlas: create free cluster, network-allow your IP, copy SRV connection string
  into MONGO_URI.

Cloudinary
- Sign up at cloudinary.com, copy Cloud name / API key / API secret from the
  dashboard. Used by /api/v1/upload/image (admin product images).

Stripe
- stripe.com → Developers → API keys. Use test keys.
- For local webhooks: `stripe listen --forward-to localhost:5000/api/v1/payments/stripe/webhook`
  and copy the whsec_... into STRIPE_WEBHOOK_SECRET.
- Put publishable key in frontend .env.

M-Pesa Daraja (Safaricom)
- developer.safaricom.co.ke → create an app → enable "Lipa na M-Pesa Online".
- Sandbox shortcode 174379, passkey from the test credentials page.
- The callback URL must be HTTPS-reachable from Safaricom. For local testing
  expose your backend with ngrok:
      ngrok http 5000
  then set MPESA_CALLBACK_URL to https://<id>.ngrok.io/api/v1/payments/mpesa/callback
- Phone numbers are auto-normalised to 2547XXXXXXXX in services/mpesa.js.

================================================================
KEY API ENDPOINTS  (base /api/v1)
================================================================

Auth      POST /auth/register · /auth/login · /auth/refresh · /auth/logout
          POST /auth/forgot-password · /auth/reset-password · /auth/verify-email
          GET  /auth/me

Catalog   GET  /products  (q, category, brand, minPrice, maxPrice, sort, page, limit)
          GET  /products/featured · /products/best-sellers · /products/:slug
          POST /products/:id/reviews
          GET  /categories · /brands

Orders    POST /orders                  (creates order, returns trackingNumber)
          GET  /orders/me · /orders/:id
          GET  /orders/track/:trackingNumber   (public — used by /track page)
          PUT  /orders/:id/status        (admin/staff — emits Socket.io order:status)

Payments  POST /payments/mpesa/stk      (initiate STK push)
          POST /payments/mpesa/callback (Daraja → us)
          POST /payments/stripe/intent
          POST /payments/stripe/webhook (raw body)
          POST /payments/cod

Admin     GET  /admin/stats             (revenue 30d, totals, low stock, top products)
          + CRUD on products, categories, brands, coupons, banners, customers

Realtime  Socket.io rooms: order:<id>, user:<id>
          Events: order:status, order:tracking

================================================================
DEPLOYMENT
================================================================

GitHub
    cd /home/bruce/projects/remote-center-ke
    git init && git add . && git commit -m "Initial commit"
    git branch -M main
    git remote add origin git@github.com:<you>/remote-center-ke.git
    git push -u origin main

Backend on Render
- New → Web Service → connect repo → Root directory: backend
- Build: npm install · Start: npm start
- Add all backend/.env vars in the Render dashboard.
- After it's live, set MPESA_CALLBACK_URL to the Render URL +
  /api/v1/payments/mpesa/callback. Also set CLIENT_URL to the Vercel URL.

Backend on Railway — same idea: New project → Deploy from GitHub → root backend.

Frontend on Vercel
- New Project → import repo → Root directory: frontend
- Framework: Vite. Build: npm run build · Output: dist
- Add VITE_API_URL = https://<your-backend>.onrender.com/api/v1
       VITE_SOCKET_URL = https://<your-backend>.onrender.com
       VITE_STRIPE_PUBLISHABLE_KEY = pk_live_...

================================================================
PROJECT STRUCTURE
================================================================

backend/src
  config/           db, cloudinary, mailer
  models/           User, Product, Category, Brand, Order, Review,
                    Coupon, Address, Banner, ActivityLog
  controllers/      auth, user, product, category, brand, order,
                    payment, review, coupon, admin, upload, tracking
  routes/           one file per resource, mounted via routes/index.js
  middleware/       auth (requireAuth + requireRole), error, validate, upload
  services/         mpesa.js (Daraja STK), stripe.js, email.js
  utils/            asyncHandler, ApiError, normalizePhone, deliveryFee,
                    generateTrackingNumber, paginate
  sockets/          Socket.io init + emit helpers
  seed/seed.js      40-product catalog + admin/customer
  app.js · server.js

frontend/src
  api/              axios + per-resource helpers
  store/            zustand (auth, cart, theme, recentlyViewed)
  components/
    layout/         Navbar (glass) · Footer · AdminLayout
    home/           Hero · CategoryShowcase · FeaturedGrid · FlashSale ·
                    BrandsMarquee · WhyChooseUs · Testimonials ·
                    InstagramGallery · FAQ · StoreLocation · NewsletterCTA
    product/        ProductCard · ProductGrid · ProductFilters ·
                    ProductGallery (zoom) · ReviewList · ReviewForm
    cart/ checkout/ tracking/ admin/ ai/ ui/ logo/ common/
  pages/            Home · Shop · ProductDetail · Cart · Checkout ·
                    OrderSuccess · TrackOrder · Account · Login · Register ·
                    Forgot · Reset · Wishlist · Compare · About · Contact ·
                    FAQ · NotFound · admin/* (Dashboard + 6 admin pages)
  hooks/ lib/ data/
  router.jsx · App.jsx · main.jsx · index.css

================================================================
WHAT'S WIRED vs WHAT'S SCAFFOLDED
================================================================

Wired and working
  - JWT auth (access+refresh), role guard (customer/staff/admin)
  - Product catalog + filters/sort/pagination, reviews, ratings
  - Cart (zustand persisted), checkout, delivery-fee rule
    (Nairobi CBD 200 / Nairobi 350 / countrywide 600 KES)
  - Order create with tracking number RCK-YYYYMMDD-XXXXXX
  - M-Pesa Daraja STK push: token → password (base64 shortcode+passkey+ts)
    → /mpesa/stkpush/v1/processrequest → callback handler updates order
    and emits Socket.io order:status
  - Stripe payment intent + raw-body webhook
  - Cash on delivery
  - Public order tracking page with animated 7-step timeline
  - Admin dashboard with Recharts revenue chart + stats endpoint
  - Cloudinary image upload (admin), Nodemailer with console fallback
  - Tailwind dark/light + glass UI + Framer Motion animations + premium
    inline-SVG logo and favicon

Scaffolded (UI present, deeper logic to expand as needed)
  - Google Sign-In button (UI only — backend hook is a placeholder)
  - Voice search button, AI recommendation strip (heuristic, swap for ML later)
  - Floating chatbot panel (UI only)
  - PWA manifest + light service worker registration
  - Invoice PDF download (utility stub — wire pdfkit or puppeteer)

================================================================
TROUBLESHOOTING
================================================================

- "Cannot connect to Mongo" → check MONGO_URI, Atlas IP allow-list.
- M-Pesa STK fires but order never confirms → MPESA_CALLBACK_URL must be
  publicly reachable; use ngrok for local.
- Stripe webhook 400 "No signature" → ensure raw body middleware is mounted
  on /api/v1/payments/stripe/webhook BEFORE express.json (it is in app.js).
- CORS errors → set CLIENT_URL to your exact frontend origin.
