import { Client, EventMessage, EventSource, Postback } from "@line/bot-sdk";
import axios from "axios";
import { searckMarketMessage } from "../template/message";
import user, { ResponseHN } from "../models/user";
import { flexUser } from "../template/flex";

class WebhookService {
  private line: Client;

  constructor() {
    this.line = new Client({
      channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || "",
    });
  }

  async handlePostBack(
    replyToken: string,
    postback: Postback,
    source: EventSource
  ) {
    const profile = await this.line.getProfile(source.userId || "");
    if (postback.data === "profile") {
      const mapUser = await user.findOne({ userId: profile.userId });
      const hnprop = await this.getHN(mapUser?.hn_no || "");
      const detail = hnprop.detail;
      const g = detail.gender == "F" ? "หญิง" : "ชาย";
      const message = flexUser(
        profile.displayName ?? "",
        mapUser?.hn_no ?? "",
        g,
        `${detail.firstNameTH} ${detail.lastNameEN}`
      );
      await this.line.replyMessage(replyToken, message as any);
    }
  }

  handleReplyTokenMessage = async (
    replyToken: string,
    message: EventMessage,
    source: EventSource
  ): Promise<any> => {
    try {
      console.log(source);
      switch (message.type) {
        case "text":
          await this.line.replyMessage(replyToken, [
            { type: "text", text: "ยินดีให้บริการกรุณาเลือกเมนู" },
            searckMarketMessage(["ชาย", "หญิง"]) as any,
          ]);

          break;
        case "image":
          break;
        case "video":
          break;
        case "audio":
          break;
        case "file":
          break;
        case "location":
          break;
        case "sticker":
          break;
        default:
          return;
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleNoti = (message: string) => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${process.env.NOTI}`,
    };
    axios.post(
      "https://notify-api.line.me/api/notify",
      { message },
      { headers }
    );
  };

  async handleChageRichmenu(userId: string, menuId: string) {
    return await this.line.linkRichMenuToUser(userId, menuId);
  }

  async getHN(hn: string): Promise<ResponseHN> {
    return await axios
      .post(
        "https://rpi.praram9.com:8088/dev/patient/test",
        { hn },
        {
          headers: { API_KEY: "48fdc36f-01bc-464f-bcec-9a46c7dc0638" },
        }
      )
      .then((r) => r.data);
  }
}

const webhookService = new WebhookService();
export default webhookService;
