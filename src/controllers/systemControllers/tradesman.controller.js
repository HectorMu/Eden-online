const connection = require('../../database')
const controller = {}

controller.renderTradesmanDashboard = async (req, res)=>{
    const productschef = await connection.query(`select COUNT(*) as products from productospedidolinea pl, productos p where p.fk_categoria = 2 && pl.estatus = 'Preparacion' && pl.fk_producto = p.id;`)
    const productsbarman = await connection.query(`select COUNT(*) as products from productospedidolinea pl, productos p where p.fk_categoria = 1 && pl.estatus = 'Preparacion' && pl.fk_producto = p.id;`)
    const productsclients = await connection.query(`select COUNT(*) as products from productospedidolinea where estatus = 'Preparacion' || estatus = 'Preparado';`)
    const productschefprepared = await connection.query(`select COUNT(*) as products from productospedidolinea pl, productos p where p.fk_categoria = 2 && pl.estatus = 'Preparado' && pl.fk_producto = p.id;`)
    const productsbarmanprepared = await connection.query(`select COUNT(*) as products from productospedidolinea pl, productos p where p.fk_categoria = 1 && pl.estatus = 'Preparado' && pl.fk_producto = p.id;`)
    res.render('system/tradesman/dashboard', {
        Productschef: productschef[0].products, Productsbarman: productsbarman[0].products,
        Productsclients: productsclients[0].products, Productschefprepared: productschefprepared[0].products,
        Productsbarmanprepared: productsbarmanprepared[0].products
    })
}


module.exports = controller