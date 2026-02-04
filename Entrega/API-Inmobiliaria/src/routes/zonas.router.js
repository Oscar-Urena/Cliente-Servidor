"use strict";

import { Router } from "express";
import * as Zona from "../controller/zonas.controller.js";

const router = Router();

router.get("/zonas", Zona.getZonas);

router.get("/zonas/:id", Zona.getZona);

router.post("/zonas", Zona.postZona);

router.put("/zonas/:id", Zona.putZona);

router.delete("/zonas/:id", Zona.deleteZona);

export { router as routerZona };