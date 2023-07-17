using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;
        }

        //3 end points fetch , add , remove
        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {//wth basket context we can access to Basket class
            var basket = await RetrieveBasket(GetBuyerId());
            //!cookie we can match the basket with buyerId

            if (basket == null) return BadRequest(new ProblemDetails { Title = "Product Not Found" });
            return basket.MapBasketToDto();
        }

        /*in order to add in basket we need procut id and int quantity*/
        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            //get basket > or create new basket
            var basket = await RetrieveBasket(GetBuyerId());
            if (basket == null) basket = createBasket();

            //get product > if null return notfound
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return NotFound();

            //add item
            basket.AddItem(product, quantity);

            //save changes > if higher than 0 then saves dones
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetBasket", basket.MapBasketToDto());

            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
        }



        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            //get basket
            var basket = await RetrieveBasket(GetBuyerId());
            if (basket == null) return NotFound();

            // remove item or reduce quantity
            basket.RemoveItem(productId, quantity);
            //save changes
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return Ok();
            return BadRequest(new ProblemDetails { Title = "Problem removing item from the basket." });
        }

        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }
            return await _context.Baskets
            //include = EF will now include items with this httpget
            .Include(i => i.Items)
            //then include additional data , include basket > basket items
            .ThenInclude(p => p.Product)
            .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }
        private string GetBuyerId()
        {
            return User.Identity?.Name ?? Request.Cookies["buyerId"];
        }
        private Basket createBasket()
        {
            var buyerId = User.Identity?.Name;
            if (string.IsNullOrEmpty(buyerId)) //if we have id or not then create new id "not logged in"
            {

                buyerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
                Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            }
            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);
            return basket;
        }

        //! Map basket to dto  function

    }
}

//init parameter = lets us have access to it

//! task = async
