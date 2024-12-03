
const express = require('express');
const mysql= require('mysql2');
const cors= require('cors');
const session= require('express-session');
const cookieParser= require('cookie-parser');
const bodyParser= require('body-parser');
const multer =require('multer');
const path= require('path');
const faceapi=require('face-api.js');
const { createCanvas, Image } = require('canvas'); 
const fs = require('fs');


const app = express();


app.use(express.json());

app.use(bodyParser.json());

app.use(cors({
    origin: ["http://localhost:3000"],
    method: ["POST", "GET","PUT","DELETE"],
    credentials: true
}));

app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie:{
        secure: false,
        maxAge:1000 * 60 * 60 *24
    }
}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'onlineexam',
   
});
app.use('/public', express.static('public'));

app.use('/images', express.static(path.join(__dirname, 'public', 'images')));


const storage=multer.memoryStorage();
const upload = multer({ storage: storage});

//SIGNUP ROUTE
app.post('/Signup',upload.single('image'), (req, res) => {
    console.log(req.body);  

    const {name , email,institute ,password,role,empid}=req.body;
  
    const image = req.file.buffer;

    const sql = "INSERT INTO userauth (`name`, `email`,`institute`, `password`,`role`,`empId`,`image`) VALUES (?, ?, ?, ?, ?, ?,?)";
   
    db.query(sql, [name,email,institute,password,role,empid,image], (err, data) => {
        if (err) {
            console.log("Error inserting data:", err);
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ message: "Signup successful", data });
    });
});
 

//LOGIN ROUTE
app.post('/login', (req, res)  => {
    const sql = "SELECT * FROM userauth WHERE `email` = ? AND `password` = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.log("Error querying data:", err);
            return res.status(500).json({ error: err.message });
        }
        if (data.length > 0){
            req.session.name =  data[0].name;
            req.session.profileid=data[0].id;
            console.log(req.session.name)
            if(data[0].role=="student"){
                console.log('student')
                req.session.studentid=data[0].id;
                return res.json({message: "Student"})
            }
            else if(data[0].role=="teacher"){
                req.session.teacherid=data[0].id;
                console.log('teacher')
                return res.json({message:"teacher"});
            }
            else{
                return res.json({message:"invalid role"});
            }
            
        } else {
            return res.json("Failure");
        }
    });
});

//NAME TAG 
app.get('/teachernametag',(req,res)=>{
    const userid= req.session.profileid;
      const sql="SELECT name FROM userauth WHERE id=?"
      db.query(sql,[userid],(err,data)=>{
       
        if(err){
          return  res.json({error:"error" });
        
        }
       
        return res.json(data)
      
    })
})



// LOGOUT ROUTE
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Error logging out");
        }
        res.clearCookie('connect.sid'); 
        return res.status(200).send("Logged out");
    });
});

//PROFILE DETAILS FOR TEACHER
app.get('/profile',(req,res)=>{
    const teacherid=req.session.teacherid;
 
   
    const sql="SELECT * FROM userauth WHERE id=?"
   
    db.query(sql,[teacherid],(err,data)=>{
       
        if(err){
          return  res.json({error:"error" });
        
        }
       
        return res.json(data[0])
      
    })
})

//SAVE TEST BY TEACHER
app.post('/savetest',(req,res)=>{
    const {testname,questions}=req.body;
    const teacherid=req.session.teacherid;

    if(!teacherid){
        return res.status(401).send('unAuthorized.Please login.');
    }

    const testsql="INSERT INTO testdetail(testname, teacherid ) VALUES (?,?)"

    db.query(testsql,[testname,teacherid],(err,data)=>{
        if(err){
            console.log("Error inserting test:", err);
            return res.status(500).json({ error: err.message });
        }
       const test_id=data.insertId;
    

    const sql="INSERT INTO test (question,option1,option2,option3,option4,answer,test_id,level)  VALUES ?";
    const values =questions.map(q=>[
        q.question,
        q.option1,
        q.option2,
        q.option3,
        q.option4,
        q.answer,
        test_id,
        q.level
    ]);
    db.query(sql,[values],(err,data)=>{
        if (err) {
            console.log("Error inserting data:", err);
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ message: "testadd successful", data });
        
    });
})
});

