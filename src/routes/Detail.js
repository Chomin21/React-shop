import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Nav } from "react-bootstrap";
import { addItem } from "./../store.js";
import { useDispatch } from "react-redux";

// import { Context1 } from "../App.js";

// let YellowBtn = styled.button`
//   background: yellow;
//   color: black;
//   padding: 10px;
// `;

// let Box = styled.div`
//   background: grey;
//   padding: 20px;
// `;

function Detail(props) {
  // let { stock } = useContext(Context1);

  let [count, setCount] = useState(0);
  let { id } = useParams();
  let prod = props.shoes.find((x) => x.id == id);
  let [ui, setUi] = useState(true);
  let [nan, setNan] = useState("");
  let [tap, setTap] = useState(0); //탭 저장용. 상태가 3가지이므로 0,1,2
  let [detailPage, setDetailPage] = useState("");
  let dispatch = useDispatch();

  //이 컴포넌트가 실행됐을 때 특정 코드 실행. 최근 본 상품 추가하기.
  useEffect(() => {
    let currentItem = localStorage.getItem("watched");
    currentItem = JSON.parse(currentItem);
    currentItem.push(id);
    currentItem = new Set(currentItem); //중복제거
    localStorage.setItem("watched", JSON.stringify(currentItem));
  }, []);

  useEffect(() => {
    let a = setTimeout(() => {
      setUi(false);
    }, 2000);
    console.log(2);
    return () => {
      console.log(1);
      clearTimeout(a);
    };
  });

  useEffect(() => {
    if (isNaN(nan) == true) {
      alert("그러지마세요");
    }
  }, [nan]);

  useEffect(() => {
    setTimeout(() => setDetailPage("end"), 1000);
  });

  return (
    <div className={`container start ${detailPage}`}>
      {ui == true ? (
        <div className="alert alert-warning">2초 이내 구매 시 할인</div>
      ) : null}

      {count}
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        버튼
      </button>

      {/* {stock} */}
      <div className="row">
        <div className="col-md-6">
          <img src={props.shoes[id].url} width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{prod.title}</h4>
          <p>{prod.content}</p>
          <p>{prod.price}원</p>
          <input
            onChange={(e) => {
              setNan(e.target.value);
            }}
          />
          <button
            className="btn btn-danger"
            onClick={() =>
              dispatch(addItem({ id: prod.id, name: prod.title, count: 1 }))
            }
          >
            주문하기
          </button>
        </div>
      </div>
      <Nav variant="tabs" defaultActivceKey="link0">
        <Nav.Item>
          <Nav.Link onClick={() => setTap(0)} eventKey="link0">
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setTap(1)} eventKey="link1">
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setTap(2)} eventKey="link2">
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tap={tap} shoes={props.shoes} />
      {/* {
        tap ==0?<div>내용0</div>: tap==1?<div>내용1</div>:tap==2?<div>내용2</div>:null:null:null;
      }
       */}
    </div>
  );
}
function TabContent({ tap, shoes }) {
  // if (tap == 0) {
  //   return <div>내용0</div>;
  // } else if (tap == 1) {
  //   return <div>내용1</div>;
  // } else if (tap == 2) {
  //   return <div>내용2</div>;
  // }

  let [fade, setFade] = useState("");
  // let { stock } = useContext(Context1);

  useEffect(() => {
    //감시하다가 tap이 변할때마다 실행.
    setTimeout(() => setFade("end"), 100);
    return () => setFade("");
  }, [tap]);

  return (
    <div className={`start ${fade}`}>
      {[<div>{shoes[0].title}</div>, <div>내용1</div>, <div>내용2</div>][tap]}
    </div>
  );
}

export default Detail;
