using API.Entities;

namespace API.Extensions
{
    /// <summary>
    /// SORT
    /// SEARCH
    /// FILTER - extensions
    /// </summary>
    public static class ProductExtensions
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy)) return query.OrderBy(p => p.Name);

            query = orderBy switch
            {
                "price" => query.OrderBy(p => p.Price),
                "priceDesc" => query.OrderByDescending(p => p.Price),
                "nameDesc" => query.OrderByDescending(p => p.Name),
                _ => query.OrderBy(p => p.Name),
            };

            return query;
        }
        /// <summary>
        /// Extending i queryable adding search functionality with string search
        /// </summary>
        /// <param name="query"></param>
        /// <param name="searchTerm"></param>
        /// <returns></returns>
        public static IQueryable<Product> Search(this IQueryable<Product> query, string searchTerm)
        {

            if (string.IsNullOrEmpty(searchTerm)) return query;

            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where(p => p.Name.ToLower().Contains(lowerCaseSearchTerm));
        }

        /// <summary>
        /// extending Iqueryable with filter , with string of brands and types
        /// </summary>
        /// <param name="query"></param>
        /// <param name="brands"></param>
        /// <param name="types"></param>
        /// <returns></returns>
        public static IQueryable<Product> Filter(this IQueryable<Product> query, string brands, string types)
        {
            var brandList = new List<string>();
            var typeList = new List<string>();

            if (!string.IsNullOrEmpty(brands))
                brandList.AddRange(brands.ToLower().Split(",").ToList()); //query against the db


            if (!string.IsNullOrEmpty(types))
                typeList.AddRange(types.ToLower().Split(",").ToList());

            query = query.Where(p => brandList.Count == 0 || brandList.Contains(p.Brand.ToLower()));
            query = query.Where(p => typeList.Count == 0 || typeList.Contains(p.Type.ToLower()));

            return query;


        }
    }
}
