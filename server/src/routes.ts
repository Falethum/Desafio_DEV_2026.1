import express from "express";
import { createUser, deleteUser, readAllUsers, updateUser } from "./controllers/UserController";
import { createCalcado, deleteCalcado, readAllCalcado, updateCalcado } from "./controllers/CalcadoController";
 
const routes = express.Router();

routes.post("/users", createUser);
routes.get("/users", readAllUsers);
routes.patch("/users/:id", updateUser);
routes.delete("/users/:id", deleteUser);

routes.post("/calcado", createCalcado);
routes.get("/calcado", readAllCalcado);
routes.patch("/calcado/:id", updateCalcado);
routes.delete("/calcado/:id", deleteCalcado);

export default routes;