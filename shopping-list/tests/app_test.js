import { app } from "../app.js";
import { superoak } from "https://deno.land/x/superoak@4.8.1/mod.ts";


Deno.test("GET to /lists redirects, haven't logged in", async () => {
    const testClient = await superoak(app);
    await testClient.get("/lists")
        .expect(302);
})