
app.post("/listByPage",function (req,res) {

    let whereCase="1=1 ";
    if(req.params.status<2){
        whereCase=whereCase+ ` and status=${req.params.status}`
    }
    if(req.params.topic){
        whereCase=whereCase+` and topic='${req.params.topic}'`
    }

    const sql=` 
    select * from ming_mysql_mq_message  where ${whereCase}  limit  ${(req.params.startPage-1)*req.params.limit},${req.params.limit};  
    select count(1) c from ming_mysql_mq_message  where ${whereCase};
  `;
    M.doSql(sql,(d)=>{
        rows=d.data[0];
        total=d.data[1][0].c;
        res.send(M.result({rows,total}));
    })

});

