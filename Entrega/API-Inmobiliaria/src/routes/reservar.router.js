"use strict";

import { Router } from "express";
import * as Reserva from "../controller/reservas.controller.js";

const router = Router();

router.get("/reservas", Reserva.getReservas);

router.get("/reservas/:id", Reserva.getReserva);

router.post("/reservas", Reserva.postReserva);

router.put("/reservas/:id", Reserva.putReserva);

router.delete("/reservas/:id", Reserva.deleteReserva);

export { router as routerReserva };