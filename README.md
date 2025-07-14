#  Feedly - Product Feedback Board

Feedly is a full-stack web application that allows users to:
-  Submit product feedback
-  Comment on others' suggestions
-  Upvote ideas (1 per user)
-  Authenticate (Register/Login/Logout)

##  Technologies Used

### Frontend
- React + Vite
- TypeScript
- React Router
- Axios
- Toastify
- CSS Modules / Custom Styling

### Backend
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT Authentication

##  Features

- User registration & login
- JWT-based protected routes
- Create/update/delete posts
- Comment on posts
- Form validation and error handling
- Responsive, clean UI

##  Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/feedly.git
cd feedly
```

2. Setup the Backend


```bash
cd server
npm install
npx prisma migrate dev
npx prisma generate
npm run dev
```

Ensure you have a .env file with:

```ini
DATABASE_URL=your_postgres_url
JWT_SECRET=your_secret_key
```

3. Setup the Frontend
   
```bash
cd client
npm install
npm run dev
```




