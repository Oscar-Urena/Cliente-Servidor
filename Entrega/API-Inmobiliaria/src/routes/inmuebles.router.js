"use strict";
import { Router } from "express";
import * as X from "../controller/inmuebles.controller.js";

const router = Router();

router.get("/inmuebles", X.getInmuebles);

router.get("/inmuebles/:id", X.getInmueble);

router.get("/inmuebles/buscar", X.getInmueble);

router.post("/inmuebles", X.postInmueble);

router.put("/inmuebles/:id", X.putInmueble);

router.patch("/inmuebles/:id", X.patchInmueble);

router.delete("/inmuebles/:id", X.deleteInmueble);

export { router as routerInmuebles };