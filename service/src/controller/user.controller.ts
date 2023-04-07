import { NextFunction, Request, Response } from "express";

class WebhookController {
  constructor() {}

  public handleGetUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.status(200).json({ code: 200, data: req.body });
  };
  public handlePostWebHook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.status(200).json({ code: 200, data: req.body });
  };
}

export default WebhookController;
