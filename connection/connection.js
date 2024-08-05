const mongoose = require('mongoose')


const dbConnection = async()=> {
    try{
         await mongoose.connect("mongodb://localhost:27017/Blog", {

        }).then(() => 
            console.log(`Dbconnection successfully`)
        )
    }catch(err){
        console.log(err.mewwsage,`dnConnection is not success`)
    }
   
}

module.exports = dbConnection
