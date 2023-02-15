const app = require("../src/app")
const supertest = require("supertest");
const request = supertest(app);

describe("Cadastro de usuário", () => {
    test("Deve cadastrar o usuário com sucesso", () => {
        
        let time = Date.now();
        let email = `${time}@email.com`
        
        let user = {
            name: "Ana",
            email,
            password: "123"
        }

        return request.post("/user")
            .send(user)
            .then(res => {
                expect(res.statusCode).toEqual(200);
                expect(res.body.email).toEqual(email)
            }).catch(err => {
                fail(err)
            })
    })
})