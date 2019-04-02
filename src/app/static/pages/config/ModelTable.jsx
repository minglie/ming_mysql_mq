const {Table, Button,Modal, Select,Tooltip,Input,Icon ,Form,message} =antd;
const { Option } = Select;

class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topic: props.topic,
            status: props.status,
        };
    }
    handleNumberChange = (e) => {
        const state = this.state;
        state.topic=e.target.value;
        this.setState(state);
        this.props.father.searchData(state)
    }
    handleCurrencyChange = (e) => {
        const state = this.state;
        state.status=e;
        this.setState(state);
        this.props.father.searchData(state)
    }
    render() {
        const state = this.state;
        return (
            <span>
        <Input
            type="text"
            placeholder="topic"
            value={state.topic}
            onChange={this.handleNumberChange}
            style={{ width: '30%', marginRight: '3%' }}
        />
        <Select
            value={state.status}
            style={{ width: '32%' }}
            onChange={this.handleCurrencyChange}
        >
          <Option value="2">全部</Option>
        </Select>
      </span>
        );
    }
}


const formItemLayout = {
    labelCol: { span: 8},
    wrapperCol: { span: 15},
};
const formTailLayout = {
    labelCol: { span: 10},
    wrapperCol: { span: 8, offset: 4 },
};
class DynamicRule extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const initValue=this.props.initValue;
        //console.log("TTTTTTTTTTT",initValue)
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
                            required: false,
                            message: 'Please input your topic',
                        }],
                        initialValue:initValue.topic
                    })(
                        <Input placeholder="Please input your topic"/>
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="topic_name">
                    {getFieldDecorator('topic_name', {
                        rules: [{
                            required: false,
                            message: 'Please input your topic_name',
                        }],
                        initialValue:initValue.topic_name
                    })(
                        <Input  placeholder="Please input your topic_name" />
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
            </div>
        );
    }
}
const WrappedDynamicRule = Form.create({ name: 'dynamic_rule' })(DynamicRule);


class ModelTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
                width: '5%',
                render: text => <a href="#"> { text } </a>
            },
            {
                title: 'topic',
                dataIndex: 'topic',
                key: 'topic',
                width: '8%',
            },
            {
                title: 'topic_name',
                dataIndex: 'topic_name',
                key: 'topic_name',
                width: '8%',
            },
            {
                title: 'consumer',
                dataIndex: 'consumer',
                key: 'consumer',
                width: '40%',
            }
        ];
        this.columns.push({
            title: '操作',
            key: 'operation',
            align: "center",
            render: (text, record) => {
                return <div>
                    <Tooltip title="编辑">
                        <Icon type="edit" onClick={this.edit.bind(this,record)}/>
                    </Tooltip>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Tooltip title="删除">
                        <Icon type="delete" onClick={this.delete.bind(this,record)}/>
                    </Tooltip>
                </div>;
            }
        });

        window.m_this=this;

        this.m_props= model.action(store.dispatch);
        this.state={
            Alldate:[],
            visible:false,
            total: 0,
            topic:'',
            status:'2',
            startPage:1,
            limit:10
        };

    }
    componentDidMount() {
        let current=1;
        let pageSize=10;
        this.m_props.Alldatas(
            {
                startPage: current,
                limit: pageSize,
                topic:this.state.topic,
                status:this.state.status
            }
        );
    };

    componentWillMount () {
        store.subscribe(()=>{this.setState(store.getState())});
    }

    searchData(d){
        const state = this.state;
        state.topic=d.topic;
        state.status=d.status;
        this.m_props.Alldatas(this.state);
    }

    deleteAll(d){
        M.doSql("delete from ming_mysql_mq_config;",()=>{});
        m_this.m_props.Alldatas(this.state);
    }

    add(){
        M.writeObjToFile("message",{id:"",topic:"",topic_name:"",consumer:"[]"})
        this.state.visible=true;
        if(this.refs.wrappedDynamicRule){
            let form=this.refs.wrappedDynamicRule.getForm();
            form.setFieldsValue({id:"",topic:"",topic_name:"",consumer:"[]"});
        }
        this.setState(this.state)
    }

    edit(r){
        M.writeObjToFile("message",r)
        this.state.visible=true;
        if(this.refs.wrappedDynamicRule){
            let form=this.refs.wrappedDynamicRule.getForm();
            form.setFieldsValue({id:r.id,topic:r.topic,topic_name:r.topic_name,consumer:r.consumer});
        }
        this.setState(this.state)
    }

    delete(r){
        M.doSql(`delete from ming_mysql_mq_config where id=${r.id};`,()=>{});
        m_this.m_props.Alldatas(this.state);
    }

    onChange(current, pageSize) {
        const state = this.state;
        state.startPage=current;
        state.limit=pageSize;
        m_this.m_props.Alldatas(this.state);
    }

    passshow(){
        this.state.visible=false;
        this.setState(this.state)
    }

    jconfirm(){
        let form=this.refs.wrappedDynamicRule.getForm();
        M.IO.addOrUpdate(form.getFieldsValue()).then(d=>{
            message.success('成功');
            this.state.visible=false;
            m_this.m_props.Alldatas(this.state);
        })
    }

    render() {
        return (
            <div>
                <Modal
                    title="增改配置"
                    className='farming-admin-modal'
                    visible={this.state.visible}
                    onOk={this.jconfirm.bind(this)}
                    onCancel={this.passshow.bind(this)}
                    okText="确认"
                    cancelText="取消"
                >
                    <div>
                        <WrappedDynamicRule ref="wrappedDynamicRule" initValue={M.getObjByFile("message")}/>
                    </div>
                </Modal>
                <SearchInput topic={this.state.topic} status={this.state.status} father={this}/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button type="primary" onClick={this.deleteAll.bind(this)}>清空配置</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button type="primary" onClick={this.add.bind(this)}>添加配置</Button>
                <Table dataSource={this.state.Alldate} columns={this.columns} pagination={false} />
                <br/>
                <antd.Pagination
                    showSizeChanger showQuickJumper
                    defaultCurrent={1}
                    total={this.state.total}
                    onChange={this.onChange.bind(this)}
                    onShowSizeChange={this.onChange.bind(this)}
                    pageSizeOptions={["5","10","20"]}
                />
            </div>
        )
    }
}
