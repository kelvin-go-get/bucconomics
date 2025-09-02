import app from "./app";
import db from "./config/db.config";

const PORT = process.env.PORT || 5000;

db.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error("Failed to connect to the database:", err);
  });
