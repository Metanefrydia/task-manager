import axios from "axios";
import React from "react";

export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}

class AuthenticationService {
  private token: string | null = "";
  private baseUrl = "http://localhost:9000/api";

  private saveToken(token: string): void {
    localStorage.setItem("mean-token", token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("mean-token");
    }
    return this.token as string;
  }

  public logout(): void {
    this.token = "";
    window.localStorage.removeItem("mean-token");
    window.location.href = "/login";
  }

  public getUserDetails(): UserDetails | null {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public async register(user: TokenPayload) {
    const response = await axios.post(`/register`, user);
    if (response.data.token) {
      this.saveToken(response.data.token);
    }
    return response.data;
  }

  public async login(user: TokenPayload) {
    const response = await axios.post(`/login`, user);
    if (response.data.token) {
      this.saveToken(response.data.token);
    }
    return response.data;
  }
}

export default new AuthenticationService();
