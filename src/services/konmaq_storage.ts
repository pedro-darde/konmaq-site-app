export const KONMAP_PRODUCTS_KEY = 'products'

class KonmaqStorage {
    public set(key: string, payload: string) {
        localStorage.setItem(key, payload);
    }

    public get<Type>(key: string): Type {
        const item = localStorage.getItem(key);
        return JSON.parse(item!) as Type
    }

    public getMany<Type>(keys: string[]): Type[] {
        let items: Type[] = []
        keys.forEach(key => items.push(this.get<Type>(key)))
        return items
    }

    public remove(key: string) {
        localStorage.removeItem(key)
    }

    public removeMany(keys: string[]) {
        keys.forEach(key => this.remove(key))
    }

    public removeAll() {
        localStorage.clear();
    }

}
const storage = new KonmaqStorage();
export { storage }