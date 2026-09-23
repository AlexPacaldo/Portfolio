import './App.css';
import Hachi from '../src/img/home/Recent Projects/Hachi.png';
import Jen from '../src/img/home/Recent Projects/Jen.png';
import SideEye from '../src/img/home/Recent Projects/SideEye.png';
import LOGO from '../src/img/home/LOGO.jpg';
import ME from '../src/img/about/me2.png';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect, lazy, Suspense, useRef, useState } from 'react';
import AranW from '../src/img/works/aranDesk.png';
import RektaW from '../src/img/works/Rekta Sikad.png';
import BookW from '../src/img/works/BookWorm.png';
import UcookW from '../src/img/works/uCookDesk.png';
import Swal from 'sweetalert2';
import FoldText from './components/FoldText';
import DepthCarousel from './components/DepthCarousel';

const Lanyard = lazy(() => import('./components/Lanyard'));

function App() {

  useEffect(()=>{
    Aos.init({duration: 3000});
  }, [])

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth"
    });
  };

  const [formStatus, setFormStatus] = useState('idle');
  const [formError, setFormError] = useState('');
  const turnstileRef = useRef(null);

  useEffect(() => {
    const siteKey = process.env.REACT_APP_TURNSTILE_SITE_KEY;
    if (!siteKey) return;
    const widget = document.querySelector('.cf-turnstile');
    const timer = setInterval(() => {
      if (!window.turnstile || turnstileRef.current || !widget) return;
      turnstileRef.current = window.turnstile.render(widget, {
        sitekey: siteKey,
        theme: 'light',
        language: 'auto'
      });
      clearInterval(timer);
    }, 200);
    return () => clearInterval(timer);
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormStatus('sending');
    setFormError('');

    const captchaToken = (window.turnstile && window.turnstile.getResponse(turnstileRef.current)) || '';

    if (!captchaToken) {
      setFormError('Please complete the captcha check.');
      setFormStatus('error');
      return;
    }

    const formData = new FormData(event.target);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      captchaToken
    };

    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 30000);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        signal: controller.signal,
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      clearTimeout(timer);

      if (!data.success) {
        throw new Error(data.message || "Something went wrong. Please try again.");
      }

      event.target.reset();
      if (window.turnstile) window.turnstile.reset(turnstileRef.current);
      setFormStatus('idle');
      Swal.fire({
        title: "Message Sent!",
        text: "Thanks for reaching out. I'll get back to you as soon as possible.",
        icon: "success",
        confirmButtonText: "Got it"
      });
    } catch (err) {
      setFormError(err.message || "Something went wrong. Please try again.");
      setFormStatus('error');
    }
  };

  return (
    <div>
      <div className="container1">
          <nav className="navbar navbar-expand-md navbar-light " data-aos="fade-down">
              <div className="navName">
                  <img src={LOGO} alt="Alex Pacaldo logo"></img>
              </div>
              
              <div className="collapse navbar-collapse justify-content-center" id="navbar_collapse">
                  
              </div>
              <div className="navSocialMedia">
                  <div><a href="https://www.linkedin.com/in/alex-pacaldo-00046a269/"><i className="bi bi-linkedin"></i></a></div>
                  <div><a href="https://github.com/AlexPacaldo"><i className="bi bi-github"></i></a></div>
                  <div><a href="mailto:alexpacaldo1105@gmail.com?subject = Feedback&body = Message"><i className="bi bi-envelope-fill"></i></a></div>
              </div>
          </nav>
          <main>
              <div className="heroBack">
                  <div className="heroMarquee">
                    <div className="heroMarqueeInner">
                      <h1><b>Turning Ideas into Reality</b></h1>
                    </div>
                  </div>
                </div>
              <article className="backgroundArticle">
                  <div className="container-fluid article1">
                      <div className="text-center py-1 py-md-1" data-aos="fade-up">
                          <div className="typing-container">
                              <div>
                                <FoldText
                                  text="HAVE AN IDEA IN MIND?"
                                  splitBy="char"
                                  hinge="top"
                                  trigger="mount"
                                  duration={1}
                                  stagger={0.05}
                                  ease="power3.out"
                                  creaseShading={0}
                                  fontSize="clamp(2.2rem, 6.5vw, 3.6rem)"
                                  fontWeight={900}
                                  color="#212529"
                                />
                              </div>
                              <div>
                                <FoldText
                                  text="LET'S MAKE IT HAPPEN!"
                                  splitBy="char"
                                  hinge="top"
                                  trigger="mount"
                                  duration={1}
                                  stagger={0.05}
                                  delay={2.1}
                                  ease="power3.out"
                                  creaseShading={0}
                                  fontSize="clamp(2.2rem, 6.5vw, 3.6rem)"
                                  fontWeight={900}
                                  color="#212529"
                                />
                              </div>
                          </div>
                          <h5>Meet Alex Pacaldo, a 22-year-old web developer.</h5>
                          <br></br>
                          <button type="button" className="hireMe btn btn-dark" onClick={scrollToBottom}>HIRE ME!</button>
                      </div>
                      <div className="articleImgWrap" data-aos="fade-left">
                          <Suspense fallback={<div className="lanyard-fallback" />}>
                              <Lanyard frontImage={ME} position={[0, 0, 12]} />
                          </Suspense>
                      </div>
                  </div>
              </article>

              
              <div className='Caru' data-aos = 'fade-up'>
                <svg className='svgTop' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                  <g className="svgWave">
                    <path fill="#000000ff" fill-opacity="1" d="M0,256L60,256C120,256,240,256,360,245.3C480,235,600,213,720,213.3C840,213,960,235,1080,234.7C1200,235,1300,192,1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                    <path fill="#000000ff" fill-opacity="1" transform="matrix(-1,0,0,1,2880,0)" d="M0,256L60,256C120,256,240,256,360,245.3C480,235,600,213,720,213.3C840,213,960,235,1080,234.7C1200,235,1300,192,1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                    <path fill="#000000ff" fill-opacity="1" transform="translate(2880,0)" d="M0,256L60,256C120,256,240,256,360,245.3C480,235,600,213,720,213.3C840,213,960,235,1080,234.7C1200,235,1300,192,1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                  </g>
                </svg>
                <h1 className="RecentProj"><i>Recent Projects</i></h1>
                <div className="recentProjCarousel">
                  <DepthCarousel
                    items={[
                      { image: Hachi, alt: 'Hachi' },
                      { image: Jen, alt: 'Jen' },
                      { image: SideEye, alt: 'Side Eye' }
                    ]}
                    depth={300}
                    spread={380}
                    tilt={22}
                    tiltDirection="right"
                    perspective={1400}
                    visibleCards={4}
                    falloff={0.2}
                    blur={6}
                    cardWidth={1200}
                    cardHeight={591}
                    autoplay
                    loop
                  />
                </div>
                <svg className='svgBot' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                  <g className="svgWave">
                    <path fill="#000000ff" fill-opacity="1" d="M0,256L60,256C120,256,240,256,360,245.3C480,235,600,213,720,213.3C840,213,960,235,1080,234.7C1200,235,1300,192,1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
                    <path fill="#000000ff" fill-opacity="1" transform="matrix(-1,0,0,1,2880,0)" d="M0,256L60,256C120,256,240,256,360,245.3C480,235,600,213,720,213.3C840,213,960,235,1080,234.7C1200,235,1300,192,1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
                    <path fill="#000000ff" fill-opacity="1" transform="translate(2880,0)" d="M0,256L60,256C120,256,240,256,360,245.3C480,235,600,213,720,213.3C840,213,960,235,1080,234.7C1200,235,1300,192,1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
                  </g>
                </svg>
              </div>


          <div className='d-flex justify-content-center'>
            <div className="articleCont container-fluid">
              <div className='About'>
                <div className='Aboutt'>

                  <div className="aboutHeader" data-aos="zoom-in">
                    <span className="aboutEyebrow">About Me</span>
                    <h1>Aspiring <span className="aboutAccent">Full-Stack Developer</span></h1>
                    <p className="aboutLead">
                      A 22-year-old web developer from Cainta, Rizal, Philippines, currently pursuing a
                      Bachelor of Science in Computer Science.
                    </p>
                  </div>

                  <div className='grid1about'>

                    <div className="AboutDesc" data-aos="fade-right">
                      <span className="sectionTag">Get To Know Me</span>
                      <p className="aboutME">
                        Hello! My name is Alexander John G. Pacaldo, a 22-year-old aspiring web developer from
                        Cainta, Rizal, Philippines. I am currently in my third year of a Bachelor of Science in
                        Computer Science at STI College Ortigas-Cainta. <br></br><br></br>
                        Before pursuing my degree, I completed the KodeGo Bootcamp, a 12-week intensive training
                        program in web development, where I was recognized as one of the Top Students and
                        awarded for Best Mini Project 2. I also completed
                        my Senior High School under the STEM strand at the same institution. <br></br><br></br> I have a
                        strong interest in technology, coding, sports, and entertainment. I enjoy exploring new
                        programming concepts, watching movies and TV shows,
                        and working on personal development projects. Although I began my programming journey
                        recently, I’m passionate and committed to improving my skills and becoming a successful
                        professional in the field of web development.
                      </p>
                    </div>

                    <aside className="aboutStats" data-aos="fade-left">
                      <span className="aboutStatsGlow" aria-hidden="true"></span>
                      <div className="aboutStatus"><span className="statusDot"></span>Open to Work</div>
                      <span className="sectionTag sectionTag--dark">Fast Facts</span>
                      <div className="factsList">
                        <div className="factRow">
                          <span className="factIcon"><i className="bi bi-geo-alt"></i></span>
                          <span className="factBody">
                            <span className="factLabel">Based in</span>
                            <span className="factValue">Cainta, Rizal, Philippines</span>
                          </span>
                        </div>
                        <div className="factRow">
                          <span className="factIcon"><i className="bi bi-person"></i></span>
                          <span className="factBody">
                            <span className="factLabel">Age</span>
                            <span className="factValue">22</span>
                          </span>
                        </div>
                        <div className="factRow">
                          <span className="factIcon"><i className="bi bi-briefcase"></i></span>
                          <span className="factBody">
                            <span className="factLabel">Seeking</span>
                            <span className="factValue factValue--accent">Full-Stack Developer roles</span>
                          </span>
                        </div>
                        <div className="factRow">
                          <span className="factIcon"><i className="bi bi-stars"></i></span>
                          <span className="factBody">
                            <span className="factLabel">Interests</span>
                            <span className="factValue">Tech · Coding · Sports · Entertainment</span>
                          </span>
                        </div>
                      </div>
                    </aside>

                    <div className="skillsSection" data-aos="fade-right">
                      <span className="sectionTag">Tech Stack</span>
                      <div className="skills-grid">
                        <div className="skill-item" style={{ '--skill': '#181717' }}><span className="skillIcon"><i className="bi bi-github"></i></span><span>GitHub</span></div>
                        <div className="skill-item" style={{ '--skill': '#e34f26' }}><span className="skillIcon"><i className="bi bi-filetype-html"></i></span><span>HTML5</span></div>
                        <div className="skill-item" style={{ '--skill': '#1572b6' }}><span className="skillIcon"><i className="bi bi-filetype-css"></i></span><span>CSS3</span></div>
                        <div className="skill-item" style={{ '--skill': '#10b981' }}><span className="skillIcon"><i className="bi bi-phone"></i></span><span>Responsive Design</span></div>
                        <div className="skill-item" style={{ '--skill': '#eab308' }}><span className="skillIcon"><i className="bi bi-filetype-js"></i></span><span>JavaScript</span></div>
                        <div className="skill-item" style={{ '--skill': '#f89820' }}><span className="skillIcon"><i className="bi bi-cup-hot"></i></span><span>Java</span></div>
                        <div className="skill-item" style={{ '--skill': '#7952b3' }}><span className="skillIcon"><i className="bi bi-bootstrap"></i></span><span>Bootstrap</span></div>
                        <div className="skill-item" style={{ '--skill': '#61dafb' }}><span className="skillIcon"><i className="bi bi-atom"></i></span><span>ReactJS</span></div>
                        <div className="skill-item" style={{ '--skill': '#339933' }}><span className="skillIcon"><i className="bi bi-npm"></i></span><span>Node.js</span></div>
                        <div className="skill-item" style={{ '--skill': '#00758f' }}><span className="skillIcon"><i className="bi bi-database"></i></span><span>MySQL</span></div>
                        <div className="skill-item" style={{ '--skill': '#68217a' }}><span className="skillIcon"><i className="bi bi-code-slash"></i></span><span>C#</span></div>
                      </div>
                    </div>

                    <div className='timeLcont'>
                      <span className="sectionTag" data-aos="fade-right">Education &amp; Experience</span>
                      <div className="timeline">
                        <div className="timeCont" data-aos="fade-left" data-aos-delay="100">
                          <h5>August 2023 - Present</h5>
                          <h3><b>STI College Ortigas-Cainta</b></h3>
                          <h5>Bachelor of Science in Computer Science</h5>
                        </div>
                        <div className="timeCont" data-aos="fade-left" data-aos-delay="250">
                          <h5>August 2022 - December 2022</h5>
                          <h3><b>Kodego Bootcamp</b></h3>
                          <h5>
                            Completed an intensive 12-week web development program. <br></br>
                            <b>Recognitions:</b> Top Student, Best Mini Project 2
                          </h5>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              </div>


              <div className="Projects">
                <div className='ProjCont'>
                  <div data-aos="zoom-in">
                    <h1 className="text-center"><b>My Projects</b></h1>
                    <p className="text-center">Projects that i made in 2022</p>
                  </div>
                  <div className="row row-cols-1 row-cols-md-2 gx-3">

                    <div className="col" data-aos="fade-right">
                      <div className="hover01 column">
                        <div>
                          <a href="https://alexpacaldo.github.io/ExamItem2/">
                            <figure><img src={BookW} width="100%" className="gridCont" alt="BookWorm project preview"></img></figure>
                          </a>
                          <h5 className="text-center">BookWorm</h5>
                          <p className="text-center">HTML, CSS, Bootstrap</p>
                        </div>
                      </div>
                    </div>

                    <div className="col" data-aos="fade-left">
                      <div className="hover01 column">
                        <div>
                          <a href="https://alexpacaldo.github.io/MiniProject1/">
                            <figure><img src={RektaW} width="100%" className="gridCont" alt="Rekta Sikad project preview"></img></figure>
                          </a>
                          <h5 className="text-center">Rekta Sikad</h5>
                          <p className="text-center">HTML, CSS, Bootstrap</p>
                        </div>
                      </div>
                    </div>

                    <div className="col" data-aos="fade-up">
                      <div className="hover01 column">
                        <div>
                          <a href="https://alexpacaldo.github.io/MiniProject2/">
                            <figure><img src={AranW} width="100%" className="gridCont" alt="Araña project preview"></img></figure>
                          </a>
                          <h5 className="text-center">Araña</h5>
                          <p className="text-center">ReactJs, CSS, BootStrap, JavaScript</p>
                        </div>
                      </div>
                    </div>

                    <div className="col" data-aos="fade-up">
                      <div className="hover01 column">
                        <div>
                          <a href="https://capstone-kodego-m39pjmzzk-wadze213.vercel.app/?fbclid=IwAR34eXrT2dAKNIsC_DqIwYDp3iyCI7RJBuplSVH8wbRgmRpp1HhZchpA1YE%5C">
                            <figure><img src={UcookW} width="100%" className="gridCont" alt="U Cookin project preview"></img></figure>
                          </a>
                          <h5 className="text-center">U Cookin</h5>
                          <p className="text-center">ReactJs, NodeJS, MySQL</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>


              <div className='Contacts' data-aos="zoom-in">
                <div className="ContactCont">
                  <div className="contactHead">
                    <h1><b>Contact Me</b></h1>
                    <p className="contactSub">Have a project in mind or an opportunity to discuss? I'm currently open to full-time, part-time, and remote Full-Stack Developer roles — I usually respond within 24 hours.</p>
                  </div>
                  <div className="contactGrid">

                    <div className="contactInfo">
                      <a className="infoCard" href="mailto:alexpacaldo1105@gmail.com">
                        <span className="infoIcon"><i className="bi bi-envelope-fill"></i></span>
                        <span className="infoBody">
                          <span className="infoLabel">Email</span>
                          <span className="infoValue">alexpacaldo1105@gmail.com</span>
                        </span>
                      </a>
                      <a className="infoCard" href="https://www.linkedin.com/in/alex-pacaldo-00046a269/">
                        <span className="infoIcon"><i className="bi bi-linkedin"></i></span>
                        <span className="infoBody">
                          <span className="infoLabel">LinkedIn</span>
                          <span className="infoValue">Alex Pacaldo</span>
                        </span>
                      </a>
                      <a className="infoCard" href="https://github.com/AlexPacaldo">
                        <span className="infoIcon"><i className="bi bi-github"></i></span>
                        <span className="infoBody">
                          <span className="infoLabel">GitHub</span>
                          <span className="infoValue">@AlexPacaldo</span>
                        </span>
                      </a>
                      <div className="infoNote">
                        <p>
                          Thanks for stopping by. Whether you have a question, a project in mind,
                          or just want to say hi — drop a message and it goes straight to my inbox.
                          I try to reply within 24 hours.
                        </p>
                        <p>Alex Pacaldo — Full-Stack Developer</p>
                      </div>
                    </div>

                    <div className="formCard">
                      <form className="contactForm" onSubmit={onSubmit} noValidate>
                        <div className="field">
                          <label htmlFor="name">Your Name</label>
                          <input className="form-control" id="name" type="text" name="name" placeholder="John Doe" maxLength="100" required />
                        </div>
                        <div className="field">
                          <label htmlFor="email">Your Email</label>
                          <input className="form-control" id="email" type="email" name="email" placeholder="john@example.com" required />
                        </div>
                        <div className="field">
                          <label htmlFor="message">Message</label>
                          <textarea className="form-control" id="message" name="message" rows="5" maxLength="5000" placeholder="How can I help you?" required />
                        </div>
                        <div className="field">
                          {process.env.REACT_APP_TURNSTILE_SITE_KEY && (
                            <div className="cf-turnstile turnstileWrap" data-sitekey={process.env.REACT_APP_TURNSTILE_SITE_KEY} data-theme="light" data-language="auto"></div>
                          )}
                        </div>
                        <button type="submit" className="btn submitBtn" disabled={formStatus === 'sending'}>
                          {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                        </button>
                        {formStatus === 'error' && (
                          <p className="formStatus error" role="alert">{formError}</p>
                        )}
                      </form>
                    </div>

                  </div>
                </div>
              </div>


            </div>
          </div>

              
                    


          </main>
          <footer>
              <div className="footerSocialMedia">
                  <div><a href="https://www.linkedin.com/in/alex-pacaldo-00046a269/"><i className="bi bi-linkedin"></i></a></div>
                  <div><a href="https://github.com/AlexPacaldo"><i className="bi bi-github"></i></a></div>
                  <div><a href="mailto:alexpacaldo1105@gmail.com?subject = Feedback&body = Message"><i className="bi bi-envelope-fill"></i></a></div>
              </div>
          </footer>
     </div>




  </div>
  );
}

export default App;
