export function clone<Type>(obj: Type) {
    return JSON.parse(JSON.stringify(obj));
}