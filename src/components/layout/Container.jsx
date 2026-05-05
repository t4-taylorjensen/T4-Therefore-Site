/**
 * Container — horizontal layout wrapper that caps width and applies
 * the responsive page padding token. Maps to the .container utility class.
 *
 * size:
 *   default — max-width 1440px, padding clamp(24px, 6.25vw, 90px)
 *   md      — max-width 1280px, padding 30px
 */
export default function Container({ size = 'default', children, className = '', as: Tag = 'div', ...rest }) {
  const cls = size === 'md' ? 'container-md' : 'container';
  return (
    <Tag className={`${cls} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
