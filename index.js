const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { groups } = require("./routes/group.route");
const { roles } = require("./routes/role.route");
const { students } = require("./routes/student.route");
const { stuffs } = require("./routes/stuff.route");
const { lids } = require("./routes/lid.route");
const { lessons } = require("./routes/lesson.route");
const { payments } = require("./routes/payment.route");
const { branches } = require("./routes/branch.route");
const { stages } = require("./routes/stage.route");
const { lidStatuses } = require("./routes/lidStatus.route");
const { reasonLids } = require("./routes/reasonLid.route");
const { studentGroups } = require("./routes/studentGroup.route");
const { studentLessons } = require("./routes/studentLesson.route");
const { groupStuffs } = require("./routes/groupStuff.route");
const { stuffRoles } = require("./routes/stuffRole.route");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/groups", groups);
app.use("/roles", roles);
app.use("/students", students);
app.use("/stuffs", stuffs);
app.use("/lids", lids);
app.use("/lessons", lessons);
app.use("/payments", payments);
app.use("/branches", branches);
app.use("/stages", stages);
app.use("/lid-statuses", lidStatuses);
app.use("/reason-lids", reasonLids);
app.use("/student-groups", studentGroups);
app.use("/student-lessons", studentLessons);
app.use("/group-stuffs", groupStuffs);
app.use("/stuff-roles", stuffRoles);

async function connecToDB() {
  try {
    await connect(process.env.MOGNO_URL);
    console.log("MognoDB is connected!");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
  }
}

connecToDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
    servers: [
      {
        url: "https://my-swagger-mongodb.onrender.com",
        description: "Production (Render)",
      },
      {
        url: `http://localhost:${PORT}`,
        description: "Local development",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
