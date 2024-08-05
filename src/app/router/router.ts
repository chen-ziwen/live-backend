import Router from "koa-router";
import * as routes from ".";

const router = new Router();

let key: keyof typeof routes;
for (key in routes) {
    const route = routes[key];
    router.use(route.routes());
}

export default router;