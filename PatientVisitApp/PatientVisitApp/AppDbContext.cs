using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace PatientVisitApp
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        [NotNull]
        public DbSet<Patient> Patients { get; set; } = null!;
        public DbSet<Hospital> Hospitals { get; set; } = null!;
        public DbSet<VisitHistory> Visits { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Patient>().ToTable("patients");
            modelBuilder.Entity<Hospital>().ToTable("hospitals");
            modelBuilder.Entity<VisitHistory>().ToTable("visits");
        }

    }
}
