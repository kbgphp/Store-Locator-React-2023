const Checkbox = ({ label, isChecked, onChange }) => {
  return (
    <label className={`btn btn-outline-primary ${isChecked ? 'active' : ''}`}>
      <input type="checkbox" checked={isChecked} onChange={onChange} />
      {label}
    </label>
  );
};


export default Checkbox;