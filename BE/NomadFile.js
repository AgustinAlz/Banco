const mongodb = require('mongodb')
//const config = require('config')


const { MongoClient } = mongodb
const { ObjectId } = mongodb


// eslint-disable-next-line
//console.log(`Running migrations on DB ${"mongodb://127.0.0.1/banco"} for tenant ${config.tenant}\n`)
console.log(`Running migrations on DB ${"mongodb://127.0.0.1/banco"} for tenant \n`)

module.exports = function nomadRunner(nomad) {

  //nomad.context.config = config
  //nomad.context.ObjectId = ObjectId

  nomad.driver({
    connect(cb) {
      //MongoClient.connect(config.mongo.url, (err, client) => {
      MongoClient.connect("mongodb://127.0.0.1/banco", (err, client) => {
        if (err) {
          return cb(err)
        }
        this.client = client
        //this.db = client.db(config.mongo.db)
        this.db = client.db("mongodb://127.0.0.1/banco")
        return cb(null, this.db)
      })
    },

    disconnect(cb) {
      this.client.close(cb)
    },

    insertMigration(migration, cb) {
      this.db.collection('migrations').insertOne(migration, cb)
    },

    getMigrations(cb) {
      this.db.collection('migrations').find().toArray(cb)
    },

    updateMigration(filename, migration, cb) {
      this.db.collection('migrations').updateOne(
        {
          filename,
        },
        {
          $set: migration,
        },
        cb,
      )
    },

    removeMigration(filename, migration, cb) {
      this.db.collection('migrations').updateOne(
        {
          filename,
        },
        {
          $set: migration,
        },
        cb,
      )
    },
  })
}
