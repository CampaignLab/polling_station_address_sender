require("dotenv").config();

module.exports = class ImageSender {
  constructor(electoralCommisionApi, twilioApi) {
    this.electoralCommisionApi = electoralCommisionApi;
    this.twilioApi = twilioApi;
  }

  createMessageBody(name, pollingStationAddressInfo) {
    const addressWithLineBreaks = pollingStationAddressInfo.address.replace(
      /, /g,
      ",\n"
    );
    const postcodeWithLineBreak = pollingStationAddressInfo.address.postcode
      ? `\n${pollingStationAddressInfo.address.postcode}`
      : "";
    return `Hi ${name},\n\nIt's time to vote! Your polling station is:\n\n${addressWithLineBreaks}${postcodeWithLineBreak}`;
  }

  async sendPollingStationMessage(name, postcode, number, messageType) {
    const pollingStationAddressInfo =
      await this.electoralCommisionApi.getPollingStationAddressInfo(postcode);
    const body = this.createMessageBody(name, pollingStationAddressInfo);
    if (messageType === "sms")
      return await this.twilioApi.sendSmsMessage(body, number);
    return await this.twilioApi.sendWhatsAppMessage(body, number);
  }
};
