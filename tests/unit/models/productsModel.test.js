const { expect } = require("chai");
const { describe } = require("mocha");
const sinon = require("sinon");

const connection = require('../../../db/index');

const productsModel = require('../../../models/producstModel');

describe("Busca os produtos no bd pela camada Model pela busca geral", () => {

  describe("quando não nenhum produto é encontrado na busca geral", () => {
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

  describe("quando são encontrados produtos na busca geral", () => {
 
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
  });
});

describe("Busca os produtos no banco de dados pelo id do produto", () => {
  
  describe("quando existem existe um produto procurado pelo id", () => {
  
    before(() => {
      const resultExecute = [[
          {
            id: 1,
            name: "Martelo de Thor",
          },],[]];

      sinon.stub(connection, "execute").resolves(resultExecute);
    });

    after(() => {
      connection.execute.restore();
    });

    it("retorna um array", async () => {
      const response = await productsModel.getProductsById(1);

      expect(response).to.be.an("array");
    });

    it("o array não está vazio", async () => {
      const response = await productsModel.getProductsById(1);

      expect(response).to.not.be.empty;
    });

    it("o array possui itens do tipo objeto", async () => {
     const [[response]] = await productsModel.getProductsById(1);

      expect(response).to.be.an("object");
    });

     it("o objeto possui as chaves id e name", async () => {
       const [[response]] = await productsModel.getProductsById(1);

       expect(response).to.include.all.keys("id", "name");
     });
  });
});

describe("Busca os produtos no banco de dados pelo id do produto na camada models", () => {
  
  describe("quando existem existe um produto procurado pelo id", () => {
  
    before(() => {
      const resultExecute = [[
          {
            id: 1,
            name: "Martelo de Thor",
          },],[]];

      sinon.stub(connection, "execute").resolves(resultExecute);
    });

    after(() => {
      connection.execute.restore();
    });

    it("retorna um array", async () => {
      const response = await productsModel.getProductsById(1);

      expect(response).to.be.an("array");
    });

    it("o array não está vazio", async () => {
      const response = await productsModel.getProductsById(1);

      expect(response).to.not.be.empty;
    });

    it("o array possui itens do tipo objeto", async () => {
     const [[response]] = await productsModel.getProductsById(1);

      expect(response).to.be.an("object");
    });

     it("o objeto possui as chaves id e name", async () => {
       const [[response]] = await productsModel.getProductsById(1);

       expect(response).to.include.all.keys("id", "name");
     });
  });
});

// teste add
describe("Adiciona produtos no banco de dados pelo id do produto na camada models", () => {
  describe("quando é possível adicionar um produto", () => {
    before(() => {
      const resultExecute = [{
        id: 1,
        name: "Martelo de Thor",
      }];

      sinon.stub(connection, "execute").resolves(resultExecute);
    });

    after(() => {
      connection.execute.restore();
    });

    it("retorna um objeto", async () => {
      const response = await productsModel.addProducts("Martelo de Thor");

      expect(response).to.be.an("object");
    });


    it("retorna um objeto que não está vazio", async () => {
      const response = await productsModel.addProducts("Martelo de Thor");

      expect(response).to.not.be.empty;
    });

     it("retorna um objeto que não está vazio com as chaves id e name", async () => {
       const response = await productsModel.addProducts("Martelo de Thor");

       expect(response).to.include.all.keys("id", "name");
     });
  });
});
 