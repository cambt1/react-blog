import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  let post = "강남 우동 맛집";
  let [글제목, 글제목변경함수] = useState([
    "남자 코트 추천",
    "여자 코트 추천",
    "가방 추천",
  ]);
  let [따봉, 따봉변경함수] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  //지금 누른 글 제목이 모달창 안에 뜨게 하려면
  let [title, setTitle] = useState(0);
  let [입력값, 입력값변경] = useState("");

  let 따봉증가 = () => {
    return 따봉변경함수(따봉 + 1);
  };
  const 글제목변경 = () => {
    // 글제목변경함수(["여자 코트 추천", "여자 코트 추천", "가방 추천"]);
    // 글제목[0] = "여자 코트 추천"; //원본 수정
    let copy = [...글제목]; //복사본 생성 및 새로운 state 생성
    copy[0] = "여자코트 추천";
    console.log(copy == 글제목); //true나오면 state변경 안됨, 달라야 재랜더링
    글제목변경함수(copy);
  };

  const test = [1, 2, 3].map((a) => {
    console.log(a);
    return "111";
  });
  console.log(test); //['111', '111', '111']

  return (
    <div className="App">
      <div className="black-nav">
        <h4 id={post} style={{ color: "white", fontSize: "16px" }}>
          ReactBlog
        </h4>
      </div>
      <button
        onClick={() => {
          let sort = [...글제목];
          console.log(sort == 글제목);
          글제목변경함수(sort.sort());
        }}
      >
        가나다순 정렬
      </button>
      <button onClick={글제목변경}>글수정</button>

      {글제목.map((글제목요소, i) => {
        return (
          <div className="list" key={i}>
            <h4
              onClick={() => {
                setModal(!modal);
                setTitle(i);
              }}
            >
              {/* {글제목요소} */}
              {글제목[i]}
              {/* <span onClick={따봉증가}> 👍</span> {따봉} */}
              <span
                onClick={(e) => {
                  // 클릭이벤트는 상위html로 퍼짐(이벤트 버블링)
                  //이벤트버블링(전파 중지) 막고 싶으면
                  e.stopPropagation();
                  let copy = [...따봉];
                  copy[i] = copy[i] + 1;
                  따봉변경함수(copy);
                }}
              >
                👍
              </span>{" "}
              {따봉[i]}
            </h4>
            <p>2월 17일 발행</p>
            <button
              onClick={() => {
                let copy = [...글제목];
                copy.splice(i, 1);
                글제목변경함수(copy);
              }}
            >
              삭제
            </button>
          </div>
        );
      })}

      <input
        type="text"
        // input에 입력한 값 가져오기
        onChange={(e) => {
          입력값변경(e.target.value);
          //state변경함수는 늦게 처리됨
          console.log(입력값);
        }}
      ></input>
      <button
        onClick={() => {
          let copy = [...글제목];
          copy.unshift(입력값);
          글제목변경함수(copy);
        }}
      >
        글발행
      </button>

      {/* <button onClick={() => setTitle(0)}>글제목0</button>
      <button onClick={() => setTitle(1)}>글제목0</button>
      <button onClick={() => setTitle(2)}>글제목0</button> */}

      {/* {[1, 2, 3].map(() => {
        return <div>안녕</div>;
      })} */}
      {/* [<div>안녕</div>,<div>안녕</div>,<div>안녕</div>] */}
      {/* <button
        onClick={() => {
          setModal(true);
        }}
      >
        모달창
      </button> */}
      {modal ? (
        <Modal
          subject={글제목}
          color={"skyblue"}
          글제목변경={글제목변경}
          title={title}
        />
      ) : (
        ""
      )}
    </div>
  );
}

const Modal = (props) => {
  return (
    <div className="modal" style={{ background: props.color }}>
      {/* 저 title state가 0이면 props.글제목[0] */}
      <h4>{props.subject[props.title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={props.글제목변경}>글수정</button>
    </div>
  );
};

export default App;
