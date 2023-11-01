namespace API.SignalR
{
    public class PresenceTracker
    {
        private static readonly Dictionary<string, List<string>> OnLineUsers =
            new Dictionary<string, List<string>>();

        public Task<bool> UserConnected(string username, string connectionId)
        {
            bool isOnLine =false;
            lock (OnLineUsers)
            {
                if (OnLineUsers.ContainsKey(username))
                {
                    OnLineUsers[username].Add(connectionId);
                }
                else
                {
                    OnLineUsers.Add(username, new List<string> { connectionId });
                    isOnLine =true;
                }
            }
            return Task.FromResult(isOnLine);
        }

        public Task<bool> UserDisconnected(string username, string connectionId)
        {
            bool isOffLine =false;
            lock (OnLineUsers)
            {
                if (!OnLineUsers.ContainsKey(username))
                    return Task.FromResult(isOffLine);

                OnLineUsers[username].Remove(connectionId);
                if (OnLineUsers[username].Count == 0)
                {
                    OnLineUsers.Remove(username);
                    isOffLine = true;
                }
            }
            return Task.FromResult(isOffLine);
        }
        public Task<string[]> GetOnlineUsers()
        {
            string[] onlineUsers;
            lock(OnLineUsers)
            {
                onlineUsers = OnLineUsers.OrderBy(k=>k.Key).Select(s=>s.Key).ToArray();
            }
            return Task.FromResult(onlineUsers);
        }
        public  Task<List<string>> GetCoonectionForUser(string username)
        {
            List<string> connectionIds;
            lock(OnLineUsers)
            {
                connectionIds = OnLineUsers.GetValueOrDefault(username);
            }
            return Task.FromResult(connectionIds);
        }
    }
}
