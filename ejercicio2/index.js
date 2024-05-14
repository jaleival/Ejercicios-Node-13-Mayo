const axios = require("axios");
const express = require("express");
const fs = require("fs");
const app = express();

app.get("/random", async (req, res) => {
  try {
    const { data } = await axios.get("https://randomuser.me/api/");
    const randomUser = data.results[0];
    const usuario = {
      name: randomUser.name.first,
      lastName: randomUser.name.last,
      email: randomUser.email,
    };

    let usuarios = [];
    if (fs.existsSync("./Usuarios.json")) {
      const fileData = fs.readFileSync("./Usuarios.json", "utf8");
      usuarios = JSON.parse(fileData).usuarios;
    }
    usuarios.push(usuario);

    fs.writeFileSync("Usuarios.json", JSON.stringify({ usuarios }));
    res.send("Usuario aleatorio guardado correctamente.");
  } catch (error) {
    console.error("Error al obtener usuario aleatorio:", error.message);
    res.status(500).send("Error al obtener usuario aleatorio.");
  }
});

// Manejador de rutas no definidas
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

// Lanzar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor iniciado en el puerto http://localhost:${PORT}`)
);
