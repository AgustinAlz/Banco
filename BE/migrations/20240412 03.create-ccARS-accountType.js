/* globals ObjectId */
exports.name = 'create-caars-accounttype'
exports.description = 'creates the account type pesos checking account'

exports.isReversible = true
exports.isIgnored = false


exports.up = function up(db, done) {
  db.collection('accounttypes').insertOne(
    {
      _id: new ObjectId('65c94f2c2263004b5fd146bc'),
      description: "Caja Corriente ARS",
      currency: "Peso Argentino",
      createdAt: "2024-02-11T22:50:20.497Z",
      updatedAt: "2024-02-11T22:50:20.497Z",
    },
    done,
  )
}

exports.down = function down(db, done) {
  db.collection('accounttypes').deleteOne(
    {
      _id: new ObjectId('65c94f2c2263004b5fd146bc'),
    },
    done,
  )
}
