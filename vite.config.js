import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/miot-light-card.js',
            name: 'MiotLightCard',
            fileName: () => 'miot-light-card.js',
            formats: ['es']
        },
        outDir: 'dist',
        emptyOutDir: true,
    }
});
