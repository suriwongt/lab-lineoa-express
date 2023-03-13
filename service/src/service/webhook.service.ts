import { Client, EventMessage, EventSource } from "@line/bot-sdk";

class WebhookService {
    private line: Client;

    constructor() {
        this.line = new Client({ channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '' });
    }

    handleReplyTokenMessage = async (replyToken: string, message: EventMessage, source: EventSource): Promise<any> => {
        try {
            console.log(source)
            switch (message.type) {
                case 'text':

                    const profile = await this.line.getProfile(source.userId || '')

                    this.line.replyMessage(replyToken, [message, {
                        type: 'image',
                        originalContentUrl: profile.pictureUrl,
                        previewImageUrl: profile.pictureUrl,
                    }])

                    break;
                case 'image':


                    break;
                case 'video':

                    break;
                case 'audio':

                    break;
                case 'file':

                    break;
                case 'location':

                    break;
                case 'sticker':

                    break;
                default:
                    return;
            }

        } catch (e) {
            console.log(e)
        }
    };
}


const webhookService = new WebhookService()
export default webhookService
