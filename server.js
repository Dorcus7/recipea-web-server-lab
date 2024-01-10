const express = require("express")
const port = 3000
const cors = require("cors")
const recipeRoutes = require("./src/routes/recipea-routes")



const app = express()
app.use(cors());


app.use("",recipeRoutes)





app.listen(port, ()=>console.log(`server running on port ${port}`))
