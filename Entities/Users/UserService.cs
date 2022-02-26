using CSUN_DAS_Server.DatabaseSettings;
using CSUN_DAS_Server.Entities.Users.Enums;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace CSUN_DAS_Server.Entities.Users
{
    public class UserService
    {
        private readonly IMongoCollection<User> _userCollection;

        public UserService(IOptions<CsunFsaeDatabaseSettings> csunFsaeDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                csunFsaeDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                csunFsaeDatabaseSettings.Value.DatabaseName);

            _userCollection = mongoDatabase.GetCollection<User>(
                csunFsaeDatabaseSettings.Value.UserCollectionName);
            _userCollection.Indexes.CreateOne(new CreateIndexModel<User>("{ GoogleId: 1 }", new CreateIndexOptions { Unique = true }));  
            _userCollection.Indexes.CreateOne(new CreateIndexModel<User>("{ Email: 1 }", new CreateIndexOptions { Unique = true }));
        }

        public async Task<User?> GetUser(string googleId, string email)
        {
            return await _userCollection.Find(x => x.GoogleId == googleId && x.Email == email).FirstOrDefaultAsync();
        }

        public async Task CreateUser(User user)
        {
            await _userCollection.InsertOneAsync(user);
        }  
    }
}
