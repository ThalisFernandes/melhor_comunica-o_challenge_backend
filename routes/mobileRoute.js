const mysql = require('mysql');

const colors = ['BLACK', 'WHITE', 'GOLD', 'PINK']
const connection = mysql.createConnection(
    {
        host:"localhost",
        user:"????????",
        password:"????????",
        database: 'challenge_melhorcom'
    }
);

async function updateElement(req){
    let values = Object.keys(req.body).map((x)=> req.body[x]);
    let isValidDates = secondDateIsValid(req.body.startDate, req.body.endDate);    
    let code = req.params?.model;
    let updateValues = [...values, code];
    let isValidColor = colors.includes(req.body.color);
    if(isValidDates && isValidColor){
        let query = 'UPDATE devices SET model = ?, price = ?, brand = ?, startDate = ?, endDate= ?, color = ?  WHERE code = ?';

        return await connection.query(query, updateValues, (err, result)=> result?.affectedRows > 0);
    }
    let response =  isValidDates === false && isValidColor === false ? 'Segunda data é menor que a primeira e a cor Escolhida é INVALIDA' :
                    isValidDates  === false ? 'Segunda data é menor que a primeira!': 
                    isValidColor === false ? 'A cor Escolhida É INVALIDA' :  'Erro';
                    
    return response;

}

async function deleteDevice(req){

    
    
    
        let code = req.model;
        let query = `DELETE FROM devices WHERE code = ?`;

        return await connection.query(query, code, (err, result)=> result?.affectedRows > 0);

}

 async function insertDevice(req){

    let isValidDates = secondDateIsValid(req.body.startDate, req.body.endDate);
    let isValidColor = colors.includes(req.body.color);  
    if(isValidDates && isValidColor){

        let insertValues = Object.keys(req.body).map((x)=> req.body[x])    

        try {
            let query = "INSERT INTO devices(model, price, brand, startDate, endDate, color, code) VALUES (?,?,?,?,?,?,?)";
        return await connection.query(query, [...insertValues],(err, result)=> result?.affectedRows > 0);
        } catch (error) {
            return false;
        }
    }
    let response =  isValidDates === false && isValidColor === false ? 'Segunda data é menor que a primeira e a cor Escolhida é INVALIDA' :
                    isValidDates  === false ? 'Segunda data é menor que a primeira!': 
                    isValidColor === false ? 'A cor Escolhida É INVALIDA' :  'Erro';
                    
    return response;

 }
function secondDateIsValid(date1, date2){
    let d1 = new Date(date1);
    let d2 = new Date(date2);
    return d1 < d2;
}

const DeviceRoutes= (app)=>{
    app.route('/devices/:model?')
    .get(async (req, res)=>{
        let model = req.params['model'] ? req.params['model']: null;
        let getDevice = model !== null 
            ? `SELECT * FROM devices WHERE model LIKE "${model}%"`
            : 'SELECT * FROM devices';
        connection.query(getDevice, (err, result)=>{
            result?.length > 0 ? res.status(200).send({message:"Sucesso", result:result})
            : res.status(400).send({message:"Erro", result:result});
        });
    })
    .post(async (req, res)=>{
       const result = await insertDevice(req);
       
       
       typeof result === 'string' ? res.status(500).send({message:result}) :
       result ? res.status(201).send({message:"Sucesso"}):
       res.status(400).send({message:'Erro'})

    })
    .put(async (req, res)=>{
       let result = await updateElement(req);
       
       typeof result === 'string' ? res.status(500).send({message:result}) :
       result ? res.status(201).send({message:"Sucesso"}):
       res.status(400).send({message:'Erro'})
        
    })
    .delete(async (req, res)=>{
        const result = await deleteDevice(req.params);

        result ? res.status(201).send({message:"Sucesso"}):
        res.status(400).send({message:'Erro'})
    })
}



module.exports = DeviceRoutes
