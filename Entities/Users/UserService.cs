using DAS_Server_SignalR.DatabaseSettings;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace DAS_Server_SignalR.Entities.Users
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

        public async Task<User?> GetUser(string googleId)
        {
            return await _userCollection.Find(x => x.GoogleId == googleId).FirstOrDefaultAsync();
        }

        public async Task<User?> GetUser(string googleId, string email)
        {
            return await _userCollection.Find(x => x.GoogleId == googleId && x.Email == email).FirstOrDefaultAsync();
        }

        public async Task CreateUser(User user)
        {
            await _userCollection.InsertOneAsync(user);
        }

        public async Task UpdateUser(UserUpdate user)
        {
            var filter = Builders<User>.Filter.Eq(s => s.GoogleId, user.GoogleId);

            var update = Builders<User>.Update
                .Set(x => x.Role, user.Role)
                .Set(x => x.Team, user.Team)
                .Set(x => x.Status, user.Status)
                .Set(x => x.UpdatedDate, DateTime.Now);

            await _userCollection.UpdateOneAsync(filter, update);
        }

        public async Task DeleteUser(User user)
        {
            await _userCollection.DeleteOneAsync(u => u.Email == user.Email);
        }   
    }
}
