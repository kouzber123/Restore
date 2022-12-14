using System;
using API.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API
{
  public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            //! using > automatically disposes it if not needed anymore
            using var scope = host.Services.CreateScope();
            //! CONTEXT = access to the database
            var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
            //! LOGGER = logs problems if any within the scope in this case migration
            var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
            try
            {
                //! try applying pending migrations to the database
                context.Database.Migrate();

                //pass context as argument, has access to database context to add the products
                //? context meets the data 
                DbInitializer.Initilize(context); 
            }
            catch(Exception ex) {
                logger.LogError(ex, "Problem migrating Data");
            }

            host.Run();

            
         
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
