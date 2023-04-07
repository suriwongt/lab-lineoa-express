import { NextFunction, Request, Response } from "express";
import user from "../models/user";
import webhookService from "../service/webhook.service";

class WebhookController {
  constructor() {}

  handleDeleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await webhookService.handleLogout(req.params.userId);
      res.status(200).json({});
    } catch (error) {
      res.status(500).json(error);
    }
  };

  handleGetUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.params;
      const u = await user.find({
        userId,
      });
      res.status(200).json(u);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  public handleGetUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const u = await user.findOne({});
    res.status(200).json({ code: 200, data: u });
  };
  public handlePostUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const body = req.body;
      const resp = await webhookService.getHN(body.hn_no);
      const profile = resp.detail;
      if (profile.gender === "F") {
        webhookService.handleChageRichmenu(
          body.userId,
          process.env.MENU2 ?? ""
        );
      } else {
        webhookService.handleChageRichmenu(
          body.userId,
          process.env.MENU1 ?? ""
        );
      }
      body.profile = profile;
      const create = await new user(body);
      await create.save();
      res.status(200).json({ code: 200, data: create });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };
}

export default WebhookController;
