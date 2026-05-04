import FixedVideo from './FixedVideo';

export default {
  title: 'Patterns/FixedVideo',
  component: FixedVideo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**FixedVideo** is a persistent floating video widget anchored to the bottom-right corner of the viewport. It remains fixed as the user scrolls the full page, creating an always-available CTA or intro video prompt.

## Layout
- **Position**: \`fixed\`, \`bottom: 15px\`, \`right: 15px\`, \`z-index: 1000\`
- **Card**: \`233px × 311px\`, \`border-radius: 5px\`, \`overflow: hidden\`, \`padding: 12px\`
- **Background**: dark cinematic gradient — replace with a real video thumbnail or \`<video>\` element
- **Top row**: close button (\`23px\` circle) flush to the top-right via \`justify-content: flex-end\`
- **Bottom**: blue play button (\`42px × 42px\`, \`border-radius: 3px\`, \`padding-left: 3px\` optical centering)

## Interactions
- Close button dismisses the widget (unmounts from DOM)
- Play button hover: lightens accent blue
- Close button hover: increases white fill opacity

## Shadow
Layered five-stop drop shadow creates depth lift off the page surface.

## Usage
Place \`<FixedVideo />\` anywhere in the page tree — its \`position: fixed\` means it renders relative to the viewport regardless of DOM position.
        `.trim(),
      },
    },
  },
};

export const Default = {};
