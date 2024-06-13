import resolve from '@rollup/plugin-node-resolve';

export default {
    input: "main.js",
    output: {
        dir: "output",
        name: "main.js",
        format: "iife",
        sourcemap: "inline"
    },
    plugins: [
        resolve()
    ]
}