using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using FuhoCommerce.FrontOffice.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authentication.Cookies;
using FuhoCommerce.HttpUtility;
using System.Net.Http;
using System.Net.Http.Headers;

namespace FuhoCommerce.FrontOffice.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly RestInvoker _restInvoker;

        public HomeController(ILogger<HomeController> logger, RestInvoker restInvoker)
        {
            _logger = logger;
            _restInvoker = restInvoker;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public IActionResult Login()
        {
            var challengeResult = Challenge(new AuthenticationProperties() { RedirectUri = "Home/Index" },
                OpenIdConnectDefaults.AuthenticationScheme);

            return challengeResult;
        }

        public IActionResult Register()
        {
            var fullUrl = "https://localhost:5000/Account/Register";
            return Redirect(fullUrl);
        }

        public IActionResult Logout()
        {
            var signOutResult = SignOut(new AuthenticationProperties() { RedirectUri = "Home/Index" },
                OpenIdConnectDefaults.AuthenticationScheme, CookieAuthenticationDefaults.AuthenticationScheme);

            return signOutResult;
        }

        public async Task<IActionResult> Test()
        {
            var url = "https://localhost:5001/WeatherForecast";
            var header = new Dictionary<string, string>();
            var result = await _restInvoker.GetAsync<List<string>>(url, header);

            return Ok(result);
        }
    }
}
