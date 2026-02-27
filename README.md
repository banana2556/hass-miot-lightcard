# miot light card

A custom Lovelace card for Home Assistant, built for light entities connected through `hass-xiaomi-miot`.

[![HACS Custom](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://hacs.xyz/)
[![Release](https://img.shields.io/github/v/release/banana2556/hass-miot-lightcard?display_name=tag)](https://github.com/banana2556/hass-miot-lightcard/releases)
[![Last Commit](https://img.shields.io/github/last-commit/banana2556/hass-miot-lightcard)](https://github.com/banana2556/hass-miot-lightcard/commits/main)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-support-yellow?logo=buymeacoffee&logoColor=black)](https://buymeacoffee.com/banana2556)

## Features

- Designed for MIoT light entities provided by `hass-xiaomi-miot`
- Visual editor support in Home Assistant dashboard UI
- Day/Night mode toggle
- Brightness slider
- Delay timer toggle and slider
- Click card blank area to open entity `more-info`
- Click top-left icon to toggle light power
- Built-in preview layout before entity is configured

## Installation

### HACS (Recommended)

1. Click the button below to open this repository in HACS.

[![Open your Home Assistant instance and open this repository in HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=banana2556&repository=hass-miot-lightcard&category=plugin)

2. Install **miot light card** in HACS.
3. Refresh browser cache (`Ctrl+F5`).
4. Add card in Dashboard.

### Manual

1. Download `dist/miot-light-card.js` from [Releases](https://github.com/banana2556/hass-miot-lightcard/releases).
2. Copy it to `/config/www/community/hass-miot-lightcard/miot-light-card.js`.
3. Add resource in Home Assistant:
   - URL: `/local/community/hass-miot-lightcard/miot-light-card.js`
   - Type: `JavaScript Module`

## Dashboard Usage

```yaml
type: custom:miot-light-card
entity: light.your_light_entity
delay_entity: number.your_delay_entity
name: miot light card
sun_color: "#fb8c00"
moon_color: "#2196f3"
sun_icon: mdi:weather-sunny
moon_icon: mdi:weather-night
```

## Configuration

| Option | Type | Required | Description |
|---|---|---|---|
| `entity` | string | Yes | Light entity ID (`light.xxx`) |
| `delay_entity` | string | Yes | Number entity ID for delay (`number.xxx`) |
| `name` | string | No | Custom title text |
| `sun_color` | string | No | Day mode color (Hex) |
| `moon_color` | string | No | Night mode color (Hex) |
| `sun_icon` | string | No | Day mode icon |
| `moon_icon` | string | No | Night mode icon |

## Support

- Issues: https://github.com/banana2556/hass-miot-lightcard/issues
- Releases: https://github.com/banana2556/hass-miot-lightcard/releases

