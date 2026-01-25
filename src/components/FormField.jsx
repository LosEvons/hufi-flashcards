const FormField = ({ label, children }) => (
  <label style={{ display: 'block', textAlign: 'left' }}>
    <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{label}</div>
    {children}
  </label>
)

export default FormField
