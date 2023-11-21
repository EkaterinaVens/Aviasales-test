class AviasalesService {
  static searchId;

  url = "https://aviasales-test-api.kata.academy";

  imageCDN = "https://pics.avs.io/99/36/";

  async makeRequest(url, params = {}) {
    const response = await fetch(url, params);
    if (response.status === 404) {
      throw new Error("404");
    }
    if (response.status === 500) {
      throw new Error("500");
    }
    const result = response.json();
    return result;
  }

  async getSearchId() {
    if (AviasalesService.searchId) {
      return AviasalesService.searchId;
    }
    const body = await this.makeRequest(`${this.url}/search`);
    AviasalesService.searchId = body.searchId;
    return Promise.resolve(body.searchId);
  }

  async getTickets(searchId) {
    const body = await this.makeRequest(
      `${this.url}/tickets?searchId=${searchId}`
    );
    return body;
  }

  getCarrierLogo(carrier) {
    return `${this.imageCDN}${carrier}.png`;
  }
}

const aviaService = new AviasalesService();

export default aviaService;
