# Dori Chat Widget

A lightweight, customizable chat-widget for dori chatbot that can be easily integrated into any website. This widget provides a modern, responsive chat interface with support for markdown formatting, product displays, and suggested replies.
for full use of widget you should sign-up at [Dori.tech](https://dori.tech) and create your own bot.

## Features

- 🎨 Modern, responsive design
- 📱 Mobile-friendly interface
- ✨ Markdown support
- 🔄 Real-time streaming responses
- 🎯 Suggested replies
- 🛍️ Product carousel display
- 🌐 RTL language support
- 🔌 Easy integration
- ⚡ Lightweight

## Installation

Add the script to your HTML file:

```html
<script src="https://unpkg.com/dori-chat-widget@1.0.0/dist/script.js"></script>
```

## Usage

1. Initialize the widget with your sharing ID:

```html
<script>window.SHARING_ID =  'your-sharing-id';</script>
<script src="https://unpkg.com/dori-chat-widget@1.0.0/dist/script.js"></script>
```


2. The chat widget will appear as a floating button in the bottom-right corner of your website.

## Customization

The widget automatically adapts to your bot's configuration, including:

- Bot avatar
- Welcome message
- Suggested replies
- RTL support
- Custom text strings
- Theme colors

All these settings can be managed through your Dori dashboard.

## Configuration Options

The widget reads the following properties from your bot configuration:

| Property | Type | Description |
|----------|------|-------------|
| bot_image | string | URL of the bot's avatar image |
| wellcomeMessage | string | Initial message displayed when chat opens |
| suggestedReply | string/array | Pre-defined reply options |
| texts.isRTL | boolean | Enable RTL layout |
| texts.chatWithUs | string | Chat header text |
| texts.inputPlaceholder | string | Input field placeholder |
| texts.buttonText | string | Send button text |
| texts.typing | string | Typing indicator text |
| texts.error | string | Error message text |