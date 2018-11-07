import React, { Component } from 'react'
import {Field, FieldArray, reduxForm} from 'redux-form'
import PriceFieldArray from './PriceFieldArray.js'

class ItemForm extends React.Component {
  render() {
      const {submitting, handleSubmit}=this.props;
      const {onCancel}=this.props;

    return (
      <div className='container'>
        <form onSubmit={handleSubmit}>

            {/* nama barang */}
            <div className='form-group'>
                <Field name='name' component='input' type='text' className='form-control' placeholder="Nama Barang...."/>
            </div>

            {/* satuan */}
            <div className='form-group'>
                <Field name='satuan' component='input' type='text' className='form-control' placeholder="Satuan..."/>
            </div>

            {/* harga */}
            <div className='form-group'>
                <Field name='price' component='input' type='text' className='form-control' placeholder="Harga Barang"/>
            </div>

            <div className='form-group'>
                <button type='submit' className='btn btn-primary'>Save</button>
                {" "}
                <button onClick={onCancel} className='btn btn-warning'>Cancel</button>
            </div>
        </form>
      </div>
    )
  }
}

export default reduxForm({
    form: "item"
})(ItemForm)
