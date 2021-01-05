
export const useFilteredList = (criteria, info) => {
    let result = [];
    if (criteria) {
        let filter = info.filter(data => Object.values(data).toString().toLowerCase().includes(criteria.toLowerCase()))
        result = filter
            
    }
    else{
        result=info
    }
    return result
}