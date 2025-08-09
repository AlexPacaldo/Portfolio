import './App.css';
import lapPhonearan from '../src/img/home/lapPhonearan.png';
import LapRekta from '../src/img/home/lapPhonerekta.png';
import LapUcook from '../src/img/home/lapPhoneuCook.png';
import LOGO from '../src/img/home/LOGO.jpg';
import ME from '../src/img/about/me2.png';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import AranW from '../src/img/works/aranDesk.png';
import RektaW from '../src/img/works/Rekta Sikad.png';
import BookW from '../src/img/works/BookWorm.png';
import UcookW from '../src/img/works/uCookDesk.png';
import Swal from 'sweetalert2';

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

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "8a0fae47-b4cc-4b62-af81-ba7a62afaec0");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      Swal.fire({
        title: "Thank You for Reaching Out!",
        text: "Your message has been successfully sent. I will get back to you as soon as possible.",
        icon: "success"
      });
    }
  };

  return (
    <div>
      <div className="container1">
          <nav className="navbar navbar-expand-md navbar-light " data-aos="fade-down">
              <div className="navName">
                  <img src={LOGO}></img>
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
                <marquee width="100%" direction="left" scrollamount="20">
                  <h1><b>Turning Ideas into Reality</b></h1>
                </marquee>
              </div>
              <article className="backgroundArticle">
                  <div className="container-fluid article1">
                      <div className="text-center py-1 py-md-1" data-aos="fade-up">
                          <div className="typing-container">
                              <h2 className="display-6 text-dark">HAVE AN IDEA IN MIND?</h2>
                              <h2 className="display-6 text-dark">LET'S MAKE IT HAPPEN!</h2>
                          </div>
                          <h5>Meet Alex Pacaldo, a 22-year-old web developer.</h5>
                          <br></br>
                          <a className="hireMe btn btn-dark" role="button" onClick={scrollToBottom}>HIRE ME!</a>
                      </div>
                      <div><img src={ME} className="articlePic" data-aos= "fade-left"></img></div>
                  </div>
              </article>

              
              <div className='Caru' data-aos = 'fade-up'>
                <svg className='svgTop' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#000000ff" fill-opacity="1" d="M0,256L60,256C120,256,240,256,360,245.3C480,235,600,213,720,213.3C840,213,960,235,1080,234.7C1200,235,1320,213,1380,202.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
                <h1 className="RecentProj"><i>Recent Projects</i></h1>
                <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="false">
                    {/* <div className="carousel-indicators">
                      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div> */}
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img src={lapPhonearan} className="d-block w-100" alt="..."></img>
                      </div>
                      <div className="carousel-item">
                        <img src={LapRekta} className="d-block w-100" alt="..."></img>
                      </div>
                      <div className="carousel-item">
                        <img src={LapUcook} className="d-block w-100" alt="..."></img>
                      </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <svg className='svgBot' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#000000ff" fill-opacity="1" d="M0,256L60,256C120,256,240,256,360,245.3C480,235,600,213,720,213.3C840,213,960,235,1080,234.7C1200,235,1320,213,1380,202.7L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
              </div>


          <div className='d-flex justify-content-center'>
            <div className="articleCont container-fluid">
              <div className='About'>
                <h1 data-aos="zoom-in"><b>About Me</b></h1>
                <div className='Aboutt'>

                  <div className='grid1about'>
                
                    <div className="AboutDesc d-flex flex-column flex-md-row" data-aos="fade-right">
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

                    <div className="skills-grid" data-aos="fade-left">
                      <div className="skill-item">💻 GitHub</div>
                      <div className="skill-item">🌐 HTML5</div>
                      <div className="skill-item">🎨 CSS3</div>
                      <div className="skill-item">📱 Responsive Design</div>
                      <div className="skill-item">⚙️ JavaScript</div>
                      <div className="skill-item">☕ Java</div>
                      <div className="skill-item">🧩 Bootstrap</div>
                      <div className="skill-item">⚛️ ReactJS</div>
                      <div className="skill-item">🔗 Node.js</div>
                      <div className="skill-item">🛢️ MySQL</div>
                      <div className="skill-item">🔣 C#</div>
                    </div>
                    
                    <div className='timeLcont' data-aos="fade-up">
                      <div className="timeline">
                        <div className="timeCont">
                          <h5>August 2023 - Present</h5>
                          <h3><b>STI College Ortigas-Cainta</b></h3>
                          <h5>Bachelor of Science in Computer Science</h5>
                        </div>
                        <div className="timeCont">
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
                            <figure><img src={BookW} width="100%" className="gridCont"></img></figure>
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
                            <figure><img src={RektaW} width="100%" className="gridCont"></img></figure>
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
                            <figure><img src={AranW} width="100%" className="gridCont"></img></figure>
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
                            <figure><img src={UcookW} width="100%" className="gridCont"></img></figure>
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
                  <div className='CC1'>
                    <h1><b>Contact Me</b></h1>
                    <h3>Get in touch with me:</h3>
                  </div>
                  <div className="py-5 px-md-3 contactMe">
                    <div className="formm">
                      <form onSubmit={onSubmit}>
                      
                        <label for="name">Name</label>
                        <input className="form-control" type="text" name="name" required ></input><br></br>

                        <label for="email"> Your Email</label>
                        <input className="form-control" type="email" name="email" required></input><br></br>

                        <label for="message">Message</label>
                        <textarea className="form-control" name="message" id="" rows="3" required></textarea>
                        <br></br>

                        <button type="submit" class="btn btn-dark">Submit</button>
                      </form>


                    </div>
                    <div className="formm2">
                      <a href="mailto:alexpacaldo1105@gmail.com?subject = Feedback&body = Message">
                        <i className="bi bi-envelope-fill mx-2"></i>
                        alexpacaldo1105@gmail.com
                      </a>
                      <br></br><br></br>
                      <a href="https://www.linkedin.com/in/alex-pacaldo-00046a269/">
                        <i className="bi bi-linkedin mx-2"></i>
                        Alex Pacaldo
                      </a>
                      <br></br><br></br>
                      <a href="https://github.com/AlexPacaldo">
                        <i className="bi bi-github mx-2"></i>
                        AlexPacaldo
                      </a>
                      <br></br><br></br>
                    </div>


                    <br></br>
                  </div>
                  <p className='ContMess'>
                    Thank you for visiting this page for my contact information you made a great decision!
                    I am accepting offers for full-time/part-time remote positions as a Full-Stack Developer.
                    Contact me if you are interested!
                  </p>
                  <p>Thank you!</p>
                  <p><b>Alex Pacaldo</b> - Full-Stack Developer</p>
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
