using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
  public class StoreContext : DbContext
  {
    public StoreContext(DbContextOptions options) : base(options)
    {

    }

    //! prop DbSet<Product entity from entities folder> name : Products
    public DbSet<Product> Products { get; set; }
  }
}