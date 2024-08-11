const express = require("express");
const cors = require("cors");

const app = express();
var PORT = 3001;
app.use(express.json());
app.use(cors());
require("./connection");
const BlogModel = require('./Model');

app.post("/add", async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const newEmployee = new BlogModel(req.body);
    const result = await newEmployee.save();
    res.status(201).send({ message: "Employee added", data: result });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).send({ message: "Failed to add employee", error: error.message });
  }
});
app.put("/update/:id", async (req, res) => {
  try {
    const employeeId = req.params.id;
    const updatedData = req.body;

    const updatedEmployee = await BlogModel.findByIdAndUpdate(employeeId, updatedData, {
      new: true,
    });

    if (!updatedEmployee) {
      return res.status(404).send({ message: "Employee not found" });
    }

    res.status(200).send(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).send({ message: "Error updating employee", error: error.message });
  }
});


app.get("/get", async (req, res) => {
  try {
    const employees = await BlogModel.find();
    res.status(200).send(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).send({ message: "Error fetching employees", error: error.message });
  }
});
app.delete('/delete/:id', async (req, res) => {
  try {
    const employeeId = req.params.id;
    const deletedEmployee = await BlogModel.findByIdAndDelete(employeeId);

    if (!deletedEmployee) {
      return res.status(404).send({ message: 'Employee not found' });
    }

    res.status(200).send({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).send({ message: 'Error deleting employee', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});
