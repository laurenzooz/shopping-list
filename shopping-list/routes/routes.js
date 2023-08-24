import { Router } from "../deps.js";
import * as indexController from "./controllers/indexController.js";
import * as listController from "./controllers/listController.js";

const router = new Router();   

router.get("/", indexController.showIndex);

router.get("/lists", listController.showLists); // open user's shopping lists

router.post("/lists", listController.addList); // Create a new shopping list

export { router };
