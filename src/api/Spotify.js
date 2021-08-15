class SpotifyAPI {
  constructor(access_token) {
    this._baseUri = "https://api.spotify.com/v1";
    this._accessToken = null;
  }

  setAccessToken(token) {
    return (this._accessToken = token);
  }

  async performFetch(url, method, signal) {
    const fetchOptions = {
      signal: signal,
      method: method,
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded; application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this._accessToken}`,
      }),
    };
    const response = await fetch(url, fetchOptions);
    return response;
  }

  async getMe(signal) {
    const url = this._baseUri + "/me";
    const response = await this.performFetch(url, "GET", signal);
    const contentType = response.headers.get("content-type");
    const statusCode = response.status;
    const data = await response.json();
    return data;
  }

  async getCurrentPlaybackInformation(signal) {
    const url = this._baseUri + "/me/player?market=ES";
    const response = await this.performFetch(url, "GET", signal);
    const contentType = response.headers.get("content-type");
    const statusCode = response.status;
    if (contentType === null && statusCode === 200) {
      return [];
    }
    if (statusCode === 204) {
      throw new Error("No content");
    }
    const data = await response.json();
    return data;
  }

  async getCurrentlyPlaying(signal) {
    const url = this._baseUri + "/me/player/currently-playing?market=ES";
    const response = await this.performFetch(url, "GET", signal);
    const contentType = response.headers.get("content-type");
    const statusCode = response.status;
    if (contentType === null && statusCode === 200) {
      throw new Error("No available devices are found");
    }
    if (statusCode === 204) {
      throw new Error("No track currently playing");
    }
    const data = await response.json();
    return data;
  }

  async getRecentlyPlaying(limit, signal) {
    const url = this._baseUri + `/me/player/recently-played?limit=${limit}`;
    const response = await this.performFetch(url, "GET", signal);
    const contentType = response.headers.get("content-type");
    const statusCode = response.status;
    if (statusCode === 204) {
      throw new Error("No track currently playing");
    }
    const data = await response.json();
    return data;
  }

  async toggleShuffle(signal, state, device_id = "") {
    const url = this._baseUri + `/me/player/shuffle?state=${state}`;
    const response = await this.performFetch(url, "PUT", signal);
    const contentType = response.headers.get("content-type");
    const statusCode = response.status;
    if (statusCode === 404) {
      throw new Error("No available devices are found");
    }
    if (statusCode === 403) {
      throw new Error("Non-premium");
    }
    return [];
  }

  async toggleShuffle(signal, device_id = "") {
    const url = this._baseUri + `/me/player/play?device_id=${device_id}`;
    const response = await this.performFetch(url, "PUT", signal);
    const contentType = response.headers.get("content-type");
    const statusCode = response.status;
    if (statusCode === 404) {
      throw new Error("No available devices are found");
    }
    if (statusCode === 403) {
      throw new Error("Non-premium");
    }
    return [];
  }

  async transferUserPlayback(signal, device_id) {
    const data = {
      device_ids: [device_id],
    };
    const fetchOptions = {
      signal: signal,
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded; application/json",
        Accept: "application/json",
        Authorization: `Bearer ${this._accessToken}`,
      }),
      body: JSON.stringify(data),
    };
    const url = this._baseUri + `/me/player/`;
    const response = await fetch(url, fetchOptions);
    const statusCode = response.status;
    if (statusCode === 404) {
      throw new Error("No available devices are found");
    }
    if (statusCode === 403) {
      throw new Error("Non-premium");
    }
    return [];
  }
}

export default SpotifyAPI;
