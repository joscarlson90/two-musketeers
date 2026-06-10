// HÄR SKRIVER NI KODEN FÖR ATT ANSLUTA TILL DATABASEN OCH STARTA SERVERN!

import { app } from "./app.ts";
import mongoose from "mongoose";

const port = process.env.PORT ?? 3000;
const dbURL =
  process.env.DATABASE_URL ?? "mongodb://localhost:27017/file-storage";

await mongoose.connect(dbURL);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
