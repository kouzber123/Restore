using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService
    {
        //everything that does not use app
        private readonly IConfiguration _config;
        private readonly UserManager<User> _userManager;

        public TokenService(UserManager<User> userManager, IConfiguration config)
        {
            _userManager = userManager;
            _config = config;

        }

        public async Task<String> GenerateToken(User user)
        {
            //need to build token

            // claims > who they are "im"
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),  //claim 1 email
                new Claim(ClaimTypes.Name, user.UserName), //claim 2 username
            };

            var roles = await _userManager.GetRolesAsync(user); //claim 3 roles
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWTSettings:TokenKey"]));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512); //strongest available

            var tokenOptions = new JwtSecurityToken(
                issuer: null,
                audience: null,
                claims : claims,
                expires: DateTime.Now.AddDays(7),
                signingCredentials: creds
            );
             return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }
    }
}
