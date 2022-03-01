const {MongoClient} = require("mongodb");
const docxTables = require("docx-tables");



docxTables({
  file: './data/raw_data/testdata.docx'
}).then((data) => {
  // .docx table data
  
  console.log(data)
}).catch((error) => {
  console.error(error)
})

async function listDatabases(client){

    
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
 
async function main()
{ 

    const url = "mongodb+srv://kiendev:K13ntqk2403@cluster0.eqjnz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    
    try {
        await client.connect();
        await  listDatabases(client);
    } catch (e) {
    console.error(e);
}
finally {
    await client.close();
}
}

main().catch(console.error);