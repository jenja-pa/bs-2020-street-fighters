import { callApi } from "../helpers/apiHelper.js";

class FighterService {
  async getFighters() {
    try {
      const API_URL = 'https://api.github.com/';
      const endpoint = 'repos/sahanr/street-fighter/contents/fighters.json';
      const apiResult = await callApi(API_URL+endpoint, 'GET');

      return JSON.parse(atob(apiResult.content));
    } catch (error) {
      throw error;
    }
  }
}

export const fighterService = new FighterService();