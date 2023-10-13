# SupplyAlly_GovWallet Software Engineer Internship Tech Test Submission – Kevin Thom
This Repositary contains the code for SupplyAlly_GovWallet Software Engineer Internship Tech Test Submission – Kevin Thom

## Table of Contents
1. [How to run the code](#how-to-run-the-code)
2. [How to use the application](#how-to-use-the-application)
3. [Dev Tools](#dev-tools)
4. [Technologies used](#technologies-used)

## How to run the code
1. Clone the repository
2. Open the terminal and navigate to the directory `gds-swe-supplyally-govwallet-kevinthom` of the cloned repository
3. Navigate to the directory `server`
4. Run the command `npm install` to install the dependencies for the server / backend
5. Run the command `npx prisma db seed` to seed the database (will fail if the database already has data), check dev tools in [usage](#how-to-use-the-application) instead.
5. Run the command `npm run dev` to start the server
6. Open another terminal and navigate to the directory `gds-swe-supplyally-govwallet-kevinthom` of the cloned repository
7. Navigate to the directory `client`
8. Run the command `npm install` to install the dependencies for the client / frontend
9. Run the command `npm run dev` to start the client
10. Open the browser and navigate to `http://localhost:5173/` to view the application
cation. Do note that this is default for Vite as of time or writing, but if port is used it will find the next available port. https://vitejs.dev/config/server-options.html
11. To run the tests, run the command `npm test` in the server directory

## How to use the application
1. The application will load a page with a form to enter a staff_pass_id
2. Enter a staff_pass_id and click on the `Redeem it!` button
3. If the staff_pass_id is valid, a success message will be displayed and confetti will (hopefully) be displayed.
4. If the staff_pass_id is invalid, an error message will be displayed
5. If the team has already redeemed, an error message will be displayed
6. To modify or reset the database, use the `Dev Tool` in the top right corner of the page

## Dev Tools
- Upload Staff CSV: Upload a valid csv to populate staff table
- Clear Staff Table: Self-explanatory
- Clear Redemption Table - Self-explanatory

## Technologies used
### Frontend
#### Main
- Vite
- React
- TailwindCSS
- Shadcn UI

#### Minor
- canvas-confetti
- lucide-react
- papaparse
- react-snowfall

### Backend
- NodeJS
- Express
- Prisma
- SQLite

### Testing
- Jest
- Supertest