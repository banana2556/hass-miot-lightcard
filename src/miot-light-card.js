import { LitElement, html, css } from 'lit';
import './miot-light-editor.js';

class MiotLightCard extends LitElement {
    static get properties() {
        return {
            hass: { type: Object },
            config: { type: Object },
        };
    }

    static getConfigElement() {
        return document.createElement('miot-light-editor');
    }

    static getStubConfig() {
        return {
            entity: '',
            delay_entity: '',
            name: 'miot light card',
            sun_color: '#fb8c00',
            moon_color: '#2196f3',
            sun_icon: 'mdi:weather-sunny',
            moon_icon: 'mdi:weather-night',
        };
    }

    getCardSize() {
        return 2;
    }

    setConfig(config) {
        this.config = config;
    }

    isControlTarget(ev) {
        const path = ev.composedPath ? ev.composedPath() : [];
        return path.some((el) => {
            const tag = el && el.tagName ? el.tagName.toLowerCase() : '';
            return tag === 'button' || tag === 'ha-slider' || tag === 'ha-control-slider';
        });
    }

    openMoreInfo() {
        const entityId = this.config?.entity;
        if (!entityId) return;
        const event = new Event('hass-more-info', { bubbles: true, composed: true });
        event.detail = { entityId };
        this.dispatchEvent(event);
    }

    handleCardClick(ev) {
        if (this.isControlTarget(ev)) return;
        this.openMoreInfo();
    }

    handleCardPointerDown(ev) {
        if (this.isControlTarget(ev)) return;
        clearTimeout(this._holdTimer);
        this._holdTimer = setTimeout(() => {
            this.openMoreInfo();
        }, 550);
    }

    handleCardPointerUp() {
        clearTimeout(this._holdTimer);
    }

    async refreshEntities(entityIds = []) {
        if (!this.hass) return;
        const uniqueIds = [...new Set(entityIds.filter(Boolean))];
        if (uniqueIds.length === 0) return;
        await Promise.allSettled(uniqueIds.map((entityId) => this.hass.callService('homeassistant', 'update_entity', {
            entity_id: entityId,
        })));
    }

    getDelayInfo(delayState) {
        const rawValue = parseInt(delayState?.state, 10) || 0;
        const rawUnit = String(delayState?.attributes?.unit_of_measurement || '').toLowerCase();
        const isSecondUnit = ['s', 'sec', 'secs', 'second', 'seconds', '秒'].includes(rawUnit);
        const minuteValue = isSecondUnit ? Math.round(rawValue / 60) : rawValue;
        return { rawValue, minuteValue, isSecondUnit };
    }

    async toggleLightPower(ev) {
        ev.stopPropagation();
        if (!this.hass || !this.config.entity) return;
        const lightState = this.hass.states[this.config.entity];
        if (!lightState) return;
        const service = lightState.state === 'on' ? 'turn_off' : 'turn_on';
        await this.hass.callService('light', service, {
            entity_id: this.config.entity,
        });
        await this.refreshEntities([this.config.entity, this.config.delay_entity]);
    }

