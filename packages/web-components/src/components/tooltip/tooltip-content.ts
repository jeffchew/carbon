/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import CDSPopoverContent from '../popover/popover-content';
import styles from './tooltip.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Tooltip content.
 *
 * @element cds-tooltip-content
 */
@customElement(`${prefix}-tooltip-content`)
class CDSTooltipContent extends CDSPopoverContent {
  connectedCallback() {
    if (!this.hasAttribute('aria-hidden')) {
      this.setAttribute('aria-hidden', 'true');
    }
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'tooltip');
    }
    super.connectedCallback();
  }

  updated() {
    this.shadowRoot
      ?.querySelector(`.${prefix}--popover-content`)
      ?.classList.add(`${prefix}--tooltip-content`);
  }

  static styles = styles;
}

export default CDSTooltipContent;
