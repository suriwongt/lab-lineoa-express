import { WebhookEvent } from "@line/bot-sdk";
import { NextFunction, Request, Response } from "express";
import webhookService from "../service/webhook.service";

class WebhookController {
  constructor() {}

  public handleGetWebHook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.status(200).json({ message: "ok" });
  };
  public handlePostWebHook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { body } = req;

    const handleEventData = await Promise.all(
      body.events.map(async (event: WebhookEvent) => {
        if (event.source.userId === "Udeadbeefdeadbeefdeadbeefdeadbeef") {
          return;
        }
        switch (event.type) {
          case "message":
            await webhookService.handleReplyTokenMessage(
              event.replyToken,
              event.message,
              event.source
            );
            break;
          case "follow":
            // await lineService.handleAddFriend(event);
            break;
          case "unfollow":
            // await lineService.handleUnFriend(event);
            break;
          case "join":
            // await lineService.handleAddGroup(event);
            break;
          case "leave":
            // await lineService.handleLeaveGroup();
            break;
          case "memberJoined":
            break;
          case "memberLeft":
            break;
          case "postback":
            await webhookService.handlePostBack(
              event.replyToken,
              event.postback,
              event.source
            );
            break;
          case "beacon":
            break;
          case "things":
            break;
          default:
            return;
        }
        if (event.source.type === "group") {
          // return chatGroupService.getGroupByGroupId(dto);
        } else {
          // return customerService.getCustomerByUserId(event.source.userId, channel._id);
        }
      })
    );

    res.status(200).json({ code: 200, data: handleEventData });
  };

  public test = async (req: Request, res: Response, next: NextFunction) => {
    await webhookService.testFlex();
    res.status(200).json({ message: "ok" });
  };
}

export default WebhookController;
