
dotenv.config();
// Switch to the fooddelivery database
db = db.getSiblingDB('fooddelivery');

// Create a user for the fooddelivery database
db.createUser({
  user: process.env.MONGO_USERNAME,
  pwd: process.env.MONGO_PASSWORD,
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
