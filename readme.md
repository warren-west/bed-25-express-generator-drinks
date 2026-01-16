# Drinks Menu
Working with the Express Generator project for the first time.

## Installation
1. Clone this project with the command:
```bash
git clone https://github.com/warren-west/bed-25-express-generator-drinks.git
```
2. Install the required dependencies with the command:
```bash
npm i
```

## Usage
1. Run the server with the command:
```bash
npm start
```
> The server should start listening on `http://localhost:3000`.

## Valid endpoints
### Home (index):
- `GET` `/`: Index page that displays "Welcome to Express".
### Drinks:
- `GET` `/drinks`: Drinks page that displays a menu of drinks.
- `GET` `/drinks/:id`: Drink details page that displays the details of the drink matching the `:id`. Valid IDs: `1`, `2`, `3`, `4`, `5`.
### Authentication:
- `GET` `/login`: Login page that returns a form allowing the user to enter login credentials and click a *Login* button.
- `GET` `/login/signup`: Registration page that returns a form allowing the user to enter login credentials and click a *Sign up* button.
- `GET` `/login/logout`: An endpoint that handles logging a user out, and redirecting to the `/drinks` page.
- `POST` `/login`: Login endpoint that uses passport's middleware to authenticate a user, and if authentication is successful, the logged in user is redirected to the `/drinks` page, else the user stays on the `/login` page to try again.
- `POST` `/login/signup`: Registration endpoint that receives a new user's username and password attached to the body of the request, and handles adding the credentials to the `/data/user.json` file if the username is not already taken. If a new user is successfully created, they are redirected to the `/login` page to log in with the new credentials, else they stay on the `/login/signup` page.