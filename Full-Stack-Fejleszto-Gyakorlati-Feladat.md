# **Full-Stack Fejlesztő - Állásinterjú Gyakorlati Feladat**

## **Feladat Áttekintés**
**Időkeret:** 2-3 óra  
**Technológiák:** React + Next.js, Node.js + Express.js, REST API, PostgreSQL  
**Cél:** Egy teljes stack könyvtár kezelő rendszer elkészítése modern frontend és backend technológiákkal

---

## **Technológiai Stack**

### **Backend:**
- Node.js + Express.js
- PostgreSQL adatbázis
- REST API
- JWT Authentication

### **Frontend:**
- React + Next.js
- Tailwind CSS vagy SASS
- TypeScript (ajánlott)

---

## **Projekt Követelmények**

### **1. Backend API Fejlesztés (90 perc)**

#### **Node.js + Express.js + PostgreSQL Stack**
```javascript
// Package.json
{
  "name": "library-api",
  "dependencies": {
    "express": "^4.18.2",
    "pg": "^8.11.0",
    "sequelize": "^6.32.1",
    "bcrypt": "^5.1.0",
    "jsonwebtoken": "^9.0.0",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "dotenv": "^16.3.1",
    "express-validator": "^7.0.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.6.2",
    "supertest": "^6.3.3"
  }
}
```

#### **Adatbázis Modellek (Sequelize + PostgreSQL)**

**Book Model:**
```javascript
const { DataTypes } = require('sequelize');

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 255]
    }
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 255]
    }
  },
  isbn: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isISBN: true
    }
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1900,
      max: new Date().getFullYear()
    }
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  category: {
    type: DataTypes.ENUM('Fiction', 'Science', 'History', 'Technology', 'Biography'),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  coverImage: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true,
  tableName: 'books'
});

**User Model:**
```javascript
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 255]
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user'
  }
}, {
  timestamps: true,
  tableName: 'users'
});
```

#### **API Endpoints**

**REST API Endpoints:**
- `GET /api/books` - Könyvek listázása (pagination, filtering)
- `GET /api/books/:id` - Könyv részletei
- `POST /api/books` - Új könyv létrehozása
- `PUT /api/books/:id` - Könyv frissítése
- `DELETE /api/books/:id` - Könyv törlése
- `GET /api/books/search` - Fejlett keresés
- `POST /api/auth/login` - Bejelentkezés
- `POST /api/auth/register` - Regisztráció
- `GET /api/users/profile` - Felhasználói profil

**API Response Struktúrák:**
```javascript
// Success Response
{
  "success": true,
  "data": {
    // response data
  },
  "message": "Operation successful"
}

// Error Response
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "details": [
      {
        "field": "title",
        "message": "Title is required"
      }
    ]
  }
}

// Paginated Response
{
  "success": true,
  "data": {
    "books": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "totalPages": 5
    }
  }
}
```

### **2. Frontend Fejlesztés (120 perc)**

#### **React + Next.js Stack**

**Package.json:**
```json
{
  "name": "library-frontend",
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss": "^3.3.0",
    "axios": "^1.5.0",
    "@tanstack/react-query": "^4.32.0",
    "react-hook-form": "^7.45.0",
    "react-hot-toast": "^2.4.1",
    "lucide-react": "^0.290.0"
  },
  "devDependencies": {
    "@types/node": "^20.8.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.2.0",
    "eslint": "^8.51.0",
    "eslint-config-next": "^14.0.0"
  }
}
```

**Komponens Struktúra:**
```
src/
├── components/
│   ├── Layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   ├── Books/
│   │   ├── BookList.tsx
│   │   ├── BookCard.tsx
│   │   ├── BookForm.tsx
│   │   └── BookSearch.tsx
│   └── Auth/
│       ├── LoginForm.tsx
│       └── RegisterForm.tsx
├── pages/
│   ├── index.tsx
│   ├── books/
│   │   ├── index.tsx
│   │   ├── [id].tsx
│   │   └── new.tsx
│   └── auth/
│       └── login.tsx
├── hooks/
│   ├── useBooks.ts
│   └── useAuth.ts
├── services/
│   └── api.ts
└── styles/
    └── globals.css
```

#### **TypeScript Interfaces:**
```typescript
// types/index.ts
export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  year: number;
  available: boolean;
  category: BookCategory;
  description?: string;
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
}

