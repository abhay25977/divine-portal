// src/pages/CoursePage.jsx
import { useParams } from "react-router-dom";

import Mathematics from "../components/ CourseDetails/Mathematics";
import Science from "../components/ CourseDetails/Science";
import English from "../components/ CourseDetails/English";
// import other courses...

const CoursePage = () => {
  const { courseId } = useParams();

  const courseComponents = {
    mathematics: <Mathematics />,
    science: <Science />,
    english: <English />,
    // ...other course mappings
  };

  return courseComponents[courseId] || <p className="mt-12 absolute text-3xl p-6 flex justify-center">Courses are coming soon . . .</p>;
};

export default CoursePage;
