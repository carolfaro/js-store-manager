const { expect } = require("chai");
const { describe } = require("mocha");
const sinon = require("sinon");

const connection = require('../../../db/index');

const productsModel = require('../../../models/producstModel');

describe("Busca todos os produtos no bd", () => {

  describe("quando não nenhum produto procurado", () => {
      before(() => {
        const resultExecute = [[]]; 

        sinon.stub(connection, "execute").resolves(resultExecute);
      });

      after(() => {
        connection.execute.restore();
      });
    
    it("retorna um array", async () => {
      const [response] = await productsModel.getProducts();

      expect(response).to.be.an("array");
    });

    it("o array está vazio", async () => {
      const [response] = await productsModel.getProducts();

      expect(response).to.be.empty;
    });
});

describe("quando existem  produtos procurados", () => {
  /*Vamos mockar o array esperado na consulta ao banco de dados*/
  before(() => {
    const resultExecute = [
      { id: 1, name: "Martelo de Thor" },
      { id: 2, name: "Traje de encolhimento" },
    ];

    sinon.stub(connection, "execute").resolves(resultExecute);
  });

  after(() => {
    connection.execute.restore();
  });

  it("retorna um array", async () => {
    const response = await productsModel.getProducts();

    expect(response).to.be.an("array");
  });

  it("o array não está vazio", async () => {
    const response = await productsModel.getProducts();

    expect(response).to.not.be.empty;
  });

  it("o array possui itens do tipo objeto", async () => {
    const [item] = await productsModel.getProducts();

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