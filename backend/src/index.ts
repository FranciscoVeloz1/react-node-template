import app from "./app";
import { URL } from "./config";

app.listen(app.get("port"), () => {
  console.log(`Server on ${URL}:${app.get("port")}`);
});
