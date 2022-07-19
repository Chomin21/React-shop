import { Link } from "react-router-dom";
function Product({ id, content }) {
  // localStorage.setItem('watched',J)

  let currentItem = JSON.parse(localStorage.getItem("watched"));
  currentItem.push(id);

  localStorage.setItem("watched", JSON.stringify(currentItem));
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
