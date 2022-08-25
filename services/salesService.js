const salesModel = require('../models/salesModel');
const productsModel = require('../models/producstModel');

const salesService = {

  async add(data) {
    const allProducts = await productsModel.findProductsId();

    const validation = data.every((item) =>
      allProducts.some((ele) => ele.id === item.productId));
    
    if (!validation) return false;

    const newSale = await salesModel.addSale(data);

    const saleInserted = {
      id: newSale,
      itemsSold: data,
    };

    return saleInserted;
  },

  async get(id) {
    const getSale = await salesModel.get(id);
    return getSale;
  },

  async getAllSales(id = null) {
    if (id) {
      return salesModel.get(id);
    }
    return salesModel.getAllSales();
  },
};

module.exports = salesService;

  // async checkId(arrayOfId) {
  //   const items = await productModel.checkIdProducts(arrayOfId);
  //   console.log(items);
  //   if (!items.length) return true;

  //   items.forEach((item) => {
  //     if (!arrayOfId.includes(item.productId)) {
  //       return true;
  //     }
  //   });
  // },

  // async errorProduct(_req, res) {
  //   res.status(404).json({ message: 'Product not found' });
  // },
  // const getByPK = async (id) => {
  //   const [product] = await connection.execute(
  //     "SELECT * FROM StoreManager.products WHERE id = ?;",
  //     [id]
  //   );
  //   if (!product[0]) return null;
  //   return product[0];
  // };
