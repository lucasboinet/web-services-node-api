import UsersSchema from './users.schema.js'

export function getAllUsers() {
  return UsersSchema.find();
}

export function getOneByEmail(email) {
  return UsersSchema.findOne({ email })
}

export function getUserById(userId) {
  return UsersSchema.findOne({ _id: userId })
}

export function updateUserById({ userId, payload }) {
  return UsersSchema.findOneAndUpdate(
    { _id: userId },
    { $set: { ...payload } },
    { new: true }
  )
}

export function deleteUserById(userId) {
  return UsersSchema.deleteOne({ _id: userId })
}

export async function createUser({ username, email }) {
  return UsersSchema.create({ username, email });
}

