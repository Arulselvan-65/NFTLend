nft-lending-platform/
├── .env.local.example          # Environment variables template
├── .env.local                  # Local environment variables (gitignored)
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Project dependencies and scripts
│
├── src/
│   ├── app/                    # Next.js 13+ App Router
│   │   ├── layout.tsx          # Root layout component
│   │   ├── page.tsx            # Landing page
│   │   ├── dashboard/
│   │   │   ├── page.tsx        # Dashboard page
│   │   │   └── layout.tsx      # Dashboard layout
│   │   ├── loans/
│   │   │   ├── page.tsx        # Loans listing page
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx    # Individual loan details
│   │   └── api/                # API Routes
│   │       ├── loans/
│   │       │   ├── route.ts    # Loan operations endpoints
│   │       │   └── [id]/
│   │       │       └── route.ts # Individual loan endpoints
│   │       └── webhooks/
│   │           └── route.ts    # Webhook handlers
│   │
│   ├── components/             # React Components
│   │   ├── ui/                 # UI Components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── modal.tsx
│   │   ├── layout/            # Layout Components
│   │   │   ├── sidebar.tsx
│   │   │   ├── header.tsx
│   │   │   └── footer.tsx
│   │   ├── dashboard/         # Dashboard Components
│   │   │   ├── stats-card.tsx
│   │   │   ├── loan-table.tsx
│   │   │   └── activity-chart.tsx
│   │   └── web3/             # Web3-specific Components
│   │       ├── wallet-connect.tsx
│   │       ├── network-status.tsx
│   │       └── transaction-modal.tsx
│   │
│   ├── contracts/            # Smart Contract Integration
│   │   ├── abis/            # Contract ABIs
│   │   │   └── LendingContract.json
│   │   ├── addresses.ts     # Contract addresses per network
│   │   └── hooks/          # Contract interaction hooks
│   │       ├── useLendingContract.ts
│   │       ├── useLoans.ts
│   │       └── useWallet.ts
│   │
│   ├── lib/                 # Utility Functions
│   │   ├── web3/           # Web3 Utilities
│   │   │   ├── provider.ts # Web3 provider configuration
│   │   │   ├── chains.ts   # Chain configurations
│   │   │   └── helpers.ts  # Web3 helper functions
│   │   ├── api/           # API Utilities
│   │   │   ├── client.ts  # API client configuration
│   │   │   └── routes.ts  # API route definitions
│   │   └── utils/         # General Utilities
│   │       ├── format.ts  # Formatting utilities
│   │       └── validation.ts # Form validation
│   │
│   ├── store/              # State Management
│   │   ├── web3/          # Web3 State
│   │   │   ├── atoms.ts   # Web3 state atoms
│   │   │   └── selectors.ts # Web3 state selectors
│   │   └── loans/         # Loan State
│   │       ├── atoms.ts   # Loan state atoms
│   │       └── selectors.ts # Loan state selectors
│   │
│   ├── styles/            # Styling
│   │   ├── globals.css    # Global styles
│   │   └── components.css # Component-specific styles
│   │
│   └── types/             # TypeScript Types
│       ├── contracts.ts   # Smart contract types
│       ├── api.ts        # API types
│       └── common.ts     # Common types
│
├── public/               # Static Files
│   ├── images/          # Image assets
│   └── icons/           # Icon assets
│
└── scripts/             # Build & Deploy Scripts
    ├── deploy.ts        # Deployment script
    └── verify.ts        # Contract verification script