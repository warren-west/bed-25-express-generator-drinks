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

### Valid endpoints
- `GET` `/`: Index page that displays "Welcome to Express".
- `GET` `/drinks`: Drinks page that displays a menu of drinks.
- `GET` `/drinks/:id`: Drink details page that displays the details of the drink matching the `:id`. Valid IDs: `1`, `2`, `3`, `4`, `5`.