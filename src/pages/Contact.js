import React from "react";

function Contact() {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "b9f543b9-9a00-4732-9b94-68b3af24d829");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "80vh",
      }}
    >
      <div style={{ fontSize: "5vh", marginBottom: "3vh" }}>
        Write to us at <mark>manikantavinjamuri8522@gmail.com</mark>
      </div>
      <form
        style={{ border: "1px solid black", padding: "3vh" }}
        onSubmit={onSubmit}
      >
        <label>Your Name</label>
        <br />
        <input
          type="text"
          name="name"
          placeholder="Enter Your Name "
          required
        />
        <br />
        <label>Email</label>
        <br />
        <input type="email" name="email" placeholder="Enter Email " required />
        <br />
        <label>Write Your Message here</label>
        <br />
        <textarea
          style={{ width: "38vh" }}
          name="message"
          placeholder="Write your Message here...."
        ></textarea>
        <br />
        <button type="submit" className="btn btn-primary">
          Send Email
        </button>
        <p>{result}</p>
      </form>
    </div>
  );
}

export default Contact;
