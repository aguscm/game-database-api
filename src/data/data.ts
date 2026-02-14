import type { IGame } from "../interfaces";
import gamesJson from "../data/games.json";

let gamesList: IGame[] = gamesJson;

function validateGameFields(game: Omit<IGame, 'id'>): { valid: boolean; message?: string } {
    const requiredFields = ['title', 'thumbnail', 'short_description', 'genre', 'release_date', 'popularity'];
    
    for (const field of requiredFields) {
        if (game[field] === undefined || game[field] === null || 
            (typeof game[field] === 'string' && game[field].trim() === '') ||
            (Array.isArray(game[field]) && game[field].length === 0)) {
            return { valid: false, message: `${field} is required` };
        }
    }
    
    return { valid: true };
}

function getGames(): IGame[] {
    return gamesList;
}

function getGameById(gameId: number): IGame {
    return gamesList.find((game: IGame) => game.id === gameId);
}

function addGame(game: Omit<IGame, 'id'>): IGame {
    const validation = validateGameFields(game);
    if (!validation.valid) return null;
    
    const newGame: IGame = {
        id: Math.max(0, ...gamesList.map(g => g.id)) + 1,
        ...game
    };
    
    gamesList.push(newGame);
    return newGame;
}

function editGame(id: number, updates: Partial<IGame>): IGame {
    const gameIndex = gamesList.findIndex((game: IGame) => game.id === id);
    
    if (gameIndex === -1) return null;
    
    gamesList[gameIndex] = {
        ...gamesList[gameIndex],
        ...updates
    };
    
    return gamesList[gameIndex];
}

function deleteGame(id: number): boolean {
    const initialLength = gamesList.length;
    gamesList = gamesList.filter((game: IGame) => game.id !== id);
    return gamesList.length < initialLength;
}


export {
    getGames,
    getGameById,
    addGame,
    editGame,
    deleteGame,
    validateGameFields,
}