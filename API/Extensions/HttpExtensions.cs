using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.RequestHelpers;

namespace API.Extensions
{
    public static class HttpExtensions
    {
        /// <summary>
        /// we are extending httpResponse  with metadata and options and exposing this header
        /// and changing capital title to camelcase
        /// </summary>
        /// <param name="response"></param>
        /// <param name="metaData"></param>
        public static void AddPaginationHeader(this HttpResponse response, MetaData metaData) {
            var options = new JsonSerializerOptions {PropertyNamingPolicy = JsonNamingPolicy.CamelCase};
            response.Headers.Add("Pagination", JsonSerializer.Serialize(metaData, options));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}
