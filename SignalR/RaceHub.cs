using DAS_Server_SignalR.SignalR.Models;
using Microsoft.AspNetCore.SignalR;
using System.Text.Json;

namespace DAS_Server_SignalR.SignalR
{
    public class RaceHub : Hub
    {   
        public async Task Speedometer(string message)
        {
            var speedometer = JsonSerializer.Deserialize<Speedometer>(message);

            if(speedometer is not null)
            {
                await Clients.All.SendAsync("Speedometer", speedometer.Speed);
            }
        }
    }
}
  