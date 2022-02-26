using Microsoft.AspNetCore.SignalR;

namespace CSUN_DAS_Server.SignalR
{
    public class RaceHub : Hub
    {
        public async Task Speedometer(string message)
        {
            await Clients.All.SendAsync("Speedometer", message);
        }
    }
}
  