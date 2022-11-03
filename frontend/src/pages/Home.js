export default function Home() {
  return (
    <div className="home-container mb-5">
      <div className="home-cover cover">
        <div className="home-cover-rgba cover">
          <div className="home-logo align-middle mx-auto d-flex flex-column justify-content-center">
            <h1> Torta</h1>
            <img
              className="logo  mx-auto"
              src={`${process.env.PUBLIC_URL}/assets/5622508.jpg`}
              alt="logo"
            />
            <h2>világ</h2>
          </div>
        </div>
      </div>

      <div className="home-content">
        <div className="introduce">
          <h1 className="my-5">Rólam</h1>
          <p>
            Szívvel-lélekkel készült sütemények minőségi alapanyagokból,
            adalékanyag mentesen. Ahol az édes álmok valóra válnak.
          </p>
          <h1 className="my-5">Rendelés</h1>

          <p>Rendelni csak regisztrációt követően tudsz.</p>
          <p>Csak személyes átvétel lehetséges cukrászműhelyemben. Átvételekor készpénzzel tudsz fizetni.</p>
          <p>Cím: 1134 Budapest Lehel utca 5.</p>
          <p>Nyitvatartás: Hétfőtől-Vasárnapig: 10-18 </p>

          <p>
            Megrendeléskor kérlek tüntesd fel, hogy melyik nap szeretnéd átvenni
            a tortát.
          </p>
        </div>
      </div>
    </div>
  );
}
