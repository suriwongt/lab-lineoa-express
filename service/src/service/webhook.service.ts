import { Client, Message } from "@line/bot-sdk";

class WebhookService {
    private line: Client;

    constructor() {
        this.line = new Client({ channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '' });
    }

    handleReplyTokenMessage = async (replyToken: string, messages: Message[] | any): Promise<any> => {
        try {
            await this.line.replyMessage(replyToken, messages);
        } catch (e) {
            console.log(e)
        }
    };
}


const webhookService = new WebhookService()
export default webhookService
