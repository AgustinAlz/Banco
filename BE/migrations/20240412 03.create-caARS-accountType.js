/* globals ObjectId */
exports.name = 'create-caars-accounttype'
exports.description = 'creates the account type pesos savings account'

exports.isReversible = true
exports.isIgnored = false


exports.up = function up(db, done) {
  db.collection('accounttypes').insertOne(
    {
      _id: new ObjectId('65c94f482263004b5fd146c0'),
      description: "Caja de Ahorro ARS",
      currency: "Peso Argentino",
      createdAt: "2024-02-11T22:50:48.983Z",
      updatedAt: "2024-02-11T22:50:48.983Z",
    },
    done,
  )
}

exports.down = function down(db, done) {
  db.collection('accounttypes').deleteOne(
    {
      _id: new ObjectId('65c94f482263004b5fd146c0'),
    },
    done,
  )
}