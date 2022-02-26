using Microsoft.AspNetCore.SignalR;

namespace DAS_Server_SignalR.SignalR
{
    public class RaceHub : Hub
    {
        public async Task Speedometer(string message)
        {
            await Clients.All.SendAsync("Speedometer", message);
        }
    }
}
  