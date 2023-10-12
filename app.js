const express = require("express");
const cors = require("cors");
const referrerPolicy = require("referrer-policy");
const sequelize = require("./config/database");
require("./models/slot");
const bookingslot = require("./models/slot");

const app = express();
app.use(referrerPolicy({ policy: "origin" }));
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/booktimeslot", async (req, res) => {
  try {
    const response = await bookingslot.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
});

// Book a time slot
app.post("/booktimeslot", async (req, res) => {
  try {
    const { time, name, emailId } = req.body;
    const postRequest = await bookingslot.create({
      time,
      name,
      emailId,
    });

    res.status(200).json(postRequest);
  } catch (error) {
    res.json({ message: "internal server error" });
  }
});

app.delete("/booktimeslot/:id", async (req, res) => {
  try {
    await bookingslot.destroy({ where: { id: req.params.id } });
    res.json({ message: "bookingslot deleted" });
  } catch (err) {
    console.log(err);
  }
});

const PORT = 8000;

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
  })
  .catch((error) => console.log(error));
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
