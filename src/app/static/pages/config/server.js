app.post("/listByPage",function (req,res) {
    let whereCase="1=1 ";
    if(req.params.topic){
        whereCase=whereCase+` and topic='${req.params.topic}'`
    }
    const sql=` 
    select * from ming_mysql_mq_config  where ${whereCase}  limit  ${(req.params.startPage-1)*req.params.limit},${req.params.limit};  
    select count(1) c from ming_mysql_mq_config  where ${whereCase};
  `;
    M.doSql(sql,(d)=>{
        rows=d.data[0];
        total=d.data[1][0].c;
        res.send(M.result({rows,total}));
    })
});


app.post("/addOrUpdate",function (req,res) {
    let sql=""
    if(req.params.id){
        sql=M.Db().getUpdateObjSql ("ming_mysql_mq_config",req.params,{id:req.params.id})+";";
    }else {
        delete(req.params.id);
        sql=M.Db().getInsertObjSql("ming_mysql_mq_config",req.params)+";";
    }
    M.doSql(sql,(d)=>{
        res.send(M.result(d));
    })
});