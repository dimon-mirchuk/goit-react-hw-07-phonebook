import styles from "./Alert.module.css";

const { alert } = styles;

function Alert() {
  return <div className={alert}>This contact already exist!</div>;
}

export default Alert;
