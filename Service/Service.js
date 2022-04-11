var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()
const mysql = require('mysql2')
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken')
const Secret = 'Dom';
const io = require('socket.io')


const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'library'
});

app.use(cors())
  app.post('/auth', jsonParser, function (req, res, next) {
  try{
    const token =  req.headers.authorization.split(' ')[1]
    var decoded = jwt.verify(token,Secret);
    res.json({status:'ok',decoded})
  } catch(err){
    res.json({status:'err',message:err})
  }

})

  app.get('/databasebook', function (req, res,next) {
  const page = parseInt(req.query.page);
  const per_page = parseInt(req.query.per_page);
  console.log(page,per_page);
  const start_idx = (page - 1) * per_page;
  const sort_column = req.query.sort_column;
  const sort_direction = req.query.sort_direction;
  const search = req.query.search;
  var params = [];
  var sql = 'SELECT * FROM book';
  if (sort_column) {
    sql += ' ORDER BY ' + sort_column + ' ' + sort_direction;
  }
  if (search) {
    sql += ' WHERE Bookname LIKE ?'
    params.push('%' + search + '%') //หน้า-หลังจะมีไรก็ได้
  }
  
  sql += ' LIMIT ?, ?'
  params.push(start_idx)
  params.push(per_page)
  dbConnection.query(
    sql, params,
    function (err, results, fields) {
      //console.log(results);
      dbConnection.query(
        'SELECT COUNT(Bookid) as total FROM book',
        function(err,counts,fields){
          const total = counts[0]['total'];
          const total_pages = Math.ceil(total/per_page);
      res.json({
      page:page,
      per_page:per_page,
      total:total,
      total_pages:total_pages,
      data: results
      }
      )
      
      })
    })
});

app.get('/book/(:Bookid)',(req,res)=>{
  const Bookid = req.params.Bookid
  dbConnection.query('SELECT * FROM book WHERE Bookid = '+Bookid, (err,results,fields)=>{
    if (err) {
      res.json({
        status: 'error',
        message: err
      })
      return;
    }
    res.json({
      status: 'ok',
      data:results
    })
  }
)})


app.post('/register', jsonParser, function (req, res, next) {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    dbConnection.execute(
      'INSERT INTO account2 (password,email,firstname,lastname) VALUES (?,?,?,?)', [hash, req.body.email, req.body.firstname, req.body.lastname],
      function (err, results, fields) {
        if (err) {
          res.json({
            status: 'error',
            message: err
          })
          return;
        }
        res.json({
          status: 'ok'
        })
      }
    )
  })
});

app.post('/auth', jsonParser, function (req, res, next) {
  try{
    const token =  req.headers.authorization.split(' ')[1]
    var decoded = jwt.verify(token,Secret);
    res.json({status:'ok',decoded})
  } catch(err){
    res.json({status:'err',message:err})
  }

})

