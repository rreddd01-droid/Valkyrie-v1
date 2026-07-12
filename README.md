# Valkyrie

## PLEASE DO NOT USE THIS FOR A REVIVAL PROJECT, THIS IS HORRIBLY WRITTEN AND WE'RE MAKING A BETTER VERSION PROPERLY NOW, THIS WAS JUST A LEARNING EXPERIENCE

## Description

Valkyrie is your ultimate platform for creating and sharing immersive gaming experiences. Join us to relive your childhood memories and create new ones.

## Features

- **User Authentication**: Secure signup and login with email verification.
- **Profile Management**: Customize your profile with a blurb and profile image.
- **Messaging System**: Send and receive messages with other users.
- **Friend System**: Add friends and manage friend requests.
- **Game Creation**: Create and share your own games.
- **Responsive Design**: Built with Bootstrap for mobile-friendly layouts.
- **Maintenance Mode**: Easily toggle site availability.
- **More Coming Soon...**

## Technologies Used

- **Frontend**:
  - HTML5
  - CSS3 (Bootstrap, Bootswatch)
  - JavaScript (jQuery)
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
- **Other**:
  - Nodemailer
  - JSON Web Tokens (JWT)
  - dotenv

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/Valkyrie.git
   cd Valkyrie
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root and make the environment variables.

4. **Create Admin User**

   ```bash
   npm run create-admin
   ```

5. **Run the application**

   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:3000`.

## Deployment

~~Valkyrie can be deployed using Vercel. Ensure that environment variables are set in the Vercel dashboard.~~

We migrated to a new hosting provider, so the site is now deployed on a private server. You can use whichever provider you want as long as they support nodejs.

## Asset Hosting

To save stuff like .rbxl files, thumbnails, images, etc, you can use AWS S3 Buckets.

1. **Create an S3 bucket** in your AWS account.

2. **Configure your bucket** to let public access if needed

3. **Add your AWS credentials** to the `.env` file

## Database

We use MongoDB Atlas for the DB. Don't know how reliable it is, but it's what we have for now and it's free. Plan to migrate to a self-hosted solution in the future.

## note to self
mrbobbilly keep updating this readme as we add more stuff so we can have documentation for the future
.