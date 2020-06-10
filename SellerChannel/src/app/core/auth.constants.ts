import { IDENTITY_CONFIG } from 'src/environments/app.config';

export const ClientSettings = {
    Authority: IDENTITY_CONFIG.IDENTITY_SERVER,
    ClientId: IDENTITY_CONFIG.CLIENT_ID,
    RedirectUri: IDENTITY_CONFIG.APPLICATION_URL + '/auth-callback',
    PostLogoutRedirectUri: IDENTITY_CONFIG.APPLICATION_URL + '/home',
    ResponseType: "id_token token",
    Scope: "openid profile email api.read api.write",
    SilentRedirectUri: IDENTITY_CONFIG.APPLICATION_URL + '/silent-refresh.html'
};