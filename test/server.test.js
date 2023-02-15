const app = require("../src/app")
const supertest = require("supertest");
const request = supertest(app);

test("A aplicação deve responder a porta 3000", () => {
    return request.get("/").then(res => {
        let status = res.statusCode
        expect(status).toEqual(200);
    }).catch(err => {
        fail("Ocorreu um erro: " + err)
    })
})