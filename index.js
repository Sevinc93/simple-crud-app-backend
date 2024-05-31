const express = require('express')
const mongoose = require ('mongoose');
const app = express()
const Product = require ('./models/product.model.js');


app.use(express.json());
app.use(express.urlencoded({extendend: false}));







app.listen(3000, () => {
    console.log('Server is running on port 3000');

});


app.get('/api', (req, res) => {
    res.send("Hello from Node API Server Updated");
});


app.get('/api/products', async (req, res)=> {
try {
  const products = await Product.find({})
  res.status(200).json(products);
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  });

  app.get('/api/product/:id', async (req, res)=> {
    try {
      const { id }= req.params;
      const product = await Product.findById(id);
      res.status(200).json(product);
        } catch (error) {
          res.status(500).json({message: error.message});
        }
      });





app.post('/api/products', async (req, res)=> {
  try {
const product = await Product.create(req.body);
res.status(200).json(product);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});


app.put('/api/product/:id', async (req, res)=> {
  try {
    const { id }= req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if(!product) {
      return res.status(404).json({message: "Product not found"});
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);

    res.status(200).json(product);
      } catch (error) {
        res.status(500).json({message: error.message});
      }
    });

    app.delete('/api/product/:id' , async (req, res) => {
      try {
        const { id }= req.params;
        const product = await Product.findByIdAndDelete(id);

        if(!product) {
          return res.status(404).json({message: "Product not found"});
        }

        res.status(200).json({message: "Product deleted successfully"});
        
        res.status(200).json(products);
          } catch (error) {
            res.status(500).json({message: error.message});
          }
    
    
    });




mongoose.connect("mongodb+srv://sevincinsan93:K6WtSKcNjPCo4jNC@backenddb.kblbjyc.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
.then(() => {
console.log("connected to database!");
})
.catch(() => {
  console.log("Connection failed!");
});
