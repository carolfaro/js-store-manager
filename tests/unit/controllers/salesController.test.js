const { expect } = require("chai");
const sinon = require("sinon");
const salesService = require("../../../services/salesService");
const salesController = require("../../../controllers/salesController");

describe("Busca vendas no db", () => {
  describe("quando não existem vendas no banco de dados", async () => {
    const response = {};
    const request = {};
    const stubSales = [
	{
		"saleId": 1,
		"date": "2022-08-25T23:28:09.000Z",
		"productId": 1,
		"quantity": 5
	},
	{
		"saleId": 1,
		"date": "2022-08-25T23:28:09.000Z",
		"productId": 2,
		"quantity": 10
	}]

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, "getAllSales").resolves(stubSales);
    });

    after(() => salesService.getAllSales.restore());

    it("o status seja 200", async () => {
      await salesController.allSales(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it("retorna um array json com os produtos buscados", async () => {
      await salesController.allSales(request, response);

      expect(response.json.calledWith(stubSales[0])).to.be.equal(true);
    });
  });

  // describe("Busca produtos pelo id", async () => {
  //   const response = {};
  //   const request = { params: "1" };
  //   const stubProducts = [{ id: 1, name: "Martelo de Thor" }];

  //   before(() => {
  //     response.status = sinon.stub().returns(response);
  //     response.json = sinon.stub().returns();

  //     sinon.stub(productsService, "getAllProducts").resolves(stubProducts);
  //   });

  //   after(() => productsService.getAllProducts.restore());

  //   it("o status seja 200", async () => {
  //     await productsController.getByIdProducts(request, response);

  //     expect(response.status.calledWith(200)).to.be.equal(true);
  //   });

  //   it("retorna um array json com os produtos buscados", async () => {
  //     await productsController.getAllProducts(request, response);

  //     expect(response.json.calledWith(stubProducts[0])).to.be.equal(true);
  //   });
  // });
});
