import { NextFunction, Request, Response } from "express";
import user from "../models/user";
import axios from "axios";
import webhookService from "../service/webhook.service";

class WebhookController {
  constructor() {}

  public handleGetUserHN = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const resp = await webhookService.getHN(req.body.hn);
      res.status(200).json(resp);
    } catch (error) {
      res.status(500).json(error);
    }
  };
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
    const body = req.body;
    const resp = await webhookService.getHN(body.hn_no);
    const profile = resp.detail;
    if (profile.gender === "F") {
      webhookService.handleChageRichmenu(body.userId, process.env.MENU2 ?? "");
    } else {
      webhookService.handleChageRichmenu(body.userId, process.env.MENU1 ?? "");
    }
    body.profile = profile;
    const create = await new user(body);
    await create.save();
    res.status(200).json({ code: 200, data: create });
  };
}

export default WebhookController;
