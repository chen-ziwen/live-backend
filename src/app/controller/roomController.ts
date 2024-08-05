import { Context, Next } from "koa";


async function roomConnect(ctx: Context, next: Next) {

    ctx.body = "room connect ===>";
    await next();
}


async function roomDisconnect(ctx: Context, next: Next) {

    ctx.body = "room disConnect ===>"
    await next();
}


export { roomConnect, roomDisconnect };
