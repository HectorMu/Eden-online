const connection = require('../database')
const controller = {}

controller.renderLanding = async (req, res)=>{
    const product = await connection.query('select * from productos limit 6')
    res.render('index.hbs',{ 
       product
    })
  }

 module.exports = controller
 