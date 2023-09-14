const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const cors = require("cors");

app.use(cors());
app.use(express.json());
require('dotenv').config();

const db_user = process.env.db_user;
const db_password = process.env.db_password;


const uri = `mongodb+srv://${db_user}:${db_password}@cluster0.uzyhqeg.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const db = client.db("task-manager");
        const taskCollection = db.collection("tasks");
        app.get("/tasks", async (req, res) => {
            const cursor = taskCollection.find({});
            const tasks = await cursor.toArray();

            res.send({ status: true, data: tasks });
        });
    } finally {
    }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`demo app is listening on port ${port}`);
});