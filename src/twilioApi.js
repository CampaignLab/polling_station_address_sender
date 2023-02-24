module.exports = class TwilioApi {
  constructor(accountSid, authToken, fromNumberWhatsapp) {
    this.accountSid = accountSid;
    this.authToken = authToken;
    this.fromNumberWhatsapp = fromNumberWhatsapp;
    this.client = require("twilio")(accountSid, authToken);
  }

  async sendWhatsAppMessage(body, toNumber) {
    try {
      const message = await this.client.messages.create({
        body,
        from: `whatsapp:${this.fromNumberWhatsapp}`,
        to: `whatsapp:${toNumber}`,
      });
      console.log(`Message sent! SID: ${message.sid}`);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
};
