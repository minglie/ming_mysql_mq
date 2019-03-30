const {Table, Button, Select,Input,Menu,Dropdown } =antd;

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
          <Option value="0">未消费</Option>
          <Option value="1">已消费</Option>
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
                title: 'ip',
                dataIndex: 'ip',
                key: 'ip',
                width: '8%',
            },
            {
                title: '消息体',
                dataIndex: 'body',
                key: 'body',
            },
            {
                title: 'request_time',
                dataIndex: 'request_time',
                key: 'request_time',
            },
            {
                title: '是否消费',
                dataIndex: 'status',
                key: 'status',
                render: text => <span>{text==1?'是':'否'}</span>
            },
        ];
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
        console.log("BBBBB",d)
        const state = this.state;
        state.topic=d.topic;
        state.status=d.status;
        this.m_props.Alldatas(this.state);
    }

    deleteAllMessage(d){
        M.doSql("delete from ming_mysql_mq_message;",()=>{});
        m_this.m_props.Alldatas(this.state);
    }

    onChange(current, pageSize) {
        const state = this.state;
        state.startPage=current;
        state.limit=pageSize;
        m_this.m_props.Alldatas(this.state);
    }

    render() {
        console.log("AAAAAAAAA",this.state)
        return (
            <div>
                <SearchInput topic={this.state.topic} status={this.state.status} father={this}/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button type="primary" onClick={this.deleteAllMessage.bind(this)}>清空消息</Button>
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

