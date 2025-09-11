# Trimmr Frontend

A modern, responsive React frontend for the Trimmr URL shortener application built with TypeScript, Vite, and Tailwind CSS.

## 🚀 Features

- **Modern React** with TypeScript and functional components
- **Responsive Design** with Tailwind CSS
- **State Management** with Redux Toolkit
- **Routing** with React Router DOM
- **Animations** with Framer Motion
- **UI Components** with Radix UI and custom components
- **Form Handling** with React Hot Toast for notifications
- **QR Code Generation** for shortened URLs
- **File Upload** with drag-and-drop support
- **Analytics Dashboard** with interactive charts

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit** - Predictable state container
- **React Router DOM** - Declarative routing
- **Framer Motion** - Production-ready motion library
- **Radix UI** - Low-level accessible UI primitives
- **Axios** - HTTP client for API requests
- **React Hot Toast** - Beautiful notifications
- **QRCode.react** - QR code generation
- **React Dropzone** - File upload component
- **Lucide React** - Beautiful SVG icons

## 📁 Project Structure

```
Frontend/
├── public/                   # Static assets
│   ├── banner_new.png
│   ├── logo_new.png
│   └── ...
├── src/
│   ├── Components/          # Reusable components
│   │   ├── Home/           # Home page components
│   │   ├── signup/         # Authentication components
│   │   ├── ui/            # UI primitives
│   │   └── StatsCharts.tsx
│   ├── Pages/              # Page components
│   │   ├── Dashboard.tsx
│   │   ├── Home.tsx
│   │   ├── LinkDetails.tsx
│   │   └── Signup.tsx
│   ├── redux/              # State management
│   │   └── Slices/
│   ├── service/            # API services
│   │   ├── api.ts
│   │   └── apiConnector.ts
│   ├── lib/                # Utilities
│   │   └── utils.ts
│   ├── App.tsx             # Main app component
│   ├── main.tsx           # App entry point
│   └── index.css          # Global styles
├── components.json         # shadcn/ui configuration
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available in your browser at the localhost address shown in the terminal.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Components

### UI Components
- **Button** - Customizable button with variants
- **Card** - Container component with header, content, footer
- **Avatar** - User profile image component
- **Tabs** - Tabbed interface component
- **Popover** - Overlay component for additional content
- **Chart** - Data visualization component

### Feature Components
- **Navbar** - Navigation header
- **UrlModal** - URL shortening form modal
- **LoginForm** - User authentication form
- **SignupForm** - User registration form
- **StatsCharts** - Analytics visualization

### Pages
- **Home** - Landing page with URL shortening
- **Dashboard** - User dashboard with analytics
- **Signup** - Authentication page
- **LinkDetails** - Individual link analytics

## 🎯 Key Features Implementation

### URL Shortening
- Real-time URL validation
- Custom short ID generation
- QR code generation
- Copy to clipboard functionality

### Authentication
- JWT token management
- Protected routes
- User session persistence
- Form validation

### Analytics
- Click tracking
- Geographic data visualization
- User agent analysis
- Interactive charts

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactions
- Cross-browser compatibility

## 🔒 Environment Variables

Create a `.env` file in the Frontend directory:

```env
VITE_API_BASE_URL=your_backend_api_url
VITE_APP_NAME=Trimmr
```

## 🚀 Build and Deployment

### Production Build
```bash
npm run build
```

### Deploy to Vercel
```bash
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload dist folder to Netlify
```

## 🎨 Styling

The project uses Tailwind CSS for styling with custom configurations:

- **Colors**: Custom color palette for branding
- **Typography**: Poppins font family
- **Components**: Pre-built component styles
- **Responsive**: Mobile-first breakpoints

## 🔧 Configuration Files

- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript compiler options
- `vite.config.ts` - Vite build configuration
- `components.json` - shadcn/ui component configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the existing code style
4. Write meaningful commit messages
5. Test your changes thoroughly
6. Submit a pull request

## 📝 Code Style

- Use TypeScript for type safety
- Follow React functional component patterns
- Use custom hooks for reusable logic
- Implement proper error boundaries
- Write descriptive component names

## 🐛 Known Issues

- Add proper error handling for network failures
- Implement offline functionality
- Add comprehensive testing suite
- Optimize bundle size

## 📞 Support

For support, please open an issue in the GitHub repository.
