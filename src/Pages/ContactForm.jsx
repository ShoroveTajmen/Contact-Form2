import { useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import Swal from "sweetalert2";

const ContactForm = () => {
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clickedd");
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const countryCode = form.countryCode.value;
    const phoneNumber = form.phoneNumber.value;
    const aboutUs = form.aboutUs.value;
    const skype = form.skype.value;
    const myTextarea = form.myTextarea.value;

    const phoneNumberRegex = /^\+8801\d{9}$/;

    if(name.length < 3){
        alert('name must be greater than 3 Characters');
        return;
    }
    if (!phoneNumberRegex.test( phoneNumber)) {
        alert('Please enter a valid Bangladesh phone number');
        return;
      }

    const formInfo = {
      name,
      email,
      countryCode,
      phoneNumber,
      aboutUs,
      skype,
      myTextarea,
    };
    console.log(formInfo);

    //send newProduct data to the server
    fetch("https://contact-form-server-ivory.vercel.app/contactInfo", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire("Contact info added", "success");
          form.reset();
        }
      });
  };

  return (
    <div className="">
      <h1 className="text-4xl w-full md:w-full ml-[40px] font-bold lg:text-center mt-[50px] mb-[70px]">
        Contact Us
      </h1>
      <div className="flex lg:flex-row flex-col justify-center lg:gap-[50px] lg:ml-[150px]">
        {/* contact info */}
        <div>
          <img
            className="mb-[70px] ml-[25px] lg:ml-[0px]"
            src="https://i.ibb.co/2YRQ5bY/403395978-704980301608337-8904547402496382212-n.png"
            alt=""
          />
          <div className="lg:ml-[20px] ml-[40px] space-y-2">
            <h1>BITSS BFIN SASU, B RUE DUBLIN 34200 SETE FRANCE</h1>
            <h1>+003366100010</h1>
            <h1>support@bobosohomail.com</h1>
          </div>
          {/* map */}
          <div className="mt-[20px]">
            {" "}
            <iframe
              className="w-[400px] h-[250px] p-4 ml-[20px] lg:ml-[0px]  mt-[50px] md:mt-[0px] lg:mt-[0px]  rounded-3xl"
              src="https://maps.google.com/maps?q=dhaka&amp;t=&amp;z=9&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
              frameBorder="0"
              scrolling="no"
              // style={{ width: "400px", height: "400px", borderRadius:"30px" }}
            ></iframe>
          </div>
        </div>
        {/* contact form */}
        <div className="ml-[40px] md:ml-[40px] lg:ml-[0px]">
          <form onSubmit={handleSubmit}>
            {/* name */}
            <div className="form-control lg:w-[600px] w-[360px]">
              <label className="label">
                <span className="label-text">Name*</span>
              </label>
              <label className="">
                <input
                  type="text"
                  name="name"
                  required
                  className="input input-bordered border-black w-full"
                />
              </label>
            </div>
            {/* email */}
            <div className="form-control lg:w-[600px] w-[360px]">
              <label className="label">
                <span className="label-text">Email*</span>
              </label>
              <label className="">
                <input
                  type="email"
                  name="email"
                  required
                  className="input input-bordered border-black w-full"
                />
              </label>
            </div>
            {/* Phone */}
            <div className="flex lg:w-[600px] w-[360px]">
              <div className="form-control lg:w-[200px]">
                <label className="label">
                  <span className="label-text">Phone*</span>
                </label>
                <select
                  name="countryCode"
                  className="select w-full border-black rounded-r-none"
                >
                  <option disabled selected>
                    Andarra(+376)
                  </option>
                  <option>Bangladesh(+880)</option>
                  <option>US(+1)</option>
                  <option>UK(+44)</option>
                  <option>Australia(+61)</option>
                </select>
              </div>
              <div className="form-control lg:w-[400px]">
                <input
                  type="text"
                  name="phoneNumber"
                //   pattern="\+880[0-9]{9}"
                  className="input input-bordered border-black w-full mt-[36px] rounded-l-none"
                />
              </div>
            </div>
            {/* about us */}
            <div className="form-control lg:w-[600px] mt-[10px] w-[360px]">
              <label className="label">
                <span className="label-text">How do you hear about us?</span>
              </label>
              <select name="aboutUs" className="select w-full border-black ">
                <option disabled selected>
                  Please select option
                </option>
                <option>Social Media</option>
                <option>Website/Browsing</option>
                <option>Event or Conference</option>
                <option>Direct Mail</option>
                <option>Employee Referral</option>
              </select>
            </div>
            {/* skype*/}
            <div className="form-control lg:w-[600px] mt-[10px] w-[360px]">
              <label className="label">
                <span className="label-text">Skype (For Contact Purpose)</span>
              </label>
              <label className="">
                <input
                  type="text"
                  name="skype"
                  className="input input-bordered border-black w-full"
                />
              </label>
            </div>
            {/* message */}
            <div className="lg:w-[600px] w-[300px]">
              <label htmlFor="myTextarea">Message</label> <br />
              <textarea
                className="border border-black rounded-md lg:w-[600px] w-[360px] "
                id="myTextarea"
                name="myTextarea"
                rows="10"
                cols="50"
              ></textarea>
            </div>
            <div>
              <p>
                Note Before submit, please make sure that you fill/select all
                required field
              </p>
              <button
                className="btn btn-sm mb-[20px] text-black"
                disabled="disabled"
              >
                marked by star(*)
              </button>
            </div>
            {/* captcha */}
            <div className="form-control lg:w-[600px] w-[360px]">
              <label className="label">
                <LoadCanvasTemplate />
              </label>
              <input
                type="text"
                name="captcha"
                placeholder="type the captcha above"
                className="input input-bordered border-black"
                required
                onBlur={handleValidateCaptcha}
              />
            </div>

            <input
              disabled={disabled}
              type="submit"
              value="Submit"
              className=" btn mt-[20px] bg-blue-700 font-bold text-white uppercase lg:w-[200px] mb-[100px]"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
