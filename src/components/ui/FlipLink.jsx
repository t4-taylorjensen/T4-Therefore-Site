import './FlipLink.css';

export default function FlipLink({ href, children, className = '', onClick, ...props }) {
  return (
    <a
      href={href}
      className={`flip-link${className ? ` ${className}` : ''}`}
      onClick={onClick}
      {...props}
    >
      <span className="flip-a">{children}</span>
      <span className="flip-b" aria-hidden="true">{children}</span>
    </a>
  );
}
