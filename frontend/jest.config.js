/** @type {import('jest').Config} */
const config = {
    verbose: true,
    transformIgnorePatterns: [
        "/node_modules/(?!axios)"
    ],
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    }
};

module.exports = config;