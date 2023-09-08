const keys = {
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB
  }
  // database: {
  //   host: "localhost",
  //   user: "root",
  //   password: "",
  //   database: "edenonline",
  // },
}

module.exports = keys
