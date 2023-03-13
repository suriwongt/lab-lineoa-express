import { Router } from "express";
import WebhookController from "./controller/webhook.controller";

class Routes{

	public router = Router();
	public controller = new WebhookController();

    constructor() {
		this.initializeRoutes();
	}
	private initializeRoutes() {
		this.router.get(`/webhook`, this.controller.handleGetWebHook);
		this.router.post(`/webhook`, this.controller.handlePostWebHook);
	}

}

export default new Routes()