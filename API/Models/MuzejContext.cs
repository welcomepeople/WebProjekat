using Microsoft.EntityFrameworkCore;

namespace API.Models
{
    public class MuzejContext : DbContext
    {
        public DbSet<Izlozba> Izlozbe { get; set; }
        public DbSet<Umetnik> Umetnici { get; set; }
        public DbSet<Eksponat> Eksponati { get; set; }

        public MuzejContext(DbContextOptions options) : base(options)
        {
            
        }
    }
}