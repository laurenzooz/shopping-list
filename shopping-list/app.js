import { Application, Session } from "./deps.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { router } from "./routes/routes.js";


const app = new Application();
app.use(Session.initMiddleware());

app.use(errorMiddleware);
app.use(renderMiddleware);
app.use(router.routes());

app.listen({ port: 7777 });
