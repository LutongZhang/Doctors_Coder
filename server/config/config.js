const db = {
  uri:
    "mongodb+srv://Lutong:1qsz2waxW!@cluster0-b4o6r.mongodb.net/test?retryWrites=true&w=majority"
};
//node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
const config = {
  db: db,
  secretOrKey:
    "921f7105fefbd33f99a76fea38790c8e40f9ae0b078c7ad7fc3a9880a75cb6a0"
};

module.exports = config;
