namespace API.Entities
{
    public class Basket  //! basket contains list of basketItems + add / remove functions
    {   //! one to many relationship , one basket many items
        public int Id { get; set; }
        public string BuyerId { get; set; }

        //this will always create new list of items when we create new basket
        public List<BasketItem> Items { get; set; } = new();
        public string PaymentIntentId { get; set; } //use with order class too 
        public string ClientSecret { get; set; } //to make a payment directly to stripe not to via us

        //! ADD / REMOVE FUNCTIONS
        public void AddItem(Product product, int quantity)
        {
            //if the item is not already in the basket
            if (Items.All(item => item.ProductId != product.Id))
            {
                //then add new item to the list
                Items.Add(new BasketItem { Product = product, Quantity = quantity });
            }
            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);
            if (existingItem != null) existingItem.Quantity += quantity;
        }
        public void RemoveItem(int productId, int quantity)
        {
            var item = Items.FirstOrDefault(item => item.ProductId == productId);
            if (item == null) return;

            item.Quantity -= quantity;

            if (item.Quantity == 0) Items.Remove(item);
        }
    }
}
