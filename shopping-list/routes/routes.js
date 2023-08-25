import { Router } from "../deps.js";
import * as indexController from "./controllers/indexController.js";
import * as listController from "./controllers/listController.js";
import * as itemController from "./controllers/itemController.js";

const router = new Router();   

router.get("/", indexController.showIndex);

router.get("/lists", listController.showLists); // user's shopping lists
router.post("/lists", listController.addList); // Create a new shopping list

router.get("/lists/:id", itemController.showItems); // a specific list
router.post("/lists/:id", itemController.addItem); 


export { router };
