# Game Database API

A RESTful API for managing a video game database with full CRUD operations.

## Features

- **Get all games** - Retrieve the complete list of games
- **Get game by ID** - Fetch a specific game using its ID
- **Add new game** - Create a new game entry with required fields
- **Edit game** - Update any fields of an existing game
- **Delete game** - Remove a game from the database

## Installation

```bash
npm install
```

## Running the API

```bash
npm start
```

The API runs on `http://localhost:3000`

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/games` | Get all games |
| GET | `/games/:id` | Get game by ID |
| POST | `/games` | Create a new game |
| PUT | `/games/:id` | Update a game |
| DELETE | `/games/:id` | Delete a game |

## Game Model

```json
{
  "id": "number (auto-generated)",
  "title": "string (required)",
  "thumbnail": "string (required)",
  "short_description": "string (required)",
  "genre": ["string array (required)"],
  "release_date": "string (required)",
  "popularity": "number 0-5 (required)",
  "platform": ["string array (optional)"],
  "developer": "string (optional)"
}
```

## Example Requests

### Create a Game
```json
POST /games
{
  "title": "Elden Ring",
  "thumbnail": "https://example.com/elden-ring.jpg",
  "short_description": "Action RPG from FromSoftware",
  "genre": ["Action", "RPG"],
  "release_date": "2022-02-25",
  "popularity": 5,
  "platform": ["PC", "PlayStation", "Xbox"],
  "developer": "FromSoftware"
}
```

### Update a Game
```json
PUT /games/540
{
  "popularity": 4,
  "developer": "Updated Developer"
}
```

## Technologies

- Node.js
- Express.js
- TypeScript
- JSON


