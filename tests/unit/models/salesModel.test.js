const { expect } = require("chai");
const { describe } = require("mocha");
const sinon = require("sinon");

const connection = require("../../../db/index");

const salesModel = require("../../../models/salesModel");

describe("Busca todas as vendas no bd pela camada models", () => {
  
  describe("quando não nenhum produto procurado na busca geral", () => {
    before(() => {
      const resultExecute = [[]];

      sinon.stub(connection, "execute").resolves(resultExecute);
    });

    after(() => {
      connection.execute.restore();
    });

    it("retorna um array", async () => {
      const [response] = await salesModel.getAllSales();

      expect(response).to.be.an("array");
    });

    it("o array está vazio", async () => {
      const [response] = await salesModel.getAllSales();

      expect(response).to.be.empty;
    });
  });

  describe("quando existem vendas procuradas pela busca geral", () => {
   
    before(() => {
      const resultExecute = [
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        }
      ];

      sinon.stub(connection, "execute").resolves(resultExecute);
    });

    after(() => {
      connection.execute.restore();
    });

    it("retorna um array", async () => {
      const response = await salesModel.getAllSales();

      expect(response).to.be.an("array");
    });

    it("o array não está vazio", async () => {
      const response = await salesModel.getAllSales();

      expect(response).to.not.be.empty;
    });

    it("o array possui itens do tipo objeto", async () => {
      const [item] = await salesModel.getAllSales();

      expect(item).to.be.an("object");
    });
  });
});

// teste busca pelo id
describe("Busca vendas pelo id do produto camada models", () => {
  describe("quando uma venda é encontrada", () => {
    before(() => {
      const resultExecute = [[
        {
            date: "2022-08-20T17:06:24.000Z",
            productId: 3,
            quantity: 15,
          },],[]];

      sinon.stub(connection, "execute").resolves(resultExecute);
    });

    after(() => {
      connection.execute.restore();
    });

     it("retorna um array", async () => {
       const response = await salesModel.salesById(3);

       expect(response).to.be.an("array");
     });

     it("o array não está vazio", async () => {
       const response = await salesModel.salesById(3);

       expect(response).to.not.be.empty;
     });

     it("o array possui itens do tipo objeto", async () => {
       const [response] = await salesModel.salesById(3);

       expect(response).to.be.an("object");
     });

     it("o objeto possui as chaves date, productId e quantity", async () => {
       const [response] = await salesModel.salesById(3);

       expect(response).to.include.all.keys("date", "productId", "quantity");
     });
  });
});
