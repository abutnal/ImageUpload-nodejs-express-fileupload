const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// default options
app.use(fileUpload());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
	res.render('index');
});


app.post('/create', (req,res)=>{
    // Check required validation
	if(req.files == null){
		 return res.render('index',{
    		msg: `Err: File is not selected`
    	  })
	}
	else{

	name = req.body.name;
	file = req.files.photo;

	fileName = Date.now()+'-'+file.name;
    fileSize = file.size;
    
    // Allowed ext
   	const filetypes = /jpeg|jpg|png|gig/;
	
	// Check file extenstion
	const extname = filetypes.test(path.extname(file.name).toLowerCase());

    // Check file mimetype
    const mimetype = filetypes.test(file.mimetype);

    // check file types 
    if(!mimetype && !extname){
    	return res.render('index',{
    		msg: 'Err: Image only allowed'
    	})
    }
    

    // Check file size
    if(fileSize > 5000000){
    	return res.render('index',{
    		msg: 'Err: File too larse'
    	})
    }

    
    
     
     // Upload files  to dir
    	file.mv(`public/uploads/${fileName}`, (err)=>{
		if(err){
			return res.render('index',{
    		msg: err
    	   })
		 }
		 else{

            return res.render('index',{
    		msg: `Hi ${name}, file uploaded succeesfuly`
    	  })

		 }
	});



}

})



const port = 3000;
app.listen(port, ()=>console.log(`We are live on ${port}`));