app.post('/login',jsonParser ,function (req, res) {
  dbConnection.execute(
    'SELECT * FROM account2 WHERE email =?', [req.body.email],
    function (err, account2, fields) {
      if (err) {
        res.json({
          status: 'error',
          message: err
        })
        return;
      }
      if(account2.length == 0){res.json({
        status: 'error',
        message: 'No User Found',
        
      })
      return ;}
      bcrypt.compare(req.body.password, account2[0].password,function(err,isLogin){
        if(isLogin){
          res.json({status:'ok',message:'Login Success'})
        }else{
          res.json({status:'error',message:'Login Failed'})
        }
      })
    }
  
  )
  });

  app.delete('/delete',jsonParser ,function (req, res) {
    const Bookid = req.body.Bookid
  dbConnection.query('DELETE FROM book WHERE Bookid = '+Bookid, (err,results,fields)=>{
    if (err) {
      res.json({
        status: 'error',
        message: err
      })
      return;
    }
    res.json({
      status: 'ok',
    })
  }
)
});
  app.delete('/deleteborrow',jsonParser ,function (req, res) {
    const Borrowid = req.body.Borrowid
  dbConnection.query('DELETE FROM borrow WHERE Borrowid = '+Borrowid, (err,results,fields)=>{
    if (err) {
      res.json({
        status: 'error',
        message: err
      })
      return;
    }
    res.json({
      status: 'ok',
    })
  }
)
});

  app.put('/edit/(:Borrowid)',jsonParser,function(req,res){
    let Borrowid = req.params.Borrowid;
    dbConnection.query('UPDATE book SET firstname = ?,lastname = ?,Bookid = ? WHERE Borrowid ='+Borrowid,[req.body.firstname,req.body.lastname,req.body.Bookid],(err,rows,fields)=>{
      if (err) {
        res.json({
         status: 'error',
         message: err
       })
       
     }
       res.json({
       status: 'ok'
     })
    })
  })
  
  
  app.get('/loanbooklist', function (req, res,next) {
    const page = parseInt(req.query.page);
    const per_page = parseInt(req.query.per_page);
    console.log(page,per_page);
    const start_idx = (page - 1) * per_page;
    const sort_column = req.query.sort_column;
    const sort_direction = req.query.sort_direction;
    const search = req.query.search;
    var params = [];
    var sql = 'SELECT * FROM borrow';
    if (sort_column) {
      sql += ' ORDER BY ' + sort_column + ' ' + sort_direction;
    }
    if (search) {
      sql += ' WHERE Bookname LIKE ? '
      params.push('%' + search + '%') //หน้า-หลังจะมีไรก็ได้
    }
    
    sql += ' LIMIT ?, ?'
    params.push(start_idx)
    params.push(per_page)
    dbConnection.query(
      sql, params,
      function (err, results, fields) {
        //console.log(results);
        dbConnection.query(
          'SELECT COUNT(Borrowid) as total FROM borrow',
          function(err,counts,fields){
            const total = counts[0]['total'];
            const total_pages = Math.ceil(total/per_page);
        res.json({
        page:page,
        per_page:per_page,
        total:total,
        total_pages:total_pages,
        data: results
        }
        )
        
        })
      })
  });
  
  app.get('/history', function (req, res,next) {
    const page = parseInt(req.query.page);
    const per_page = parseInt(req.query.per_page);
    console.log(page,per_page);
    const start_idx = (page - 1) * per_page;
    const sort_column = req.query.sort_column;
    const sort_direction = req.query.sort_direction;
    const search = req.query.search;
    var params = [];
    var sql = 'SELECT * FROM history';
    if (sort_column) {
      sql += ' ORDER BY ' + sort_column + ' ' + sort_direction;
    }
    if (search) {
      sql += ' WHERE Bookname LIKE ?'
      params.push('%' + search + '%') //หน้า-หลังจะมีไรก็ได้
    }
    
    sql += ' LIMIT ?, ?'
    params.push(start_idx)
    params.push(per_page)
    dbConnection.query(
      sql, params,
      function (err, results, fields) {
        //console.log(results);
        dbConnection.query(
          'SELECT COUNT(id) as total FROM history',
          function(err,counts,fields){
            const total = counts[0]['total'];
            const total_pages = Math.ceil(total/per_page);
        res.json({
        page:page,
        per_page:per_page,
        total:total,
        total_pages:total_pages,
        data: results
        }
        )
        
        })
      })
  });


  app.post('/addbook', jsonParser, function (req, res, next) {
    dbConnection.execute(
      'INSERT INTO book (Bookname,imagebook) VALUES (?,?)', [req.body.Bookname, req.body.imagebook],
      function (err, results, fields) {
        if (err) {
          res.json({
            status: 'error',
            message: err
          })
          return;
        }
        res.json({
          status: 'ok'
        })
      }
    )
  
});
  app.post('/borrow', jsonParser, function (req, res, next) {
    const Bookid = req.body.Bookid
    dbConnection.execute(
      'INSERT INTO borrow (firstname,lastname,Bookid) VALUES(?,?,?)', [req.body.firstname, req.body.lastname,Bookid],
      function (err, results, fields) { 
        if (err) {
          res.json({
            status: 'error',
            message: err
          })
          return;
        }
        res.json({
          status: 'ok'
        })
        dbConnection.query('UPDATE borrow SET Bookname =(SELECT Bookname FROM book WHERE Bookid =?) WHERE Bookid = '+Bookid,Bookid)
      }
    )
  
});

  app.post('/return', jsonParser, function (req, res, next) {
    const Borrowid = req.body.Borrowid
    dbConnection.execute(
      'INSERT INTO history (firstname,lastname,Bookname,dateBorrow) SELECT firstname,lastname,Bookname,dateBorrow FROM borrow WHERE Borrowid = '+Borrowid,
      function (err, results, fields) { 
        if (err) {
          res.json({
            status: 'error',
            message: err
          })
          return;
        }
        res.json({
          status: 'ok'
        })
        dbConnection.query('DELETE FROM borrow WHERE Borrowid = '+Borrowid, (err,results,fields)=>{

        })
      }
    )
});


app.listen(3333, function () {
  console.log(`Sever is Running on port 3333`);
  
})


