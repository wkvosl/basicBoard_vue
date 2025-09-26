import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default ({ mode }) => {
    // mode: development / production 등
    const env = loadEnv(mode, process.cwd(), '') // prefix 없이 전체 env 가져오기

    return defineConfig({
        plugins: [vue(), vueDevTools()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            },
        },
        server: {
            proxy: {
                '/board/upload/files': {
                    target: env.VITE_API_BASE_URL,  // 필요하면 gallery도 프록시
                    changeOrigin: true,
                    secure: false,
                }
            }
        }
    })
}
