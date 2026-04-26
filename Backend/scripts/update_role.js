// Scripts chạy từ thư mục gốc của project
process.chdir('/app');

const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://phamhungtp2005_db_user:EETQAWrXfq7XiO27@cluster0.06tutrj.mongodb.net/webdemo-thsport?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
  .then(async () => {
    const User = require('./app/models/User');
    
    // Update role to admin
    const result = await User.updateOne(
      { email: 'tuan@example.com' },
      { $set: { role: 'admin' } }
    );
    
    console.log('Updated:', result.modifiedCount, 'document(s)');
    
    // Verify
    const user = await User.findOne({ email: 'tuan@example.com' });
    console.log('User:', user?.name, '- Role:', user?.role);
    
    process.exit(0);
  })
  .catch(e => {
    console.log('Error:', e.message);
    process.exit(1);
  });