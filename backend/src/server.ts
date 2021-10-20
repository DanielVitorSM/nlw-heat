import { serverHttp } from "./app";

const PORT = process.env.PORT || 8080;

serverHttp.listen(PORT, () => {
    console.info(`Servidor rodando na porta: ${PORT}`);
});