using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Stripe;

namespace API.Services
{
    public class PaymentService
    {
        private readonly IConfiguration _config;
        public PaymentService(IConfiguration config)
        {
            _config = config;
        }

        //PaymentIntent comes from stripe if not working remember to dowload stripe
        public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket)
        {
            //config = from ["wanted setting to be used"] from developement.json
            StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];

            //1. create service, instance
            var service = new PaymentIntentService();
            //2. create intent instance
            var intent = new PaymentIntent();
            //3. Add basket subtotal, price comes from the table
            var subtotal = basket.Items.Sum(item => item.Quantity * item.Product.Price);

            var deliveryFee = subtotal > 10000 ? 0 : 500;

            if (string.IsNullOrEmpty(basket.PaymentIntentId))
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = subtotal + deliveryFee,
                    Currency = "usd",
                    PaymentMethodTypes = new List<string> { "card" }

                };

                intent = await service.CreateAsync(options);
  
            }
            else
            {
                //updating already existing paymentIntent

                var options = new PaymentIntentUpdateOptions
                {
                    //user ADDED OR REMOVED ITEM
                    Amount = subtotal + deliveryFee,
                };
                await service.UpdateAsync(basket.PaymentIntentId, options);
            }
            return intent;
        }
    }
}
