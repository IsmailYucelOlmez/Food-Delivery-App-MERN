
// Switch to the fooddelivery database
db = db.getSiblingDB('fooddelivery');

// Get environment variables from shell
var username = process.env.MONGO_USERNAME || 'admin';
var password = process.env.MONGO_PASSWORD || 'password';

// Create a user for the fooddelivery database
db.createUser({
  user: username,
  pwd: password,
  roles: [
    {
      role: 'readWrite',
      db: 'fooddelivery'
    }
  ]
});

// Create collections
db.createCollection('users');
db.createCollection('restaurants');
db.createCollection('orders');
db.createCollection('drivers');

print('MongoDB initialization completed successfully!');