    hexToRgba(hex, alpha) {
        const cleanHex = (hex || '').replace('#', '');
        let r = 0;
        let g = 0;
        let b = 0;

        if (cleanHex.length === 3) {
            r = parseInt(cleanHex[0] + cleanHex[0], 16);
            g = parseInt(cleanHex[1] + cleanHex[1], 16);
            b = parseInt(cleanHex[2] + cleanHex[2], 16);
        } else if (cleanHex.length === 6) {
            r = parseInt(cleanHex.substring(0, 2), 16);
            g = parseInt(cleanHex.substring(2, 4), 16);
            b = parseInt(cleanHex.substring(4, 6), 16);
        } else {
            return `rgba(120, 120, 120, ${alpha})`;
        }

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    toggleMode() {
        if (!this.hass || !this.config.entity) return;
        const lightState = this.hass.states[this.config.entity];
        if (!lightState) return;

        const currentMode = lightState.attributes['light.mode'] || 1;
        this.hass.callService('xiaomi_miot', 'set_property', {
            entity_id: this.config.entity,
            field: 'light.mode',
            value: currentMode === 1 ? 2 : 1,
        });
    }

    changeBrightness(ev) {
        if (!this.hass || !this.config.entity) return;
        const val = ev.detail ? ev.detail.value : ev.target.value;
        if (val === undefined) return;

        if (val === 0) {
            this.hass.callService('light', 'turn_off', {
                entity_id: this.config.entity,
            });
        } else {
            this.hass.callService('light', 'turn_on', {
                entity_id: this.config.entity,
                brightness_pct: val,
            });
        }
    }

    async toggleDelay() {
        if (!this.hass || !this.config.delay_entity) return;
        const delayState = this.hass.states[this.config.delay_entity];
        if (!delayState) return;

        const { rawValue, isSecondUnit } = this.getDelayInfo(delayState);
        const defaultDelayValue = isSecondUnit ? 30 * 60 : 30;
        await this.hass.callService('number', 'set_value', {
            entity_id: this.config.delay_entity,
            value: rawValue > 0 ? 0 : defaultDelayValue,
        });
        await this.refreshEntities([this.config.delay_entity, this.config.entity]);
    }

    async changeDelay(ev) {
        if (!this.hass || !this.config.delay_entity) return;
        const delayState = this.hass.states[this.config.delay_entity];
        if (!delayState) return;
        const { isSecondUnit } = this.getDelayInfo(delayState);
        const minuteValue = parseInt(ev.target.value, 10);
        if (Number.isNaN(minuteValue)) return;
        const targetValue = isSecondUnit ? minuteValue * 60 : minuteValue;

        await this.hass.callService('number', 'set_value', {
            entity_id: this.config.delay_entity,
            value: targetValue,
        });
        await this.refreshEntities([this.config.delay_entity, this.config.entity]);
    }

    static get styles() {
        return css`
      :host { display: block; }
      ha-card {
        padding: 16px;
        border-radius: 24px;
        background: var(--ha-card-background, var(--card-background-color, white));
        transition: all 0.3s ease;
      }
      ha-card.clickable { cursor: pointer; }

      .header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
      .icon-circle {
        width: 40px; height: 40px; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
      }
      .icon-circle.clickable { cursor: pointer; }
      .info { display: flex; flex-direction: column; justify-content: center; }
      .title { font-weight: bold; font-size: 14px; color: var(--primary-text-color); line-height: 1.2; }
      .state { font-size: 12px; color: var(--secondary-text-color); margin-top: 2px; }

      .brightness-slider {
        margin-bottom: 16px;
        height: 42px;
        border-radius: 12px;
        overflow: hidden;
      }
      ha-control-slider {
        width: 100%;
        height: 100%;
        --control-slider-thickness: 42px;
        --control-slider-border-radius: 12px;
      }

      .controls { display: flex; gap: 8px; height: 36px; align-items: center; }

      .pill-btn {
        height: 36px; border-radius: 18px; padding: 0 16px;
        display: flex; align-items: center; gap: 8px;
        font-size: 13px; font-weight: bold; cursor: pointer; border: none;
        flex: 0 0 auto; white-space: nowrap; transition: background-color 0.3s;
      }

      .delay-container {
        display: flex; align-items: center; height: 36px; border-radius: 18px;
        transition: all 0.3s ease; overflow: hidden;
      }
      .delay-container.active { flex: 1; }
      .delay-container.inactive { flex: 0 0 auto; background: rgba(120, 120, 120, 0.1); }

      .delay-btn {
        height: 100%; min-width: 80px; padding: 0 16px;
        display: flex; align-items: center; gap: 8px;
        border: none; background: transparent;
        font-size: 13px; font-weight: bold; cursor: pointer; white-space: nowrap;
      }

      .slider-container {
        flex: 1; padding-right: 16px; display: flex; align-items: center;
        min-width: 120px;
      }
      ha-slider { width: 100%; }
      .preview-delay-slider {
        width: 100%;
        margin: 0;
      }
    `;
    }

    renderPreviewCard() {
        const sunColor = this.config?.sun_color || '#fb8c00';
        const sunIcon = this.config?.sun_icon || 'mdi:weather-sunny';
        const previewName = this.config?.name || '客廳範例燈';
        const activeBg = this.hexToRgba(sunColor, 0.15);

        return html`
      <ha-card class="preview">
        <div class="header">
          <div class="icon-circle" style="background: ${activeBg}; color: ${sunColor}">
            <ha-icon icon="${sunIcon}"></ha-icon>
          </div>
          <div class="info">
            <div class="title">${previewName}</div>
            <div class="state">65%</div>
          </div>
        </div>

        <div class="brightness-slider">
          <ha-control-slider
            .value=${65}
            min="0"
            max="100"
            disabled
            style="--control-slider-color: ${sunColor}; --control-slider-background: ${activeBg};"
          ></ha-control-slider>
        </div>

        <div class="controls">
          <button class="pill-btn" style="background: ${activeBg}; color: ${sunColor}" disabled>
            <ha-icon icon="${sunIcon}" style="width: 18px;"></ha-icon>
            日光
          </button>

          <div class="delay-container active" style="background: ${activeBg};">
            <button class="delay-btn" style="color: ${sunColor}" disabled>
              <ha-icon icon="mdi:timer-outline" style="width: 18px;"></ha-icon>
              30m
            </button>
            <div class="slider-container">
              <input
                class="preview-delay-slider"
                type="range"
                min="0"
                max="60"
                step="5"
                value="30"
                disabled
                style="accent-color: ${sunColor};"
              />
            </div>
          </div>
        </div>
      </ha-card>
    `;
    }

    render() {
        if (!this.config) {
            this.config = this.constructor.getStubConfig();
        }
        if (!this.hass) {
            return this.renderPreviewCard();
        }

        if (!this.config.entity || !this.config.delay_entity) {
            return this.renderPreviewCard();
        }

        const lightState = this.hass.states[this.config.entity];
        const delayState = this.hass.states[this.config.delay_entity];

        if (!lightState || !delayState) {
            return html`
         <ha-card style="padding: 24px; text-align: center; border-radius: 16px; color: #ff5252;">
           找不到實體，請確認 entity_id 設定是否正確。
         </ha-card>
       `;
        }

        const isOn = lightState.state === 'on';
        const brightness = lightState.attributes.brightness || 0;
        const percentage = isOn ? Math.round((brightness / 255) * 100) : 0;
        const stateText = isOn ? `${percentage}%` : '關閉';

        const mode = lightState.attributes['light.mode'] || 1;
        const { rawValue: delayRaw, minuteValue: delayMinutes } = this.getDelayInfo(delayState);

        const sunColor = this.config.sun_color || '#fb8c00';
        const moonColor = this.config.moon_color || '#2196f3';
        const sunIcon = this.config.sun_icon || 'mdi:weather-sunny';
        const moonIcon = this.config.moon_icon || 'mdi:weather-night';

        const isMoon = mode === 2;
        const activeColor = isMoon ? moonColor : sunColor;
        const activeBg = this.hexToRgba(activeColor, 0.15);
        const activeIcon = isMoon ? moonIcon : sunIcon;
        const offIconColor = 'var(--state-icon-color, var(--disabled-text-color, var(--secondary-text-color)))';
        const offBgColor = 'rgba(var(--rgb-disabled-color, 120, 120, 120), 0.15)';
        const iconDisplayColor = isOn ? activeColor : offIconColor;
        const iconDisplayBg = isOn ? activeBg : offBgColor;

        const containerStyle = delayRaw > 0 ? `background: ${activeBg};` : '';
        const delayText = delayRaw > 0 ? `${delayMinutes}m` : '延遲';

        return html`
      <ha-card
        class=${this.config.entity ? 'clickable' : ''}
        @click=${this.handleCardClick}
        @pointerdown=${this.handleCardPointerDown}
        @pointerup=${this.handleCardPointerUp}
        @pointercancel=${this.handleCardPointerUp}
        @pointerleave=${this.handleCardPointerUp}
      >
        <div class="header">
          <div
            class="icon-circle clickable"
            style="background: ${iconDisplayBg}; color: ${iconDisplayColor}"
            @click=${this.toggleLightPower}
          >
            <ha-icon icon="${activeIcon}"></ha-icon>
          </div>
          <div class="info">
            <div class="title">${this.config.name || lightState.attributes.friendly_name}</div>
            <div class="state">${stateText}</div>
          </div>
        </div>

        <div class="brightness-slider">
          <ha-control-slider
            .value=${percentage}
            min="0"
            max="100"
            @value-changed=${this.changeBrightness}
            style="--control-slider-color: ${activeColor}; --control-slider-background: ${activeBg};"
          ></ha-control-slider>
        </div>

        <div class="controls">
          <button
            class="pill-btn"
            style="background: ${iconDisplayBg}; color: ${iconDisplayColor}"
            @click=${this.toggleMode}
          >
            <ha-icon icon="${activeIcon}" style="width: 18px;"></ha-icon>
            ${isMoon ? '月光' : '日光'}
          </button>

          <div class="delay-container ${delayRaw > 0 ? 'active' : 'inactive'}" style="${containerStyle}">
            <button
              class="delay-btn"
              style="color: ${delayRaw > 0 ? activeColor : 'var(--primary-text-color)'}"
              @click=${this.toggleDelay}
            >
              <ha-icon icon="mdi:timer-outline" style="width: 18px;"></ha-icon>
              ${delayText}
            </button>

            ${delayRaw > 0
        ? html`
                  <div class="slider-container">
                    <ha-slider
                      min="0"
                      max="60"
                      step="5"
                      .value=${delayMinutes}
                      @change=${this.changeDelay}
                      style="--md-sys-color-primary: ${activeColor};"
                    ></ha-slider>
                  </div>
                `
        : ''}
          </div>
        </div>
      </ha-card>
    `;
    }
}

customElements.define('miot-light-card', MiotLightCard);

window.customCards = window.customCards || [];

// Normalize legacy card metadata in case old resources are still cached in HA.
for (const card of window.customCards) {
    if (card.type === 'yeelink-light-card' || card.type === 'miot-light-card') {
        card.name = 'miot light card';
        card.description = 'Light card for hass-xiaomi-miot entities with mode and delay controls.';
        card.preview = true;
    }
}

if (!window.customCards.some((card) => card.type === 'miot-light-card')) {
    window.customCards.push({
        type: 'miot-light-card',
        name: 'miot light card',
        description: 'Light card for hass-xiaomi-miot entities with mode and delay controls.',
        preview: true,
    });
}

