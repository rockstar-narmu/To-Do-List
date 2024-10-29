# To-Do List Application [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
A simple to-do list web application built using Firebase Firestore for task storage, along with HTML, CSS, and JavaScript for the frontend.

## Features

- Add, modify, and delete tasks
- View tasks in a table format
- Filter tasks by date
- Persistent storage with Firebase Firestore

## Setup

To get a local copy up and running, follow these steps:

### Prerequisites

- Node.js and npm should be installed.
- A Firebase project set up with Firestore enabled.

### Installation

1. **Clone the repository**:
   
   ```bash
   git clone https://github.com/rockstar-narmu/To-Do-List.git
   cd To-Do-List
   
2. **Install dependencies**:

   ```bash
   npm install
   
3. **Configure Firebase**:
    - Go to the Firebase Console and create a new project.
    - Enable Firestore in the project.
    - Copy the Firebase configuration object and replace it in your JavaScript file where Firebase is initialized.
    - Name the collection as 'list' or you have to change the name of your collection in the `index.js` file in src directory.

4. **Run the Application**:
   
   ```bash
   npm start

## Usage:
- Open the application in your browser.
- Use the Add Task form to add a task along with an ID.
- Modify or delete tasks using the corresponding forms.
- View and filter tasks in the table format.

## Technologies Used:
- Frontend: HTML, CSS, JavaScript
- Backend: Firebase Firestore
- Hosting: Firebase Hosting (optional)

## Contributions:
Contributions are welcome! If you have suggestions or find issues, feel free to open an issue or a pull request.

## License:
This project is licensed under the MIT License. See `LICENSE` for details.

## Screenshot:
![Screenshot 2024-10-29 192547](https://github.com/user-attachments/assets/a5c15957-4be0-4c02-ad6e-821fe3879fa6)
