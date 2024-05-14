//1.- Importación del paquete axios
const axios = require('axios');
const express = require('express');
const app = express();

//2.- Crear una ruta GET /random
app.get('/random', async (req, res) => {
    try {
        //3.- Utiliza axios para consultar la API en su end point: https://randomuser.me/api/
        const { data } = await axios.get('https://randomuser.me/api/')
        //4.- Imprime por consola la data obtenida y concluye la consulta
        console.log(data);
        res.send(data);
    } catch (error) {
        console.error("Error al obtener datos aleatorios:", error.message);
        res.status(500).send("Error al obtener datos aleatorios");
    }
});
    
    // Iniciar el servidor
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor iniciado en el puerto http://localhost:${PORT}`);
    });