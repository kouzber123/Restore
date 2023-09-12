using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities.OrderAggregate;

namespace API.DTOs
{
    public class CreateOrderDto
    {
        public bool SavedAddress { get; set; }
        public ShippingAddress ShippingAddress { get; set; }
        
    }
}
