const app = require("./app");
const host = "0.0.0.0";
const port = 8080;

app.listen(port, host, () =>
  console.log(
    `Sistemas iniciados exitosamente Servidor corriendo en el puerto ${port}`
  )
);
