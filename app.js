const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const slot = require("./models/slot");
const bookingslot = require("./models/slot");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Get request
app.get("/", async (req, res) => {
  try {
    const getRequest = await bookingslot.findAll();
    res.json({
      status: "success",
      data: getRequest,
    });
  } catch (error) {
    console.log(error);
  }
});

//POST request
app.post("/post", async (req, res) => {
  try {
    const { time, name, emailId } = req.body;
    const postRequest = await bookingslot.create({
      time,
      name,
      emailId,
    });
    res.status(200).json({ postRequest });
  } catch (error) {
    res.json({ message: "internal server error" });
  }
});

//Delete request
app.delete("/post/delete/:id", async (req, res) => {
  try {
    const deleteRequest = await bookingslot.destroy({
      where: { id: req.params.id },
    });

    res.json({
      status: "success",
      data: "slot has been deleted",
    });
    console.log(deleteRequest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
const PORT = process.env.PORT || 6000;

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
  })
  .catch((error) => console.log(error));
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
