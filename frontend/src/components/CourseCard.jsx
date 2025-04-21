// src/components/CourseCard.jsx
import { Link } from 'react-router-dom';

const CourseCard = ({ title, path }) => (
  <Link to={`/courses/${path}`}>
    <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition duration-300 cursor-pointer">
      <h4 className="text-xl font-semibold text-gray-800 mb-2">{title}</h4>
      <p className="text-gray-600">Comprehensive coaching with expert faculty and detailed materials.</p>
    </div>
  </Link>
);

export default CourseCard;
