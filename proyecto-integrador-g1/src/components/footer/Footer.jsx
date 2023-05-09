import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../module/Footer.module.css";
import { UsuarioContext } from "../utils/context/usuarioContext";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <p>Copyright © 2023</p>
      <span className={styles.containerLogo}>
        <a href="#">
          <img src="/images/logos/FacebookIcon.png" alt="Sep" />
        </a>
        <a href="#">
          <img src="/images/logos/LinkedInIcon.png" alt="Sep" />
        </a>
        <a href="#">
          <img src="/images/logos/TwitterIcon.png" alt="Sep" />
        </a>
        <a href="#">
          <img src="/images/logos/InstagramIcon.png" alt="Sep" />
        </a>
      </span>
    </div>
  );
};

export default Footer;
