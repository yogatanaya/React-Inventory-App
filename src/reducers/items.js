const initialState={
    items:[
        {id:1, name:"Biskuit",satuan:"Dus",price:"130,000"},
        {id:2, name:"Minyak Goreng",satuan:"Eceran",price:"55,000"},
        {id:3, name:"Sabun",satuan:"Lusin",price:"45,000"}
    ],
    isLoading:false,
};

export default function(state=initialState, action){
    if(action.type=='ITEM/LOAD_ALL_PENDING'){
        return {...state, isLoading: true}
    }

    if(action.type=='ITEM/LOAD_ALL_FULLFILLED'){
        const items=action.payload;
        return {...state, isLoading: false, items}
    }

    if(action.type=='ITEM/CREATE'){
        let maxId;
        for(let item of state.items){
            if(!maxId|| item.id> maxId){
                maxId=item.id
            }

        }
        const newItem=action.payload;
        newItem.id=maxId+1;
       const items=[...state.items, newItem];
        return{...state, items};
    }

    if(action.type=='ITEM/REMOVE'){
        let newItem=state.items.filter(item=>{
            return action.id !== item.id
        })
        return{
            ...state,
            items:newItem
        }
    }

    // update
    if(action.type=='ITEM/UPDATE'){
        const {meta:{ id } } =action;
        const edited = action.payload;
        const items=[...state.items];
        for(let index in items){
            const item= items[index];
            if(item.id==id){
                items[index]=edited;
                break;
            }
        }
        return{...state,items};
    }
    return state

}