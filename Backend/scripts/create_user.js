const bcrypt = require('bcrypt');

const createTestUser = async () => {
  const password = 'Tuan1234';
  const hashed = await bcrypt.hash(password, 10);
  
  const newUser = {
    name: 'Test User',
    email: 'tuan@example.com',
    password: hashed,
    role: 'user',
    createdAt: new Date()
  };
  
  console.log('User to create:', JSON.stringify(newUser, null, 2));
  console.log('\nUse this in MongoDB or call /api/auth/register');
};

createTestUser();