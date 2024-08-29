const app = require("./app");
const swaggerSetup = require("./config/swagger");

swaggerSetup(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
