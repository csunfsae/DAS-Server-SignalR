using DAS_Server_SignalR.DatabaseSettings;
using DAS_Server_SignalR.Entities.Users.Enums;
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

        public async Task<User?> GetUser(string googleId, string email)
        {
            return await _userCollection.Find(x => x.GoogleId == googleId && x.Email == email).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            return await Task.FromResult(_userCollection.AsQueryable().Where(x => x.Status != Status.Deleted).ToArray());
        }

        public async Task CreateUser(User user)
        {
            await _userCollection.InsertOneAsync(user);
        }

        public async Task UpdateUser(User user)
        {
            await _userCollection.UpdateOneAsync(u => u.Id == user.Id, Builders<User>.Update.Set(u => u.LastName, user.LastName));
        }

        public async Task DeleteUser(User user)
        {

            await _userCollection.DeleteOneAsync(u => u.Email == user.Email);
        }

    }
}
