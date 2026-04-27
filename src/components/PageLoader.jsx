import "./PageLoader.css";

const PageLoader = ({ label = "Loading…" }) => {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <div className="page-loader-inner">
        <div className="page-loader-dot" aria-hidden="true" />
        <div className="page-loader-text">{label}</div>
      </div>
    </div>
  );
};

export default PageLoader;

