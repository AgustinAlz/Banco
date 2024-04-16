/* globals ObjectId */
exports.name = 'create-causd-accounttype'
exports.description = 'creates the account type dolar savings account'

exports.isReversible = true
exports.isIgnored = false


exports.up = function up(db, done) {
  db.collection('accounttypes').insertOne(
    {
      _id: new ObjectId('65c94f3b2263004b5fd146be'),
      description: "Caja de Ahorro USD",
      currency: "Dólar Estadounidense",
      createdAt: "2024-02-11T22:50:35.415Z",
      updatedAt: "2024-02-11T22:50:35.415Z",
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