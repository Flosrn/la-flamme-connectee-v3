import React, { useContext } from "react";
import Link from "next/link";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
import Close from "@material-ui/icons/Close";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
// core components
import styles from "static/jss/la-flamme-connectee/components/headerStyle";
import { Badge } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import ListItem from "@material-ui/core/ListItem";
import Home from "@material-ui/core/SvgIcon/SvgIcon";
import List from "@material-ui/core/List";
import { ShoppingCartContext } from "../../src/contexts/ShoppingCartContext";
import ButtonLink from "../CustomButtons/ButtonLink";

const useStyles = makeStyles(styles);

export default function Header(props) {
  const { isLoggedIn, user } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const classes = useStyles();
  const { items } = useContext(ShoppingCartContext);
  React.useEffect(() => {
    if (props.changeColorOnScroll) {
      window.addEventListener("scroll", headerColorChange);
    }
    return function cleanup() {
      if (props.changeColorOnScroll) {
        window.removeEventListener("scroll", headerColorChange);
      }
    };
  });
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleDrawerLoginToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const headerColorChange = () => {
    const { color, changeColorOnScroll } = props;

    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body.getElementsByTagName("header")[0].classList.remove(classes[color]);
      document.body.getElementsByTagName("header")[0].classList.add(classes[changeColorOnScroll.color]);
    } else {
      document.body.getElementsByTagName("header")[0].classList.add(classes[color]);
      document.body.getElementsByTagName("header")[0].classList.remove(classes[changeColorOnScroll.color]);
    }
  };
  const { color, links, brand, fixed, absolute } = props;
  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes[color]]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed
  });
  return (
    <AppBar className={appBarClasses}>
      <Toolbar className={classes.container}>
        {/* <Button className={classes.title}> */}
        {/*  <Link href="/"> */}
        {/*    <a>{brand}</a> */}
        {/*  </Link> */}
        {/* </Button> */}
        <Hidden smDown implementation="css" className={classes.hidden}>
          <div className={classes.collapse}>{links}</div>
          {/* <IconButton color="inherit" onClick={handleDrawerLoginToggle} className={classes.cartIcon}> */}
          {/*  <PersonIcon className={classes.cartIcon} /> */}
          {/*  <p>{isLoggedIn && `${user.firstName} ${user.lastName}`}</p> */}
          {/* </IconButton> */}
          {/* <IconButton color="inherit" href="/shoppingCart" className={classes.cartIcon}> */}
          {/*  <Badge badgeContent={items.length} color="secondary"> */}
          {/*    <ShoppingCartIcon className={classes.cartIcon} /> */}
          {/*  </Badge> */}
          {/* </IconButton> */}
        </Hidden>
        <Hidden mdUp>
          <div>
            {/* <IconButton color="inherit" onClick={handleDrawerLoginToggle} className={classes.cartIcon}> */}
            {/*  <PersonIcon className={classes.cartIcon} /> */}
            {/* </IconButton> */}
            {/* <IconButton color="inherit" href="/shoppingCart" className={classes.cartIcon}> */}
            {/*  <Badge badgeContent={items.length} color="secondary"> */}
            {/*    <ShoppingCartIcon className={classes.cartIcon} /> */}
            {/*  </Badge> */}
            {/* </IconButton> */}
            <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerToggle}>
              <Menu className={classes.menuIcon} />
            </IconButton>
          </div>
        </Hidden>
      </Toolbar>
      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          classes={{
            paper: classes.drawerPaper
          }}
          onClose={handleDrawerToggle}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            className={classes.closeButtonDrawer}
          >
            <Close />
          </IconButton>
          <div className={classes.appResponsive}>{links}</div>
        </Drawer>
      </Hidden>
      {/* <> */}
      {/*  <Drawer */}
      {/*    variant="temporary" */}
      {/*    anchor="left" */}
      {/*    open={mobileOpen} */}
      {/*    classes={{ */}
      {/*      paper: classes.drawerPaper */}
      {/*    }} */}
      {/*    onClose={handleDrawerToggle} */}
      {/*  > */}
      {/*    <IconButton */}
      {/*      color="inherit" */}
      {/*      aria-label="open drawer" */}
      {/*      onClick={handleDrawerToggle} */}
      {/*      className={classes.closeButtonDrawer} */}
      {/*    > */}
      {/*      <Close /> */}
      {/*    </IconButton> */}
      {/*    <div className={classes.appResponsive}>{links}</div> */}
      {/*  </Drawer> */}
      {/* </> */}
    </AppBar>
  );
}

Header.defaultProp = {
  color: "white"
};

Header.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger", "transparent", "white", "rose", "dark"]),
  links: PropTypes.node,
  brand: PropTypes.string,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  // this will cause the sidebar to change the color from
  // props.color (see above) to changeColorOnScroll.color
  // when the window.pageYOffset is heigher or equal to
  // changeColorOnScroll.height and then when it is smaller than
  // changeColorOnScroll.height change it back to
  // props.color (see above)
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger", "transparent", "white", "rose", "dark"])
      .isRequired
  })
};
