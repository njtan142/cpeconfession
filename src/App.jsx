import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import styled from "styled-components";
import { firestore } from "./firebase";
import { collection, doc, getDoc, setDoc } from "@firebase/firestore";

function randomString(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function hasUndefinedValues(obj, keys) {
  return keys.some((key) => obj[key] === undefined || obj[key] === "");
}

function timeUntilValentines() {
  const now = new Date();
  const year = now.getFullYear();
  let valentines = new Date(year, 1, 14); // February 14 (Month index starts at 0)

  // If Valentine's Day has already passed, set it for next year
  if (now > valentines) {
    valentines.setFullYear(year + 1);
  }

  const timeDiff = valentines - now;
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);

  return `${days} days, ${hours} hours, ${minutes} mins left`;
}

function App() {
  const [showForm, setShowForm] = useState(false);
  const [sendForm, setSendForm] = useState(false);
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [sending, setSending] = useState(false);
  const [showSentModal, setShowSentModal] = useState(false);
  const [code, setCode] = useState("");

  const checkIfHasCodeParam = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log(code);
    const timeLeft = timeUntilValentines();
    if(code){
      alert("This confession will be viewable on February 14th. " + timeLeft);
      window.location.href = "/";
    }
   
  }

  useEffect(() => {
    checkIfHasCodeParam();
  }, []);

  const sendMessage = async (redo = false) => {
    const code = randomString(6);
    const message = {
      from: fromInput,
      to: toInput,
      message: messageInput,
      code: code,
    };

    console.log(message);

    if (hasUndefinedValues(message, [ "to", "message", "code"])) {
      alert("Please fill in all fields");
      return;
    }

    if (!redo) {
      setSendForm(true);
      setShowForm(false);
      setSending(true);
    }

    const ref = doc(collection(firestore, "messages"), code);

    const messageRef = await getDoc(ref);
    console.log(messageRef);

    if (messageRef.exists()) {
      console.log("This code has already been used");
      sendMessage(true);
      return;
    }

    await setDoc(ref, message);
    setCode(code);
    setShowSentModal(true);
  };

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
            love! 💕
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
          >
            <To>
              <p>To:</p>{" "}
              <input
                type="text"
                value={toInput}
                onChange={(e) => setToInput(e.target.value)}
              />
            </To>
            <Message>
              {" "}
              <p>Message: </p>{" "}
              <textarea
                name="message"
                rows={"7"}
                placeholder="Write your message here"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              ></textarea>
            </Message>
            <From>
              <p>From:</p>{" "}
              <input
                type="text"
                placeholder="anonymous"
                value={fromInput}
                onChange={(e) => setFromInput(e.target.value)}
              />
            </From>
          </LoveLetter>
          <ActionButton
            onClick={() => {
              if (!showForm) {
                setShowForm(true);
              } else if (!sendForm) {
                sendMessage();
              }
            }}
          >
            {sending ? "Sending..." : showForm ? "Send" : "Start"}
          </ActionButton>
        </Envelope>
      </Container>
      <SentModal hidden={!showSentModal}>
        <div className="content">
          <div>
            <h2>Your confession has been sent!</h2>
            <p>We'll post all the confessions on February 14th.</p>
          </div>
          <p>
            <em>
              If you're a little daring, send this link to that special someone:
              <a href={`/?code=${code}`}> Open</a>
            </em>
          </p>
        </div>
      </SentModal>

      <Footer>
        <p>Made in collaboration with ICPEP.SE CTU’s Creatives and Technical team</p>
        <b>Niño, Krishia, Mikae, Gabriel</b>
      </Footer>
    </>
  );
}

export default App;

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px;
  p{
    margin: 0;
  }

  font-size: 8px;

`;

const SentModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 500;

  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #f7ecec;
    border-radius: 10px;
    width: 50%;
    max-width: 500px;
    height: 250px;
    z-index: 500;
    padding: 1em;

    h2 {
      margin-top: 0;
    }

    p {
      margin-left: 1em;
    }

    em {
      font-weight: 500;
    }

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  /* Extra Small Devices (phones, up to 576px) */
  @media (max-width: 576px) {
    .content{
      width: 70%;
    }
  }

  /* Small Devices (landscape phones, 576px and up) */
  @media (min-width: 576px) {
    .content{
      width: 70%;
    }
  }

  /* Medium Devices (tablets, 768px and up) */
  @media (min-width: 768px) {
  }

  /* Large Devices (laptops/desktops, 992px and up) */
  @media (min-width: 992px) {
  }
`;

const From = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1em;
  align-items: center;
  input {
    padding: 5px 10px;
    width: 50%;

  }

  /* Extra Small Devices (phones, up to 576px) */
  @media (max-width: 576px) {
  }

  /* Small Devices (landscape phones, 576px and up) */
  @media (min-width: 576px) {
  }

  /* Medium Devices (tablets, 768px and up) */
  @media (min-width: 768px) {
  }

  /* Large Devices (laptops/desktops, 992px and up) */
  @media (min-width: 992px) {
  }
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  textarea {
    align-self: center;
    width: 70%;
  }
  p {
    margin: 0;
  }

  /* Extra Small Devices (phones, up to 576px) */
  @media (max-width: 576px) {
    textarea {
      align-self: center;
      width: 90%;
    }
  }

  /* Small Devices (landscape phones, 576px and up) */
  @media (min-width: 576px) {
  }

  /* Medium Devices (tablets, 768px and up) */
  @media (min-width: 768px) {
  }

  /* Large Devices (laptops/desktops, 992px and up) */
  @media (min-width: 992px) {
  }
