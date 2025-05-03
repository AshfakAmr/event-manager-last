🗓️ Event Management System – Angular 19 (Standalone Components)
Welcome! This is a Single Page Application (SPA) built using Angular 19 with standalone components, Angular Material, and RxJS. This project fulfills the assignment requirements for the Frontend Software Developer position at Platform Commons.

🚀 Live Demo - https://eventmanagementtask.netlify.app/

🔗 Hosted Live Demo

📁 Project Structure & Approach
✅ Built using the latest Angular 19 standalone component architecture – no traditional NgModules.

✅ Angular CLI used for scaffolding and Angular Material setup.

✅ Features organized into auth and event domains.

✅ Services use RxJS Subjects and HttpClient for reactive state and backend sync.

✅ Clean and maintainable folder structure.

🧰 Tech Stack
Tech Purpose
Angular 19 Frontend SPA with standalone arch
Angular Material UI components & layout
RxJS State & async handling
JSON Server Mock backend for data persistence
Angular Router SPA routing
Reactive Forms Form handling & validation
CSS Flex/Grid Responsive layout

🔐 Features
✅ Authentication
User Registration & Login (Form validation)

Route Guard to protect event routes

Session stored in localStorage

🗓️ Event Management
View all events in a card-based layout

Create, edit, delete events with validation

View event details

Search, filter, and sort events by title and date

📱 Responsive UI
Clean Material UI design

Mobile-first layout with Flex & Grid

Fully responsive across devices

🔄 JSON Server (Mock Backend)
Start JSON Server:

json-server --watch db.json --port 3000
Sample API routes:
GET /users

POST /users

GET /events

POST /events

PUT /events/:id

DELETE /events/:id

🛠️ Installation & Setup

1. Clone Repo

   git clone https://github.com/your-username/event-manager-angular.git
   cd event-manager-angular

2. Install Dependencies

   npm install

3. Run JSON Server

   npm run backend

# or

json-server --watch db.json --port 3000

4. Run Angular App

   ng serve
   App will be live at: http://localhost:4200

📌 Key Design Decisions
✅ Standalone Components
Used Angular 19's modern standalone feature to eliminate the need for NgModules and simplify the project structure.

✅ RxJS for State Management & Async Handling
BehaviorSubject is used in services like EventService to maintain and update a reactive state shared across components.

HttpClient calls return Observable streams for all backend interactions (CRUD operations).

RxJS operators such as:

tap – to reflect backend changes in the local state.

map – to transform and validate login response data.

async pipe is used in templates to auto-subscribe and unsubscribe, avoiding memory leaks.

This reactive pattern ensures a seamless user experience and clean data flow without needing any external state management library like NgRx.

✅ Lazy Loading & Route Guards
Routes are lazy-loaded and protected using Angular Router’s built-in guards for authenticated access.

✅ Angular Material
Material UI components were used to maintain consistency, accessibility, and responsiveness across the app.

✅ Responsive Layout
Mobile-first and accessible layout created using Angular Material’s layout system and CSS Flex/Grid.

📄 License
This is a submission for the Platform Commons assignment and intended for evaluation only. All code is original and written by me.

🤖 AI Assistance
This project was built with independent effort and learning. However, guidance, explanations, and feedback were taken with the help of OpenAI's ChatGPT to better understand Angular 19’s latest standalone features, Angular Material components, and best practices in structuring and styling the application.
