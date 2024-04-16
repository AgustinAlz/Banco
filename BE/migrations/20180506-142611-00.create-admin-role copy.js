/* globals ObjectId */
exports.name = 'create-admin-role'
exports.description = 'creates the admin role'

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
      _id: new ObjectId('6564e867efbc80e8f01e8b85'),
      description: "admin",
      adminPermission: true,
      createdAt: "2023-11-27T19:05:11.609Z",
      updatedAt: "2023-11-27T19:05:11.609Z",
    },
    done,
  )
}

exports.down = function down(db, done) {
  db.collection('roles').deleteOne(
    {
      _id: new ObjectId('6564e867efbc80e8f01e8b85'),
    },
    done,
  )
}
