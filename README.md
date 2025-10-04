# Trimmr - URL Shortener

A modern, full-stack URL shortener application built with React and Node.js that allows users to create shortened URLs, track analytics, and manage their links.

## System Design
  ![urlShortner Design](https://github.com/ranasujay/urlShortner/blob/main/UrlShortner_diagram.png)
 
## 🚀 Features

- **URL Shortening**: Convert long URLs into short, shareable links
- **User Authentication**: Secure signup and login system
- **Analytics Dashboard**: Track click statistics, user agents, and geographic data
- **QR Code Generation**: Generate QR codes for shortened URLs
- **User Management**: Profile management and link history
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **File Upload**: Support for image uploads via Cloudinary

## 🏗️ Project Structure

```
urlShortner/
├── Frontend/          # React + TypeScript frontend
├── Backend/           # Node.js + Express backend
├── README.md         # This file
└── .gitignore        # Git ignore file
```

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Framer Motion** for animations
- **Radix UI** for accessible components

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Cloudinary** for image storage
- **bcryptjs** for password hashing

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Cloudinary account (for image uploads)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ranasujay/urlShortner.git
cd urlShortner
```

2. Install dependencies for both frontend and backend:
```bash
# Install backend dependencies
cd Backend
npm install

# Install frontend dependencies
cd ../Frontend
npm install
```

3. Set up environment variables:
```bash
# In Backend directory, create .env file
cp .env.example .env
# Add your MongoDB URI, JWT secret, and Cloudinary credentials
```

4. Start the development servers:
```bash
# Start backend (from Backend directory)
npm start

# Start frontend (from Frontend directory)
npm run dev
```

The application will be running with:
- Frontend: Available in your browser at the address shown in the terminal
- Backend: API server running on the configured port

## 📡 API Endpoints

- `POST /signup` - User registration
- `POST /login` - User authentication
- `POST /saveurl` - Create shortened URL
- `GET /:shortId` - Redirect to original URL
- `GET /url/:shortId` - Get URL analytics
- `DELETE /url/:id` - Delete URL
- `GET /user/:email` - Get user data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Sujay Rana**
- GitHub: [@ranasujay](https://github.com/ranasujay)

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by popular URL shortening services
- Uses open-source libraries and frameworks
