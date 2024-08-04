import Koa from "koa";

const app = new Koa();

app.use(ctx => {
    ctx.body = "Hello chenyihuan";
});

export function run() {
    app.listen(3000, () => {
        console.log('server is run in ==> http://localhost:3000');
    });
}


