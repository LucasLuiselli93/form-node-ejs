const express = require('express');
const app = express();
const path = require('node:path');

const{body,validationResult} = require("express-validator")

app.use(express.json())
// definir motor de plantilla

app.set("view engine","ejs")
app.set("views","./views")
app.use(express.urlencoded({extended:true}))



// defino plantilla
app.get('/', function(req, res){
  res.render("index");
});


app.post("/registrar",[
  body("name", "Ingrese nombre y apellido").exists().isLength({min:5}).isLength({max:40}),
  body('email', "Ingrese un email valido").exists().isEmail(),
  body("password", "Ingresar password").exists().isLength({min:9})
],
(req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(req.body)
    const valores= req.body
    const errores = errors.array()
    res.render("index", {errores:errores,valores:valores})
  }else{
    res.send("validacion exitosa")
  }

})

app.listen(9000,()=>{
    console.log("todo ok en el servidor http://localhost:9000 ")
})