using System.Diagnostics.Tracing;
using System.Collections.ObjectModel;
using System.Text;
using System.Security.Cryptography;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using API.Entities;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(
            UserManager<AppUser> userManager,
            RoleManager<AppRole> roleManager
        )
        {
            if (await userManager.Users.AnyAsync())
                return;
            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            

            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
            Console.WriteLine(users);
            if (users == null)
                return;
            var roles = new List<AppRole>
            {
                new AppRole { Name = "Member" },
                new AppRole { Name = "Admin" },
                new AppRole { Name = "Moderator" },
            };
            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            foreach (var user in users)
            {
                // using var hmac = new HMACSHA512();
                user.UserName = user.UserName.ToLower();
                //  user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Password"));
                //  user.PasswordSalt = hmac.Key;
                //context.Users.Add(user);
                var result = await userManager.CreateAsync(user, "!Pa$$word1");
                var roleresult = await userManager.AddToRoleAsync(user, "Member");

                if (!result.Succeeded)
                {
                    foreach (IdentityError error in result.Errors)
                    {
                        Console.WriteLine($"Oops! {error.Description} ({error.Code})");
                    }
                }
                if (!roleresult.Succeeded)
                {
                    foreach (IdentityError error in roleresult.Errors)
                    {
                        Console.WriteLine($"Oops with role! {error.Description} ({error.Code})");
                    }
                }
            }
            var admin = new AppUser { UserName = "admin" };
            await userManager.CreateAsync(admin, "!Pa$$word1");
            await userManager.AddToRolesAsync(admin, new[] { "Admin", "Moderator" });
        }
    }
}
