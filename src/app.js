const express = require('express') //chamar dependencia 
const app = express()

require('dotenv').config()
const PORT = process.env.PORT

const cors = require('cors')
app.use(cors())


const Post = require('./models/Posts')

app.use(express.json())

//------------------------Rotas e metodos---------------------------------

//------rotas para teste

app.get('/helo_word', (req, res) => { //rota helo_word
    res.send('Marcelino') // messagem
})

app.post('/create', (req, res) => { //rota criar exemplo
    const titlev = req.body.title
    
    res.send(`Titulo: ${titlev}`)
})

//----- fim da rota para teste


app.post('/create_post', async (req, res) => { //rota criar post

    try {
        const { title, content } = req.body
        const post = await Post.create({ title, content })
        res.send(post)
    } catch(err){
        res.status(400).send(err)
    }
})


app.get('/list_post', async (req, res) =>{ //listagem de dados
    
    try{
        const posts = await Post.find()
        res.send({ posts })
    } catch(err){
        res.status(400).send(err)
    }
    
})

app.get('/show_post/:post_id', async (req,res) =>{ //lista um unico registro
    try{

        const postId = req.params.post_id
        //const post = await Post.find({ _id: postId })
        const post = await Post.findById(postId)
        res.send(post)

    } catch(err){
        res.status(400).send(err)
    }
})


app.patch('/update_post/:post_id', async (req, res) => { //update
    try{
       const postId = req.params.post_id

       const {title, content } = req.body

       const post = await Post.findByIdAndUpdate(postId, { title, content } , { new: true })

       res.send({ post })

    } catch(err){
        res.status(400).send(err)
    }
})


app.delete('/delete_post/:post_id', async (req, res) => {
    try{
        const postId = req.params.post_id

        await Post.findByIdAndDelete(postId)

        res.send({ msg: 'Deletado com sucesso' })
    }catch(err){
        res.status(400).send(err)
    }
})


//---------------------------Fim de Rotas e metodso------------------------------


app.listen(PORT, () => { //porta para acessar api
    console.log('server running on port: ' + PORT)
}) 