export type BookCategory = 'Fiction' | 'Science' | 'History' | 'Technology' | 'Biography';
```

#### **Főbb Komponensek és Oldalak**

1. **Dashboard/Home Page**
   - Könyvstatisztikák
   - Legújabb könyvek
   - Gyors keresés

2. **Books Management**
   - Könyvlista (pagination, filtering)
   - Könyv részletek oldal
   - Könyv hozzáadása/szerkesztése form
   - Fejlett keresési funkcionalitás

3. **Authentication**
   - Login/Registration form
   - Protected routes
   - User profile management

4. **Responsive Design**
   - Mobile-first approach
   - Tablet és desktop optimalizáció

### **3. Stílusok és UI (30 perc)**

#### **Tailwind CSS Implementáció**
```css
/* Példa komponens stílusok */
.book-card {
  @apply bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300;
  @apply p-6 border border-gray-200;
}

.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded;
  @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
}
```

#### **Tailwind CSS Konfiguráció**
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
```

### **4. PostgreSQL Adatbázis Setup (30 perc)**

#### **Sequelize Konfiguráció**
```javascript
// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected successfully');
    
    // Sync models in development
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('Database synced');
    }
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
```

#### **Environment Variables**
```bash
# .env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=library_db
DB_USER=library_user
DB_PASSWORD=password

JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

NODE_ENV=development
PORT=5000
```

### **5. Docker Setup (30 perc)**

#### **Backend Dockerfile**
```dockerfile
# Dockerfile (backend)
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodeuser -u 1001

# Change ownership
RUN chown -R nodeuser:nodejs /app
USER nodeuser

EXPOSE 5000

CMD ["npm", "start"]
```

#### **Frontend Dockerfile**
```dockerfile
# Dockerfile (frontend)
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]
```
#### **Docker Compose**
```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: library_postgres
    environment:
      POSTGRES_DB: library_db
      POSTGRES_USER: library_user
      POSTGRES_PASSWORD: library_pass
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U library_user -d library_db"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build: ./backend
    container_name: library_backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=development
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_NAME=library_db
      - DB_USER=library_user
      - DB_PASSWORD=library_pass
      - JWT_SECRET=your_jwt_secret_key
    depends_on:
      postgres:
        condition: service_healthy
    volumes:
      - ./backend:/app
      - /app/node_modules

  frontend:
    build: ./frontend
    container_name: library_frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:5000
    depends_on:
      - backend
    volumes:
      - ./frontend:/app
      - /app/node_modules

volumes:
  postgres_data:
```

---

## **Értékelési Szempontok**

### **Backend Development (40 pont)**
- [ ] REST API/GraphQL endpoints (15 pont)
- [ ] Adatbázis integráció és modellek (10 pont)
- [ ] Authentication és Authorization (8 pont)
- [ ] Error handling és validáció (7 pont)

### **Frontend Development (35 pont)**
- [ ] Komponens architektúra (10 pont)
- [ ] State management (8 pont)
- [ ] Responsive design (8 pont)
- [ ] API integráció (9 pont)

### **Full-Stack Integration (15 pont)**
- [ ] Frontend-Backend kommunikáció (8 pont)
- [ ] Authentication flow (4 pont)
- [ ] Error handling (3 pont)

### **DevOps (10 pont)**
- [ ] Docker containerization (7 pont)
- [ ] Environment configuration (3 pont)

---

## **Bonus Feladatok**

### **1. Fejlett Funkciók (30 perc)**
- Real-time notifications (WebSocket/Socket.io)
- File upload (könyv borítóképek)
- Advanced search filters
- Export functionality (PDF, Excel)

### **2. Performance Optimalizáció (20 perc)**
- API rate limiting
- Frontend caching stratégiák
- Database indexing
- Image optimization

### **3. Testing (25 perc)**
- Backend unit testek
- Frontend component testek
- E2E testing (Cypress/Playwright)
- API dokumentáció (Swagger/OpenAPI)

### **4. Monitoring és Logging (15 perc)**
- Application logging
- Error tracking (Sentry)
- Performance monitoring
- Health check endpoints

---

## **Elvárt Deliverables**

1. **Működő Full-Stack alkalmazás**
2. **Modern, responsive UI (React + Next.js)**
3. **Teljes CRUD funkcionalitás**
4. **JWT Authentication/Authorization**
5. **PostgreSQL adatbázis integráció**
6. **Docker containerization**
7. **README.md dokumentáció**
8. **REST API dokumentáció**

