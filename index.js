const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { role } = require("./routes/roleRoute");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/role", role);

async function connecToDB() {
  try {
    await connect(process.env.MOGNO_URL);
    console.log("MognoDB is connected!");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
  }
}

connecToDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
    servers: [
      {
        url: "https://my-swagger-mongodb.onrender.com",
        description: "Live server...",
      },
      {
        url: "http://localhost:5000",
        description: "Server is running on localhost:5000...",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
