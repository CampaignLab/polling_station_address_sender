module.exports = class ElectoralCommisionApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async getPollingStationAddressInfo(postcode) {
    const response = await fetch(
      `https://api.electoralcommission.org.uk/api/v1/postcode/${postcode}?token=${this.apiKey}`
    );
    const result = await response.json();
    if (!result.dates.length) return {};
    return result.dates[0].polling_station.station.properties;
  }
};