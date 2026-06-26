import './FormField.css';

/* ─────────────────────────────────────────
   FORM FIELD
   Single primitive behind every label+input
   pairing in the system. Two label treatments:

   variant="static"   — label above, boxed input (ContactCTA)
   variant="floating" — label floats over the placeholder,
                         underline input (ContactModal)

   tone="dark" recolors the floating variant for use on
   dark sections (ContactCTA).
───────────────────────────────────────── */
export default function FormField({
  id,
  label,
  as = 'input',
  type = 'text',
  rows,
  variant = 'floating',
  tone = 'light',
  className = '',
  placeholder,
  ...rest
}) {
  const Tag = as === 'textarea' ? 'textarea' : 'input';
  const wrapperClass = [
    'form-field',
    `form-field--${variant}`,
    tone === 'dark' ? 'form-field--dark' : '',
    className,
  ].filter(Boolean).join(' ');

  const control = (
    <Tag
      id={id}
      className="form-field-control"
      placeholder={variant === 'floating' ? ' ' : placeholder}
      {...(as === 'textarea' ? { rows } : { type })}
      {...rest}
    />
  );

  if (variant === 'static') {
    return (
      <div className={wrapperClass}>
        <label className="form-field-label" htmlFor={id}>{label}</label>
        {control}
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      {control}
      <label className="form-field-label" htmlFor={id}>{label}</label>
    </div>
  );
}
