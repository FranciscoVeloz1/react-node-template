import { Router } from "express";
import { authControllers } from "../controllers";

const router = Router();

router.use((_req, res, next) => {
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  next();
});

router.post("/auth/signin", authControllers.signIn);

export default router;
