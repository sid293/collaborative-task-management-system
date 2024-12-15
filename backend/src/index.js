let connectDb = require('./utils/db');
let express = require('express');
let dotenv = require('dotenv');
let UserRouter = require('./routes/Users');
let ProjectsRoutes = require('./routes/ProjectsRoutes');
let TasksRoutes = require('./routes/TasksRoutes');
const cors = require("cors");
const authenticate = require('./middlewares/authenticate');

dotenv.config();

connectDb().then(()=>{
    console.log("db connection success");
}).catch((err)=>{
    console.log("error connection db: ",err);
})

let app = express();
app.use(express.json());
app.use(cors());

app.use("/user",UserRouter);
app.use("/project",authenticate,ProjectsRoutes);
app.use("/task",authenticate,TasksRoutes);


app.listen("3000",()=>{
    console.log("app listening on 3000");
})