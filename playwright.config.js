module.exports = {
    projects: [
      {
        name: 'chromium',
        use: { ...require('@playwright/test').devices['Desktop Chrome'], channel: 'chrome' },
      },
    ],
  };
  