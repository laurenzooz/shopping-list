const { test, expect } = require("@playwright/test");

test("Has expected title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Shopping list");
});

