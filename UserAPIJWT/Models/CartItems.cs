namespace UserAPIJWT.Models
{
    public class CartItems
    {
        public int UserId { get; set; }
        public int ProductId { get; set; }
        //public string? ProductName { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
    }
}
