using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class User : IdentityUser<int>
    { //relationship 1 user and user address 1:1
        public UserAddress Address { get; set; }
    }
}
