namespace UserAPIJWT.Models
{
    public class AddCartRequest
    {
        public int UserId { get; set; }
        public CartItems? Item { get; set; }
    }
}
