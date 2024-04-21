/* eslint-disable no-unused-vars */
import mongodb from 'mongodb'

const { ObjectId } = mongodb

const initialAccountTypes = [
  {
    _id: new ObjectId('000000000000000000000000'),
    description: "Cuenta Corriente USD",
    currency: "Dólar Estadounidense",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId('000000000000000000000001'),
    description: "Cuenta Corriente ARS",
    currency: "Peso Argentino",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId('000000000000000000000002'),
    description: "Caja de Ahorro USD",
    currency: "Dólar Estadounidense",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId('000000000000000000000003'),
    description: "Caja de Ahorro ARS",
    currency: "Peso Argentino",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export async function up(db, client) {
  await db.collection('accounttypes').insertMany(initialAccountTypes)
}
export async function down(db, client) {
  await db.collection('accounttypes').deleteMany({
    _id: {
      $in: initialAccountTypes.map((accountType) => accountType._id),
    },
  })
}
