const connection = require('../../../database')
const helpers = require('../../../helpers/helpers')
const controller = {}
const redirectPath = '/admin/products'
let message = "";

controller.renderProducts = async (req, res)=>{
    const categoria = await connection.query('select * from categoria')
    const products = await connection.query('select * from productos')
    res.render('system/admin/admin.products.hbs',{
       categoria, products, message
    })
 }

 controller.SaveProduct = async (req, res)=>{
     const {nombre, precio_compra, precio_venta, fk_categoria, imagen} = req.body;
     const newProduct = {nombre, precio_compra, precio_venta, fk_categoria, imagen};
     try {
         const validateProduct = await helpers.productExists(newProduct.nombre)
         if(validateProduct){ 
           message="El producto ya esta dado de alta"
           res.redirect(redirectPath)
         }else{ 
           await connection.query('insert into productos set ?',[newProduct])
           message="Producto guardado"
           res.redirect(redirectPath)
         }
     }
     catch (error) 
     {
       console.log(error)
       message="Algo sucedio, intentalo de nuevo."
       res.redirect(redirectPath)
     }
  }

  controller.editProduct = async (req, res)=>{
    const { id } = req.params
    const { nombre, precio_compra, precio_venta, fk_categoria, imagen} = req.body;
    const updatedProduct = {nombre, precio_compra, precio_venta, fk_categoria, imagen}
    try {
       await connection.query('update productos set ? where id = ?',[updatedProduct, id])
       message="Producto modificado"
       res.redirect(redirectPath)
    } 
    catch (error) {
      console.log(error)
      message="Algo sucedio, intentalo de nuevo."
      res.redirect(redirectPath)
    }
  }

  controller.deleteProduct = async (req, res)=>{
    const { id } = req.params;
    try {
      await connection.query('delete from productos where id = ?',[id])
      message="Producto eliminado"
      res.redirect(redirectPath)
    } 
    catch (error) {
      console.log(error)
      message="Algo sucedio, intentalo de nuevo."
      res.redirect(redirectPath)
    }
  }
 
  module.exports = controller