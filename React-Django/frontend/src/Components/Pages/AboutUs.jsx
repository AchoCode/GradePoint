import React from "react";
import { useResponsive } from "../../useResponsive";

export const AboutUs = () => {
    const breakpoints = useResponsive([600, 900, 1200]);
  
  return (
    <div className={`contact-section ${breakpoints === 0 && "responsive"}`}>
      <div className="overview">
        <h2>About GradePoint</h2>
        <p className="overview-text">
          Welcome to <span>GradePoint </span> , your trusted partner in academic
          excellence! At GradePoint, we are committed to transforming the way
          schools, teachers, and students manage and access academic
          performance. Our platform is designed to
          <span> simplify the grading process </span> , making it efficient,
          accurate, and transparent. We understand that grades are more than
          just numbers – they reflect effort, growth, and achievement. That’s
          why we’ve built GradePoint to be a comprehensive tool that empowers
          educators to deliver detailed assessments and helps students and
          parents <span>track progress effectively.</span>
        </p>
      </div>
      <div className="overview">
        <h2>What we stand for</h2>
        <p className="overview-text">
          <span>Innovation:</span> We leverage modern technology to provide
          cutting-edge solutions tailored for educational institutions.
          <br />
          <span>Accuracy:</span> Precision in grading is at the heart of what we
          do, ensuring fair and reliable results.
          <br />
          <span>Accessibility:</span>
          GradePoint is user-friendly and accessible from anywhere, making it
          easier to stay updated on academic progress.
        </p>
      </div>
      <div className="overview">
        <h2>Our Vision</h2>
        <p className="overview-text">
          To <span>enhance education </span> by creating tools that streamline
          grading and academic tracking, fostering a system that motivates
          learners, supports educators, and inspires growth. To
          <span> become the leading platform </span> for academic grading and
          performance tracking, driving efficiency and
          <span> success in education</span>
          systems worldwide. Whether you're a school administrator, teacher,
          student, or parent, GradePoint is here to simplify your academic
          journey and help you focus on what truly matters – learning and
          growth. <span>Let’s shape the future of education together!</span>
        </p>
      </div>
    </div>
  );
};
