# Learning Assistant Photo App

A React-based web application designed to help students with learning disabilities by providing simplified descriptions of uploaded photos.

## Features

- Upload photos from your device
- Take photos using your device's camera
- AI-powered image analysis
- Simple and accessible user interface
- Real-time image descriptions

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. In a separate terminal, start the backend server:
```bash
node server.js
```

## Technologies Used

- React + Vite
- Chakra UI
- Google Cloud Vision API
- Express.js
- Node.js

## Environment Variables

Make sure to set up your `.env` file with the following variables:
- `VITE_NATURAL_LANGUAGE_API_KEY`
- `VITE_VISION_API_KEY`
