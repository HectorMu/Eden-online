const connection = require('../../../database')
const helpers = require('../../../helpers/helpers')
const controller = {}
const redirectPath = '/admin/products'

controller.renderProducts = async (req, res)=>{
    const categoria = await connection.query('select * from categoria')
    const products = await connection.query('select * from productos')
    res.render('system/admin/admin.products.hbs',{
       categoria, products
    })
 }

 controller.SaveProduct = async (req, res)=>{
     const {nombre, precio_compra, precio_venta, fk_categoria, imagen} = req.body;
     const newProduct = {nombre, precio_compra, precio_venta, fk_categoria, imagen};
     try {
         const validateProduct = await helpers.productExists(newProduct.nombre)
         if(validateProduct){ 
          req.flash("error_msg", "Este producto ya existe.")
           res.redirect(redirectPath)
         }else{ 
           await connection.query('insert into productos set ?',[newProduct])
           const id_product = await connection.query('SELECT id FROM productos ORDER BY id DESC LIMIT 1')
           const fk_producto = id_product[0].id
           const existencias = 0
           const newStock = {fk_producto, existencias}           
           await connection.query('insert into almacen set ?', [newStock])
           req.flash("success_msg", "Producto guardado correctamente.")
           res.redirect(redirectPath)
         }
     }
     catch (error) 
     {
       console.log(error)
       req.flash("error_msg", "Algo sucedio, intentalo de nuevo.")
       res.redirect(redirectPath)
     }
  }

  controller.editProduct = async (req, res)=>{
    const { id } = req.params
    const { nombre, precio_compra, precio_venta, fk_categoria} = req.body;
    const updatedProduct = {nombre, precio_compra, precio_venta, fk_categoria}
    try {
       await connection.query('update productos set ? where id = ?',[updatedProduct, id])                  
       req.flash("success_msg", "Producto modificado correctamente.")
       res.redirect(redirectPath)
    } 
    catch (error) {
      console.log(error)
      req.flash("error_msg", "Algo sucedio, intentalo de nuevo.")
      res.redirect(redirectPath)
    }
  }

  controller.deleteProduct = async (req, res)=>{
    const { id } = req.params;
    try {
      await connection.query('delete from almacen where fk_producto = ?', [id])
      await connection.query('delete from productos where id = ?',[id])
      req.flash("success_msg", "Producto eliminado correctamente.")
      res.redirect(redirectPath)
    } 
    catch (error) {
      console.log(error)
      req.flash("error_msg", "Algo sucedio, intentalo de nuevo.")
      res.redirect(redirectPath)
    }
  }
 
  module.exports = controller