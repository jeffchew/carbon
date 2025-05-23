/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ifDefined } from 'lit/directives/if-defined.js';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import FocusMixin from '../../globals/mixins/focus';
import styles from './header.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * The product name UI in header nav.
 *
 * @element cds-header-name
 * @csspart link The link.
 * @csspart prefix The prefix content.
 */
@customElement(`${prefix}-header-name`)
class CDSHeaderName extends FocusMixin(LitElement) {
  /**
   * Link `href`.
   */
  @property()
  href!: string;

  /**
   * The product name prefix.
   */
  @property()
  prefix!: string;

  render() {
    const { href, prefix: namePrefix } = this;
    const namePrefixPart = !namePrefix
      ? undefined
      : html`
          <span part="prefix" class="${prefix}--header__name--prefix"
            >${namePrefix}</span
          >
        `;
    return html`
      <a part="link" class="${prefix}--header__name" href="${ifDefined(href)}"
        >${namePrefixPart}&nbsp;<slot></slot
      ></a>
    `;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles;
}

export default CDSHeaderName;
