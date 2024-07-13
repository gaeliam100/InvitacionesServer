//importamos la libreria para usar uuid
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const cors = require('cors');
const { Client } = require("@notionhq/client");
// Habilitar CORS para todos los orígenes
app.use(cors());
// Inicializando el cliente de Notion
const notion = new Client({ auth: "secret_R359cUMVKodYb42PpOWQNtLNgCEajfRcoAClU8QxvmM" });

const app = express();
app.use(express.json());

app.post('/insert', async (req, res) => {
    console.log(req.body);
    const { name, persons, asistencia } = req.body;
    try {
        console.log(req.body)
        const response = await notion.pages.create({
            parent: { database_id: "3e2e2058a0344cb687e32554526a35eb" },
            properties: {
                id_invitado: {
                    rich_text: [
                        {
                            text: {
                                content: uuidv4()
                            }
                        }
                    ]
                },
                Nombre: {
                    title: [
                        {
                            text: {
                                content: name  // Asegúrate de pasar el nombre correcto
                            }
                        }
                    ]
                },
                Asistira: {
                    select: {
                        name: asistencia  // Aquí asumiendo que 'asistencia' es un valor válido en el select
                    }
                },
                personas: {
                    number: persons  // Asegúrate de que 'persons' sea un número
                }
            }
        });
        res.json(response);
        return res.status(200).json({ message: "Invitado creado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get('/get', async (req,res) => {
res.send("correctamente conectado")
});
// Rutas
app.get('/', (req, res) => {
    console.log('cors enabled');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});