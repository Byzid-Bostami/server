const bcrypt = require('bcrypt');
require('dotenv').config();


const plainPassword = process.env.ADMIN_PASSWORD;

const Password = async () => {
    if (!plainPassword) {
      console.log("❌ No password found in .env");
      return;
    }
    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    
    console.log("✅ Hashed Password:", hashedPassword);
  };
  
  Password();