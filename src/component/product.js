import { Link } from "react-router-dom";
function Product({ id, content }) {
  return (
    <Link to={`/detail/${id}`}>
      <div className="col-md-4">
        <img src={content.url} width="80%" />
        <h4>{content.title}</h4>
        <p>{content.price}</p>
      </div>
    </Link>
  );
}

export default Product;
