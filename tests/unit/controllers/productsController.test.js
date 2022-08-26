const { expect } = require("chai");
const sinon = require("sinon");
const productsService = require("../../../services/productsServices");
const productsController = require("../../../controllers/productsController");



describe('Busca produtos no db', () => {

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
      await productsController.getAllProducts(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('retorna um array json com os produtos buscados', async () => {
      await productsController.getAllProducts(request, response);

      expect(response.json.calledWith(stubProducts[0])).to.be.equal(true);
 });
  });

   describe('Busca produtos pelo id', async () => {
     const response = {};
     const request = { params: '1'};
     const stubProducts = [
       { id: 1, name: "Martelo de Thor" }
     ];

     before(() => {
       response.status = sinon.stub().returns(response);
       response.json = sinon.stub().returns();

       sinon.stub(productsService, "getAllProducts").resolves(stubProducts);
     });

     after(() => productsService.getAllProducts.restore());

     it('o status seja 200', async () => {
       await productsController.getByIdProducts(request, response);

       expect(response.status.calledWith(200)).to.be.equal(true);
     });

     it('retorna um array json com os produtos buscados', async () => {
       await productsController.getAllProducts(request, response);

       expect(response.json.calledWith(stubProducts[0])).to.be.equal(true);
     });
   });
  
   describe("Adiciona novo produto", async () => {
     const response = {};
     const request = {};
     const stubProducts = {
       id: 4,
       name: "ProdutoX",
     };

     before(() => {
       request.body = {
         name: "ProdutoX",
       };
       response.status = sinon.stub().returns(response);
       response.json = sinon.stub().returns();

       sinon.stub(productsService, "addProducts").resolves(stubProducts);
     });

     after(() => productsService.addProducts.restore());

     it("o status seja 201", async () => {
       await productsController.addProducts(request, response);

       expect(response.status.calledWith(201)).to.be.equal(true);
     });

     it("retorna um array json com as vendas adicionadas", async () => {
       await productsController.addProducts(request, response);

       expect(response.json.calledWith(stubProducts)).to.be.equal(true);
     });
   });
});