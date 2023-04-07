import { NextFunction, Request, Response } from "express";
import user from "../models/user";

class WebhookController {
  constructor() {}

  public handleGetUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const dto = await user.find();
    res.status(200).json({ code: 200, data: dto });
  };
  public handlePostWebHook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const create = await new user(req.body);
    await create.save();
    res.status(200).json({ code: 200, data: create });
  };
}

export default WebhookController;
