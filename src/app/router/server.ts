import Koa from "koa";
import router from "./router";

const app = new Koa();

app.use(router.routes());

app.use(ctx => {
    ctx.body = "我是根路径默认展示文本"
})

export function run() {
    app.listen(3000, () => {
        console.log('server is run in ==> http://localhost:3000');
    });
}


