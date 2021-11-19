const connection = require('../database')
const controller = {}

controller.renderLanding = async (req, res)=>{
    const categoria = await connection.query('select * from categoria')
    const product = await connection.query('select * from productos')
    res.render('index.hbs',{
       categoria, product
    })
  }

 module.exports = controller
 