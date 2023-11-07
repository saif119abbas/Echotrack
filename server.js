const app = require("./app");
const db = require("./models");
db.sequelize.sync().then((req) => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});
