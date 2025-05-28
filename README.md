Campground Reservation Site (Campsphere)
A full-stack web application for managing campground reservations and user profiles. Users can create accounts, log in, update their profiles, and make or view reservations for camping spots.


Features
User registration and login with JWT authentication

Profile management (view and update profile details)

Browse and make campground reservations

Admin controls to manage users and reservations

Responsive UI built with React / Next.js

RESTful API backend with Express and Sequelize (MySQL)


Tech Stack
Frontend: React, Next.js

Backend: Node.js, Express.js

Database: MySQL, Sequelize ORM

Authentication: JSON Web Tokens (JWT), bcrypt for password hashing

State Management: React Context API

Version Control: Git


Getting Started
Prerequisites
Node.js (v14 or higher recommended)

MySQL database

Git

Installation


Clone the repository:
bash
git clone https://github.com/your-username/campground-site.git
cd campground-site


Install dependencies:
bash
npm install


Configure environment variables:

Create a .env file in the root directory with the following (adjust values):
ini
DATABASE_URL=mysql://user:password@localhost:3306/campgrounddb
JWT_SECRET=your_jwt_secret_key



Run database migrations and seed data (if applicable):
bash
npx sequelize db:migrate
npx sequelize db:seed:all


Start the development server:
bash
npm run dev
Open your browser and go to http://localhost:3000


API Endpoints
Method	Endpoint	Description
GET	/api/users	Get all users
GET	/api/users/:id	Get user by ID
POST	/api/users/create	Register a new user
PUT	/api/users/:id	Update user profile
DELETE	/api/users/:id	Delete a user
POST	/api/users/login	User login


Usage

Register for an account or login.

View and update your profile details.

Browse campground availability.

Make, view, and cancel reservations.

Admin users can manage users and reservations.

Folder Structure
bash

/client-server    # Frontend React/Next.js app

/backend-server   # Express backend API

Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

License
MIT License
