# Trimmr Backend

The backend API for the Trimmr URL shortener application built with Node.js, Express.js, and MongoDB.

## 🚀 Features

- **RESTful API** for URL shortening operations
- **User Authentication** with JWT tokens
- **MongoDB Integration** with Mongoose ODM
- **File Upload Support** via Cloudinary
- **Analytics Tracking** with user agent and IP information
- **CORS Enabled** for cross-origin requests
- **Environment Configuration** with dotenv

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Cloudinary** - Cloud image storage
- **CORS** - Cross-Origin Resource Sharing
- **express-fileupload** - File upload middleware
- **express-useragent** - User agent parsing
- **node-ipinfo** - IP geolocation

## 📁 Project Structure

```
Backend/
├── index.js                 # Main server file
├── package.json             # Dependencies and scripts
├── Config/
│   ├── cloudinaryConfig.js  # Cloudinary configuration
│   └── databaseConfig.js    # MongoDB connection
├── Controllers/
│   ├── clickurlController.js    # URL click tracking
│   ├── loginController.js       # User login logic
│   ├── saveurlController.js     # URL creation and management
│   ├── signupController.js      # User registration
│   └── userController.js       # User data management
└── Models/
    ├── UrlModel.js          # URL schema
    └── User.js              # User schema
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- Cloudinary account

### Installation

1. Navigate to the Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
# Database
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server
PORT=4000
```

5. Start the development server:
```bash
npm start
```

The server will start and be available on the configured port

## 📡 API Endpoints

### Authentication
- `POST /signup` - Register a new user
- `POST /login` - Authenticate user

### URL Management
- `POST /saveurl` - Create a shortened URL
- `GET /:shortId` - Redirect to original URL (tracking click)
- `GET /url/:shortId` - Get URL analytics data
- `DELETE /url/:id` - Delete a URL

### User Management
- `GET /user/:email` - Get user information

## 📊 Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  image: String (Cloudinary URL),
  createdAt: Date
}
```

### URL Model
```javascript
{
  originalUrl: String,
  shortId: String (unique),
  userId: ObjectId (ref: User),
  clicks: [{
    timestamp: Date,
    userAgent: String,
    ipAddress: String,
    location: Object
  }],
  createdAt: Date
}
```

## 🔧 Scripts

- `npm start` - Start the server with nodemon (development)
- `npm test` - Run tests (not implemented yet)

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- CORS configuration
- Input validation and sanitization

## 🚀 Deployment

### Environment Variables for Production
Ensure all environment variables are properly set in your production environment:

- `MONGODB_URI` - Production MongoDB connection string
- `JWT_SECRET` - Strong JWT secret key
- `CLOUDINARY_*` - Cloudinary production credentials
- `PORT` - Server port (default: 4000)

### PM2 (Recommended for production)
```bash
npm install -g pm2
pm2 start index.js --name "trimmr-backend"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🐛 Known Issues

- Add proper error handling middleware
- Implement rate limiting
- Add request validation middleware
- Add comprehensive logging

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.