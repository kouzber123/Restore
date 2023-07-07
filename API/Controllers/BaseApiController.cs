using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    //api attribute controller
    [ApiController]
    //route
    [Route("api/[controller]")]

    public class BaseApiController:ControllerBase
    {

    }
}
