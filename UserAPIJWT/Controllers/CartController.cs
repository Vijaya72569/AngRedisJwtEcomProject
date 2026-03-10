using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;
using UserAPIJWT.Models;

namespace UserAPIJWT.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly IDistributedCache _cache;

        public CartController(IDistributedCache cache)
        {
            _cache = cache;
        }

        //[HttpPost("add")]
        //public async Task<IActionResult> AddToCart(AddCartRequest request)
        //{
        //    string key = $"cart:{request.UserId}";

        //    var existing = await _cache.GetStringAsync(key);

        //    List<CartItems> cart;

        //    if (existing != null)
        //        cart = JsonSerializer.Deserialize<List<CartItems>>(existing);
        //    else
        //        cart = new List<CartItems>();

        //    cart.Add(request.Item);

        //    var json = JsonSerializer.Serialize(cart);

        //    await _cache.SetStringAsync(key, json);

        //    return Ok(cart);
        //}

        [HttpPost("add")]
        public async Task<IActionResult> AddCart([FromBody] CartItems data)
        {
            string key = $"cart:{data.UserId}";

            var cart = await _cache.GetStringAsync(key);

            List<CartItems> items;

            if (string.IsNullOrEmpty(cart))
            {
                items = new List<CartItems>();
            }
            else
            {
                items = JsonSerializer.Deserialize<List<CartItems>>(cart);
            }

            items.Add(data);

            await _cache.SetStringAsync(key, JsonSerializer.Serialize(items));

            return Ok(items);
        }


        [HttpGet("{userId}")]
        public async Task<IActionResult> GetCart(int userId)
        {
            string key = $"cart:{userId}";

            var cart = await _cache.GetStringAsync(key);

            if (cart == null)
                return Ok(new List<CartItems>());

            return Ok(JsonSerializer.Deserialize<List<CartItems>>(cart));
        }


        [HttpDelete("{userId}")]
        public async Task<IActionResult> ClearCart(int userId)
        {
            string key = $"cart:{userId}";

            await _cache.RemoveAsync(key);

            return Ok("Cart Cleared");
        }
    }
}
