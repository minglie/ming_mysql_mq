const {Table, Button, Select,Tooltip,Input,Icon } =antd;
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
        M.writeObjToFile("message",{})
        location.href="/pages/add_or_edit_config/index.html";
    }

    edit(r){
        M.writeObjToFile("message",r)
        location.href="/pages/add_or_edit_config/index.html"
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

    render() {
        return (
            <div>
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

