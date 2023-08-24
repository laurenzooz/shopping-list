import { Router } from "../deps.js";
import * as indexController from "./controllers/indexController.js";
import * as listController from "./controllers/listController.js";

const router = new Router();   

router.get("/", indexController.showIndex);

// open user's shopping lists
router.get("/lists/:user_id", indexController.showIndex);

export { router };
