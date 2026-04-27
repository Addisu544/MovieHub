import "./EmptyState.css";

const EmptyState = ({ title, description, children }) => {
  return (
    <div className="empty">
      <div className="empty-panel">
        <h3 className="empty-title">{title}</h3>
        {description && <p className="empty-desc">{description}</p>}
        {children && <div className="empty-actions">{children}</div>}
      </div>
    </div>
  );
};

export default EmptyState;

