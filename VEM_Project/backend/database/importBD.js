const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const dbName = 'VEM_BD';
const client = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology:true });

client.connect(function(err){
    const db = client.db(dbName);
    const data = fs.readFileSync("./database/collections/VEM_BD_Backup_Collection.json");
    const docs = JSON.parse(data.toString());
    db.collection("pins").insertMany(docs,function(err, result){
        if(err) throw err;
        console.log("Insertando docs...", result.insertedCount);
        client.close();
    });
});

