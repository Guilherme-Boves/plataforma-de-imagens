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

    test("Deve impedir que um usuário se cadastre com dados vazios", () => {
                
        let user = {
            name: "",
            email: "",
            password: ""
        }

        return request.post("/user")
            .send(user)
            .then(res => {
                expect(res.statusCode).toEqual(400);
            }).catch(err => {
                fail(err)
            })
    })
    
    test("Deve impedir que um usuário se cadastre com um email repetido", () => {
        let time = Date.now();
        let email = `${time}@email.com`
        
        let user = {
            name: "Beatriz",
            email,
            password: "123"
        }

        return request.post("/user")
            .send(user)
            .then(res => {
                expect(res.statusCode).toEqual(200);
                expect(res.body.email).toEqual(email);

                return request.post("/user")
                .send(user)
                .then(res => {
                    expect(res.statusCode).toEqual(400);
                    expect(res.body.error).toEqual("E-mail já cadastrado");
                }).catch(err => {
                    fail(err)
                })                
            }).catch(err => {
                fail(err)
            })
    })
})