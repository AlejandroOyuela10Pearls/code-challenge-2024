import PropTypes from "prop-types";

const PageLoading = ({
  className,
  widthAndHeight,
  absolute,
  top,
  left,
  right,
  bottom,
  fixed,
}) => {
  return (
    <span
      className={`${className} ${fixed ? "fixed" : "relative"} ${
        !left ? "left-1/2" : ""
      } ${
        !top ? "top-1/2" : ""
      } box-border inline-block animate-spin rounded-[50%] border-8 border-white border-b-primary border-l-primary border-r-primary`}
      style={{
        width: widthAndHeight ? widthAndHeight : "70px",
        height: widthAndHeight ? widthAndHeight : "70px",
        position: absolute ? "absolute" : "inherit",
        left,
        top,
        right,
        bottom,
      }}
      data-testid="page-loading"
    ></span>
  );
};

PageLoading.propTypes = {
  className: PropTypes.string,
  widthAndHeight: PropTypes.string,
  absolute: PropTypes.bool,
  top: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
  fixed: PropTypes.bool,
};

export default PageLoading;
