const express = require ('express');
const CarroModel = require('./models/CarroModel');
const app = express();
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://josejjonhson:2KzuK0jWJJcBpXPM@cluster0.6nmke.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const carros = [];

app.get("/", function(req, res){
    res.render("index");
    
});

app.get("/carros", async function(req, res)  {
    const status = req.query.c;
    res.render("carro/listagem", { carros, status });
});

//rota para cadastro de um novo carro TÁ FUNCIONANDO!!!
app.post("/carros", async function(req, res) {
    const carro = req.body;
    const novoCarro = new CarroModel({
        marca: carro.inp_marca,
        modelo: carro.inp_modelo,
        ano: carro.inp_ano,
        placa: carro.inp_placa,
        cor: carro.inp_cor,
        preco_diaria: carro.inp_preco_diaria
    });
    await novoCarro.save();
    res.redirect("/");
});

app.get("/carros/cadastrar", function(req,res){
    res.render("carro/cadastrar");
});

// app.get("/carros/:placa", async function(req, res) {
//     const placa = req.params.placa;
//     const carro = await CarroModel.findOne({ placa: placa });
//     if (carro) {
//         res.render("carro/detalhar", { carro });
//     } else {
//         res.status(404).send("Veículo não encontrado");
//     }
// });

app.listen("888", function(){
    console.log("Rodando");
});