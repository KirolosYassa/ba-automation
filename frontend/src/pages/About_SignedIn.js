import Header from "../Components/Header";
import HeaderSignedIn from "../Components/HeaderSignedIn";
import About_content from "../Components/about_content";

function About_SignedIn() {
  return (
    <>
      <HeaderSignedIn />
      <h1> About Page</h1>
      <About_content />
    </>
  );
}
export default About_SignedIn;
