import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/styles";
import { Typography, Divider, Avatar, Button } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import LockOutlined from "@material-ui/icons/LockOutlined";

import stove from "public/img/contura/contura2.jpg";

import Page from "components/Page";
import gradients from "utils/gradients";
import LoginForm from "src/sections/LoginPage/components/LoginForm";
// import Card from "components/Card/Card";
import { blackColor, hexToRgb } from "public/jss/la-flamme-connectee";
import CardBody from "components/Card/CardBody";
import GridContainer from "components/Grid/GridContainer";
import Card from "components/Card/Card";
import GridItem from "components/Grid/GridItem";
import LoginForgotPasswordForm from "src/sections/LoginPage/components/LoginForm/LoginForgotPasswordForm";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import CardContent from "@material-ui/core/CardContent";
import redirectTo from "src/lib/redirectTo";
import getHost from "server/api/get-host";
import ButtonLink from "../../../../../components/CustomButtons/ButtonLink";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
    width: "100%",
    // position: "fixed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // background: `url(${stove}) no-repeat center center fixed`,
    // backgroundSize: "cover",
    // overflow: "hidden",
    padding: theme.spacing(6, 2)
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      marginTop: 400
    }
  },
  card: {
    height: 450
  },
  content: {
    padding: theme.spacing(8, 4, 3, 4)
  },
  contentRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    backgroundImage: gradients.green,
    color: theme.palette.white,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    position: "absolute",
    top: -32,
    left: theme.spacing(3),
    height: 64,
    width: 64,
    fontSize: 32
  },
  loginForm: {
    marginTop: theme.spacing(3)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "underline",
    "&:hover": {
      color: theme.palette.primary.light,
      textDecoration: "underline"
    }
  },
  textDescription: {
    textAlign: "center"
  },
  submitButton: {
    marginTop: theme.spacing(2)
    // width: "100%"
  }
}));

function LoginComponent({ clickHandler }) {
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isForgot, setForgot] = useState(false);
  const Router = useRouter();

  const handleChange = value => event => {
    value === "email" && setEmail(event.target.value);
    value === "password" && setPassword(event.target.value);
  };

  const handleSubmit = type => event => {
    event.preventDefault();
    setLoading(true);
    axios.post(`${getHost()}/auth/${type}`, { email, password }).then(response => {
      Swal.fire({
        type: response.data.status,
        title: response.data.message,
        text: response.data.text,
        confirmButtonColor: "#ff7961"
      }).then(result => {
        if (response.data.status === "success" && result.value) {
          const cart = Cookies.getJSON("cart");
          if (cart.length > 0) {
            Router.push("/shoppingCart").then(() => window.scrollTo(0, 0));
          } else {
            Router.push("/").then(() => window.scrollTo(0, 0));
          }
        }
      });
      if (response.data.status === "success" && type !== "forgotPassword") {
        Cookies.set("token", response.data.data.token, {
          expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000)
        });
      }
    });
    setLoading(false);
  };

  return (
    <CardBody className={classes.content}>
      {!isForgot ? <LockIcon className={classes.icon} /> : <LockOutlined className={classes.icon} />}
      {!isForgot ? (
        <>
          <Typography gutterBottom variant="h4">
            Connexion
          </Typography>
          <Typography variant="subtitle2">Connectez vous au site La Flamme Connectée</Typography>
          <LoginForm
            className={classes.loginForm}
            email={email}
            password={password}
            changeHandler={handleChange}
            submitHandler={handleSubmit}
            isLoading={isLoading}
            clickHandler={() => setForgot(!isForgot)}
          />
        </>
      ) : (
        <>
          <Typography gutterBottom variant="h4">
            Mot de passe oublié
          </Typography>
          <Typography variant="subtitle2">Recevez un nouveau mot de passe</Typography>
          <LoginForgotPasswordForm
            className={classes.loginForm}
            email={email}
            changeHandler={handleChange}
            submitHandler={handleSubmit}
            isLoading={isLoading}
            clickHandler={() => setForgot(!isForgot)}
          />
        </>
      )}
      <Divider className={classes.divider} />
      <Link href={{ pathname: "/login", query: { action: "register" } }}>
        <a className={classes.link}>Vous n'avez pas encore de compte ? Inscrivez vous</a>
      </Link>
    </CardBody>
  );
}

export default LoginComponent;