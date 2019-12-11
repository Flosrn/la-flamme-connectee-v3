/* eslint import/no-absolute-path:0 */
import React, { useEffect } from "react";
import Link from "next/link";
// nodejs library that concatenates classes
import clsx from "clsx";
// @material-ui/core
import { Typography, Avatar, IconButton } from "@material-ui/core";
// @material-ui/icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// core components
import Header from "components/Header/Header";
import GridItem from "components/Grid/GridItem";
import Button from "components/CustomButtons/Button";
import HeaderLinks from "components/Header/HeaderLinks";
import Parallax from "components/Parallax/Parallax";
import FooterCustom from "components/Footer/FooterCustom";
import GridContainer from "components/Grid/GridContainer";
import MediaSvg from "components/Media/MediaSvg";
// sections
import PresentationSection from "src/sections/HomePage/PresentationSection";
import CarouselSection from "src/sections/HomePage/CarouselSection";
// images
import backgroundImage from "public/img/flamco/flamco-main-dark.jpg";
import logo from "public/img/logo/laflammeco.png";
// import lepine from "public/img/logo/lepine-double.png";
import lepine from "public/img/logo/lepine-black.png";

import svg from "public/img/svg/undraw_smart_home_28oy.svg";
// style for this page
import { useStyles } from "public/jss/la-flamme-connectee/views/homePage";
import svg3 from "public/img/svg/undraw_team_page_pgpr.svg";
import VideoCover from "components/Video/VideoCover";
import ModalVideo from "react-modal-video";
import ProjectSection from "../src/sections/HomePage/ProjectSection";
import TeamSection from "../src/sections/HomePage/TeamSection";

import { authInitialProps } from "../server/api/auth";
import FooterDark from "../components/Footer/FooterDark";
import ProductSection from "../src/sections/HomePage/ProductSection";
import VideoSection from "../src/sections/HomePage/VideoSection";
import ButtonCustom from "../components/CustomButtons/ButtonCustom";

const isServer = typeof window === "undefined";
const WOW = !isServer ? require("wow.js") : null;

function HomePage({ currentUser, isLoggedIn }) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  useEffect(() => {
    new WOW().init();
  });

  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const scrollTo = (element, to, duration) => {
    const start = element.scrollTop;
    const change = to - start + document.getElementById("main-panel").offsetTop;
    let currentTime = 0;
    const increment = 20;

    const animateScroll = () => {
      currentTime += increment;
      const val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  };

  const smoothScroll = target => {
    const targetScroll = document.getElementById(target);
    scrollTo(document.documentElement, targetScroll.offsetTop, 900);
  };

  return (
    <div className={classes.root}>
      <Header
        color="transparent"
        links={<HeaderLinks user={currentUser} isLoggedIn={isLoggedIn} />}
        fixed
        user={currentUser}
        isLoggedIn={isLoggedIn}
        hiddenLogo
        changeColorOnScroll={{
          height: 150,
          color: "dark",
          navColor: "black"
        }}
      />
      <VideoCover>
        <div className={classes.containerBackground}>
          <div className={classes.titleContainer}>
            <GridItem xs={12} sm={12} md={12} className={classes.gridItem} id="title">
              <Typography variant="h1" align="center" className={classes.title}>
                La Flamme Connectée
              </Typography>
              <Avatar alt="Logo" src={logo} className={classes.logo} />
              <Typography variant="h3" align="center" className={classes.subtitle}>
                Allumez votre poêle ou insert à distance
              </Typography>
              <ButtonCustom color="danger" className={classes.buttonPlay} animateButton onClick={() => setOpen(true)}>
                <i className="fas fa-play" />
                Découvrir en vidéo
              </ButtonCustom>
              <ModalVideo channel="youtube" isOpen={open} videoId="gQ0yT21CaN8" onClose={() => setOpen(false)} />
            </GridItem>
          </div>
        </div>
      </VideoCover>
      <div className={clsx(classes.main, classes.mainRaised)} id="main-panel">
        <div className={classes.scrollDownContainer}>
          <IconButton className={classes.scrollDownButton} onClick={() => smoothScroll("presentation")}>
            <ExpandMoreIcon fontSize="large" className={classes.arrowButton} />
          </IconButton>
        </div>
        <div className={classes.container}>
          <PresentationSection />
          <ProductSection />
          <GridContainer justify="center">
            <GridItem center className="wow fadeInUp">
              <MediaSvg src={svg} alt="smart-home" size="medium" animateUp />
            </GridItem>
          </GridContainer>
          <GridContainer justify="center" className={classes.bottom}>
            <GridItem center className="wow fadeInUp">
              <Typography variant="subtitle1" align="center">
                Pour en savoir plus, consultez nos pages{" "}
                <Link href="/documentation">
                  <a>Documentation</a>
                </Link>{" "}
                et{" "}
                <Link href="/products">
                  <a>Produits</a>
                </Link>
              </Typography>
            </GridItem>
          </GridContainer>
        </div>
        {/* <MediaSvg src={svg3} alt="about-us" size="medium" mb={0} /> */}
        <TeamSection />
        <ProjectSection />
        <CarouselSection />
      </div>
      <FooterDark />
    </div>
  );
}

HomePage.getInitialProps = async ctx => {
  const { currentUser } = await authInitialProps(ctx);
  const isLoggedIn = Object.keys(currentUser).length !== 0;
  return { currentUser, isLoggedIn };
};

export default HomePage;
