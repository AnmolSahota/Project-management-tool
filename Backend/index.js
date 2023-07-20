const express = require("express");
const { Connection } = require("./db");
const { userRoute } = require("./routes/user.route");
const projectRoute = require("./routes/project.route");
const auth = require("./middleware/auth.middleware");
const tasktRoute = require("./routes/task.route");
const profileRoute = require("./routes/profile.route");
const resetRoute = require("./routes/reset.route");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("perfect");
});
app.use("/", userRoute);
app.use("/projects", auth, projectRoute);
app.use("/task", tasktRoute);
app.use("/profile", profileRoute);
app.use("/reset", resetRoute);
app.listen(8080, async () => {
  try {
    await Connection;
    console.log("Connected");
  } catch (error) {
    console.log(error);
  }
});
