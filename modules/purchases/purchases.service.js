import PurchasesSchema from './purchases.schema.js'

export function getAllPurchases() {
  return PurchasesSchema.find();
}

export function getPurchaseById(purchaseId) {
  return PurchasesSchema.findOne({ _id: purchaseId })
}

export function updatePurchaseById({ purchaseId, payload }) {
  return PurchasesSchema.findOneAndUpdate(
    { _id: purchaseId },
    { $set: { ...payload } },
    { new: true }
  )
}

export function deletePurchaseById(purchaseId) {
  return PurchasesSchema.deleteOne({ _id: purchaseId })
}

export function createPurchase({ userId, gameId, paymentMethod, total }) {
  return PurchasesSchema.create({ userId, gameId, paymentMethod, total });
}

export function getPurchaseByUserAndGameId({ userId, gameId }) {
  return PurchasesSchema.findOne({ userId, gameId, refundedAt: { $exists: false } })
}

