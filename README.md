This Inventory Management System is built with Angular 16 + ASP.NET Core Api.
This assumes you're running an Angular frontend and a .NET Core backend (e.g., .NET 8) as two separate apps:

A full-stack inventory management application built with Angular for the frontend and ASP.NET Core Web API for the backend using stored procedures and SQL Server.

📦 Features
Product management with image upload.

Search, sort, and pagination

Responsive Bootstrap UI

✅ Requirements
.NET 8 SDK

Node.js & npm

Angular CLI (npm install -g @angular/cli)

SQL Server

🖥️ Backend Setup (ASP.NET Core API)
Clone the project:

git clone https://github.com/nawsish9005/InventoryDashboard.git
There are two different projects, one is .net core api 8 as Backend
and another one is angular 16 as forntend.

Open Api Project named InventoryMS in Visual Studio(2022)

Set up the database: I have used Entity Framework so,
Update appsettings.json with SQL Server connection string:

 "ConnectionStrings": {
   "DefaultConnection": "Server=LAPTOP-PV6895RO;Database=InventoryMS;User Id=sa;Password=sa; Trusted_Connection=True; TrustServerCertificate=True"
 }
 then, run migrations ' add-migration "addAlltoDB" ' 
 [Note: Please first delete exist Migration Folder before running migration]

After creating database create stored procedure for crud.
Run the API:
Press Ctrl + F5 to run API 
The API should be running at: https://localhost:7062 

🖥️ FrontEnd Setup (Angular 16)
Then Open Angular Project Named Inventory-Client
Open terminal and install npm "npm install"
then run 'ng serve' command in terminal to run the project.

Run both projects at the same time to manage Inventory.