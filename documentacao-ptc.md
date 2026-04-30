# Documentação — PTC Treinamento CITi

## Configuração do Ambiente

### Docker CE (Linux)

No Linux, o Docker pode rodar nativamente através do Docker Engine (CE), sem necessidade de uma VM. O processo de configuração envolveu alguns ajustes:

- **Arquivo `.env`** deve ser criado dentro da pasta `/server`, não na raiz do projeto.
- **`~/.docker/config.json`** continha a entrada `"credsStore": "desktop"`, que referencia o Docker Desktop (exclusivo de Mac/Windows). A remoção dessa linha foi necessária para que o Docker Engine encontrasse as imagens corretamente.
- O comando utilizado para subir os containers foi:
  ```bash
  docker compose up
  ```
  Com os containers ativos, o terminal exibe as mensagens:
  ```
  📦 Server running
  📦 Successfully connected with database
  ```

### Migrations

Com o servidor rodando, as migrations foram aplicadas em um segundo terminal:

```bash
yarn migration
```

As migrations já existentes no repositório foram aplicadas automaticamente, sem necessidade de criar novas. Migrations futuras devem ser rodadas sempre que o arquivo `schema.prisma` for modificado.

---

## Estrutura do Projeto

O boilerplate segue uma arquitetura em camadas, separando responsabilidades entre:

- **`src/repositorie/`** — acesso ao banco de dados via Prisma
- **`src/controllers/`** — lógica de requisição e resposta HTTP
- **`src/routes.ts`** — registro de todas as rotas da API

---

## Implementação do CRUD

### Entidade: User

O repositório `UserRepositorie.ts` foi desenvolvido com base na apresentação da turma de Desenvolvimento, contendo as funções:

- `createUserRepository`
- `readAllUsersRepository`
- `updateUserRepository`
- `deleteUserRepository`

O controller `UserController.ts` importa essas funções e implementa o tratamento de cada requisição.

### Entidade: Calçado

O repositório `CalcadoRepositorie.ts` foi desenvolvido com base no padrão estabelecido para `User`, contendo as funções:

- `createCalcadoRepository`
- `readAllCalcadoRepository`
- `updateCalcadoRepository`
- `deleteCalcadoRepository`

O controller `CalcadoController.ts` importa essas funções seguindo o mesmo padrão.

---

## Decisões de Implementação

Em cada operação foram investigados e tratados casos de erro esperados:

| Operação | Caso investigado |
|----------|-----------------|
| **Create** | Entradas vazias ou campos obrigatórios não preenchidos |
| **Read** | Ausência de dados armazenados |
| **Update** | ID inexistente no banco de dados |
| **Delete** | ID inexistente no banco de dados |

### Observações técnicas

- Parâmetros vindos de `req.params` são sempre do tipo `string` no Express. Para campos numéricos como `id`, foi necessário converter com `parseInt()` e validar com `isNaN()`.
- O tipo `int` não existe em TypeScript — o equivalente é `number`.
- Campos numéricos no corpo da requisição (JSON) devem ser enviados sem aspas. Decimais usam ponto (`.`), não vírgula.
- `findMany()` nunca retorna `null` — retorna um array vazio `[]` quando não há registros.

---

## Rotas

Todas as rotas de `User` e `Calçado` foram reunidas em `routes.ts`:

```typescript
// Usuário
router.post("/user", createUser);
router.get("/user", readAllUsers);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

// Calçado
router.post("/calcado", createCalcado);
router.get("/calcado", readAllCalcado);
router.put("/calcado/:id", updateCalcado);
router.delete("/calcado/:id", deleteCalcado);
```

---

## Testes

Cada funcionalidade foi testada utilizando a extensão **Thunder Client** no VSCode, realizando requisições HTTP diretamente para as rotas implementadas.
