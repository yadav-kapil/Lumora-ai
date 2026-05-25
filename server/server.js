import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/config/db.js";

const startServer = async () => {
  try {
    await connectDB();
    app.listen(config.PORT, () => {
      console.log(`Server Listening at Port : ${config.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
