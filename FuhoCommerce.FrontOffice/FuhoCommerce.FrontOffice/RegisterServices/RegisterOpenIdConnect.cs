using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Logging;

namespace FuhoCommerce.FrontOffice.RegisterServices
{
    public static class RegisterOpenIdConnect
    {
        public static void AddOpenIdConnect(this IServiceCollection services, IConfiguration configuration)
        {
            //JwtSecurityTokenHandler.DefaultMapInboundClaims = false;
            IdentityModelEventSource.ShowPII = true;

            //Need to refactor in the future
            services.AddAuthentication(options =>
            {
                //options.DefaultScheme = "Cookies";
                //options.DefaultChallengeScheme = "oidc";
                ConfigureAuthenticationOptions(options);
            })
                .AddCookie()
                .AddOpenIdConnect(options =>
                {
                    ConfigureOpenIdConnectOptions(options, configuration);
                });

        }

        private static void ConfigureAuthenticationOptions(AuthenticationOptions options)
        {
            options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
        }

        private static void ConfigureOpenIdConnectOptions(OpenIdConnectOptions options, IConfiguration configuration)
        {
            //Hybrid Client needs ClientSecret, offline_access, scope, ResponseType = code id_token = Hey, you gonna use Hybrid flow
            options.Authority = configuration["OpenIdConnectOptions:Authority"];
            options.RequireHttpsMetadata = false;
            options.MetadataAddress = configuration["OpenIdConnectOptions:MetadataAddress"];

            options.ClientId = "fuhocommerce_frontoffice";
            options.ClientSecret = configuration["OpenIdConnectOptions:ClientSecret"]; //require clientId and clientSecret to get access token
            options.ResponseType = "code id_token";
            options.SaveTokens = true;

            //Default callback to call to back channel and get info such as token,...
            //options.CallbackPath = "signin-oidc";

            //Request scope in jwt token
            options.Scope.Add("openid");
            options.Scope.Add("profile");
            options.Scope.Add("email");
            options.Scope.Add("api.read");
            options.Scope.Add("api.write");
            options.Scope.Add("offline_access");
        }
    }
}
