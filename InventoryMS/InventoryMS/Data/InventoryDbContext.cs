using InventoryMS.Models;
using Microsoft.EntityFrameworkCore;

namespace InventoryMS.Data
{
    public class InventoryDbContext:DbContext
    {
        public InventoryDbContext(DbContextOptions<InventoryDbContext> options): base(options){}

        public DbSet<Product> Products { get; set; }
    }
}
