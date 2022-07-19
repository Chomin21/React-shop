import "./App.css";
import data from "./data.js";
import Product from "./component/product";
import Detail from "./routes/Detail";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useState, createContext, useEffect } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import Cart from "./routes/Cart.js";
import { useQuery } from "react-query";

export let Context1 = createContext(); //state 보관함

function App() {
  //접속을 처음에 하면 useEffect안 코드 실행.
  //새로고침 하면 비워짐.
  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify([]));
  });

  let [shoes, setShoes] = useState(data);
  let [stock, setStock] = useState([10, 11, 12]);

  let navigate = useNavigate();
  let [btnCnt, setBtnCnt] = useState(1);

  const result = useQuery(["작명"], () =>
    axios.get(`https://codingapple1.github.io/userdata.json`).then((a) => {
      console.log("요청됨");
      return a.data;
    })
  );

  return (
    <div className="App">
      <Navbar expand="lg" className="clr" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to="/">Mogu-Market</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/">홈</Link>
              <Nav.Link
                onClick={() => {
                  navigate("/detail");
                  // navigate("/event/one");
                }}
              >
                Detail
              </Nav.Link>
              <Nav.Link href="#link">SHOES</Nav.Link>
              <NavDropdown title="My Page" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  <Link to="/cart">장바구니</Link>
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Log-out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Nav className="ms-auto" style={{ color: "white" }}>
          {result.isLoading ? "로딩중" : result.data.name}
        </Nav>
        .
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>
              <hr />
              <div className="container">
                <div className="row">
                  {shoes.map((value, i) => {
                    return <Product key={i} id={value.id} content={value} />;
                  })}
                </div>
              </div>

              <button
                onClick={() => {
                  //로딩중 UI 띄우기~
                  // setBtnCnt(btnCnt + 1);
                  // btnCnt == 3?
                  console.log(btnCnt);
                  axios
                    .get(`https://codingapple1.github.io/shop/data2.json`)
                    .then((result) => {
                      console.log(result.data);

                      let copy = [...shoes, ...result.data];
                      setShoes(copy);
                      //로딩중 ui숨기기~
                    })
                    .catch(() => {
                      //로딩중 ui숨기기~
                      console.log("실패함 ㅅㄱ");
                    });
                }}
              >
                더보기
              </button>
            </>
          }
        />
        <Route
          path="/detail/:id"
          element={
            <Context1.Provider value={{ stock }}>
              <Detail shoes={shoes} />
            </Context1.Provider>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
        </Route>
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  );
}
function About() {
  return (
    <div>
      <h4>회사정보임</h4>
    </div>
  );
}
export default App;
