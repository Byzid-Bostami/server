const app = require("./app");
require("dotenv").config();
const {mongoConnect} = require('./Model/MongoConnect');



const PORT = process.env.PORT || 5001;

app.listen(PORT, async()=>{
    await mongoConnect();
    console.log(`server run at http://localhost:${PORT}/`)
})