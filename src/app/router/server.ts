import Koa from "koa";
import router from "./router";

const app = new Koa();

app.use(router.routes());

export function run() {
    app.listen(3000, () => {
        console.log('server is run in ==> http://localhost:3000');
    });
}


