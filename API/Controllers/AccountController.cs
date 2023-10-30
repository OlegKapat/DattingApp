using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
      
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> singInMannager, ITokenService tokenService, IMapper mapper)
        {
            _tokenService = tokenService;
            _userManager = userManager;
            _signInManager = singInMannager;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username))
                return BadRequest("Username is taken");
            var user = _mapper.Map<AppUser>(registerDto);
    
            // using var hmac = new HMACSHA512();

            user.UserName = registerDto.Username.ToLower();
            // user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password));
            // user.PasswordSalt = hmac.Key;

           var result = await _userManager.CreateAsync(user,registerDto.Password);
            if(!result.Succeeded) return BadRequest(result.Errors);
           var roleResult = await _userManager.AddToRoleAsync(user,"Member");
           if(!roleResult.Succeeded) return BadRequest(result.Errors);

            return new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                KnowAs = user.KnowAs, 
                Gender = user.Gender
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());
            if (user == null) return Unauthorized("Invalid username");
            var result = await _signInManager.CheckPasswordSignInAsync(user,loginDto.Password,false);
            if(!result.Succeeded) return Unauthorized();
            // using var hmac = new HMACSHA512(user.PasswordSalt);
            // var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
            // for (int i = 0; i < computedHash.Length; i++)
            // {
            //     if (computedHash[i] != user.PasswordHash[i])
            //         return Unauthorized("Invalid password");
            // }
            return new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                KnowAs = user.KnowAs, 
                Gender = user.Gender
            };
        }

        private async Task<bool> UserExists(string username)
        {
            return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}
