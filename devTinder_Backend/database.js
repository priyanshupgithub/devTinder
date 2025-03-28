const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb+srv://priyanshujii0001:Mongodb123@devtinder.jksoo.mongodb.net/';
const client = new MongoClient(url);

// Database Name
const dbName = 'student';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('User');

  
  //insert/insert
  const data = {
    "firstName":"Deepika",
    "lastName":"Padukon",
    "age":"44",
    "gender":"female"
  }
  // const insertResult = await collection.insertMany([data]);
  // console.log('Inserted documents =>', insertResult);
  
  
  //Read
  const findResult = await collection.find({}).toArray();
  console.log('Found documents =>', findResult);

  //update
  const updateResult = await collection.updateOne({ "firstName":"Deepika" }, { $set: { firstName: "Ranveer Singh" } });
  console.log('Updated documents =>', updateResult);

 
  //delete
  // const deleteResult = await collection.deleteMany({ "firstName":"Deepika" });
  // console.log('Deleted documents =>', deleteResult)
  return 'done.';

}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
