/* eslint-disable no-unused-vars */
import mongodb from 'mongodb'

const { ObjectId } = mongodb

const initialRoles = [
  {
    _id: new ObjectId('000000000000000000000000'),
    description: 'admin',
    adminPermission: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: new ObjectId('000000000000000000000001'),
    description: 'user',
    adminPermission: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export async function up(db, client) {
  await db.collection('roles').insertMany(initialRoles)
}
export async function down(db, client) {
  await db.collection('roles').deleteMany({
    _id: {
      $in: initialRoles.map((role) => role._id),
    },
  })
}
