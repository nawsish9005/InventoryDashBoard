using InventoryMS.Data;
using InventoryMS.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InventoryMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly InventoryDbContext _context;
        public ProductController(InventoryDbContext context)
        {
            _context = context;
        }

        // GET: /api/products
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products = await _context.Products
                .FromSqlRaw("EXEC sp_ManageProducts @p0", "GET")
                .ToListAsync();

            return Ok(products);
        }

        // POST: /api/products
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ProductDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _context.Database.
                ExecuteSqlRawAsync("EXEC sp_ManageProducts @p0, @p1, @p2, @p3, @p4, @p5",
                "POST", null, dto.Name, dto.Category, dto.Price, dto.StockQuantity);

            return StatusCode(201);
        }


        // PUT: /api/products/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ProductDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var exists = await _context.Products.FindAsync(id);
            if (exists == null)
                return NotFound();

            await _context.Database.
                ExecuteSqlRawAsync("EXEC sp_ManageProducts @p0, @p1, @p2, @p3, @p4, @p5",
                "PUT", id, dto.Name, dto.Category, dto.Price, dto.StockQuantity);

            return NoContent();
        }

        // DELETE: /api/products/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var exists = await _context.Products.FindAsync(id);
            if (exists == null)
                return NotFound();

            await _context.Database.
                ExecuteSqlRawAsync("EXEC sp_ManageProducts @p0, @p1", "DELETE", id);

            return NoContent();
        }

        [HttpGet("paged")]
        public async Task<IActionResult> GetPaged(int page = 1, int pageSize = 10, string? search = null)
        {
            var query = _context.Products.AsQueryable();
            if (!string.IsNullOrEmpty(search))
                query = query.Where(p => p.Name.Contains(search));

            var total = await query.CountAsync();
            var products = await query
                .Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

            return Ok(new { total, products });
        }


    }
}
