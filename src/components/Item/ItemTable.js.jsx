import React from 'react'

const ItemTable=(props)=>{
    const {items, isLoading}=props;

    // onEdit
    const { onEdit } = props;

    // onDelete
    const {onDelete}=props;
    
    if(isLoading)return(
        <div style={{textAlign:'center'}}>
            <i>Harap menunggu....</i>
        </div>
    );

    return(
        <table className='table table-hover'>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Nama Barang</th>
                    <th>Satuan</th>
                    <th>Harga Jual</th>
                    <th>Stok</th>
                    <th>Opsi</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, index)=>{
                    return(
                        <tr key={item.id}>
                            <td>{index+1}</td>
                            <td>{item.name}</td>
                            <td>{item.satuan}</td>
                            <td>{item.price}</td>
                            <td>{item.stok}</td>
                            <td>
                                <button className='btn btn-danger' onClick={onDelete(item)}><i className='material-icons'>delete</i></button>
                                {" "}
                                <button className='btn btn-warning' onClick={onEdit(item)}><i className='material-icons'>edit</i></button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )


}
export default ItemTable