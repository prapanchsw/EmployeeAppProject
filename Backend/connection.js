var mongoose = require('mongoose')
mongoose.connect("mongodb+srv://Prapanch:prapanch@cluster0.9xu2tvi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("connected");
})
.catch((error)=>{
    console.log(error)
})