import { LitElement, html } from 'lit';

const SCHEMA = [
    { name: 'entity', selector: { entity: { domain: 'light' } } },
    { name: 'delay_entity', selector: { entity: { domain: 'number' } } },
    { name: 'name', selector: { text: {} } },
    { name: 'sun_color', selector: { text: {} } },
    { name: 'moon_color', selector: { text: {} } },
    { name: 'sun_icon', selector: { icon: {} } },
    { name: 'moon_icon', selector: { icon: {} } },
];

class MiotLightEditor extends LitElement {
    static get properties() {
        return {
            hass: { type: Object },
            config: { type: Object },
        };
    }

    setConfig(config) {
        this.config = config;
    }

    _valueChanged(ev) {
        if (!this.config || !this.hass) return;
        this.dispatchEvent(new CustomEvent('config-changed', {
            detail: { config: ev.detail.value },
            bubbles: true,
            composed: true,
        }));
    }

    render() {
        if (!this.hass || !this.config) return html``;

        return html`
      <ha-form
        .hass=${this.hass}
        .data=${this.config}
        .schema=${SCHEMA}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
    }

    _computeLabel(schema) {
        switch (schema.name) {
            case 'entity':
                return '燈光實體 (light)';
            case 'delay_entity':
                return '延遲實體 (number)';
            case 'name':
                return '自訂顯示名稱（選填）';
            case 'sun_color':
                return '日光模式顏色（Hex，例如 #fb8c00）';
            case 'moon_color':
                return '月光模式顏色（Hex，例如 #2196f3）';
            case 'sun_icon':
                return '日光模式圖示（例如 mdi:weather-sunny）';
            case 'moon_icon':
                return '月光模式圖示（例如 mdi:weather-night）';
            default:
                return schema.name;
        }
    }
}

customElements.define('miot-light-editor', MiotLightEditor);

