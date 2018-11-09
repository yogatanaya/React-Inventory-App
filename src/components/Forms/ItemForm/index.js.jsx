import React, { Component } from 'react'
import {Field, reduxForm, formValueSelector} from 'redux-form'

class ItemForm extends React.Component {
  render() {
      const {submitting, handleSubmit, pristine}=this.props;
      const {onCancel}=this.props;

    return (
      <div className='container'>
        <form onSubmit={handleSubmit}>

            {/* nama barang */}
            <div className='form-group'>
                <Field 
                name='name'
                component={renderField}
                type='text'
                className='form-control'
                placeholder="Nama Barang...."
                label="Nama Barang"
                />
            </div>

            {/* satuan */}
            <div className='form-group'>
                <label>Satuan</label>
                <Field 
                name='satuan' 
                component='select' 
                type='text' 
                className='form-control' 
                placeholder="Satuan..."
                >
                    <option value="">Pilih Type Satuan</option>
                    <option value="Sak">Sak</option>
                    <option value="Dus">Dus</option>
                    <option value="Kg">Kg</option>
                    <option value="Lusin">Lusin</option>
                    <option value="Eceran">Eceran</option>
                </Field>
            </div>

            {/* harga */}
            <div className='form-group'>
                <Field label="Harga Jual" name='price' component={renderField} type='text' className='form-control' placeholder="Harga Barang"/>
            </div>

            {/* quantity */}
            <div className='form-group'>
                <Field label='Stok' name='stok' component={renderField} type='text' className='form-control' placeholder='Stok barang saat ini'/>
            </div>

            <div className='form-group'>
                <button type='submit' disabled={pristine || submitting} className='btn btn-primary'>Save</button>
                {" "}
                <button onClick={onCancel} className='btn btn-warning'>Cancel</button>
            </div>
        </form>
      </div>
    )
  }
}

const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
  }) => (
    <div className='form-group'>
      <label>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} className='form-control'/>
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  )

const validate=values=>{
    const errors={}
    if(!values.name){
        errors.name="Required"
    }
    if(!values.satuan &&values.satuan.id=='-1'){

        errors.satuan={id:'Pilih Satuan'};
    }
    if(!values.price){
        errors.price="Required"
    }
    return errors;

}



export default reduxForm({
    form: "item",
    validate
})(ItemForm)
