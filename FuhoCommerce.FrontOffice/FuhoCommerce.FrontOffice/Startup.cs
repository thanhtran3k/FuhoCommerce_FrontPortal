using FuhoCommerce.FrontOffice.RegisterServices;
using FuhoCommerce.HttpUtility;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace FuhoCommerce.FrontOffice
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            services.AddRestInvoker(Configuration);

            services.AddOpenIdConnect(Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.Use(async (context, next) =>
            {
                var JWTToken = context.GetTokenAsync("access_token").Result;

                //Debug purpose
                //System.IO.File.WriteAllText(@"F:\WriteLines.txt", JWTToken);

                if (!string.IsNullOrEmpty(JWTToken))
                {
                    var restInvokerInstance = context.RequestServices.GetService<RestInvoker>();
                    var httpClientInstance = restInvokerInstance.GetHttpClient();

                    httpClientInstance.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", JWTToken);
                }
                await next();
            });

            app.UseRouting();
            
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });

            //app.Use(async (context, next) =>
            //{
            //    if (context.Request.IsHttps || context.Request.Headers["X-Forwarded-Proto"] == Uri.UriSchemeHttps)
            //    {
            //        await next();
            //    }
            //    else
            //    {
            //        string queryString = context.Request.QueryString.HasValue ? context.Request.QueryString.Value : string.Empty;
            //        var https = "https://" + context.Request.Host + context.Request.Path + queryString;
            //        context.Response.Redirect(https);
            //    }
            //});
        }
    }
}
