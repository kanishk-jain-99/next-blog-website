import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid Input!" });
      return;
    }

    //Store it in a DB

    const newMessage = {
      email,
      name,
      message,
    };
    let client;
    try {
      client = await MongoClient.connect(process.env.MONGO_CLIENT_STRING);
    } catch (error) {
      res.status(500).json({ message: "Could not connect to DB" });
      return;
    }

    const db = client.db();

    let result;
    try {
      result = await db.collection("messages").insertOne(newMessage);
      newMessage._id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Could not connect to DB" });
      return;
    }

    client.close();

    res
      .status(201)
      .json({ message: "Successfully stored message!", data: newMessage });
  }
}
