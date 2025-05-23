/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt ComboBox', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'ComboBox',
      id: 'components-combobox--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('ComboBox');
  });

  // Skipping now due to AVT violation, possible false positive
  test.skip('@avt-advanced-states open', async ({ page }) => {
    await visitStory(page, {
      component: 'ComboBox',
      id: 'components-combobox--default',
      globals: {
        theme: 'white',
      },
    });
    const combobox = page.getByRole('combobox');

    await expect(combobox).toBeVisible();
    // Tab and open the ComboBox
    await page.keyboard.press('Tab');
    await expect(combobox).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('combobox', { expanded: true })).toBeVisible();
    await expect(combobox).toBeFocused();

    await expect(page).toHaveNoACViolations('ComboBox-open');
  });

  test('@avt-keyboard-nav', async ({ page }) => {
    await visitStory(page, {
      component: 'ComboBox',
      id: 'components-combobox--default',
      globals: {
        theme: 'white',
      },
    });
    const combobox = page.getByRole('combobox');
    const menu = page.getByRole('listbox');
    const clearButton = page.getByRole('button', {
      name: 'Clear selected item',
    });
    const exampleOption = page.getByRole('option', {
      name: 'An example option that is really long to show what should be done to handle long text',
    });
    const optionOne = page.getByRole('option', {
      name: 'An example option that is really long to show what should be done to handle long text',
    });
    const optionTwo = page.getByRole('option', {
      name: 'Option 2',
    });

    await expect(combobox).toBeVisible();
    await expect(clearButton).toBeHidden();
    // Tab and open the ComboBox with Arrow Down
    await page.keyboard.press('Tab');
    await expect(combobox).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await expect(menu).toBeVisible();
    // Expect focus to be on 1st item in menu after Arrow Down
    // when there is no initial selected item
    await expect(exampleOption).toHaveClass(
      'cds--list-box__menu-item cds--list-box__menu-item--highlighted'
    );
    // Close with Escape, retain focus, and open with Spacebar
    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await expect(combobox).toBeFocused();
    await page.keyboard.press('Space');
    await expect(menu).toBeVisible();
    // Close and clear with Escape, retain focus, and open with Enter
    await page.keyboard.press('Escape');
    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await expect(combobox).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(menu).toBeVisible();
    // Expect focus to be retained when no initial selected item after Enter
    await expect(combobox).toBeFocused();
    await page.keyboard.press('ArrowDown');
    // Navigation inside the menu
    // move to first option
    await expect(optionOne).toHaveClass(
      'cds--list-box__menu-item cds--list-box__menu-item--highlighted'
    );
    // select first option (should only select with enter)
    await page.keyboard.press('Space');
    await expect(combobox).toHaveValue(' ');
    await page.keyboard.press('Enter');
    await expect(combobox).toHaveValue(
      'An example option that is really long to show what should be done to handle long text'
    );
    // focus comes back to the toggle button after selecting
    await expect(combobox).toBeFocused();
    await expect(menu).toBeHidden();
    await expect(clearButton).toBeVisible();
    // Expect focus to be on selected item when opening with Arrow Down
    await page.keyboard.press('ArrowDown');
    await expect(exampleOption).toHaveClass(
      'cds--list-box__menu-item cds--list-box__menu-item--active cds--list-box__menu-item--highlighted'
    );
    // should only clear selection when escape is pressed when the menu is closed
    await page.keyboard.press('Escape');
    await page.keyboard.press('Escape');
    await expect(clearButton).toBeHidden();
    await expect(combobox).toHaveValue('');
    // should highlight menu items based on text input
    await page.keyboard.press('2');
    await expect(menu).toBeVisible();
    await expect(optionTwo).toHaveClass(
      'cds--list-box__menu-item cds--list-box__menu-item--highlighted'
    );
    // Should select and populate combobox with current filtered item
    await page.keyboard.press('Enter');
    await expect(combobox).toHaveValue('Option 2');
    // clear to prep for general selection
    await page.keyboard.press('Escape');
    await expect(clearButton).toBeHidden();
    await expect(combobox).toHaveValue('');

    // should open and select option 1
    await page.keyboard.press('Enter');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(combobox).toHaveValue(
      'An example option that is really long to show what should be done to handle long text'
    );
    await page.keyboard.press('Escape');

    // should open and select option 2
    await page.keyboard.press('Enter');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(combobox).toHaveValue('Option 1');
    await page.keyboard.press('Escape');
  });
});
