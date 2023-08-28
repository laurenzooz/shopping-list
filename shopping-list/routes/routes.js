import { Router } from "../deps.js";
import * as indexController from "./controllers/indexController.js";
import * as userController from "./controllers/userController.js";
import * as listController from "./controllers/listController.js";
import * as itemController from "./controllers/itemController.js";

const router = new Router();   
 
router.get("/", indexController.showIndex);

// authentication
router.get("/auth/login", userController.showLoginForm);
router.post("/auth/login", userController.processLogin);

router.get("/auth/register", userController.showRegistrationForm);
router.post("/auth/register", userController.registerUser);

// lists
router.get("/lists", listController.showLists); // user's shopping lists
router.post("/lists", listController.addList); // Create a new shopping list
router.post("/lists/:id/delete", listController.deleteList);

router.post("/lists/:id/up", listController.moveUp); // change the order
router.post("/lists/:id/down", listController.moveDown);

// items in lists
router.get("/lists/:id", itemController.showItems); // a specific list
router.post("/lists/:id", itemController.addItem); 

router.post("/lists/:list_id/collect/:item_id", itemController.collectItem); // collect item from the list


export { router };
