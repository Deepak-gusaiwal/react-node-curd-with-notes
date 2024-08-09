import React from "react";
import { Container, Logo } from "./helper";
import { Link } from "react-router-dom";
import { SlSocialYoutube } from "react-icons/sl";
import { FaInstagram, FaLocationDot, FaPhone } from "react-icons/fa6";
import { SlSocialLinkedin } from "react-icons/sl";
import { MdMail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-secondary-50 pt-4 border-t-4 border-primary-400">
      <Container className="grid md:grid-cols-4 gap-4">
        <div className="footerBox">
          <Logo className="h-auto w-[clamp(150px,15vw,300px)] flex mb-2" />

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint culpa
            omnis, explicabo dolorum maxime ipsam magnam debitis id suscipit
            modi! Eos quidem, sed obcaecati facilis veniam in neque ipsum
            similique pariatur quaerat velit.
          </p>
        </div>
        <div className="footerBox">
          <h3>useful links</h3>
          <ul className="menuLinks flex flex-col gap-1 items-cente mb-4">
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </div>
        <div className="footerBox">
          <h3>social links</h3>
          <ul className="socialLinks flex md:gap-4 gap-2 items-cente mb-4">
            <li>
              <Link to="https://www.instagram.com/doedits_a537/">
                <FaInstagram />
              </Link>
            </li>
            <li>
              <Link to="https://www.youtube.com/@doedits2842">
                <SlSocialYoutube />
              </Link>
            </li>
            <li>
              <Link to="https://www.linkedin.com/in/deepak-gusaiwal-721795222/">
                <SlSocialLinkedin />
              </Link>
            </li>
          </ul>
        </div>
        <div className="footerBox">
          <h3 className="">where to find us</h3>
          <ul className="details mb-4">
            <li>
              <FaLocationDot />
              <span>Madipur, New Delhi 110063</span>
            </li>
            <li>
              <FaPhone />
              <Link to="tel:+91 9213615182">+91 9213615182</Link>
            </li>
            <li>
              <MdMail />
              <Link to="mailto:dgusaiwal537@gmail.com">
                dgusaiwal537@gmail.com
              </Link>
            </li>
          </ul>
        </div>
      
       
      </Container>
        <div className="col-span-full bg-primary-400 text-center p-2">
            <p className="text-sm text-white">Copyright © {`${new Date().getFullYear()} - ${new Date().getFullYear()+1}`} Deepak Gusaiwal | Create By <a target="_blank" href="https://react-portfolio-psi-ebon.vercel.app/" className="underline">Deep Dev</a></p>
        </div>
    </footer>
  );
};

export default Footer;
