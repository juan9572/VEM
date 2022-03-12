const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const dbName = "VEM_BD";
const client = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology:true });

client.connect(function(err){
    console.log("Empezando backup...");
    const db = client.db(dbName);
    getDocuments(db,function(docs){
        client.close();
        try{
            fs.writeFileSync('./database/data/VEM_BD_Backup_Collection.json',JSON.stringify(docs));
            console.log("Backup exitoso");
        }catch(err){
            console.log("No se pudo hacer el backup", err);
        }
    })
});

const getDocuments = async function(db, callback) {
    const query = { };
    await db.collection("pins").find(query).toArray(function(err, result){ 
          if (err) throw err; 
          callback(result); 
    }); 
};

module.exports = exportDB;
