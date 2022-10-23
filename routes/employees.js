import { Router } from "express";
import EmployeeModel from "../models/employees.js";

const routes = Router();

routes.get("/employees", async (req, res) => {
  try {
    const emp = await EmployeeModel.find();
    return res.status(200).send(emp);
  } catch (error) {
    return res.status(400).send(error);
  }
});

routes.post("/employees", async (req, res) => {
  try {
    const newEmp = new EmployeeModel(req.body);
    const confAdd = await newEmp.save();
    return res.status(201).send({
      status: true,
      message: "New employee saved in database.",
      details: {
        confAdd,
      },
      date: Date(),
    });
  } catch (error) {
    return res.status(400).send(error);
  }
});

routes.get("/employees/:eid", async (req, res) => {
  const foundEmp = await EmployeeModel.findById(req.params.eid);
  if (!foundEmp) {
    return res.status(400).send({
      status: false,
      message: "Employee not found",
    });
  }
  return res.status(200).send({
    status: true,
    details: {
      foundEmp,
    },
    date: Date(),
  });
});

routes.put("/employees/:eid", async (req, res) => {
  const foundEmp = await EmployeeModel.findByIdAndUpdate(
    req.params.eid,
    req.body
  );
  if (!foundEmp) {
    return res.status(400).send({
      status: false,
      message: "Employee not found",
    });
  }
  return res.status(200).send({
    status: true,
    message: "Updated Employee details",
    details: {
      foundEmp,
    },
    date: Date(),
  });
});

routes.delete("/employees", async (req, res) => {
  try {
    const byeEmp = await EmployeeModel.findByIdAndDelete(req.query.eid);
    if (!byeEmp) {
      return res.status(400).send({
        status: false,
        message: "Employee not found",
      });
    }
    return res.status(204).send({
      status: true,
      message: "Deleted Employee",
      date: Date(),
    });
  } catch (error) {
    return res.status(400).send(error);
  }
});

export default routes;
