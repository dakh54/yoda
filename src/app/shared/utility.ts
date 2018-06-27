export class Utility {
    static removeEmptyOrNullProperty(anyObjects: Object) {
        Object.keys(anyObjects).forEach(k => {
            if(anyObjects[k] === undefined || anyObjects[k] === null || anyObjects[k] === '') {
                delete(anyObjects[k]);
            }
          });
        return anyObjects;
    }
}
