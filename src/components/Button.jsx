const Button = ({ onClick, children, className = '', type = 'button' }) => (
  <button type={type} onClick={onClick} className={className}>
    {children}
  </button>
)

export default Button
