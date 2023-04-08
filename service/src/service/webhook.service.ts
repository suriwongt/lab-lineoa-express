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
    try {
      const profile = await this.line.getProfile(source.userId || "");
      if (postback.data === "profile") {
        const mapUser = await user.findOne({ userId: profile.userId });
        console.log(mapUser);
        const hnprop = await this.getHN(mapUser?.hn_no || "");
        const detail = hnprop.detail;
        const g = detail.gender == "F" ? "หญิง" : "ชาย";
        const message = flexUser(
          profile.displayName ?? "",
          profile.pictureUrl,
          mapUser?.hn_no ?? "",
          g,
          `${detail.firstNameTH ?? ""} ${detail.lastNameEN ?? ""}`
        );
        await this.line.replyMessage(replyToken, message as any);
      }
      if (postback.data === "logout") {
        await this.handleLogout(profile.userId);
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleLogout = async (userId: string) => {
    await this.line.unlinkRichMenuFromUser(userId);
    await user.deleteMany({ userId });
  };

  handleReplyTokenMessage = async (
    replyToken: string,
    message: EventMessage,
    source: EventSource
  ): Promise<any> => {
    try {
      switch (message.type) {
        case "text":
          if (message.text === "ยกเลิก") {
            await this.line.replyMessage(replyToken, [
              {
                type: "text",
                text: "ขอบคุณที่ใช้บริการค่ะ",
              },
            ]);
          } else {
            await this.line.replyMessage(replyToken, [
              searckMarketMessage("กรุณาเลือกดำเนินการ", [
                "แพคเกจตรวจสุขภาพ",
                "นัดหมาย",
                "พบแพทย์",
                "ยกเลิก",
              ]) as any,
            ]);
          }

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
        `${process.env.PAI}`,
        { hn },
        {
          headers: { API_KEY: "48fdc36f-01bc-464f-bcec-9a46c7dc0638" },
        }
      )
      .then((r) => r.data);
  }

  async testFlex() {
    const message = flexUser(
      "nuu",
      "https://profile.line-scdn.net/0hUSRyVFAsCnx_AB-tLX10Aw9QCRZccVNuB2FHHx0IAxkXY0UjUmJBHk9QAUtDYEksUjFBTkxUUUVzE30aYVb2SHgwVEtFMUQoW29HnA",
      "090990",
      "ชาย",
      `${"nuu"} ${"test"}`
    );
    await this.line.pushMessage(
      "Ub2d19f02162215c6af4806dabe23f5b4",
      message as any
    );
  }
}

const webhookService = new WebhookService();
export default webhookService;
