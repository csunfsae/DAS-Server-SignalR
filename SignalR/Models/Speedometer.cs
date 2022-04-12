using System.Text.Json.Serialization;

namespace DAS_Server_SignalR.SignalR.Models
{
    public class Speedometer
    {
        [JsonPropertyName("raceId")]
        public string RaceId { get; set; } = default!;

        [JsonPropertyName("speed")]
        public int Speed { get; set; }

        [JsonPropertyName("raceTime")]
        public long RaceTime { get; set; }
    }
}
