using Microsoft.EntityFrameworkCore;

namespace PackageManagementService.Server.Models
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions)
        {

        }

        public DbSet<Package> Package { get; set; }
        public DbSet<Shipment> Shipment { get; set; }
        public DbSet<Tracking> Tracking { get; set; }
    }
}
