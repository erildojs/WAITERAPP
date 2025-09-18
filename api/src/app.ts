import { app } from "./server";

app.listen(process.env.API_PORT, () => {
  console.log('server is running on por', + process.env.API_PORT);
  console.log('Documentação no endereço:', `${process.env.API_PORT}`, '/docs');
})