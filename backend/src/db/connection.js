import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    const {
      connection: { host, port },
    } = await mongoose.connect(`mongodb+srv://root:admin@cluster0.qsv7g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
    console.log("MongoDb Connected on ::", host, "with port ::", port);
  } catch (error) {
    console.error("Mongodb Connection Failed ::", error);
    process.exit(1);
  }
};
