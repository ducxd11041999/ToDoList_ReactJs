import React, {Component} from 'react';

class TaskForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      status: true
    };
  }

  onCloseForm = () =>
  {
    if(this.props.display)
      this.props.onReceiveDisplay(!this.props.display)
  }

  onChage =(event)=>
  {
    var target = event.target
    var name = target.name
    var value = target.value
    if (name ==='status')
    {
        value = (value === "true" ? true : false);
    }
    this.setState(
    {
      [name]:value
    })
  }

  onSubmit = (event) =>{
    event.preventDefault(); 
    this.props.onReceiveTask(this.state);
    this.onClear();
    this.onCloseForm();
  }

  onClear = () =>
  {
    this.setState({
      id: '',
      name:'',
      status: false
    })
  }

  componentDidMount()
  {
      if(this.props.taskEdit)
      {
        this.setState({
          id: this.props.taskEdit.id,
          name: this.props.taskEdit.name,
          status:Boolean(this.props.taskEdit.status)
        })
       // console.log(this.state)
      }
  }

  componentWillReceiveProps(nextProps)
  {
      //console.log(nextProps.taskEdit)
      if(nextProps && (nextProps.taskEdit))
      {
        this.setState({
          id: nextProps.taskEdit.id,
          name: nextProps.taskEdit.name,
          status:Boolean(nextProps.taskEdit.status)
        })
       // console.log(this.state)
      }
      else
      {
       this.setState({
        id: '',
        name:'',
        status: false
        })
      }
  }
  render() {
    var {id} = this.state
    return (
          <div className="panel panel-warning">
              <div className="panel-heading">
                <h3 className="panel-title">
                    {id !== ''? "Cập nhật công việc" : "Thêm công việc"}
                <span className="fa fa-times-circle text-right ml-100 btn btn-warning text-right" 
                onClick = {this.onCloseForm}
                ></span>
                </h3>
              </div>
              <div className="panel-body">
                <form onSubmit = {this.onSubmit}>
                  <div className="form-group">
                    <label>Tên :</label>
                    <input type="text" className="form-control"
                    name='name' 
                    value = {this.state.name}
                    onChange ={this.onChage}
                    />
                  </div>
                  <label>Trạng Thái :</label>
                  <select className="form-control" required="required"
                    name='status' 
                    value = {this.state.status}
                    onChange ={this.onChage}
                  >
                    <option value={true}>Kích Hoạt</option>
                    <option value={false}>Ẩn</option>
                  </select>
                  <br />
                  <div className="text-center">
                    <button type="submit" className="btn btn-warning">Lưu </button>&nbsp;
                    <button type="reset" className="btn btn-danger" onClick = {this.onClear}>Hủy Bỏ</button>
                  </div>
                </form>
              </div>
            </div>
    );
  }
}
export default TaskForm