`;

const To = styled.div`
  display: flex;
  gap: 1em;
  align-items: center;

  input {
    padding: 5px 10px;
    width: 50%;
  }

  /* Extra Small Devices (phones, up to 576px) */
  @media (max-width: 576px) {
  }

  /* Small Devices (landscape phones, 576px and up) */
  @media (min-width: 576px) {
  }

  /* Medium Devices (tablets, 768px and up) */
  @media (min-width: 768px) {
  }

  /* Large Devices (laptops/desktops, 992px and up) */
  @media (min-width: 992px) {
  }
`;

const ActionButton = styled.button`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  bottom: 1em;
  z-index: 500;

  /* Extra Small Devices (phones, up to 576px) */
  @media (max-width: 576px) {
  }

  /* Small Devices (landscape phones, 576px and up) */
  @media (min-width: 576px) {
  }

  /* Medium Devices (tablets, 768px and up) */
  @media (min-width: 768px) {
  }

  /* Large Devices (laptops/desktops, 992px and up) */
  @media (min-width: 992px) {
  }
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
  transition: transform 2s ease-in-out, height 1s ease-in-out,
    z-index 2s ease-in-out;
  border-radius: 10px;
  z-index: 80;
  padding: 1em;

  /* Extra Small Devices (phones, up to 576px) */
  @media (max-width: 576px) {
    width: 90%;
  }

  /* Small Devices (landscape phones, 576px and up) */
  @media (min-width: 576px) {
  }

  /* Medium Devices (tablets, 768px and up) */
  @media (min-width: 768px) {
  }

  /* Large Devices (laptops/desktops, 992px and up) */
  @media (min-width: 992px) {
  }
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

  /* Extra Small Devices (phones, up to 576px) */
  @media (max-width: 576px) {
  }

  /* Small Devices (landscape phones, 576px and up) */
  @media (min-width: 576px) {
  }

  /* Medium Devices (tablets, 768px and up) */
  @media (min-width: 768px) {
  }

  /* Large Devices (laptops/desktops, 992px and up) */
  @media (min-width: 992px) {
  }
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

  /* Extra Small Devices (phones, up to 576px) */
  @media (max-width: 576px) {
  }

  /* Small Devices (landscape phones, 576px and up) */
  @media (min-width: 576px) {
  }

  /* Medium Devices (tablets, 768px and up) */
  @media (min-width: 768px) {
  }

  /* Large Devices (laptops/desktops, 992px and up) */
  @media (min-width: 992px) {
  }
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

  /* Extra Small Devices (phones, up to 576px) */
  @media (max-width: 576px) {
  }

  /* Small Devices (landscape phones, 576px and up) */
  @media (min-width: 576px) {
  }

  /* Medium Devices (tablets, 768px and up) */
  @media (min-width: 768px) {
  }

  /* Large Devices (laptops/desktops, 992px and up) */
  @media (min-width: 992px) {
  }
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

  /* Extra Small Devices (phones, up to 576px) */
  @media (max-width: 576px) {
  }

  /* Small Devices (landscape phones, 576px and up) */
  @media (min-width: 576px) {
  }

  /* Medium Devices (tablets, 768px and up) */
  @media (min-width: 768px) {
  }

  /* Large Devices (laptops/desktops, 992px and up) */
  @media (min-width: 992px) {
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
  max-width: 600px;

  /* overflow: hidden; */

  .flap {
    transform: rotateX(210deg);
    z-index: 0 !important;
  }

  .form {
    transform: translate(-50%, -10%);
  }

  .formsent {
    transform: translate(-50%, 50%);
    height: 150px;
    z-index: 0;
    overflow-y: hidden;
  }

  /* Extra Small Devices (phones, up to 576px) */
  @media (max-width: 576px) {
    width: 80%;

    .form {
      transform: translate(-50%, 15%);
      width: 90%;
    }

    .formsent {
    transform: translate(-50%, 50%);
    height: 100px;
    z-index: 0;
    overflow-y: hidden;
  }
  }

  /* Small Devices (landscape phones, 576px and up) */
  @media (min-width: 576px) {
    width: 70%;

  }

  /* Medium Devices (tablets, 768px and up) */
  @media (min-width: 768px) {
    width: 60%;

  }

  /* Large Devices (laptops/desktops, 992px and up) */
  @media (min-width: 992px) {
    width: 40%;

  }

  @media (min-width: 1400px) {
    width: 30%;

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

  /* Extra Small Devices (phones, up to 576px) */
  @media (max-width: 576px) {
    width: 90%;
  }

  /* Small Devices (landscape phones, 576px and up) */
  @media (min-width: 576px) {
    width: 90%;
    
  }

  /* Medium Devices (tablets, 768px and up) */
  @media (min-width: 768px) {
  }

  /* Large Devices (laptops/desktops, 992px and up) */
  @media (min-width: 992px) {
    width: 50%;
  
  }
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

  /* Extra Small Devices (phones, up to 576px) */
  @media (max-width: 576px) {
  }

  /* Small Devices (landscape phones, 576px and up) */
  @media (min-width: 576px) {
  }

  /* Medium Devices (tablets, 768px and up) */
  @media (min-width: 768px) {
  }

  /* Large Devices (laptops/desktops, 992px and up) */
  @media (min-width: 992px) {
  }
`;
