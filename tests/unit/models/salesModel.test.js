const { expect } = require("chai");
const { describe } = require("mocha");
const sinon = require("sinon");

const connection = require("../../../db/index");

const salesModel = require("../../../models/salesModel");

describe("Busca todas as vendas no bd", () => {
  describe("quando não nenhum produto procurado", () => {
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

  describe("quando existem  vendas procurados", () => {
    /*Vamos mockar o array esperado na consulta ao banco de dados*/
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

    // it('tais itens possui as propriedades: "id", "title", "releaseYear" e "directedBy"', async () => {
    //   const [item] = await MoviesModel.getAll();

    //   expect(item).to.include.all.keys(
    //     "id",
    //     "title",
    //     "release_year",
    //     "directed_by"
    //   );
    // });
  });
});
