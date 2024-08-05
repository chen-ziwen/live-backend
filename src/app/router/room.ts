import Router from "koa-router";
// import { roomConnect, roomDisconnect } from "../controller/roomController";
import { roomConnect, roomDisconnect } from "@/app/controller/roomController";


const roomRouter = new Router({
    prefix: "/room"
});

roomRouter.get('/connect', roomConnect);
roomRouter.get('/disconnect', roomDisconnect);

export default roomRouter;
