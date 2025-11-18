import React from "react";
import "./Service2.css";

const Service2 = () => {
  const services = [
    {
      title: "Online Courses",
      desc:"Access a diverse range of curated online courses ranging from high school to higher level; class 8 to class 12, including the higher educational course like arts, science and commerce, designed by expert educators, covering subjects from foundational learning to advanced skills.",
    },
    {
      title: "Interactive Live Classes",
      desc:"Join real-time sessions with instructors, ask questions, and collaborate with peers for an immersive and engaging learning experience.",
    },
    {
      title: "Study Materials",
      desc:"Access these recorded live courses and study materials once applied to the course by logging in to you account.",
    },
    {
      title: "All from your own device",
      desc:"The online courses and the features will be accessible through your own devices no matter the loaction, which will be efficient for all.",
    },
    {
      title: "Personalized Dashboard",
      desc:"Every student will have their own personalized dashboard once they registered to the course, where they can keep track of their learning progress, and access their study materials.",
    },
    {
      title: "Community & Support",
      desc: "Engage with fellow learners and instructors, exchange ideas, and receive dedicated support from our academic team.",
    },
  ];

  return (
    <div className="service2-container fade-in-up">
      <header className="service2-header fade-in-up">
        <h1>Our E-Learning Services</h1>
        <p>
          Shiksha provides a comprehensive e-learning platform to empower students and educators alike.  
          Explore our services designed to deliver seamless learning experiences anytime, anywhere.
        </p>
      </header>

      <section className="service2-list">
        {services.map((service, index) => (
          <div
            key={index}
            className="service2-item fade-in-up"
            style={{ animationDelay: `${0.2 * index}s` }}
          >
            <h2>{service.title}</h2>
            <p>{service.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Service2;