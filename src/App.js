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

function App() {

  useEffect(()=>{
    Aos.init({duration: 3000});
  }, [])


  return (
    <body>
      <div class="container1">
          <nav class="navbar navbar-expand-md navbar-light " data-aos="fade-down">
              <div class="navName">
                  <img src={LOGO}></img>
              </div>
              <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbar_collapse">
                  <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse justify-content-center" id="navbar_collapse">
                  <div class="navButts py-2 py-md-1">
                      <div><a href="index.html"><b>Home</b></a></div>
                      <div><a href="about.html"><b>About</b></a></div>
                      <div><a href="works.html"><b>Projects</b></a></div>
                      <div><a href="contact.html"><b>Contact</b></a></div>
                  </div>
              </div>
              <div class="navSocialMedia">
                  <div><a href="https://www.linkedin.com/in/alex-pacaldo-00046a269/"><i class="bi bi-linkedin"></i></a></div>
                  <div><a href="https://github.com/AlexPacaldo"><i class="bi bi-github"></i></a></div>
                  <div><a href="mailto:alexpacaldo1105@gmail.com?subject = Feedback&body = Message"><i class="bi bi-envelope-fill"></i></a></div>
              </div>
          </nav>
          <main>
              <article class="backgroundArticle">
                  <div class="container-fluid article1">
                      <div class="text-center py-1 py-md-1" data-aos="fade-up">
                          <div class="typing-container">
                              <h2 class="display-6 text-dark">HAVE AN IDEA IN MIND?</h2>
                              <h2 class="display-6 text-dark">LET'S MAKE IT HAPPEN!</h2>
                          </div>
                          <h5>Meet Alex Pacaldo, a 22-year-old web developer.</h5>
                          <br></br>
                          <a class="btn btn-dark" href="contact.html" role="button">HIRE ME!</a>
                      </div>
                      <div><img src={ME} class="articlePic" data-aos= "fade-left"></img></div>
                  </div>
              </article>
              <div data-aos="fade-up">
                <h1 class="RecentProj"><i>Recent Projects</i></h1>
                <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="false">
                    <div class="carousel-indicators">
                      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <img src={lapPhonearan} class="d-block w-100" alt="..."></img>
                      </div>
                      <div class="carousel-item">
                        <img src={LapRekta} class="d-block w-100" alt="..."></img>
                      </div>
                      <div class="carousel-item">
                        <img src={LapUcook} class="d-block w-100" alt="..."></img>
                      </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Next</span>
                    </button>
                </div>
              </div>


          <div className='d-flex justify-content-center'>
            <div className="articleCont container-fluid">
              <div className='About'>
                <h1 data-aos="zoom-in"><b>About Me</b></h1>

                <div className='grid1about'>

                  <div class="AboutDesc d-flex flex-column flex-md-row" data-aos="fade-right">
                    <p class="aboutME">
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

                  <div class="skills-grid" data-aos="fade-left">
                    <div class="skill-item">💻 GitHub</div>
                    <div class="skill-item">🌐 HTML5</div>
                    <div class="skill-item">🎨 CSS3</div>
                    <div class="skill-item">📱 Responsive Design</div>
                    <div class="skill-item">⚙️ JavaScript</div>
                    <div class="skill-item">☕ Java</div>
                    <div class="skill-item">🧩 Bootstrap</div>
                    <div class="skill-item">⚛️ ReactJS</div>
                    <div class="skill-item">🔗 Node.js</div>
                    <div class="skill-item">🛢️ MySQL</div>
                    <div class="skill-item">🔣 C#</div>
                  </div>
                  
                  <div className='timeLcont' data-aos="fade-up">
                    <div class="timeline">
                      <div class="timeCont">
                        <h5>August 2023 - Present</h5>
                        <h3><b>STI College Ortigas-Cainta</b></h3>
                        <h5>Bachelor of Science in Computer Science</h5>
                      </div>
                      <div class="timeCont">
                        <h5>August 2022 - December 2022</h5>
                        <h3><b>Kodego Bootcamp</b></h3>
                        <h5>
                          Completed an intensive 12-week web development program. <br></br>
                          <b>Recognitions:</b> Top Student, Best Mini Project 2
                        </h5>
                      </div>
                      <div class="timeCont">
                        <h5>2020 - 2022</h5>
                        <h3><b>STI Ortigas - Cainta </b></h3>
                        <h5>Senior High School STEM Student Completer</h5>
                      </div>
                      <div class="timeCont">
                        <h5>2016 - 2020</h5>
                        <h3><b>Greenland Academy</b></h3>
                        <h5>Junior High School Completer</h5>
                      </div>
                    </div>
                  </div>

                </div>


              </div>


              <div class="Projects">
                <div className='ProjCont'>
                  <div data-aos="zoom-in">
                    <h1 class="text-center"><b>My Projects</b></h1>
                    <p class="text-center">Projects that i made in 2022</p>
                  </div>
                  <div class="row row-cols-1 row-cols-md-2 gx-3">

                    <div class="col" data-aos="fade-right">
                      <div class="hover01 column">
                        <div>
                          <a href="https://alexpacaldo.github.io/ExamItem2/">
                            <figure><img src={BookW} width="100%" class="gridCont"></img></figure>
                          </a>
                          <h5 class="text-center">BookWorm</h5>
                          <p class="text-center">HTML, CSS, Bootstrap</p>
                        </div>
                      </div>
                    </div>

                    <div class="col" data-aos="fade-down">
                      <div class="hover01 column">
                        <div>
                          <a href="https://alexpacaldo.github.io/MiniProject1/">
                            <figure><img src={RektaW} width="100%" class="gridCont"></img></figure>
                          </a>
                          <h5 class="text-center">Rekta Sikad</h5>
                          <p class="text-center">HTML, CSS, Bootstrap</p>
                        </div>
                      </div>
                    </div>

                    <div class="col" data-aos="fade-up">
                      <div class="hover01 column">
                        <div>
                          <a href="https://alexpacaldo.github.io/MiniProject2/">
                            <figure><img src={AranW} width="100%" class="gridCont"></img></figure>
                          </a>
                          <h5 class="text-center">Araña</h5>
                          <p class="text-center">ReactJs, CSS, BootStrap, JavaScript</p>
                        </div>
                      </div>
                    </div>

                    <div class="col" data-aos="fade-left">
                      <div class="hover01 column">
                        <div>
                          <a href="https://capstone-kodego-m39pjmzzk-wadze213.vercel.app/?fbclid=IwAR34eXrT2dAKNIsC_DqIwYDp3iyCI7RJBuplSVH8wbRgmRpp1HhZchpA1YE%5C">
                            <figure><img src={UcookW} width="100%" class="gridCont"></img></figure>
                          </a>
                          <h5 class="text-center">U Cookin</h5>
                          <p class="text-center">ReactJs, NodeJS, MySQL</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>


              <div className='Contacts' data-aos="zoom-in">
                <div class="ContactCont">
                  <div className='CC1'>
                    <h1><b>Contact Me</b></h1>
                    <h3>Get in touch with me:</h3>
                  </div>
                  <div class="py-5 px-md-3 contactMe">
                    <div class="formm">
                      <form>

                        <label for="name">Name</label>
                        <input class="form-control" type="text" name="name" required ></input><br></br>

                        <label for="email">Email</label>
                        <input class="form-control" type="text" name="email" required></input><br></br>

                        <label for="message">Message</label>
                        <textarea class="form-control" name="message" id="" rows="3" required></textarea>
                        <br></br>

                        <input type="hidden" name="_captcha" value="false"></input>
                        <input type="hidden" name="_next" value="https://alexpacaldo.github.io/Portfolio/ThankYouPage.html"></input>

                        <button type="submit" class="btn btn-dark">Submit</button>
                      </form>

                    </div>
                    <div class="formm2">
                      <a href="mailto:alexpacaldo1105@gmail.com?subject = Feedback&body = Message">
                        <i class="bi bi-envelope-fill mx-2"></i>
                        alexpacaldo1105@gmail.com
                      </a>
                      <br></br><br></br>
                      <a href="https://www.linkedin.com/in/alex-pacaldo-00046a269/">
                        <i class="bi bi-linkedin mx-2"></i>
                        Alex Pacaldo
                      </a>
                      <br></br><br></br>
                      <a href="https://github.com/AlexPacaldo">
                        <i class="bi bi-github mx-2"></i>
                        AlexPacaldo
                      </a>
                      <br></br><br></br>
                    </div>


                    <br></br>
                  </div>
                  <p>
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
              <div class="footerSocialMedia">
                  <div><a href="https://www.linkedin.com/in/alex-pacaldo-00046a269/"><i class="bi bi-linkedin"></i></a></div>
                  <div><a href="https://github.com/AlexPacaldo"><i class="bi bi-github"></i></a></div>
                  <div><a href="mailto:alexpacaldo1105@gmail.com?subject = Feedback&body = Message"><i class="bi bi-envelope-fill"></i></a></div>
              </div>
          </footer>
     </div>




  </body>
  );
}

export default App;
