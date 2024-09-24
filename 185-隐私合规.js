let bcrypt = require("bcrypt");

const bcryptConfig = {
  saltRound: 10,
};
let pass = "123456";

bcrypt.genSalt(bcryptConfig.saltRound, (err, salt) => {
  bcrypt.hash(pass, salt, (err, hash) => {
    console.log(salt);
    console.log(hash);
    bcrypt.compare(pass, hash, (err, result) => {
      console.log(result);
    });
  });
});
