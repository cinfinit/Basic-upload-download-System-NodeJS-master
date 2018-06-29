const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
const fileupload=require('express-fileupload');
var app=express();
app.set('view engine','hbs');
app.use(express.static(__dirname+ '/views'));
app.use(fileupload());
var game='something';
var counter=0;
var counter1=0;
var some=[];
var dirr;
app.get('/',(req,res)=>{
  res.render('initialindex.hbs',{some:some,c2:counter1,c1:counter});
});
app.post('/',(req,res)=>{
  if(req.files){
    var file=req.files.filename;
    var f=req.files.filename.name;
    game=f;
    //console.log(game);
    dirr=f;
    if(!fs.existsSync(dirr)){
      fs.mkdirSync(dirr);
    }
    else{
      dirr=f;
    }
    file.mv("./"+dirr+"/"+f,(error)=>{
    // instead of "newfiles" you need to location of your directory
    //where you need to move the file
      counter++;
      some.push(game);
      //fs.appendFileSync('logs.txt',game+"\n");
      //console.log(counter);
      if(error){
        console.log(error);
        res.send('Error occured');
      }
      else{
        game=f;
        res.redirect('/');
        // this works as i directly redirect this part to the previous view with upldated values
        //this we used we were making a seperate download page
        //res.sendFile(__dirname+'/down.html');
        //res.sendFile(__dirname+'/views/initialindex.hbs');

      }
    })
  }
});

//for downloading we provided path of the file along with its name;
app.get('/download',(req,res)=>{
  counter1++;
  //var file=__dirname+'/newfiles/'+game;
  var file="./"+dirr+"/"+game;
  
  res.download(file,game);

  console.log(counter1);

  //console.log(counter1);
  //res.send(game);
});

app.listen(3000,()=>{
  console.log("server has started");
});





// app.get('/download',(req,res)=>{
//   var file=__dirname+'/index.html';
//   res.download(file,'index.html');
// });
// app.get('/down',(req,res)=>{
//   var snew=__dirname+'/downloadsnew/'+game;
//   res.download(snew);
// });
// app.get('/',(req,res)=>{
//   var o={data:["something","moresomething"]}
//   res.render('initialindex.hbs');
// });
