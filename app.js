// carregando modulos 
const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const bodyParser = require('body-parser')
const admin = require("./routes/admin")
const path = require("path")
// const exp = require("constants")
const mongoose  = require("mongoose")
const session = require("express-session")
const flash = require("connect-flash")
const { runInNewContext } = require("vm")
require("./models/Postagem")
const Postagem = mongoose.model(("postagens"))
require("./models/Categoria")
const Categoria = mongoose.model(("categorias"))
const usuarios = require("./routes/usuario")

//config Sessão
app.use(session({
    secret: "cursodenode",
    resave: true,
    saveUninitialized: true
}))
app.use(flash())

//config Middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    next()
})


//config body parser

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//handlebars

app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// Mongoose
mongoose.Promise = global.Promise
mongoose.connect('mongodb://0.0.0.0:27017/blogapp').then(() => {
    console.log("conectado ao mongo")
}).catch((err) => {
    console.log("erro ao se conectar: "+ err)
})
mongoose.set('strictQuery', false);

// Public
app.use(express.static(path.join(__dirname, "public")))
// app.use((req, res, next) => {
//     console.log("OI EU SOU UM MIDLLEWARE!!")
//     next()
// })


// Rotas

app.get('/', (req, res) => {
    Postagem.find().lean().populate("categoria").sort({data: "desc"}).then((postagens) => {
        res.render("index", {postagens: postagens})
    }).catch((err) => {
        res.redirect("/404")
    })
})

app.get("/postagem/:slug", (req, res) => {
    Postagem.findOne({slug: req.params.slug}).lean().then((postagem) => {
        if(postagem){
            res.render("postagem/index", {postagem: postagem})
        }else{
            req.flash("error_msg", "Essa postagem não existe")
            res.redirect("/")
        }
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro interno")
        res.redirect("/")
    })
})

app.get("/categorias", (req, res) => {
    Categoria.find().lean().then((categorias) => {
        res.render("categorias/index", {categorias: categorias})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar categorias")
        res.redirect("/")
    })
})

app.get("/categorias/:slug", (req, res) => {
    Categoria.findOne({slug: req.params.slug}).lean().then((categoria) => {
        if(categoria){
            Postagem.find({categoria: categoria._id}).lean().then((postagens) => {
                res.render("categorias/postagens", {postagens: postagens, categoria: categoria})
                  console.log("postagem: " + postagens)
            }).catch((err) => {
                req.flash("error_msg", "Erro ao listar postagens!")
                res.redirect("/")
            })
        }else{
            req.flash("error_msg", "Esta categoria não existe!")
            res.redirect("/")
        }
    }).catch((err) => {
        req.flash("error_msg", "Erro ao localizar categoria")
        res.redirect("/")
    })
})

app.get("/404", (req, res) => {
    res.send("Erro 404!")
})

app.use('/admin', admin)
app.use("/usuarios", usuarios)

const PORT = 8081
app.listen(PORT, () => {
    console.log("o servidor esta rodando na url http://localhost:8081")

})



