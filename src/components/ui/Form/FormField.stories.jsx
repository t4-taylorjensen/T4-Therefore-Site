import FormField from './FormField';

export default {
  title: 'UI/TextInput',
  component: FormField,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['floating', 'static'] },
    tone: { control: 'inline-radio', options: ['light', 'dark'] },
    as: { control: 'inline-radio', options: ['input', 'textarea'] },
  },
  args: {
    id: 'demo-field',
    label: 'Email address',
    variant: 'floating',
    tone: 'light',
    as: 'input',
  },
  decorators: [
    (Story, ctx) => (
      <div style={{
        maxWidth: 420,
        padding: 32,
        background: ctx.args.tone === 'dark' ? '#121212' : 'transparent',
        borderRadius: 8,
      }}>
        <Story />
      </div>
    ),
  ],
};

/* The single primitive behind every label+input pairing in the system. */
export const Floating = {
  args: { variant: 'floating', label: 'Email address' },
};

export const Static = {
  args: { variant: 'static', label: 'Full name', placeholder: 'Jane Doe' },
};

export const Textarea = {
  args: { variant: 'static', as: 'textarea', rows: 4, label: 'Message', placeholder: 'Tell us about your project…' },
};

export const DarkTone = {
  name: 'Floating — Dark',
  args: { variant: 'floating', tone: 'dark', label: 'Work email' },
};
