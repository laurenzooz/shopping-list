const { test, expect } = require("@playwright/test");

test("Has expected title", async ({ page }) => {
    await page.goto("http://shopping-list:7777/");
    await expect(page).toHaveTitle("Shopping list");
});

