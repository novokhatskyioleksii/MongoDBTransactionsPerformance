const users = [];
for (let i = 0; i < 100000; i++) {
  users.push({ id: i, user: { roles: [], profile: {} }, rate: 1 });
}

module.exports = users;
