using DAS_Server_SignalR.Entities.Users.Enums;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.ComponentModel.DataAnnotations;

namespace DAS_Server_SignalR.Entities.Users
{
    public class UserUpdate
    {
        [Required]
        public string GoogleId { get; set; } = default!;

        [Required]
        [JsonConverter(typeof(StringEnumConverter))]
        [BsonRepresentation(BsonType.String)]
        public Role Role { get; set; }

        [Required]
        [JsonConverter(typeof(StringEnumConverter))]
        [BsonRepresentation(BsonType.String)]
        public Team Team { get; set; }

        [Required]
        [JsonConverter(typeof(StringEnumConverter))]
        [BsonRepresentation(BsonType.String)]
        public Status Status { get; set; }
    }
}
