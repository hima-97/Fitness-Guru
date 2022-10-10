export default function compare(a, b){
    const aName = a.name.toUpperCase()
    const bName = b.name.toUpperCase()
    if(aName < bName){
        return -1
    }else if(aName > bName){
        return 1
    }else{
        return 0
    }
}