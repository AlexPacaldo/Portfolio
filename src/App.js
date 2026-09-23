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
import FlipCard from './components/FlipCard';

const Lanyard = lazy(() => import('./components/Lanyard'));

function useCardSize() {
  const [vw, setVw] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1200));

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return Math.round(vw < 768 ? Math.max(vw - 16, 0) : Math.max((vw * 0.77 - 16) / 2, 0));
}

function App() {

  useEffect(()=>{
    Aos.init({duration: 3000});
  }, [])

  const cardWidth = useCardSize();
  const cardHeight = aspect => Math.round(cardWidth * aspect);

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
                        <div className="skill-item" style={{ '--skill': '#149eca' }}><span className="skillIcon skillIcon--brand"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"></path></svg></span><span>ReactJS</span></div>
                        <div className="skill-item" style={{ '--skill': '#43853d' }}><span className="skillIcon skillIcon--brand"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"></path></svg></span><span>Node.js</span></div>
                        <div className="skill-item" style={{ '--skill': '#00758f' }}><span className="skillIcon"><i className="bi bi-database"></i></span><span>MySQL</span></div>
                        <div className="skill-item" style={{ '--skill': '#68217a' }}><span className="skillIcon"><i className="bi bi-code-slash"></i></span><span>C#</span></div>
                        <div className="skill-item" style={{ '--skill': '#111827' }}><span className="skillIcon skillIcon--brand"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 22.525H0l12-21.05 12 21.05z"></path></svg></span><span>Vercel</span></div>
                        <div className="skill-item" style={{ '--skill': '#16966b' }}><span className="skillIcon skillIcon--brand"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z"></path></svg></span><span>Supabase</span></div>
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
                  </div>
                  <div className="projectGroup">
                    <div className="projectGroupHead">
                      <span className="sectionTag">2026 · Latest Builds</span>
                    </div>
                    <div className="row row-cols-1 row-cols-md-2 gx-3 gy-3">

                    <div className="col" data-aos="fade-right">
                      <div className="projectCard">
                        <FlipCard
                          front={<img src={SideEye} alt="Side Eye project preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                          back={
                            <div className="flipCardBack">
                              <span className="flipCardTag">Side Eye</span>
                              <span className="flipCardStack">TypeScript · HTML · CSS</span>
                              <p className="flipCardDesc">An interactive web game built with TypeScript, HTML, and CSS, deployed on Vercel.</p>
                              <a className="flipCardLink" href="https://sideeye-game.vercel.app/" target="_blank" rel="noreferrer">Visit Site <i className="bi bi-arrow-right"></i></a>
                            </div>
                          }
                          width={cardWidth}
                          height={cardHeight(945 / 1920)}
                          radius={18}
                          background="linear-gradient(135deg, #000000 0%, #111827 100%)"
                          color="#ffffff"
                          shadowColor="#111827"
                          glareOpacity={0.18}
                          ariaLabel="Side Eye project card"
                        />
                      </div>
                    </div>

                    <div className="col" data-aos="fade-left">
                      <div className="projectCard">
                        <FlipCard
                          front={<img src={Jen} alt="Jen Academia project preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                          back={
                            <div className="flipCardBack">
                              <span className="flipCardTag">Jen Academia</span>
                              <span className="flipCardStack">JavaScript · HTML · CSS</span>
                              <p className="flipCardDesc">An academic web application built for my STI thesis, deployed on Vercel.</p>
                              <a className="flipCardLink" href="https://sti-thesis-jen-academia.vercel.app/" target="_blank" rel="noreferrer">Visit Site <i className="bi bi-arrow-right"></i></a>
                            </div>
                          }
                          width={cardWidth}
                          height={cardHeight(945 / 1920)}
                          radius={18}
                          background="linear-gradient(135deg, #000000 0%, #111827 100%)"
                          color="#ffffff"
                          shadowColor="#111827"
                          glareOpacity={0.18}
                          ariaLabel="Jen Academia project card"
                        />
                      </div>
                    </div>

                    <div className="col mx-auto" data-aos="fade-up">
                      <div className="projectCard">
                        <FlipCard
                          front={<img src={Hachi} alt="Hachi project preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                          back={
                            <div className="flipCardBack">
                              <span className="flipCardTag">Hachi</span>
                              <p className="flipCardDesc">A web application deployed on Vercel.</p>
                              <a className="flipCardLink" href="https://hachi-review.vercel.app/" target="_blank" rel="noreferrer">Visit Site <i className="bi bi-arrow-right"></i></a>
                            </div>
                          }
                          width={cardWidth}
                          height={cardHeight(944 / 1906)}
                          radius={18}
                          background="linear-gradient(135deg, #000000 0%, #111827 100%)"
                          color="#ffffff"
                          shadowColor="#111827"
                          glareOpacity={0.18}
                          ariaLabel="Hachi project card"
                        />
                      </div>
                    </div>

                    </div>
                  </div>

                  <div className="projectGroup">
                    <div className="projectGroupHead">
                      <span className="sectionTag">2022 · Bootcamp</span>
                    </div>
                    <div className="row row-cols-1 row-cols-md-2 gx-3 gy-3">

                    <div className="col" data-aos="fade-right">
                      <div className="projectCard">
                        <FlipCard
                          front={<img src={BookW} alt="BookWorm project preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                          back={
                            <div className="flipCardBack">
                              <span className="flipCardTag">BookWorm</span>
                              <span className="flipCardStack">HTML · CSS · Bootstrap</span>
                              <p className="flipCardDesc">A book-themed website built with HTML, CSS, and Bootstrap.</p>
                              <a className="flipCardLink" href="https://alexpacaldo.github.io/ExamItem2/" target="_blank" rel="noreferrer">Visit Site <i className="bi bi-arrow-right"></i></a>
                            </div>
                          }
                          width={cardWidth}
                          height={cardHeight(957 / 1906)}
                          radius={18}
                          background="linear-gradient(135deg, #000000 0%, #111827 100%)"
                          color="#ffffff"
                          shadowColor="#111827"
                          glareOpacity={0.18}
                          ariaLabel="BookWorm project card"
                        />
                      </div>
                    </div>

                    <div className="col" data-aos="fade-left">
                      <div className="projectCard">
                        <FlipCard
                          front={<img src={RektaW} alt="Rekta Sikad project preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                          back={
                            <div className="flipCardBack">
                              <span className="flipCardTag">Rekta Sikad</span>
                              <span className="flipCardStack">HTML · CSS · Bootstrap</span>
                              <p className="flipCardDesc">A bike-themed website built with HTML, CSS, and Bootstrap.</p>
                              <a className="flipCardLink" href="https://alexpacaldo.github.io/MiniProject1/" target="_blank" rel="noreferrer">Visit Site <i className="bi bi-arrow-right"></i></a>
                            </div>
                          }
                          width={cardWidth}
                          height={cardHeight(1080 / 1920)}
                          radius={18}
                          background="linear-gradient(135deg, #000000 0%, #111827 100%)"
                          color="#ffffff"
                          shadowColor="#111827"
                          glareOpacity={0.18}
                          ariaLabel="Rekta Sikad project card"
                        />
                      </div>
                    </div>

                    <div className="col" data-aos="fade-up">
                      <div className="projectCard">
                        <FlipCard
                          front={<img src={AranW} alt="Araña project preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                          back={
                            <div className="flipCardBack">
                              <span className="flipCardTag">Araña</span>
                              <span className="flipCardStack">ReactJs · CSS · BootStrap · JavaScript</span>
                              <p className="flipCardDesc">A React-powered website built with Bootstrap and JavaScript.</p>
                              <a className="flipCardLink" href="https://alexpacaldo.github.io/MiniProject2/" target="_blank" rel="noreferrer">Visit Site <i className="bi bi-arrow-right"></i></a>
                            </div>
                          }
                          width={cardWidth}
                          height={cardHeight(1080 / 1920)}
                          radius={18}
                          background="linear-gradient(135deg, #000000 0%, #111827 100%)"
                          color="#ffffff"
                          shadowColor="#111827"
                          glareOpacity={0.18}
                          ariaLabel="Araña project card"
                        />
                      </div>
                    </div>

                    <div className="col" data-aos="fade-up">
                      <div className="projectCard">
                        <FlipCard
                          front={<img src={UcookW} alt="U Cookin project preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                          back={
                            <div className="flipCardBack">
                              <span className="flipCardTag">U Cookin</span>
                              <span className="flipCardStack">ReactJs · NodeJS · MySQL</span>
                              <p className="flipCardDesc">A full-stack cooking web app built with React, Node.js, and MySQL.</p>
                              <a className="flipCardLink" href="https://capstone-kodego-m39pjmzzk-wadze213.vercel.app/?fbclid=IwAR34eXrT2dAKNIsC_DqIwYDp3iyCI7RJBuplSVH8wbRgmRpp1HhZchpA1YE%5C" target="_blank" rel="noreferrer">Visit Site <i className="bi bi-arrow-right"></i></a>
                            </div>
                          }
                          width={cardWidth}
                          height={cardHeight(1080 / 1920)}
                          radius={18}
                          background="linear-gradient(135deg, #000000 0%, #111827 100%)"
                          color="#ffffff"
                          shadowColor="#111827"
                          glareOpacity={0.18}
                          ariaLabel="U Cookin project card"
                        />
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