---

## **Technikai Követelmények**

### **Frontend Requirements**
- Modern JavaScript/TypeScript
- Component-based architecture
- Responsive design (mobile-first)
- Form validation
- Loading states és error handling
- Accessibility considerations

### **Backend Requirements**
- RESTful API design principles
- Proper HTTP status codes
- Input validation és sanitization
- Database migrations
- Environment configuration
- Security best practices

### **General Requirements**
- Git version control
- Clean, readable code
- Error handling
- Performance considerations
- Documentation

---

## **Időbeosztás Javaslat**

### **1. Projekt Setup (30 perc)**
- Repository létrehozása
- Backend és frontend projekt inicializálása
- Dependencies telepítése
- Basic project structure

### **2. Backend Development (90 perc)**
- Database modellek és migráció
- Authentication setup
- API endpoints implementáció
- Testing és debugging

### **3. Frontend Development (120 perc)**
- UI komponensek létrehozása
- API integráció
- Routing és navigation
- Styling és responsive design

### **4. Integration és Testing (30 perc)**
- Frontend-backend integráció
- End-to-end testing
- Bug fixes

### **5. Docker Setup (30 perc)**
- Docker konfigurálása
- Environment variables
- Local development setup
- Documentation

### **6. Finalizálás (10 perc)**
- Code cleanup
- Final testing
- Documentation review

---

## **Értékelési Kritériumok**

### **Kiváló (90-100%)**
- Teljes funkcionalitás implementálva
- Modern, clean code
- Excellent UI/UX
- Proper error handling
- Docker setup működik
- Bonus feladatok részben megoldva

### **Jó (70-89%)**
- Alap funkciók működnek
- Jó kód minőség
- Responsive design
- Basic deployment setup
- Kisebb hiányosságok

### **Elfogadható (50-69%)**
- Részleges funkcionalitás
- Alapvető UI működik
- Backend API részben kész
- Jelentős hiányosságok

### **Nem megfelelő (<50%)**
- Nem működő alkalmazás
- Alapvető hibák
- Incomplete implementation

---

## **Hasznos Források és Tippek**

### **Development Tips**
1. **API First Approach**: Kezdj a backend API tervezésével
2. **Component Library**: Használj kész komponenseket (Material-UI, Ant Design)
3. **State Management**: Redux/Zustand (React) vagy NgRx (Angular)
4. **Form Handling**: React Hook Form vagy Angular Reactive Forms
5. **API Client**: Axios vagy Fetch API proper error handling-gel

### **Styling Tips**
1. **CSS Framework**: Tailwind CSS gyorsabb development-hez
2. **Design System**: Konzisztens színek és spacing
3. **Mobile First**: Responsive design mobile-ról desktop-ra
4. **Accessibility**: ARIA labels és keyboard navigation

### **Deployment Tips**
1. **Environment Variables**: Sensitive data kezelése
2. **Build Optimization**: Production build optimalizálása
3. **HTTPS**: SSL certificate AWS-ben
4. **Monitoring**: CloudWatch vagy harmadik féltől származó megoldás

**Sok sikert a feladat megoldásához!** 🚀

---

## **Appendix: Quick Start Commands**

### **Projekt Setup**
```bash
# Projekt struktúra létrehozása
mkdir library-management && cd library-management
mkdir backend frontend

# Backend setup
cd backend
npm init -y
npm install express pg sequelize bcrypt jsonwebtoken cors helmet dotenv express-validator
npm install -D nodemon jest supertest

# Frontend setup  
cd ../frontend
npx create-next-app@latest . --typescript --tailwind --app
npm install axios @tanstack/react-query react-hook-form react-hot-toast lucide-react
```

### **PostgreSQL Setup**
```bash
# Docker PostgreSQL
docker run --name library-postgres -e POSTGRES_DB=library_db -e POSTGRES_USER=library_user -e POSTGRES_PASSWORD=library_pass -p 5432:5432 -d postgres:15-alpine

# Vagy helyi PostgreSQL
psql -U postgres
CREATE DATABASE library_db;
CREATE USER library_user WITH PASSWORD 'library_pass';
GRANT ALL PRIVILEGES ON DATABASE library_db TO library_user;
```

### **Docker Commands**
```bash
# Teljes alkalmazás indítása
docker-compose up --build

# Csak adatbázis indítása development-hez
docker-compose up postgres

# Alkalmazás újraépítése
docker-compose build --no-cache
```