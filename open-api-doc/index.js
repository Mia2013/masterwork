import express from "express";
import cors from "cors";

import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const PORT = process.env.PORT || 4000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Foxticket API",
      version: "1.0.0",
      description: "Express Library API for Foxticket",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*.*"],
};

const specs = swaggerJsDoc(options);

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(cors());

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
