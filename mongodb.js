const mongodb = require('mongodb');

const MongoClient  = mongodb.MongoClient;


const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName='task-manager';

MongoClient.connect(connectionURL, {useUnifiedTopology: true}, (error, client)=> {
    if(error){
        return console.log('Unable to connect to database');
    }
    const db = client.db(databaseName);

    // db.collection('users').insertOne({
    //     name:'Rahul',
    //     age:
    // })


    db.collection('tasks').insertMany([
        {
            description: "Clean House",
            comlpeted: false
        },
        {
            description: "Hit the Gym",
            comlpeted: false
        },
        {
            description: "Pot Plants",
            comlpeted: false
        }
    ], (error, result) => {
        if(error){
            return console.log("Unable to insert")
        }
        console.log(result.ops);
    })


})