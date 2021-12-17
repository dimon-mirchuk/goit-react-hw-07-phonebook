import { ToastContainer } from "react-toastify";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ContactAddForm from "./ContactAddForm";
import ContactList from "./ContactList";
import Filter from "./Filter";
import Container from "./Container";
import { CSSTransition } from "react-transition-group";
import titleAnimation from "../Transitions/title.module.css";
import alertAnimation from "../Transitions/alert.module.css";
import pop from "../Transitions/pop.module.css";
import { useSpring, animated } from "react-spring";
import Alert from "./Alert";

function App() {
  const [visible, setVisible] = useState(false);

  const changeVisible = (boolean) => {
    setVisible(boolean);
  };

  const [flip, set] = useState(false);
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: true,
    reverse: flip,
    delay: 200,
    onRest: () => set(!flip),
  });
  return (
    <Container>
      <CSSTransition
        timeout={100}
        classNames={alertAnimation}
        in={visible}
        unmountOnExit
      >
        <Alert />
      </CSSTransition>
      <CSSTransition timeout={100} classNames={titleAnimation} in appear>
        <animated.h1 style={props}>Phonebook</animated.h1>
      </CSSTransition>

      <ToastContainer />
      <ContactAddForm changeVisible={changeVisible} />
      <animated.h2 style={props}>Contacts</animated.h2>
      <CSSTransition timeout={100} classNames={pop} in appear>
        <Filter />
      </CSSTransition>
      <ContactList />
    </Container>
  );
}

export default App;
