/* eslint-disable no-unused-vars */
import mongodb from 'mongodb'

const { ObjectId } = mongodb

const initialUsers = [
  {
    _id: new ObjectId('000000000000000000000000'),
    givenName: "Super",
    lastName: "Admin",
    email: "superadmin@bancochelo.com",
    role: "6564e867efbc80e8f01e8b85",
    password: "$2a$10$jltd622fcFgyQZXgYOsVVukkuN/4I9cHkGQm8pEw8nLpmimrPKgSq",//123
    fullName: "Super Admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,    
  },
  {
    _id: new ObjectId('000000000000000000000001'),
    givenName: "Ramiro",
    lastName: "Ruiz",
    email: "ramiro.ruiz@gmail.com",
    role: new ObjectId('000000000000000000000001'), // User
    password: "$2a$10$NFTuI9RaIC1v1Qek70raaukje4DoCSPTfD2d0bmEZhEThHVDFee1y",//123
    fullName: "Ramiro Ruiz",
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
  },
]

export async function up(db, client) {
  await db.collection('users').insertMany(initialUsers)
}
export async function down(db, client) {
  await db.collection('users').deleteMany({
    _id: {
      $in: initialUsers.map((user) => user._id),
    },
  })
}
