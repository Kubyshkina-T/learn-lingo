# LearnLingo

LearnLingo is a web application for finding online language tutors.

Users can browse teachers, filter them by language, student level and lesson price, view detailed teacher information and reviews, book a trial lesson, and save favorite teachers.

The application also includes Firebase authentication with registration, login and logout functionality.

## Features

- User registration and login
- Firebase Authentication
- Browse language teachers
- Load teachers in portions from Firebase Realtime Database
- Filter teachers by:
  - language
  - student level
  - price per hour
- View detailed teacher information
- View teacher reviews
- Book a trial lesson
- Add teachers to favorites
- Remove teachers from favorites
- Favorites are preserved after page reload
- Private Favorites page for authenticated users
- Toast notifications
- Form validation
- Custom dropdown filters

## Technologies

- Next.js
- React
- TypeScript
- Firebase Authentication
- Firebase Realtime Database
- React Hook Form
- Yup
- React Hot Toast
- CSS Modules
- Next.js Image
- LocalStorage

## Pages

### Home

The main page introduces the LearnLingo platform and its advantages and provides navigation to the teachers catalog.

### Teachers

The Teachers page displays available language tutors.

Users can:

- filter teachers by language
- filter by student level
- filter by lesson price
- load more teachers
- view detailed teacher information
- read reviews
- book a trial lesson
- add teachers to favorites

The Teachers page is available to both authenticated and unauthenticated users.

### Favorites

The Favorites page is private and available only to authenticated users.

It displays teachers that the current user has added to favorites.

## Authentication

Authentication is implemented with Firebase Authentication.

Supported functionality:

- registration
- login
- logout
- current user tracking

Registration and login forms are implemented with React Hook Form and Yup validation.

## Favorites

Favorites are stored in `localStorage` separately for each Firebase user.

The favorite state is preserved after page reload.

Unauthenticated users cannot add teachers to favorites and receive a notification when attempting to do so.

## Database

Teacher data is stored in Firebase Realtime Database.

Teacher objects contain information such as:

- name
- surname
- languages
- levels
- rating
- reviews
- price per hour
- lessons completed
- avatar
- lesson information
- conditions
- experience

## Forms

Forms are implemented with:

- React Hook Form
- Yup
- `@hookform/resolvers`

The project contains:

- Registration form
- Login form
- Trial lesson booking form

Modal windows can be closed by:

- close button
- backdrop click
- `Escape` key

## Getting Started

Clone the repository:

```bash
git clone https://github.com/Kubyshkina-T/learn-lingo

Install dependencies:

npm install

Create a .env.local file in the project root:

NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_database_url
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

Run the development server:

npm run dev

Open:

http://localhost:3000
Design

The project is based on the LearnLingo Figma design with a customized color palette.

https://www.figma.com/design/dewf5jVviSTuWMMyU3d8Mc/Learn-Lingo?node-id=44-542&t=QwYdCFzFcVPDwNmC-0

Technical Requirements

The project was created according to the LearnLingo pet-project technical specification.

Author

Developed by Kubyshkina Tetiana.
