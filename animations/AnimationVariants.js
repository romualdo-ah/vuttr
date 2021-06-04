const errorVariant = {
  initial: { opacity: 0,
  },
  animate: { opacity: 1, transition: {delay:.3 },
  x:["0vw","0vw","0vw","0vw","-0.3vw","0.3vw","-0.3vw","0.3vw","-0.3vw","0.3vw","0vw"]
},
  exit: {
    opacity: 0,
    transition: { duration: .3 },
  },
};

const cardVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.15 } },
};

const backdropModal = {
  visible: { opacity: 1 },
  hidden: { opacity: 0, transition: { duration: 0.15 } },
};

const animatedModal = {
  initial: { y: "-100vh" },
  animate: { y: "0vh" },
  exit: {
    y: "-100vh",
    opacity: 0,
  },
};

const headerVariant={
  initial: {opacity:0},
animate:{opacity:1,transition:{duration:.8}}
}

export {
  animatedModal,
  backdropModal,
  cardVariant,
  errorVariant,
  headerVariant
};
