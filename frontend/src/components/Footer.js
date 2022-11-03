export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="contact">
          <h5 className="white-text mt-3">Elérhetőség</h5>
          <p className="phone">
            <a href="tel:+3620-111-1111">
              <i className="bi bi-telephone-fill"></i> Telefonszám: +36 20 111 1111
            </a>
          </p>
          <p className="email">
            <span></span>{" "}
            <a href="mailto: tortavilag@gmail.com">
              {" "}
              <i className="bi bi-envelope-fill"></i> Email cím:
              tortavilag@gmail.com
            </a>{" "}
          </p>
        </div>

        <div className="follow">
          <h5 className="white-text mt-3">Kövess</h5>
          <p className="facebook">
            {" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.facebook.com/tortavilag"
            >
              {" "}
              <i className="bi bi-facebook"></i> Facebookon
            </a>
          </p>
          <p className="email">
            {" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.instagram.com/tortavilag"
            >
              <i className="bi bi-instagram"></i> Instagramon
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
