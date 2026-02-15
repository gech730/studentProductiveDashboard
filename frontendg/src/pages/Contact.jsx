import React ,{useEffect,useState} from 'react';
import  '../css/contactPage.css'
import { createComment } from '../utils/api';
function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
     if(name===""||email===""||comment==="")
      return
    console.log({ name, email, comment });
  const res=await createComment({title:name,description:email, status:comment});
  alert(res);
    // Reset fields after submission
    setName("");
    setEmail("");
    setComment("");
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>Have a question or feedback? Leave your comment below!</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name    "
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Your Email   "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <textarea
          placeholder="Your Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={5}
          required
        />

        <button type="submit">Send Comment</button>
      </form>
    </div>
  );
}

export default ContactPage;

