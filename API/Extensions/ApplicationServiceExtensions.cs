using API.Interfaces;
using API.Services;
using API.Data;
using Microsoft.EntityFrameworkCore;
using API.Helpers;
using API.SignalR;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddScoped<IUnitOfWork, UnitOfWork>(); 
            services.AddSingleton<PresenceTracker>();
            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddScoped<ITokenService, TokenService>();
            // services.AddScoped<IUserRepository, UserRepository>();
            // services.AddScoped<IMessageRepository,MessageRepository>();
            // services.AddScoped<ILikeRepository, LikeRepository>(); 
           
            services.AddScoped<LogUserActivity >();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services
                .AddDbContext<DataContext>(options =>
                {
                    options
                        .UseSqlite(config
                            .GetConnectionString("DefaultConnection"));
                });
            return services;
        }
    }
}