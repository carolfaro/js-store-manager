const { expect } = require("chai");
const { describe } = require("mocha");
const sinon = require("sinon");
const productsService = require("../../../services/productsServices");
const productsModel = require('../../../models/producstModel');


describe("Busca produtos no db", async () => {
  
  describe("quando não existem produtos no banco de dados na busca geral", async () => {

    before(() => {
      sinon.stub(productsModel, "getProducts").resolves([]);
    });

    after(() => productsModel.getProducts.restore());

   it("retorna um array", async () => {
     const result = await productsService.getAllProducts();
     expect(result).to.be.an("array");
   });
    
    it("o array retornado é vazio", async () => {
      const result = await productsService.getAllProducts();
      expect(result).to.empty;
    });
  });

   describe("quando existem produtos no banco de dados na busca geral", async () => {
     before(() => {
       sinon
         .stub(productsModel, "getProducts")
         .resolves([{ id: 1, name: "Martelo de Thor" }]);
     });

     after(() => productsModel.getProducts.restore());

     it("retorna um array", async () => {
       const result = await productsService.getAllProducts();
       expect(result).to.be.an("array");
     });

     it("o array retornado não está vazio", async () => {
       const result = await productsService.getAllProducts();
       expect(result).to.not.empty;
     });
   });

});