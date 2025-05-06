import React from "react";
import "../styles/FAQ.css";

const FAQ = () => {
  return (
    <div className="page-wrapper">
      <div className="faq-container">
        <h1 className="faq-heading">Frequently Asked Questions</h1>

        <div className="faq-item">
          <h3 className="faq-question">What is CIRT?</h3>
          <p className="faq-answer">
          We are the Criminology Institute for Research and Training (CIRT) at the University of Tampa, a dynamic hub established in 2023 with a mission to foster academic excellence, promote interdisciplinary research, and support the professional growth of students, faculty and criminal justice professionals pursuing careers in criminology and criminal justice.
          </p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">Who can submit a research poster?</h3>
          <p className="faq-answer">
          Undergraduate and graduate students pursuing criminology or related fields of study are strongly encouraged to participate in our bi-annual research symposium by submitting their original research posters. This event provides a valuable platform for students to showcase their work, engage in scholarly discourse, and gain recognition for their efforts. Whether you're exploring emerging topics in criminal justice, conducting data-driven analysis, or presenting theoretical insights, the symposium offers a supportive and professional environment to share your findings with peers, faculty, and field experts.
          </p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">Can faculty get involved?</h3>
          <p className="faq-answer">
          Yes, faculty are highly encouraged to become actively involved with CIRT. They can serve as peer reviewers, providing expert evaluation and feedback on student submissions to ensure high quality and integrity. As mentors, faculty can guide students through the research process. Additionally, faculty are welcome to contribute their own scholarly work to the CIRT Journal and participate in symposium events. Their involvement not only enriches the learning experience for students but also strengthens our commitment to collaborative research and professional development.
          </p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">How does the peer-review process work?</h3>
          <p className="faq-answer">
          All submissions undergo a rigorous peer-review process conducted by faculty members with specialized expertise in various areas of criminology and criminal justice. These faculty reviewers carefully evaluate each submission for originality, methodological soundness, and relevance. The goal is to maintain high academic standards while also supporting the development of student researchers. After review, authors receive constructive feedback aimed at helping them improve the quality and impact of their work before final acceptance and publication in the CIRT Journal or presentation at the symposium. This process not only ensures scholarly integrity but also creates a valuable learning environment for emerging researchers.
          </p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">Where can I find resources for research methodology?</h3>
          <p className="faq-answer">
          The Resources section of our website offers a comprehensive collection of guides, tutorials, and academic references designed to support students at every stage of the research process. Whether you're just beginning to explore a topic or preparing a manuscript for submission, these materials provide assistance with data collection and analysis, and academic writing. You'll find resources on formulating research questions, conducting literature reviews, selecting appropriate methodologies, interpreting data, and adhering to proper citation and formatting guidelines. Our goal is to equip students with the tools and knowledge they need to conduct high-quality research and communicate their findings effectively.
          </p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">How can I contact CIRT for more information?</h3>
          <p className="faq-answer">
            You can email us at cirt@ut.edu or call (813) 555-1234 for any additional concerns or inquiries.
          </p>
        </div>

        <footer className="footer">
          <p>© 2025 CIRT - Criminology Institute for Research & Training | University of Tampa</p>
          <p>Contact: cirt@ut.edu | (813) 555-1234</p>
        </footer>
      </div>
    </div>
  );
};

export default FAQ;
