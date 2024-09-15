export function lowercase(value) {
    return value.toLowerCase()
}
  
export function uppercase(value) {
   return value.toUpperCase()
}

export function capitalize(value){
   return value.charAt(0).toUpperCase() + value.slice(1);
}

export function kebabToCamel(str) {
   if(str == undefined || str == null){
      return '';
   }
   return str.replace(/(-\w)/g, (match) => match[1].toUpperCase());
}
 