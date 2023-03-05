const mongoose = require('mongoose')
const uri = process.env.ATLAS_URI
var _db;
const connectionParams = { useNewUrlParser: true, useUnifiedTopology: true}
mongoose.set('strictQuery', true);
module.exports={
    connectToServer: function(callback){
        mongoose.connect(uri,connectionParams).then(() => {
            _db = mongoose.connection;
            console.log(`Connected to db ${_db.name}`);
        }).catch((e)=>{
            callback(e);
        })
    },
    getDb: function () {
        return _db;
    }
}