import { Router } from "../deps.js";
import * as indexController from "./controllers/indexController.js";
import * as listController from "./controllers/listController.js";
import * as itemController from "./controllers/itemController.js";

const router = new Router();   
 
router.get("/", indexController.showIndex);

router.get("/lists", listController.showLists); // user's shopping lists
router.post("/lists", listController.addList); // Create a new shopping list
router.post("/lists/:id/delete", listController.deleteList);

router.get("/lists/:id", itemController.showItems); // a specific list
router.post("/lists/:id", itemController.addItem); 

router.post("/lists/:list_id/collect/:item_id", itemController.collectItem); // collect item from the list
//router.post("/lists/collect/:id", itemController.collectItem); // collect item from the list


export { router };
