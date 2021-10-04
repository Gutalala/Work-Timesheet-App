
export function convertISO_to_Date(ISODate){
    let date = new Date(ISODate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate() + 1;
    return  year + '-' + (month<10? '0'+month : month) + '-' + (day<10? '0'+day : day);
}