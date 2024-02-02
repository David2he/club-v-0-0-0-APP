/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_API_PUBLIC_KEY_STRIPE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
