using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
   
    public class ProductsController : BaseApiController
    {
        //dependcy injection
        private readonly StoreContext _context;
        public ProductsController(StoreContext context)
        {
        _context = context;
                
        }
        [HttpGet]
        //list of products <List>
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            return await  _context.Products.ToListAsync();      
        }

        //id has to match the paramater string
        [HttpGet("{id}")] // api/products/3 
        //single product without list
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            //caching the value 
            var product = await _context.Products.FindAsync(id);
            // ! if null
            if(product == null) return NotFound();

            return product;

        }
    }
}