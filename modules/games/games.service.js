import GamesSchema from "./games.schema.js";


export function getAllGames() {
  return GamesSchema.find();
}

export function getGameById(gameId) {
  return GamesSchema.findOne({ _id: gameId })
}

export function getGameByName(name) {
  return GamesSchema.findOne({ name })
}

export async function createGame({ name, description, editor, price, thumbnail }) {
  return GamesSchema.create({ name, description, editor, price, thumbnail });
}

export function updateGameById({ gameId, payload }) {
  return GamesSchema.findOneAndUpdate(
    { _id: gameId },
    { $set: { ...payload } },
    { new: true }
  )
}

export function deleteGameById(gameId) {
  return GamesSchema.deleteOne({ _id: gameId })
}

