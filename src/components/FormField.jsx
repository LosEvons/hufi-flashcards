export default function FormField({ label, children }) {
  return (
    <label className="form-field">
      <div className="form-label">{label}</div>
      {children}
    </label>
  )
}
