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

    it("retorna um array json com as vendas buscadas", async () => {
      await salesController.allSales(request, response);

      expect(response.json.calledWith(stubSales[0])).to.be.equal(true);
    });
  });

  describe("Busca vendas pelo id", async () => {
    const response = {};
    const request = { params: "1" };
    const stubSales = [
      {
        date: "2022-08-26T00:27:08.000Z",
        productId: 1,
        quantity: 5,
      },
      {
        date: "2022-08-26T00:27:08.000Z",
        productId: 2,
        quantity: 10,
      },
    ];

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, "getSalesById").resolves(stubSales);
    });

    after(() => salesService.getSalesById.restore());

    it("o status seja 200", async () => {
      await salesController.salesById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it("retorna um array json com os produtos buscados", async () => {
      await salesController.salesById(request, response);

      expect(response.json.calledWith(stubSales)).to.be.equal(true);
    });
  });

    describe("Adiciona nova venda", async () => {
      const response = {};
      const request = {}
      const stubSales = {
        id: 2,
        itemsSold: [
          {
            productId: 1,
            quantity: 8,
          },
        ],
      };

      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();

        sinon.stub(salesService, "add").resolves(stubSales);
      });

      after(() => salesService.add.restore());

      it("o status seja 201", async () => {
        await salesController.addSale(request, response);

        expect(response.status.calledWith(201)).to.be.equal(true);
      });

      it("retorna um array json com as vendas adicionadas", async () => {
        await salesController.addSale(request, response);

        expect(response.json.calledWith(stubSales)).to.be.equal(true);
      });
    });
});
