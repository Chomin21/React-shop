import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName, changeAge, changeCnt, deleteProduct } from "./../store.js";

function Cart() {
  let state = useSelector((state) => state);
  let cart = useSelector((state) => state.cart);
  let dispatch = useDispatch();

  return (
    <div>
      <h6>
        {/* {state.user.name}
        {state.user.age}의 장바구니 */}
      </h6>
      <button onClick={() => dispatch(changeAge())}>버튼</button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((value, i) => (
            <tr key={i}>
              <td>{cart[i].id}</td>
              <td>{cart[i].name}</td>
              <td>{cart[i].count}</td>
              <td>안녕</td>
              <td>
                <button onClick={() => dispatch(changeCnt(cart[i].id))}>
                  +
                </button>
              </td>
              <td>
                <button onClick={() => dispatch(deleteProduct(cart[i].id))}>
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
