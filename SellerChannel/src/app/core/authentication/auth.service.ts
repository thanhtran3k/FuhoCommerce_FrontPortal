import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserManager, User } from 'oidc-client';
import { BehaviorSubject } from 'rxjs';

import { BaseService } from 'src/app/shared/services/base.service';
import { ClientSettings } from '../auth.constants';
import { IDENTITY_SERVER } from 'src/environments/app.config';

@Injectable({
  providedIn: 'root'
})

export class AuthService extends BaseService {

  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private manager = new UserManager(getClientSettings);
  private user: User | null;

  constructor(protected http: HttpClient) {
    super(http);
    this.baseUrl = IDENTITY_SERVER;

    this.manager.getUser().then(user => {
      this.user = user;
      this._authNavStatusSource.next(this.isAuthenticated());
    });
  }

  login() {
    return this.manager.signinRedirect();
  }

  async completeAuthentication() {
    this.user = await this.manager.signinRedirectCallback();
    this._authNavStatusSource.next(this.isAuthenticated());
  }

  register(registrationInput: any) {
    const url = '/Account/RegisterUser';
    return this.post<any>(url, registrationInput);
  }

  isAuthenticated(): boolean {
    return this.user != null && !this.user.expired;
  }

  get authorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  get name(): string {
    return this.user != null ? this.user.profile.name : '';
  }

  async signout() {
    await this.manager.signoutRedirect();
  }
}

const getClientSettings = {
  authority: ClientSettings.Authority,
  client_id: ClientSettings.ClientId,
  redirect_uri: ClientSettings.RedirectUri,
  post_logout_redirect_uri: ClientSettings.PostLogoutRedirectUri,
  response_type: ClientSettings.ResponseType,
  scope: ClientSettings.Scope,
  filterProtocolClaims: true,
  loadUserInfo: true,
  automaticSilentRenew: true,
  silent_redirect_uri: ClientSettings.SilentRedirectUri
};
