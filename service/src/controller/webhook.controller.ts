import { NextFunction, Request, Response } from "express";

class WebhookController {

    constructor() { }

    public handleGetWebHook = async (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json({ message: "ok" })
    }
    public handlePostWebHook = async (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json({ message: "ok" })
    }
}

export default WebhookController