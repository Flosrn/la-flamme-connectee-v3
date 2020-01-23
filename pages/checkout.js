import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import validate from "validate.js";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "src/store/store";
import { CardContent, CardHeader, Divider } from "@material-ui/core";
import svg1 from "public/img/svg/undraw_delivery_address_03n0.svg";
import svg2 from "public/img/svg/undraw_mail1_uab6.svg";
import svg3 from "public/img/svg/undraw_deliveries_131a.svg";
import { createCheckoutSession } from "api/apiRequests";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "next/link";
import HeaderLinks from "../components/Header/HeaderLinks";
import Header from "../components/Header/Header";
import FooterDark from "../components/Footer/FooterDark";
import CheckoutStepper from "../components/Steppers/CheckoutStepper";
import GridContainer from "../components/Grid/GridContainer";
import Card from "../components/Card/Card";
import GridItem from "../components/Grid/GridItem";
import MediaSvg from "../components/Media/MediaSvg";
import { schema } from "../src/sections/SettingsPage/Address/components/AddressForm/AddressFormSchema";
import AddressForm from "../src/sections/Checkout/AddressForm";
import { ShoppingCartContext } from "../src/contexts/ShoppingCartContext";
import { withAuthSync } from "../api/withAuth";
import SummaryItems from "../src/sections/Checkout/SummaryItems";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 100
  },
  gridItem: {
    display: "flex",
    justifyContent: "center"
  },
  gridContent: {
    width: "100%",
    [theme.breakpoints.down("md")]: {
      marginTop: 30
    }
  },
  formControl: {
    margin: theme.spacing(3)
  }
}));

// DELIVERY COMPONENT
function DeliveryMethod({ value, changeHandler }) {
  const classes = useStyles();
  return (
    <GridContainer justifycontent="center">
      <GridItem xl={6} className={classes.gridItem}>
        <MediaSvg src={svg1} size="medium" />
      </GridItem>
      <GridItem xl={6} className={classes.gridItem}>
        <div className={classes.gridContent}>
          <div>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Sélectionnez une méthode de livraison</FormLabel>
              <RadioGroup aria-label="deliveryMethod" name="deliveryMethod" value={value} onChange={changeHandler}>
                <FormControlLabel value="home" control={<Radio />} label="Livraison à mon domicile" />
                <FormControlLabel value="relay" control={<Radio />} label="Livraison en point relais" />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      </GridItem>
    </GridContainer>
  );
}

// ADDRESS COMPONENT
function Address({ values, value, changeHandler, submitHandler, hasError, errors }) {
  const classes = useStyles();
  return (
    <GridContainer justifycontent="center">
      <GridItem xl={6} className={classes.gridItem}>
        <MediaSvg src={svg2} size="medium" />
      </GridItem>
      <GridItem xl={6} className={classes.gridItem}>
        <div className={classes.gridContent}>
          <AddressForm
            values={values}
            value={value}
            changeHandler={changeHandler}
            submitHandler={submitHandler}
            hasError={hasError}
            errors={errors}
          />
        </div>
      </GridItem>
    </GridContainer>
  );
}

// SUMMARY COMPONENT
function Summary({ checked, changeHandler }) {
  const classes = useStyles();
  const user = useSelector(state => state.user);
  const { items, total } = useContext(ShoppingCartContext);
  return (
    <GridContainer justifycontent="center">
      <GridItem xl={6} className={classes.gridItem}>
        <MediaSvg src={svg3} size="medium" />
      </GridItem>
      <GridItem xs={12} xl={6} className={classes.gridItem}>
        <div className={classes.gridContent}>
          <CardHeader title="Votre panier :" />
          <Divider />
          <CardContent className={classes.cardContent}>
            <SummaryItems items={items} total={total} />
          </CardContent>
          <CardHeader title="Votre Adresse :" />
          <Divider />
          <CardContent className={classes.cardContent}>
            <p>
              <strong>
                {" "}
                {user.address.firstName} {user.address.lastName}
              </strong>
            </p>
            <p>{user.address.street1}</p>
            <p>
              {user.address.zip} {user.address.city}
            </p>
          </CardContent>
          <CardHeader title="Conditions générales d'utilisation :" />
          <Divider />
          <CardContent className={classes.cardContent}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox checked={checked} onChange={changeHandler} value="checked" style={{ color: "#FF8A73" }} />
                }
                label={
                  <span>
                    Je reconnais avoir pris connaissance des
                    <Link href="/terms-of-sales">
                      <a target="_blank"> CGU / CGV</a>
                    </Link>
                  </span>
                }
              />
            </FormGroup>
          </CardContent>
        </div>
      </GridItem>
    </GridContainer>
  );
}

// CHECKOUT PAGE
function CheckoutPage({ currentUser }) {
  const [stripe, setStripe] = useState(null);
  const [values, setValues] = useState({});
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isError, setError] = useState(false);
  const [isEmpty, setEmpty] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState("home");
  const { items, total } = useContext(ShoppingCartContext);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const classes = useStyles();

  // ========== DATA FETCHING ========== //

  // process.env.NODE_ENV === "development" ? process.env.STRIPE_PUBLIC_KEY_TEST : process.env.STRIPE_PUBLIC_KEY

  useEffect(() => {
    setStripe(window.Stripe(process.env.STRIPE_PUBLIC_KEY));
    setValues(currentUser);
  }, [currentUser]);

  // ========== CHANGE HANDLERS ========== //

  const handleAddressChange = event => {
    setValues({
      ...values,
      address: {
        ...values.address,
        [event.target.name]: event.target.value
      }
    });
    setTouched({
      ...touched,
      [event.target.name]: true
    });
  };

  const handleRadioChange = event => {
    setValue(event.target.value);
  };

  // ========== SUBMIT HANDLER ========== //

  const handleStore = () => {
    dispatch(setUser(values));
  };

  const handleSubmit = async () => {
    setLoading(true);
    createCheckoutSession({ values, currentUser, items, stripe, setLoading });
  };

  // ========== FORM VALIDATION ========== //

  useEffect(() => {
    if (values.address) {
      const errors = validate(values.address, schema);
      setErrors(errors || {});
    }
  }, [values]);

  const hasError = field => !!(touched[field] && errors[field]);

  useEffect(() => {
    if (hasError("firstName") || hasError("lastName") || hasError("street1") || hasError("zip") || hasError("city")) {
      setError(true);
    } else {
      setError(false);
    }
  }, [errors]);

  return (
    <div className={classes.root}>
      <Header color="dark" links={<HeaderLinks user={currentUser} />} fixed user={currentUser} />
      <GridContainer className={classes.container}>
        <GridItem sm={8} md={8}>
          <Card>
            <CheckoutStepper
              submitHandler={handleSubmit}
              storeHandler={handleStore}
              isError={isError}
              address={values.address}
              checked={checked}
              components={[
                <DeliveryMethod value={value} changeHandler={handleRadioChange} />,
                <Address
                  values={values}
                  value={value}
                  changeHandler={handleAddressChange}
                  submitHandler={handleSubmit}
                  hasError={hasError}
                  errors={errors}
                />,
                <Summary checked={checked} changeHandler={() => setChecked(!checked)} />
              ]}
            />
          </Card>
        </GridItem>
      </GridContainer>
      <FooterDark />
    </div>
  );
}

CheckoutPage.getInitialProps = () => {
  return { isProtect: true };
};

export default withAuthSync(CheckoutPage);
