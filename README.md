# Ticket Booking Application

A modern React application for browsing and booking event tickets with a clean, responsive UI and dark mode support.


## Features

- **Event Browsing**: View a list of upcoming events with thumbnails, prices, and locations
- **Event Details**: Get detailed information about each event
- **Shopping Cart**: Add events to cart and manage quantity
- **User Authentication**: Sign up and log in to manage your bookings
- **Booking History**: View all your past bookings in your profile
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode**: Toggle between light and dark themes

## Technologies Used

- React 19
- React Router
- Firebase Authentication
- Firestore Database
- Vite
- CSS Variables for theming

## Project Structure

```
ticket-booking/
├── public/
│   ├── images/         # Event thumbnails and other images
│   └── ...             # Public assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React context providers
│   ├── data/           # Static data (events)
│   ├── pages/          # Main application pages
│   └── ...             # App configuration files
└── ...                 # Project configuration files
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ticket-booking
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build locally

### Adding New Events

1. Add the event image to `public/images/`
2. Update the events array in `src/data/data.js` with the new event information

### Firebase Configuration

This project uses Firebase for authentication and data storage. To set up your own Firebase project:

1. Create a new project in the [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password
3. Create a Firestore database
4. Update the configuration in `src/firebase.js` with your own Firebase credentials

## Deployment

This app can be deployed to any static hosting service:

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the contents of the `dist` folder to your hosting provider

