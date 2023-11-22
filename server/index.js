const express = require('express')
const cors = require('cors')
const { default: mongoose } = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8080

// Schema
const schemaData = mongoose.Schema({
	name : String,
	email : String,
	mobile : String,
},{
	timestamps : true
})
const userModel = mongoose.model("user", schemaData)

/*	Read
 	app.get("/", (req, res)=>{
		res.json({ message: "Server is running crud"})
	}) 
*/

// Read data
app.get("/", async(req, res)=>{
	const data = await userModel.find({})
	res.json({ Success : true, data : data })
})

// Create data
app.post("/create", async(req, res)=>{
	console.log(req.body)
	const data = new userModel(req.body)
	await data.save()
	res.send({ Success : true, message : "Data save successfully" })
})

// Update data
app.put("/update", async(req, res)=>{
	console.log(req.body)
	const { id, ...rest } = req.body
	console.log(rest)
	await userModel.updateOne({ _id : id }, rest)
	// await userModel.updateOne({ _id : req.body.id }, { name : "abc" })
	res.send({ Success : true, message : "Update data successfully" })
})

// delete data
app.delete("/delete/:id", async(req, res)=>{
	const id = req.params.id
	console.log(id)
	await userModel.deleteOne({ _id : id })
	res.send({ Success : true, message : "Delete data successfully" })
})

mongoose.connect("mongodb://127.0.0.1/crud")
.then(()=> {
	console.log("Connect to DB")
	app.listen(PORT, ()=>console.log("Server is running"))
})
.catch((err)=> console.log(err))
