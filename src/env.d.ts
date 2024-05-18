/// <reference path="../.astro/db-types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly SEED_NAME: string
    readonly SEED_LAST_NAME: string
    readonly SEED_PASSWORD: string
    readonly SEED_EMAIL: string
    readonly SEED_MATRICULA: number
    readonly SEED_PHONE: string
    readonly SEED_USERNAME: string
    readonly AUTH_TRUST_HOST: boolean
    readonly AUTH_SECRET: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}