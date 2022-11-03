export default function Alert({ className, value }) {
    return (
      <div
        className={`alert mt-3 ${className}`}
        role="alert"
      >
        {value}
      </div>
    );
  }