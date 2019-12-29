import React from "react";
// nodejs library to set properties for components
// react components for routing our app without refresh
import Link from "next/link";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
// import Button from "@material-ui/core/Button";

// @material-ui/icons
import Home from "@material-ui/icons/Home";
import Description from "@material-ui/icons/Description";
import Mail from "@material-ui/icons/Mail";
import ExitToApp from "@material-ui/icons/ExitToApp";
import DownloadIcon from "@material-ui/icons/CloudDownload";
import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import AssignmentInd from "@material-ui/icons/AssignmentInd";
import AccountCircle from "@material-ui/icons/AccountCircle";
import HelpIcon from "@material-ui/icons/Help";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown";
import Button from "components/CustomButtons/Button";

import styles from "public/jss/la-flamme-connectee/components/headerLinksStyle";

// contexts
import ButtonLink from "../CustomButtons/ButtonLink";

const useStyles = makeStyles(styles);

export default function HeaderLinks({ ...props }) {
  const { dropdownHoverColor } = props;
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button component={ButtonLink} href="/" className={classes.navLink} color="transparent">
          <Home className={classes.icons} /> Accueil
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button component={ButtonLink} href="/products" className={classes.navLink} color="transparent">
          <ShoppingBasketIcon className={classes.icons} /> Produits
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          hoverColor={dropdownHoverColor}
          buttonText="En savoir plus"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={HelpIcon}
          dropdownList={[
            <Link href="/documentation">
              <a className={classes.dropdownLink}>
                <Description className={classes.dropdownIcons} /> Documentation
              </a>
            </Link>,
            <Link href="/download">
              <a className={classes.dropdownLink}>
                <DownloadIcon className={classes.dropdownIcons} /> Téléchargement
              </a>
            </Link>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button component={ButtonLink} href="/contact" className={classes.navLink} color="transparent">
          <Mail className={classes.icons} /> Contact
        </Button>
      </ListItem>
    </List>
  );
}

HeaderLinks.defaultProps = {
  hoverColor: "primary"
};
