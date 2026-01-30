import 'dotenv/config';

const config = {
    timeout: 180000,
    testDir: 'tests/auto',

    retries: 0,
    workers: 1,

    use: {
        baseURL: 'https://demo.smartblue.ai',
        actionTimeout: 30000,
        navigationTimeout: 60000,
        trace: 'off'
    }
};

export default config;
