import styles from "../module/MailList.module.css"

const MailList = () => {
  return (
    <div className={styles.mail}>
      <h2 className={styles.mailTitle}>¡Ahorra tiempo y dinero!</h2>
      <span>Suscribete y te enviaremos las mejores ofertas</span>
      <form className={styles.mailInputContainer}>
        <input type="text" placeholder="ejemplo@gmail.com" />
        <button className={styles.mailButton}>Enviar</button>
      </form>
    </div>
  );
}

export default MailList