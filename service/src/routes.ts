import { Router } from "express";
import WebhookController from "./controller/webhook.controller";
import UserController from "./controller/user.controller";
class Routes {
  public router = Router();
  public hook_controller = new WebhookController();
  public user_controller = new UserController();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`/user`, this.user_controller.handleGetUser);
    this.router.post(`/user`, this.user_controller.handlePostWebHook);

    this.router.get(`/webhook`, this.hook_controller.handleGetWebHook);
    this.router.post(`/webhook`, this.user_controller.handlePostWebHook);
  }
}

export default new Routes();
