# Deployment Guide for Render

## Backend Deployment

1. **Create New Web Service** on Render
   - Connect your GitHub repository
   - Select `backend` folder as root directory
   - Build Command: `npm install`
   - Start Command: `npm start`

2. **Environment Variables**:
   ```
   MONGODB_URI=mongodb+srv://midhuneh:midhun%402025@cluster0.bgwfazg.mongodb.net/smart-study-booking
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=10000
   ```

3. **Copy Backend URL** (e.g., `https://your-backend.onrender.com`)

## Frontend Deployment

1. **Create New Static Site** on Render
   - Connect your GitHub repository
   - Root directory: Leave empty (main folder)
   - Build Command: `npm install && npm run build`
   - Publish Directory: `build`

2. **Environment Variables**:
   ```
   REACT_APP_API_URL=https://your-backend.onrender.com/api
   ```

## Post-Deployment

1. **Seed Database**: 
   - SSH into backend service or use Render shell
   - Run: `npm run seed`

2. **Test Login**:
   - Admin: `admin@college.edu` / `admin123`
   - Student: `john@college.edu` / `student123`

## Important Notes

- Backend uses port 10000 (Render default)
- Frontend connects to backend via REACT_APP_API_URL
- MongoDB Atlas IP whitelist: Add `0.0.0.0/0` for Render access
- Free tier may have cold starts (first request slower)
