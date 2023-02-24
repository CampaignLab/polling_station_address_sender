const ImageSender = require("../src/imageSender");

const votingMessage = "It's time to vote! Your polling station is:";

describe("ImageSender class", () => {
  it("successfully sends a WhatsApp message", async () => {
    const mockTwilioApi = {
      sendWhatsAppMessage: jest.fn().mockResolvedValue(true),
    };
    const mockEcApi = {
      getPollingStationAddressInfo: jest.fn().mockResolvedValue({
        address: "Earlswood Social Club, 160-164 Greenway Road, Rumney",
        postcode: "",
      }),
    };
    const imageSender = new ImageSender(mockEcApi, mockTwilioApi);
    const result = await imageSender.sendPollingStationMessage(
      "name",
      "postcode",
      "number",
      "whatsapp"
    );
    expect(mockEcApi.getPollingStationAddressInfo).toHaveBeenCalledWith(
      "postcode"
    );
    const body = `Hi name,\n\n${votingMessage}\n\nEarlswood Social Club,\n160-164 Greenway Road,\nRumney`;
    expect(mockTwilioApi.sendWhatsAppMessage).toHaveBeenCalledWith(
      body,
      "number"
    );
    expect(result).toBe(true);
  });
});
