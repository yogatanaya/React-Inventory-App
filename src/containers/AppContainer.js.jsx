import React, { Component } from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

// action 
import * as ItemActions from '../actions/item'
import * as FormActions from '../actions/form' 

// component
import ItemTable from '../components/Item/ItemTable.js'
import ItemForm from '../components/Forms/ItemForm/index.js'

class AppContainer extends Component {
    constructor(props){
        super(props);
        this.state={
            isAdd:false,
            edited:null,
        }

        // onCommit Add
        this.onCommitAdd=(values)=>{
           // console.log(values)
            this.props.Item.create(values);
            this.props.Form.change("Item","name","satuan","price","");
            this.onCancelAdd();
        }
        // onCancel Add
        this.onCancelAdd=()=>{
            this.setState({isAdd: false});
        }

        // onAdd
        this.onAdd=()=>{
            const values ={
                name:"",
                satuan:"",
                price: "",
            
            };
            this.setState({isAdd: true});
            this.props.Form.init("item", values);
        };

        // onEdit
        this.onEdit=(edited)=>(e)=>{
            e.preventDefault();
            //console.log(edited)
            this.setState({edited});
            const values ={...edited};
            this.props.Form.init("item", values)
        }

        // onCommitEdit
        this.onCommitEdit=(values)=>{
            const  {edited}=this.state;
            const {id}=edited;
            this.props.Item.update(id, values);
            this.onCancelEdit();
        }

        //onCancel edit
        this.onCancelEdit=()=>{
            this.setState({edited:null })
        }

        // onDelete
        this.onDelete=(edited)=>(e)=>{
            e.preventDefault();
            //console.log(edited);
            const {id}=edited;
            this.props.Item.remove(id);
        }
    }

    componentDidMount(){
        this.props.Item.loadAllPending();
        setTimeout(()=>{
            this.props.Item.loadAllFullfilled();
        }, 1000);
    }


  render() {
    const {items, isLoading}=this.props;
    const {isAdd, edited}=this.state;

    return (
      <div className='container'>
        <div className='row' style={{display: 'flex', justifyContent:'center'}}>
            <h1 style={{textAlign:'center'}}>R-Poss</h1>
        </div>
        <div className='row'>
            {!isAdd && !edited && <button className='btn btn-primary' onClick={this.onAdd}>Add Item</button>}
            {isAdd && <React.Fragment>
                <ItemForm onSubmit={this.onCommitAdd} onCancel={this.onCancelAdd}/>
            </React.Fragment>}
        </div>
        <hr/>
        <div className='row'>
            {edited && <React.Fragment>
                {/* <ItemForm onSubmit={this.onCommitEdit} onCancel={this.onCancelEdit}/> */}
                <ItemForm onSubmit={this.onCommitEdit} onCancel={this.onCancelEdit}/>
            </React.Fragment>}
        </div>
        <div className='row' style={{display:'flex', justifyContent:'center'}}>
        {!isAdd &&<React.Fragment>
            <ItemTable items={items} isLoading={isLoading}
            onEdit={this.onEdit}
            onDelete={this.onDelete}
            />
            </React.Fragment>}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
    const{items, isLoading}=state.items;
    return {
        items,
        isLoading
    };
}
function mapDispatchToProps(dispatch){
    return{
        Item: bindActionCreators(ItemActions, dispatch),
        Form: bindActionCreators(FormActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
