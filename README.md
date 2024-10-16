# Photo Order API

This is a Node.js and TypeScript-based API that allows users to retrieve a list of photos from the Pixabay API, create new orders, and fetch all orders for a specific user. The orders are stored in a MongoDB database.

## Prerequisites

Before running this project, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/get-npm)

## Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone https://github.com/liorhp/photo-order-api.git
   cd photo-order-api
   npm install
2. **Create a .env file**:

   ```bash
   touch .env
3. **Add the following variables to the .env file**:

   ```bash
   MONGO_URI=<mongodb_uri>
   PIXABAY_API_KEY=<pixabay_api_key>
4. **Run the project**:

   ```bash
   npm run dev
