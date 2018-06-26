export class Utility {
    static removeEmptyOrNullProperty(anyObjects: Object) {
        Object.keys(anyObjects).forEach(k => {
            anyObjects[k] = anyObjects[k] === undefined ? "" : anyObjects[k].remove();
          });
        return anyObjects;
    }
}
