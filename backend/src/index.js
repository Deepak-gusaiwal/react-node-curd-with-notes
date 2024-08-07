import "dotenv/config";
import { app } from "./app.js";
import { dbConnection } from "./db/connection.js";

dbConnection()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("server is running at PORT ::", process.env.PORT || 5000);
    });
  })
  .catch((err) => {
    console.error("B - Connection Failed", err);
  });
