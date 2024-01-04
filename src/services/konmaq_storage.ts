import { parseCookies, setCookie, destroyCookie } from "nookies";

export const KONMAP_PRODUCTS_KEY = "products";
export const KONMAQ_TOKEN_KEY = "token";
export const KONMAQ_ORDER_KEY = "order";

class KonmaqStorage {
  public set(key: string, payload: string) {
    setCookie(null ,key, payload);
  }

  public get<Type>(key: string, needToParse = true): any {
      const cookies = parseCookies()
      const item = cookies[key];
      if (!item) return null;
      return needToParse ? (JSON.parse(item!) as Type) : item;
  }

  public getMany<Type>(keys: string[]): Type[] {
    let items: Type[] = [];
    keys.forEach((key) => items.push(this.get<Type>(key)));
    return items;
  }

  public remove(key: string) {
    destroyCookie(null, key)
  }

  public removeMany(keys: string[]) {
    keys.forEach((key) => this.remove(key));
  }

  public removeAll() {
    const cookies = parseCookies();
    Object.keys(cookies).forEach((key) => this.remove(key));
  }
}

const storage = new KonmaqStorage();
export { storage };
