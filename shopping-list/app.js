import { Application, Session } from "./deps.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { serveStaticFiles } from "./middlewares/serveStaticMiddleware.js";
import { router } from "./routes/routes.js";


const app = new Application();
app.use(Session.initMiddleware());

app.use(errorMiddleware);
app.use(renderMiddleware);
app.use(authMiddleware);
app.use(serveStaticFiles);
app.use(router.routes());

app.listen({ port: 7777 });

export { app };