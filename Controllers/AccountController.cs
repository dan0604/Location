using Location.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace Location.Controllers
{
    public class AccountController : Controller
    {
        [HttpGet("Account/Login")]
        public async Task<IActionResult> Login(string? ReturnUrl = null)
        {
            ViewData["ReturnUrl"] = ReturnUrl;
            await Task.CompletedTask;
            ClaimsPrincipal claimUser = HttpContext.User;
            if (claimUser.Identity.IsAuthenticated)
            {
                if (!String.IsNullOrEmpty(ReturnUrl) && Url.IsLocalUrl(ReturnUrl))
                    return Redirect(ReturnUrl);
                else
                    return RedirectToAction("Index", "Home");
            }
            return View();
        }
        [HttpPost("Account/Login")]
        public async Task<IActionResult> Login([FromBody] UserModel user)
        {
            try
            {
                if (user.UserName == "user@example.com" && user.PassWord == "123")
                {
                    List<Claim> claims = new List<Claim>() {
                    new Claim(ClaimTypes.NameIdentifier, user.UserName),
                    new Claim("OtherProperties","Example Role")

                };

                    ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims,
                        CookieAuthenticationDefaults.AuthenticationScheme);

                    AuthenticationProperties properties = new AuthenticationProperties()
                    {
                        AllowRefresh = true,
                    };

                    await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                        new ClaimsPrincipal(claimsIdentity), properties);

                    return Json(new
                    {
                        success = true,
                        message = $"Login successful",
                        statuscode = HttpStatusCode.OK,
                        returnUrl = Url.Action("Index", "Home")
                    });
                }
                return Json(new
                {
                    success = false,
                    message = $"Incorrect Username and Password",
                    statuscode = HttpStatusCode.BadRequest,
                    returnUrl = Url.Action("Index", "Home", new { user.ReturnUrl })
                });
            }
            catch(Exception ex)
            {
                return Json(new
                {
                    success = false,
                    message = $"{ex.Message}",
                    statuscode = HttpStatusCode.InternalServerError,
                    returnUrl = Url.Action("Login", "Account", new { user.ReturnUrl })
                });
            }
        }
    }
}
