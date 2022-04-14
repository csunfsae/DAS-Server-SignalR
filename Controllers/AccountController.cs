using DAS_Server_SignalR.Entities.Users;
using DAS_Server_SignalR.Entities.Users.Enums;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace DAS_Server_SignalR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous, Route("account")]
    public class AccountController : ControllerBase
    {
        private readonly UserService _userService;

        public AccountController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Route("google-login")]
        public async Task<User> GoogleLogin(string tokenId)
        {
            User? user;
            try
            {
                var payload = await GoogleJsonWebSignature.ValidateAsync(tokenId);

                if (payload is null)
                {
                    throw new Exception();
                }

                user = await _userService.GetUser(payload.Subject, payload.Email);

                if (user is null || user?.Status is not Status.Active)
                {
                    throw new Exception();
                }
            }
            catch (Exception)
            {
                throw new Exception("Unable to authenticate user");
            }

            return user;
        }

        [HttpGet]
        [Route("get-registered-user")]
        public async Task<User> GetRegisteredUser(string tokenId)
        {
            User? user;
            try
            {
                var payload = await GoogleJsonWebSignature.ValidateAsync(tokenId);

                if (payload is null)
                {
                    throw new Exception();
                }

                user = await _userService.GetUser(payload.Subject, payload.Email);

                if (user is null || user?.Status is not Status.Pending)
                {
                    throw new Exception();
                }
            }
            catch (Exception)
            {
                throw new Exception();
            }

            return user;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> RegisterUser(string tokenId)
        {
            User? user;

            try
            {
                var payload = await GoogleJsonWebSignature.ValidateAsync(tokenId);

                if (payload is null)
                {
                    throw new Exception();
                }

                var domain = payload.Email.Substring(payload.Email.LastIndexOf('@') + 1);

                if (domain is not "my.csun.edu" or "csun.edu")
                {
                    throw new Exception("Email address must be a valid CSUN email address to register");
                }

                user = await _userService.GetUser(payload.Subject, payload.Email);

                if(user is not null)
                {
                    throw new Exception("User already exists. Please sign in or contact an administrator.");
                }

                user = new User()
                {
                    GoogleId = payload.Subject,                    
                    FirstName = payload.GivenName,
                    LastName = payload.FamilyName,
                    Email = payload.Email
                };

                try
                {
                    await _userService.CreateUser(user);
                }
                catch (Exception)
                {
                    throw new Exception("Unable to authenticate user");
                }                

                if (user is null)
                {
                    throw new Exception("Unable to authenticate user");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

        [HttpPost]
        [Route("update-user")]
        public async Task<User> UpdateUser([FromBody] UserUpdate user)
        {
            if (user == null) throw new ArgumentNullException(nameof(user));

            try
            {
                await _userService.UpdateUser(user);
            }
            catch (Exception ex)
            {
                throw new Exception("Unable to authenticate user", ex);
            }

            var updatedUser = await _userService.GetUser(user.GoogleId);

            if (updatedUser == null)
            {
                throw new Exception("user not found");
            }

            return updatedUser;
        }

        [HttpPost]
        [Route("delete-user")]
        public async Task DeleteUser([FromBody] User user)
        {
            if (user == null) throw new ArgumentNullException(nameof(user));

            await _userService.DeleteUser(user);
        }
    }
}
