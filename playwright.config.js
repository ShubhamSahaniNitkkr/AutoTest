import 'dotenv/config';

const config = {
    timeout: 180000,
    testDir: 'tests/auto',

    retries: 0,
    workers: 1,

    use: {
        headless: false,
        baseURL: process.env.BASE_URL,
        trace: "on-first-retry",
        screenshot: "only-on-failure",
        video: "retain-on-failure",
        actionTimeout: 30000,
        navigationTimeout: 60000,
        trace: 'off'
    },
    reporter: [["html", { open: "never" }]],
};

export default config;
