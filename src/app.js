const express = require("express");
const cors = require("cors");

const responseTime = require("./middlewares/responseTime");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

const eventoRoutes = require("./routes/eventoRoutes");
const participanteRoutes = require("./routes/participanteRoutes");
const inscricaoRoutes = require("./routes/inscricaoRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(responseTime);

app.use("/eventos", eventoRoutes);
app.use("/participantes", participanteRoutes);
app.use("/inscricoes", inscricaoRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;