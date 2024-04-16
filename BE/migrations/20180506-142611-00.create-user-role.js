/* globals ObjectId */
exports.name = 'create-user-role'
exports.description = 'creates the user role'

exports.isReversible = true
exports.isIgnored = false

exports.up = function up(db, done) {
  // const adminPermissionIds = [
  //   'user.create',
  //   'user.read',
  //   'user.query',
  //   'user.update',
  //   'user.remove',
  // ]

  db.collection('roles').insertOne(
    /*{
      _id: new ObjectId('000000000000000000000000'),
      name: 'admin',
      // permissions: adminPermissionIds,
      createdAt: new Date(),
      updatedAt: new Date(),
    },*/
    {
      _id: new ObjectId('6564e86eefbc80e8f01e8b87'),
      description: "user",
      adminPermission: false,
      createdAt: "2023-11-27T19:05:18.230Z",
      updatedAt: "2023-11-27T19:05:18.230Z",
    },
    done,
  )
}

exports.down = function down(db, done) {
  db.collection('roles').deleteOne(
    {
      _id: new ObjectId('6564e86eefbc80e8f01e8b87'),
    },
    done,
  )
}
