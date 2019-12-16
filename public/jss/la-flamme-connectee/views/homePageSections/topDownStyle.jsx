import { title } from "public/jss/la-flamme-connectee";
import makeStyles from "@material-ui/core/styles/makeStyles";

export const useStyles = makeStyles(theme => ({
  section: {
    textAlign: "center"
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  description: {
    color: "#999",
    marginLeft: "50px",
    marginRight: "50px",
    textAlign: "justify",
    [theme.breakpoints.down("xs")]: {
      marginLeft: "15px",
      marginRight: "15px"
    }
  },
  gridImg: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  topDownImg: {
    width: "95%",
    margin: "20px 0",
    [theme.breakpoints.up("lg")]: {
      width: "85%"
    },
    [theme.breakpoints.down("xs")]: {
      maxHeight: "300px"
    }
  },
  gridItemBottom: {
    marginBottom: "80px"
  }
}));
