using DAS_Server_SignalR.SignalR;
using DAS_Server_SignalR.SignalR.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DAS_Server_SignalR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RaceController : ControllerBase
    {
        private readonly IHubContext<RaceHub> _hubContext;

        public RaceController(IHubContext<RaceHub> hubContext)
        {
            _hubContext = hubContext;
        }

        // POST api/<RaceController>
        [HttpPost]
        public async Task Post(string sensor, [FromBody] object json)
        {
            if(json is null)
            {
                return;
            }

            switch (sensor)
            {
                case nameof(Speedometer):
                    var speedometer = JsonSerializer.Deserialize<Speedometer>(json.ToString()!);
                    await _hubContext.Clients.All.SendAsync(sensor, speedometer?.Speed);
                    break;
            }
        }
    }
}
