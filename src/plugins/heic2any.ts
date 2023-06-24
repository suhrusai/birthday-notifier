import heic2any from "heic2any";

export async function convertHeicToDataUrl(src:any) {
    try {
        console.log('Checking if HEIC is already converted to data url');
        const heicCache = HeicCache.getInstance();
        const cachedDataUrl = heicCache.get(src);
        if (cachedDataUrl) {
            return cachedDataUrl;
        }
        console.debug('converting heic to data url');
        const response = await fetch(src);
        const heicBlob = await response.blob();
        const convertedBlob = await heic2any({
            blob: heicBlob,
            toType: 'image/jpeg', // Convert to JPEG data URL
        });
        const convertedDataUrl = URL.createObjectURL(convertedBlob as Blob);
        heicCache.set(src, convertedDataUrl);
        return convertedDataUrl;
    } catch (error) {
        console.error('Error converting HEIC image:', error);
    }
}

export class HeicCache {
    private static instance: HeicCache;
    private cache: Map<string, any>;
  
    private constructor() {
      this.cache = new Map<string, string>();
    }
  
    public static getInstance(): HeicCache {
      if (!HeicCache.instance) {
        HeicCache.instance = new HeicCache();
      }
      return HeicCache.instance;
    }
  
    public set(key: string, value: string): void {
      this.cache.set(key, value);
    }
  
    public get(key: string): string | undefined {
      return this.cache.get(key);
    }
    public getCache(): Map<string, string> {
        return this.cache;
    }
    public delete(key: string): boolean {
      return this.cache.delete(key);
    }
}

