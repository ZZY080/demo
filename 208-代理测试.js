const express = require("express");
const app = express();
app.use(express.json());
app.get("/api", (req, res) => {
  res.send({
    code: 200,
    message: "成功",
    data: {
      name: "zzy",
    },
  });
});

app.listen(8087, "127.0.0.1", () => {
  console.log(`Server run http://127.0.0.1:8087`);
});
