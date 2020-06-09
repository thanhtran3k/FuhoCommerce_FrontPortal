import { APPLICATION_URL, IDENTITY_SERVER } from 'src/environments/app.config';

export const ClientSettings = {
    Authority: IDENTITY_SERVER,
    ClientId: 'fuhocommerce_sellerchannel',
    RedirectUri: APPLICATION_URL + '/auth-callback',
    PostLogoutRedirectUri: APPLICATION_URL + '/home',
    ResponseType: "id_token token",
    Scope: "openid profile email api.read api.write",
    SilentRedirectUri: APPLICATION_URL + '/silent-refresh.html'
};