app.get('/testview',(req,res)=>{
    const teacherid =req.session.teacherid;

    if(!teacherid){
        return res.status(401).send('unauthorized. please login.');
    }

    const sql='SELECT id,testname FROM testdetail WHERE teacherid =?';
    db.query(sql,[teacherid],(err,data)=>{
        if(err){
            console.log("Error retrieving tests:", err);
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json(data);
    })
})

//VIEW TEST BY TEACHER
app.get('/getQuestions/:id',(req,res)=>{
    const testId=req.params.id;
    
    const sql=`
    SELECT t.*, td.testname 
    FROM test t
    JOIN testdetail td ON t.test_id = td.id
    WHERE t.test_id = ?
  `;
    db.query(sql,[testId],(err,data)=>{
        if(err){
            console.log("Error retrieving questions:", err);
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json(data);
    })
})

// UPDATE TEST BY TEACER 
app.put('/updatetest/:id',(req,res)=>{
    const {testname,questions,teacherid,test_id}=req.body;
    const ids=req.params.id;
    console.log(ids);
    const testdetail="UPDATE testdetail SET `testname`=? WHERE `id`=?";
    db.query(testdetail,[testname,ids],(err,data)=>{

        if(err){
            console.log("Error updatetestdetails :", err);
           // return res.status(500).json({ error: err.message });
        }
        console.log("success",data);
        //return res.status(200).json(data);
        
        
  const updatePromises=  questions.map((q)=>{

    const sql="UPDATE  test SET `question`=?,`option1`=?,`option2`=?,`option3`=?,`option4`=?,`answer`=?,`level`=? WHERE `id`=?";
        const values =[
            q.question,
            q.option1,
            q.option2,
            q.option3,
            q.option4,
            q.answer,
            q.level,
            q.id
        ];

    return new Promise((resolve,reject)=>{

        db.query(sql,values,(err,data)=>{
            if (err) {
                console.log("Error updatetest data:", err);
               
               reject(err);
            }
            else{
                resolve(data);
            }
           
            
        })
    })
       
 })
 Promise.all(updatePromises)
 .then((data)=>{
    return res.status(200).json({message:"Test updated successfully",data})
 })
 .catch((err)=>{
    console.log("Errror updating questions:",err)
    return res.status(500).json({error:err.message})
 })

    })
})

//GET REPORT FROM DATABASE BY TEACHER

app.get('/getTeacherReport', (req, res) => {
    const teacherid = req.session.teacherid; 

   
    if (!teacherid) {
        return res.status(401).json({ error: "Unauthorized: Teacher ID not found in session." });
    }

    const sql = `
        SELECT 
            t.id AS testId, 
            t.testname, 
            u.name AS studentname, 
            m.mark, 
            m.date,
            (SELECT COUNT(*) FROM test WHERE test.test_id = t.id) AS totalQuestions 
        FROM 
            mark m
        JOIN 
            testdetail t ON m.test_id = t.id
        JOIN 
            userauth u ON m.user_id = u.id
        WHERE 
            t.teacherid = ?
        ORDER BY 
            m.date DESC;
    `;

    db.query(sql, [teacherid], (err, data) => {
        if (err) {
            console.error("Error in teacher get report:", err);
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({
            message: "Marks retrieved by teacher successfully",
            report: data 
        });
    });
});


//DELETE TEST BY TEACHER

app.delete('/deletetest/:id',(req,res)=>{
    const testId=req.params.id;
    const sql="DELETE FROM testdetail WHERE `id`=?";
    db.query(sql,[testId],(err,data)=>{
        if(err){
            console.error("Error deleting test:", err);
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({message:"test deleted successfully"})
    })
})

//STUDENT BACKEND ***********************

app.get('/profileStudent',(req,res)=>{
    const studentid=req.session.studentid;
 
   
    const sql="SELECT * FROM userauth WHERE id=?"
   
    db.query(sql,[studentid],(err,data)=>{
       
        if(err){
          return  res.json({error:"error" });
        
        }
       
        return res.json(data[0])
      
    })
})

//STUDENT IMAGE GET FOR FACEAUTHENTICATION
app.get('/profileStudent/image',(req,res)=>{
    const studentid=req.session.studentid;
    const sql="SELECT image FROM userauth WHERE id=?"
   
    db.query(sql,[studentid],(err,data)=>{
       
        if(err){
          return  res.json({error:"error" });
        
        }
        if(data.length===0 ||!data[0].image){
            return res.status(404).send('Image not found');
        }
       
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(data[0].image);
      
    })
})

//******************************** *//

// STUDENT VIEW ALL TEST
app.get('/studenttestview',(req,res)=>{
    
    const sql='SELECT id,testname FROM testdetail ';
    db.query(sql,(err,data)=>{
        if(err){
            console.log("Error retrieving tests:", err);
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json(data);
    })
})

// TAKETEST FOR STUDENT

app.get('/getQuestionStudent/:id',(req,res)=>{
    const testId=req.params.id;
    const sql='SELECT * FROM test WHERE test_id=?';
    db.query(sql,[testId],(err,data)=>{
        if(err){
            console.log("Error retrieving questions:", err);
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json(data);
    })
})

//UPDATE STUDENT MARKS IN TABLE

app.post('/marksupdate/:id',(req,res)=>{
    const user_id=req.session.studentid;
    const test_id=req.params.id;
    const mark=req.body.marks;
    const cheatingCount=req.body. cheatingCount;
    const date=new Date();
    const sql = 'INSERT INTO mark (`user_id`, `test_id`, `mark`, `date`,`cheatingCount`) VALUES (?, ?, ?, ?,?)';
    const values=[
        user_id,
        test_id,
        mark,
        date,
        cheatingCount
    ]
    
    db.query(sql,values,(err,data)=>{
        if(err){
            console.log("Error in updatemarks:", err);
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json(data);
    })

})

//STATUS REPORT FOR STUDENT

app.get('/statusReportStudent/:id',(req, res)=>{
     const studentid=req.session.studentid;
     const testid=req.params.id;

     if (!studentid) {
        return res.status(400).json({ error: "Student ID not found in session" });
      }
     const sql = `  SELECT   t.testname,   m.mark,   m.date  FROM  mark m JOIN   testdetail t ON m.test_id = t.id  WHERE   m.user_id = ? AND m.test_id = ?
  `;
  db.query(sql,[studentid,testid],(err,data)=>{
    if(err){
        return res.status(500).json({error:"failed to fetch data for marks"})
    }
    return res.status(200).json(data)
  })
})

//SHOW MARKS TO STUDENT

app.get('/studentmarks', (req, res) => {
    const studentId = req.session.studentid;
    
   const sql = `
    SELECT 
        td.testname, 
        m.mark, 
        m.date, 
        (SELECT COUNT(*) FROM test q WHERE q.test_id = td.id) AS totalQuestions 
    FROM 
        mark m  
    JOIN 
        testdetail td ON m.test_id = td.id
    WHERE 
        m.user_id = ?
         ORDER BY 
            m.date DESC;`;


   
    db.query(sql, [studentId], (err, data) => {
        if (err) {
            console.log("Error fetching marks:", err);
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json(data);
    });
});




app.listen(8081, () => {
    console.log('Server running on port 8081');
});