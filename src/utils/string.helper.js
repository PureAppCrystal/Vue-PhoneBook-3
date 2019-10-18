


export const stringHelper = {
    
}

String.prototype.replaceAll = function(org, dest) {
    return this.split(org).join(dest);
}