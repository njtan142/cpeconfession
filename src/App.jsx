import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import styled from "styled-components";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [sendForm, setSendForm] = useState(false);

  return (
    <>
      <Container>
        <Instructions>
          <p>
            Share your confessions <b>anonymously</b>!
          </p>
          <p>
            Your messages will be published on <b>February 14</b>—no names, no
            identities (unless you choose to reveal yourself or use a fun
            nickname!).
          </p>
          <p>
            Let your feelings shine this <b>Valentine's Day</b> and spread the
            love! 💕 or or
          </p>
        </Instructions>
        <Envelope>
          <EnTop className={showForm ? "flap" : ""}>
            <svg
              viewBox="0 0 814 252"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M394.945 3.30881C402.496 -0.642854 411.504 -0.642864 419.055 3.3088L799.138 202.214C823.216 214.814 814.259 251.25 787.083 251.25H26.9173C-0.258957 251.25 -9.21649 214.814 14.862 202.214L394.945 3.30881Z"
                fill="#F99BB6"
              />
            </svg>
          </EnTop>
          <EnLeft>
            <svg
              viewBox="0 0 402 427"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M388.061 190.566C406.395 200.359 406.395 226.641 388.061 236.434L38.7489 423.001C21.4297 432.251 0.5 419.702 0.5 400.067L0.5 26.9329C0.5 7.29815 21.4297 -5.25121 38.749 3.999L388.061 190.566Z"
                fill="#FBFBFBFF"
              />
            </svg>
          </EnLeft>
          <EnRight>
            <svg
              viewBox="0 0 402 427"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M388.061 190.566C406.395 200.359 406.395 226.641 388.061 236.434L38.7489 423.001C21.4297 432.251 0.5 419.702 0.5 400.067L0.5 26.9329C0.5 7.29815 21.4297 -5.25121 38.749 3.999L388.061 190.566Z"
                fill="#FBFBFBFF"
              />
            </svg>
          </EnRight>
          <EnBottom>
            <svg
              viewBox="0 0 814 252"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M394.945 3.30881C402.496 -0.642854 411.504 -0.642864 419.055 3.3088L799.138 202.214C823.216 214.814 814.259 251.25 787.083 251.25H26.9173C-0.258957 251.25 -9.21649 214.814 14.862 202.214L394.945 3.30881Z"
                fill="#F99BB6"
              />
            </svg>
          </EnBottom>
          <LoveLetter
            className={showForm ? "form" : sendForm ? "formsent" : ""}
          ></LoveLetter>
          <ActionButton
            onClick={() => {
              if (!showForm) {
                setShowForm(true);
              } else if (!sendForm) {
                setSendForm(true);
                setShowForm(false);
                console.log("send");
              }
            }}
          >
            {showForm ? "Send" : "Start"}
          </ActionButton>
        </Envelope>
      </Container>
    </>
  );
}

export default App;

const ActionButton = styled.button`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  bottom: 1em;
  z-index: 500;
`;

const LoveLetter = styled.div`
  width: 80%;
  height: 400px;
  position: absolute;
  background-color: green;
  background: linear-gradient(to bottom, #f9f7f7, #f9f7f7, #f5c3c6);
  left: 50%;
  bottom: 40%;
  transform: translate(-50%, -1000%);
  transition: transform 2s ease-in-out, height 1s ease-in-out, z-index 2s ease-in-out;
  border-radius: 10px;
  z-index: 80;
`;

const EnRight = styled.div`
  position: absolute;
  height: min-content;
  top: 50%;
  left: 50%;
  transform: translate(-5%, -50%);
  svg {
    transform: rotate(180deg);
    width: 105%;
    height: 100%;
  }
  z-index: 100;
`;

const EnLeft = styled.div`
  position: absolute;
  height: min-content;
  top: 50%;
  left: 50%;
  transform: translate(-100%, -50%);
  svg {
    /* transform: rotate(180deg); */
    width: 105%;
    height: 100%;
  }
  z-index: 100;
`;

const EnTop = styled.div`
  position: absolute;
  top: -0px;
  height: min-content;
  width: 100%;
  z-index: 200;
  svg {
    transform: rotate(180deg);
    width: 100%;
    height: min-content;
  }
  transition: transform 2s ease-in-out, z-index 2.25s ease-in-out;
  transform-origin: top;

`;

const EnBottom = styled.div`
  position: absolute;
  bottom: -7px;
  height: min-content;
  width: 100%;
  z-index: 200;
  svg {
    width: 100%;
    height: min-content;
  }
`;

const Envelope = styled.div`
  width: 40%;
  aspect-ratio: calc(1122 / 670);
  background-color: transparent;
  border-radius: 20px;
  position: relative;
  -webkit-box-shadow: 0px 0px 53px -9px rgba(209, 95, 95, 1);
  -moz-box-shadow: 0px 0px 53px -9px rgba(209, 95, 95, 1);
  box-shadow: 0px 0px 53px -9px rgba(209, 95, 95, 1);
  background: linear-gradient(to bottom, #ffced4, #d88a8f);

  /* overflow: hidden; */

  .flap {
    transform: rotateX(210deg);
    z-index: 0 !important;
  }

  .form {
    transform: translate(-50%, 0%);
  }

  .formsent {
    transform: translate(-50%, 50%);
    height: 200px;
    z-index: 0;
  }
`;

const Instructions = styled.div`
  display: flex;
  width: 50%;
  text-align: center;
  flex-direction: column;
  gap: 1em;
  p {
    margin: 0;
  }
  color: black;
`;

const Container = styled.div`
  background-color: #ffced4;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3em;
`;
