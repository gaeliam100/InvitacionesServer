const express = require('express');
const { Client } = require("@notionhq/client");

// Inicializando el cliente de Notion
const notion = new Client({ auth: "secret_R359cUMVKodYb42PpOWQNtLNgCEajfRcoAClU8QxvmM" });

const app = express();
app.use(express.json());

app.post('/insert', async (req, res) => {
    try {
        const response = await notion.pages.create({
            parent: { database_id: "3e2e2058a0344cb687e32554526a35eb" },
            properties: {
                Nombre: {
                    title: [
                        {
                            text: {
                                content: "Juan"
                            }
                        }
                    ]
                },
                Email: {
                    email: "juan@example.com"
                },
                id_invitado: {
                    rich_text: [
                        {
                            text: {
                                content: "12345"
                            }
                        }
                    ]
                },
                Apellido_paterno: {
                    rich_text: [
                        {
                            text: {
                                content: "Pérez"
                            }
                        }
                    ]
                },
                Apellido_Materno: {
                    rich_text: [
                        {
                            text: {
                                content: "García"
                            }
                        }
                    ]
                },
                Teléfono: {
                    phone_number: "555-1234"
                },
                Asistirá: {
                    checkbox: true
                }
            }
        });
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/select', async (req, res) => {
    try {
        const response = await notion.databases.query({
            database_id: "3e2e2058a0344cb687e32554526a35eb"
        });
        res.json(response.results[0].properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/update/:pageId', async (req, res) => {
    const { pageId } = req.params;
    try {
        const response = await notion.pages.update({
            page_id: pageId,
            properties: {
                Nombre: {
                    title: [
                        {
                            text: {
                                content: "Juan Actualizado"
                            }
                        }
                    ]
                },
                Email: {
                    email: "juan_actualizado@example.com"
                },
                id_invitado: {
                    rich_text: [
                        {
                            text: {
                                content: "67890"
                            }
                        }
                    ]
                },
                Apellido_paterno: {
                    rich_text: [
                        {
                            text: {
                                content: "Pérez Actualizado"
                            }
                        }
                    ]
                },
                Apellido_Materno: {
                    rich_text: [
                        {
                            text: {
                                content: "García Actualizado"
                            }
                        }
                    ]
                },
                Teléfono: {
                    phone_number: "555-5678"
                },
                Asistirá: {
                    checkbox: false
                }
            }
        });
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});