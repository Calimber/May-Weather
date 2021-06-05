using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace May_Weather
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "may-weather/dist"; });
        }
        
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "may-weather";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "wstart");
                }
            });
        }
    }
}