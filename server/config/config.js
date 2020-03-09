const db = {
  uri:
    "mongodb+srv://admin:nsoER%26%2412@cluster0-smimx.mongodb.net/doctor?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true"
};
//node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"

const config = {
  db: db,
  secretOrKey:
    "921f7105fefbd33f99a76fea38790c8e40f9ae0b078c7ad7fc3a9880a75cb6a0"
};

module.exports = config;
