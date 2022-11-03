export default function Input({
  type,
  name,
  id,
  value = '',
  placeholder = '',
  onChange,
  iconClass,
  autoComplete = 'on',
  label,
  span='',
}) {
  return (
    <div className="form-group">
    <label htmlFor={name} className="my-2">{label} <span style={{color: "red"}}>{span}</span></label>
    <div className="input-group mb-2">
      <div className="input-group-text">
      <i className={iconClass} />
      </div>
      <input
        type={type}
        className="form-control"
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete={autoComplete}
      />
    </div>
    </div>
  );
}