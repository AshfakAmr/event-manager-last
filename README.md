🗓️ Event Management System – Angular 19 (Standalone Components)
Welcome! This is a Single Page Application (SPA) built using Angular 19 with standalone components, Angular Material, and RxJS. This project fulfills the assignment requirements for the Frontend Software Developer position at Platform Commons.

🚀 Live Demo
🔗 Hosted Live Demo
📹 Video Walkthrough

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

View event details in a modal/card

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
Standalone Components: Used Angular 19's modern standalone feature to remove NgModules and simplify structure.

RxJS for State: Leveraged Subjects and Observables for reactive UI updates without external state libraries.

Lazy Loading: Routes are lazy-loaded and guarded using Angular Router's route-level guards.

Angular Material: Ensures consistency and accessibility with Material UI standards.

Responsiveness: Designed to look good across devices using Material Layout and Grid CSS.

🧪 Future Enhancements
Persistent Auth with JWT & real backend

Pagination for events

Role-based permissions

Upload event image with preview

📄 License
This is a submission for the Platform Commons assignment and intended for evaluation only. All code is original and written by me.

🤖 AI Assistance
This project was built with independent effort and learning. However, guidance, explanations, and feedback were taken with the help of OpenAI's ChatGPT to better understand Angular 19’s latest standalone features, Angular Material components, and best practices in structuring and styling the application.
