using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
  [Table("BasketItems")]
  public class BasketItem //! basketItem contains a product
  {//! one to one relationship, basketItem - product
    //basket = products
    public int Id { get; set; }
    public int Quantity { get; set; }

         //navigation properties
    //! entityframework will handle the relationship

    //relationship to product
    public int ProductId { get; set; }
    public Product Product { get; set; }

    //relationship for basket
    public int BasketId { get; set; }
    public Basket Basket { get; set; }

  }

}

/*we wont have full product information in the basket
just id
*/