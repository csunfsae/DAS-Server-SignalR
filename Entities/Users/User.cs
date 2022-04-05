using DAS_Server_SignalR.Entities.Users.Enums;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.ComponentModel.DataAnnotations;

namespace DAS_Server_SignalR.Entities.Users
{
    [BsonIgnoreExtraElements]
    public class User
    {
        [Required]
        public string GoogleId { get; set; } = default!;

        [Required]
        public string FirstName { get; set; } = default!;

        [Required]
        public string LastName { get; set; } = default!;

        [Required]
        public string Email { get; set; } = default!;

        [Required]
        [JsonConverter(typeof(StringEnumConverter))]  
        [BsonRepresentation(BsonType.String)]         
        public Role Role { get; set; }

        [Required]
        [JsonConverter(typeof(StringEnumConverter))]
        [BsonRepresentation(BsonType.String)]
        public Team Team { get; set; }

        [Required]
        [BsonRepresentation(BsonType.String)]
        public Status Status { get; set; }

        public DateTime CreatedDate { get; private set; }

        public DateTime? UpdatedDate { get; set; }

        public User()
        {            
            Role = Role.Basic;
            Team = Team.Unassigned;
            Status = Status.Pending;
            CreatedDate = DateTime.UtcNow;
        }
    }
}
