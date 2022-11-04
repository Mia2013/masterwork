import BuyProduct from "./BuyProduct";

export default function CakeBox({ id, name, description, price, allergenic }) {
  return (
    <div className="box">
      <h3 className="ms-5">{name}</h3>
      <img src={`${process.env.PUBLIC_URL}/assets/cakes/${name}.jpg`} alt="" />

      <div className="content">
        <p className="description">{description}</p>

        <BuyProduct id={id} price={price} />
      </div>
      <details className="text-start ms-5">
        <summary>Allergének</summary>
        <p className="description2">{allergenic}</p>
      </details>
    </div>
  );
}
