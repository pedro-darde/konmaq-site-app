import { baseService } from "./api";

export class Cached {
    static items: Map<string, any> = new Map<string, any>();    
    public async  get<Type>(modelName: string, query?: any): Promise<Type> {
        if (Cached.items.has(modelName)) {
            console.log(`Caching ${modelName}`)
            return Cached.items.get(modelName);
        }

        const response = await baseService.get<Type>(modelName, query);
        Cached.items.set(modelName, response.data);
        return Cached.items.get(modelName);
    }
}