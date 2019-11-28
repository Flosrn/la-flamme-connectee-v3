import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { CardContent, CardActions, Avatar, Typography } from "@material-ui/core";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import flo from "public/img/faces/Florian.jpg";
import CardAvatar from "components/Card/CardAvatar";
import CardFooter from "components/Card/CardFooter";
import Box from "@material-ui/core/Box";
import GridItem from "components/Grid/GridItem";
import PictureUpload from "components/CustomUpload/PictureUpload";
import GridContainer from "components/Grid/GridContainer";
import CircularProgress from "@material-ui/core/CircularProgress";
import svg1 from "public/img/svg/undraw_personal_info_0okl.svg";
import MediaSvg from "../../../../../../components/Media/MediaSvg";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(5)
    }
  },
  pictureText: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(1)
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(5),

    marginLeft: theme.spacing(-4)
  },
  name: {
    marginTop: theme.spacing(1)
  },
  avatar: {
    height: 100,
    width: 100
  },
  footer: {
    display: "flex",
    justifyContent: "center"
  },
  progress: {
    margin: theme.spacing(2),
    width: "50%",
    color: theme.palette.secondary.main
  }
}));

function ProfileDetails({ profile, isLoading }) {
  const classes = useStyles();
  return (
    <GridContainer alignItems="center" justify="center">
      <GridItem className={classes.root} xs={8} sm={12} md={6}>
        <MediaSvg src={svg1} size="large" />
      </GridItem>
      <GridItem xs={12} sm={12} md={6} className={classes.content}>
        {/* <CardContent> */}
        {isLoading ? (
          <CircularProgress className={classes.progress} />
        ) : (
          <div>
            <Typography className={classes.name} gutterBottom variant="h5">
              {profile.firstName} {profile.lastName}
            </Typography>

            <Typography color="textSecondary" variant="body1">
              {profile.email}
            </Typography>
          </div>
        )}

        {/* )} */}
        <Typography color="textSecondary" variant="body1">
          {profile.role !== "user" ? profile.role : null}
        </Typography>
        {/* </CardContent> */}
      </GridItem>
    </GridContainer>
  );
}

ProfileDetails.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object.isRequired
};

export default ProfileDetails;
