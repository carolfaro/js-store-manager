const { expect } = require("chai");
const { describe } = require("mocha");
const sinon = require("sinon");
const salesService = require("../../../services/salesService");
const salesModel = require("../../../models/salesModel");
const producstModel = require("../../../models/producstModel");

describe("Busca vendas no db", async () => {
  describe("quando não existem produtos vendidos banco de dados na busca geral", async () => {
    before(() => {
      sinon.stub(salesModel, "getAllSales").resolves([]);
    });

    after(() => salesModel.getAllSales.restore());

    it("retorna um array", async () => {
      const result = await salesService.getAllSales();
      expect(result).to.be.an("array");
    });

    it("o array retornado é vazio", async () => {
      const result = await salesService.getAllSales();
      expect(result).to.empty;
    });
  });

  describe("quando existem produtos vendidos no banco de dados na busca geral", async () => {
    before(() => {
      sinon.stub(salesModel, "getAllSales").resolves([
        {
          saleId: 1,
          date: "2021-09-09T04:54:29.000Z",
          productId: 1,
          quantity: 2,
        },
      ]);
    });

    after(() => salesModel.getAllSales.restore());

    it("retorna um array", async () => {
      const result = await salesService.getAllSales();
      expect(result).to.be.an("array");
    });

    it("o array retornado não está vazio", async () => {
      const result = await salesService.getAllSales();
      expect(result).to.not.empty;
    });

    it("os elementos do array devem ser objetos", async () => {
      const result = await salesService.getAllSales();
      expect(result[0]).to.be.an("object");
    });
  });

  describe("quando existem produtos vendidos no banco de dados na busca geral", async () => {
    before(() => {
      sinon.stub(salesModel, "salesById").resolves([
        {
          date: "2022-08-20T17:32:13.000Z",
          productId: 3,
          quantity: 15,
        },
      ]);
    });

    after(() => salesModel.salesById.restore());

    it("retorna um array", async () => {
      const result = await salesService.getSalesById(1);
      expect(result).to.be.an("array");
    });

    it("o array retornado não está vazio", async () => {
      const result = await salesService.getSalesById(2);
      expect(result).to.not.empty;
    });

    it("os elementos do array devem ser objetos", async () => {
      const result = await salesService.getSalesById(1);
      expect(result[0]).to.be.an("object");
    });

    it("os elementos do array devem incluir date, productId, quantity", async () => {
      const result = await salesService.getSalesById(1);
      expect(result[0]).to.include.all.keys("date", "productId", "quantity");
    });
  });

  describe("Quando adiciona uma nova venda", async () => {
    
    describe("Se não existir produtoId", async () => {
      
      before(() => {
                sinon.stub(producstModel, "findProductsId").resolves([
          {id:1,name:'Martelo de Thor'},
          {id:2,name:'Traje de encolhimento'},
          {id:3,name:'Escudo do Capitão América'},
        ]);
      });

      after(() => producstModel.findProductsId.restore());

      it("retorna false se não houver produto", async () => {
        const result = await salesService.add([
          { productId: 9999, quantity: 1 },
        ]);
        expect(result).to.be.false;
      });
   
    });
  
  });
});
  
  // describe("Quando uma venda é adicionada", async () => {
  //   before(() => {
  //         sinon.stub(salesModel, "add").resolves([
  //     {id:1,name:'Martelo de Thor'},
  //     {id:2,name:'Traje de encolhimento'},
  //     {id:3,name:'Escudo do Capitão América'},
  //      ]);
  //   });

  //   after(() => salesModel.salesById.restore());

  //   it("retorna false se não houver produto", async () => {
  //     const result = await salesService.getSalesById(1);
  //     expect(result).to.be.an("array");
  //   });
  // });
// });
