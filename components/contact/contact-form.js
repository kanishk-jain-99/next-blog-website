import { useEffect, useState } from "react";
import classes from "./contact-form.module.css";
import Notification from "../ui/notification";

async function sendContactData({ enteredMessage, enteredEmail, enteredName }) {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify({
      message: enteredMessage,
      email: enteredEmail,
      name: enteredName,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}

export default function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredMessage, setEnteredMessage] = useState("");
  const [reqStatus, setReqStatus] = useState();
  const [reqError, setReqError] = useState();

  useEffect(() => {
    if (reqStatus === "success" || reqStatus === "error") {
      const timer = setTimeout(() => {
        setReqError(null);
        setReqStatus(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [reqStatus]);

  async function sendMessageHandler(event) {
    event.preventDefault();
    setReqStatus("pending");
    let response;
    try {
      response = await sendContactData({
        enteredMessage,
        enteredEmail,
        enteredName,
      });
      setReqStatus("success");
      setEnteredEmail("");
      setEnteredMessage("");
      setEnteredName("");
    } catch (error) {
      setReqError(error.message);
      setReqStatus("error");
    }

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }
  }

  let notification;

  if (reqStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way",
    };
  }

  if (reqStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "Message sent successfully",
    };
  }

  if (reqStatus === "error") {
    notification = {
      status: "error",
      title: "Error!",
      message: reqError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How Can I Help You</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            required
            rows="5"
            value={enteredMessage}
            onChange={(event) => setEnteredMessage(event.target.value)}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}
