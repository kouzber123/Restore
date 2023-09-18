using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    //! instead returning basket from controller we return basket DTO
    //! which inludes basketitem DTO
    public class BasketDto
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItemDto> Items { get; set; }

        public string PaymentIntentId { get; set; }
        public string ClientSecret { get; set; }
    }
}
