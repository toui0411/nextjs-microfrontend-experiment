import { FunctionComponent } from "react";
import styles from "./styles.module.css";

interface App2MessageProps {
  message: string;
}

const App2Message: FunctionComponent<App2MessageProps> = ({ message }) => {
  return (
    <section className={styles.container}>
      <p>{message} from App 2!</p>
    </section>
  );
};

export default App2Message;
