const {Form, Input, Alert , message, Button } =antd;

//////
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
///////

const formItemLayout = {
    labelCol: { span: 4},
    wrapperCol: { span: 8},
};
const formTailLayout = {
    labelCol: { span: 10},
    wrapperCol: { span: 8, offset: 4 },
};
class DynamicRule extends React.Component {
    confirm = () => {
        let form=this.props.form;
        M.IO.addOrUpdate(form.getFieldsValue()).then(d=>{
            message.success('成功');
            location.href="/pages/config/index.html"
        })
    }

    cancel = () => {
        location.href="/pages/config/index.html"
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const initValue=this.props.initValue;
        return (
            <div>
                <Form.Item {...formItemLayout} label="id">
                    {getFieldDecorator('id', {
                        rules: [{
                            required: false,
                        }],
                        initialValue:initValue.id
                    })(
                        <Input disabled />
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="topic">
                    {getFieldDecorator('topic', {
                        rules: [{
                            required: true,
                            message: 'Please input your topic',
                        }],
                        initialValue:initValue.topic
                    })(
                        <Input placeholder="Please input your topic" />
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="topic_name">
                    {getFieldDecorator('topic_name', {
                        rules: [{
                            required: true,
                            message: 'Please input your topic_name',
                        }],
                        initialValue:initValue.topic_name
                    })(
                        <Input placeholder="Please input your topic_name" />
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="consumer">
                    {getFieldDecorator('consumer', {
                        rules: [{
                            required: true,
                            message: 'Please input your consumer',
                        }],
                        initialValue:initValue.consumer
                    })(
                        <Input placeholder="Please input your consumer" />
                    )}
                </Form.Item>

                <Form.Item {...formTailLayout}>
                    <Button type="primary" onClick={this.confirm}>
                        确认
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button type="primary" onClick={this.cancel}>
                        取消
                    </Button>
                </Form.Item>
            </div>
        );
    }
}
const WrappedDynamicRule = Form.create({ name: 'dynamic_rule' })(DynamicRule);
class ModelTable extends React.Component {
    constructor(props) {
        super(props);
        this.initValue= M.getObjByFile ("message")
    }
    render() {
        return (
            <div>
                <WrappedDynamicRule  initValue={this.initValue}/>
            </div>
        )
    }
}

