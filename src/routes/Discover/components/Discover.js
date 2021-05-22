import React, { Component } from "react";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import "../styles/_discover.scss";
import { axiosInstance } from "../../../axios";
import axios from "axios";
import { api } from "../../../config";

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
    };
  }

  componentDidMount() {
    this.fetchAndSetAuthorizationToken();
  }

  fetchAndSetAuthorizationToken = async () => {
    try {
      const { data } = await axios(`${api.authUrl}`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(api.clientId + ":" + api.clientSecret),
        },
        data: "grant_type=client_credentials",
        method: "POST",
      });
      if (data) {
        const { access_token } = data;
        this.fetchAndSetNewReleasePlaylist(access_token);
        this.fetchAndSetFeaturedPlaylist(access_token);
        this.fetchAndSetBrowseGenres(access_token);
      }
    } catch (error) {
      console.error(error.message || "Something went wrong");
    }
  };

  fetchAndSetNewReleasePlaylist = async (authroizationToken) => {
    try {
      const { data } = await axios(
        "https://api.spotify.com/v1/browse/new-releases",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authroizationToken}`,
          },
        }
      );
      if (data) {
        const { items } = data.albums;
        this.setState({ newReleases: items });
      }
    } catch (error) {
      console.error(error.message || "Something went wrong");
    }
  };

  fetchAndSetFeaturedPlaylist = async (authroizationToken) => {
    try {
      const { data } = await axios(
        "https://api.spotify.com/v1/browse/featured-playlists",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authroizationToken}`,
          },
        }
      );
      if (data) {
        const { items } = data.playlists;
        this.setState({ playlists: items });
      }
    } catch (error) {
      console.error(error.message || "Something went wrong");
    }
  };

  fetchAndSetBrowseGenres = async (authroizationToken) => {
    try {
      const { data } = await axios(
        "https://api.spotify.com/v1/browse/categories",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authroizationToken}`,
          },
        }
      );
      if (data) {
        const { items } = data.categories;
        this.setState({ categories: items });
      }
    } catch (error) {
      console.error(error.message || "Something went wrong");
    }
  };

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock
          text="RELEASED THIS WEEK"
          id="released"
          data={newReleases}
        />
        <DiscoverBlock
          text="FEATURED PLAYLISTS"
          id="featured"
          data={playlists}
        />
        <DiscoverBlock
          text="BROWSE"
          id="browse"
          data={categories}
          imagesKey="icons"
        />
      </div>
    );
  }
}
