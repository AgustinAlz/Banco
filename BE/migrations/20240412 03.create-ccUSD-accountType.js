/* globals ObjectId */
exports.name = 'create-caars-accounttype'
exports.description = 'creates the account type usd checking account'

exports.isReversible = true
exports.isIgnored = false


exports.up = function up(db, done) {
  db.collection('accounttypes').insertOne(
    {
      _id: new ObjectId('65c94f192263004b5fd146ba'),
      description: "Cuenta Corriente USD",
      currency: "Dólar Estadounidense",
      createdAt: "2024-02-11T22:50:01.307Z",
      updatedAt: "2024-02-11T22:50:01.307Z",
    },
    done,
  )
}

exports.down = function down(db, done) {
  db.collection('accounttypes').deleteOne(
    {
      _id: new ObjectId('65c94f192263004b5fd146ba'),
    },
    done,
  )
}
