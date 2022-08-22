const { expect } = require("chai");
const sinon = require("sinon");
const productsService = require('../../../services/productsServices');
const productsController = require('../../../controllers/productsController');


describe('Busca todos os produtos no db', () => {

  describe('quando não existem produtos no banco de dados', async () => {
    const response = {};
    const request = {};
    const stubProducts = [
      { id: 1, name: "Martelo de Thor" },
      { id: 2, name: "Traje de encolhimento" },
    ];

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsService, "getAllProducts").resolves(stubProducts);
    });

     after(() => productsService.getAllProducts.restore());

    it('o status seja 200', async () => {
      await productsService.getAllProducts(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });



    // it('é chamado o método "json" passando um array', async () => {
    //   await MoviesController.getAll(request, response);

    //   expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    // });
  })
});