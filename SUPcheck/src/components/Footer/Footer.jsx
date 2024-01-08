import "./Footer.scss"

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__description">
        Weather data provided by{" "}
        <a
          href="https://open-meteo.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open-Meteo API
        </a>{" "}
        | Created by   <a
          href="https://www.linkedin.com/in/josyli/"
          target="_blank"
          rel="noopener noreferrer"
        >Josy Li </a>| For educational purposes only
      </p>
    </footer>
  );
}

export default Footer;