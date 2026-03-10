using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using UserAPIJWT.Models;

namespace UserAPIJWT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserDbContext _dbcontext;
        private readonly IConfiguration _configuration;
        public UsersController(UserDbContext dbcontext, IConfiguration configuration)
        {

            _dbcontext = dbcontext;
            _configuration = configuration;
        }
        [HttpPost("register")]
        public IActionResult Register([FromBody] User user)
        {
            _dbcontext.Users.Add(user);
            _dbcontext.SaveChanges();

            return Ok(new { message = "User registered" });

        }
        [HttpPost("login")]
        public IActionResult Login([FromBody] User user)
        {
            var existingUser = _dbcontext.Users
                .FirstOrDefault(u => u.Email == user.Email && u.Password == user.Password);

            if (existingUser == null)

                return Unauthorized(new { message = "Invalid credentials" });
            var token = GenerateJwtToken(existingUser);

            return Ok(new
            {
                message = "Login successful",
                token=token,
                user = new
                {
                    existingUser.Id,
                    existingUser.FullName,
                    existingUser.Email
                }
            });
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            var user = _dbcontext.Users.Find(id);
            if (user == null) return NotFound();
            return Ok(user);
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Email, user.Email)
    };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }




    }
}


