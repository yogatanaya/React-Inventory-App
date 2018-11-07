export function loadAllPending(){
    return{
        type: "ITEM/LOAD_ALL_PENDING"
    }   
}

export function loadAllFullfilled(){
    const items=[
        {id: 1, name: "Oreo", satuan:"Eceran", price:"7000"},
        {id: 2, name: "Mie Instant", satuan:"Dus", price:"65000"}
    ];
    return{
        type:"ITEM/LOAD_ALL_FULLFILLED",
        payload: items,
    };

}

export function create(item){
    return{
        type:"ITEM/CREATE",
        payload:item,
    }
}

export function remove(id){
    return{
        type:"ITEM/REMOVE",
        id,
    }
}

export function update(id, item){
    return {
        type:"ITEM/UPDATE",
        payload: item,
        meta:{
            id,
        },
    };
};