const express = require("express");
require("dotenv").config();
const cors = require("cors")
const DBConnection = require("./config/db")
const colors = require("colors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schemas/schema");


// establish DB connection
DBConnection()

// create an express object
const app = express()
// setup cors policy
app.use(cors())


// setup grahpiql
app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: process.env.PROJECT_ENV === "development",
}));


// listen for incoming connections
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server listing at localhost:${PORT}`))

