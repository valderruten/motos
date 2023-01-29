const express = require("express");
const { repairsRouter } = require("../routes/repairs.routes");
const cors = require("cors");
const { usersRouter } = require("../routes/user.routes");
const { db } = require("../database/db");
const morgan = require("morgan");
//1. CREAMOS UNA CLASE

class Server {
  constructor() {
    //DEFINIMOS LA APLICACIÓN DE EXPRESS Y SE LA ASIGNAMOS A LA PROPIEDAD APP
    this.app = express();
    //DEFINIMOS EL PUERTO QUE LO TENEMOS EN LOS ENVIROMENTS
    this.port = process.env.PORT || 3001;

    //DEFINIMOS LOS PATHS DE NUESTRA APLICACIÓN
    this.paths = {
      user: "/api/v1/user",
      repairs: "/api/v1/repair",
    };

    //LLAMO EL METODO DE CONEXION A LA BASE DE DATOS
    this.database();

    //INVOCAMOS EL METODO MIDDLEWARES
    this.middlewares();

    //INVOCAMOS EL METODO ROUTES
    this.routes();
  }

  //MIDDLEWARES
  middlewares() {
    this.app.use (morgan('dev'))
    //UTILIZAMOS LAS CORS PARA PERMITIR ACCESSO A LA API
    this.app.use(cors());
    //UTILIZAMOS EXPRESS.JSON PARA PARSEAR EL BODY DE LA REQUEST
    this.app.use(express.json());
  }

  //RUTAS
  routes() {
    //utilizar las rutas de productos
    this.app.use(this.paths.repairs, repairsRouter);
    //utilizar las rutas de usuarios
    this.app.use(this.paths.user, usersRouter);
  }

  database() {
    db.authenticate()
      .then(() => console.log("Database authenticated"))
      .catch((error) => console.log(error));

    db.sync()
      .then(() => console.log("Database synced"))
      .catch((error) => console.log(error));
  }

  //METODO PARA ESCUCHAR SOLICITUDES POR EL PUERTO
  listen() {
    this.app.listen(this.port, () => {
      console.log("Server is running on port", this.port);
    });
  }
}

//2. EXPORTAMOS EL SERVIDOR
module.exports = Server;
