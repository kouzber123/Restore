using API.Data;
using API.Middleware;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

//add services

builder.Services.AddControllers();
builder.Services.AddSwaggerGen(c =>
{
  c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });
});

//! to get storeContext, EntityFramework working we need to add it ass service
builder.Services.AddDbContext<StoreContext>(opt =>
{
  opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});//configuration.getconnectionstring is from appsettings.development

//allow cors policy for our front end
builder.Services.AddCors();
var app = builder.Build();
app.UseMiddleware<ExceptionMiddleware>();
if (builder.Environment.IsDevelopment())
{

  app.UseSwagger();
  app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPIv5 v1"));
}
app.UseCors(opt =>
{
  opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000");
});
app.UseRouting();

//last point of middleware
app.UseAuthorization();
app.MapControllers();

using var scope = app.Services.CreateScope();

var context = scope.ServiceProvider.GetRequiredService<StoreContext>();

var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
try
{
  context.Database.Migrate();
  DbInitializer.Initilize(context);
}
catch (Exception ex)
{
  logger.LogError(ex, "Problem migrating Data");
}

app.Run();


