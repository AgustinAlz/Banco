/* globals ObjectId */
exports.name = 'create-admin-user'
exports.description = 'creates the admin user'

exports.isReversible = true
exports.isIgnored = false


exports.up = function up(db, done) {
  db.collection('users').insertOne(
    {
      _id: new ObjectId('661ae64436f68c15d510d36b'),
      givenName: "Aurelio",
      lastName: "Gomez",
      email: "aurelio.gomez@mail.com",
      role: "6564e86eefbc80e8f01e8b87",
      password: "$2a$10$4YRfKdg7arxPJ3sI68bD9OeFoM06J1TCDaacrcoHKg9gI.qTgZ7y.",
      fullName: "Aurelio Gomez",
      createdAt: "2024-04-13T20:08:36.820Z",// new Date(),
      updatedAt: "2024-04-13T20:08:36.820Z",// new Date(),
      __v: 0
    },
    done,
  )
}

exports.down = function down(db, done) {
  db.collection('users').deleteOne(
    {
      _id: new ObjectId('661ae64436f68c15d510d36b'),
    },
    done,
  )
}
