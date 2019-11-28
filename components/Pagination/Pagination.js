import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import styles from "public/jss/la-flamme-connectee/components/paginationStyle.js";

const useStyles = makeStyles(styles);

export default function Pagination(props) {
  const { pages, color, className } = props;
  const classes = useStyles();
  const paginationClasses = classNames(classes.pagination, className);
  return (
    <ul className={paginationClasses}>
      {pages.map((prop, key) => {
        const paginationLink = classNames({
          [classes.paginationLink]: true,
          [classes[color]]: prop.active,
          [classes.disabled]: prop.disabled
        });
        return (
          <li className={classes.paginationItem} key={key}>
            {prop.onClick !== undefined ? (
              <Button onClick={prop.onClick} className={paginationLink} disabled={prop.disabled}>
                {prop.text}
              </Button>
            ) : (
              <Button
                onClick={() => alert("you've clicked " + prop.text)}
                className={paginationLink}
                disabled={prop.disabled}
              >
                {prop.text}
              </Button>
            )}
          </li>
        );
      })}
    </ul>
  );
}

Pagination.defaultProps = {
  color: "primary"
};

Pagination.propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      active: PropTypes.bool,
      disabled: PropTypes.bool,
      text: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      onClick: PropTypes.func
    })
  ).isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  className: PropTypes.string
};
