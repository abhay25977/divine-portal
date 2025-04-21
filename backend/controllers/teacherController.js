import Teacher from '../models/Teacher.js';

// Register Teacher
const registerTeacher = async (req, res) => {
  const { firstName, middleName, lastName, email, password, teacherId, subjects, grade, academicYear, contact, address } = req.body;

  try {
    // Check if teacher already exists
    const teacherExists = await Teacher.findOne({ email });
    if (teacherExists) {
      return res.status(400).json({ message: 'Teacher already exists' });
    }

    // Create a unique teacher ID (you can customize this)
    const teacherId = `TCH${Date.now()}`;

    // Create new teacher
    const teacher = new Teacher({
      firstName,
      middleName,
      lastName,
      email,
      password,
      teacherId,
      subjects,
      grade,
      academicYear,
      contact,
      address,
      teacherId,
    });

    // Hash password before saving
    await teacher.save();

    // Generate JWT token
    const token = generateToken(teacher._id);

    // Send response
    res.status(201).json({
      message: 'Teacher registered successfully',
      teacher: {
        _id: teacher._id,
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        email: teacher.email,
        teacherId: teacher.teacherId,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login Teacher
const loginTeacher = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find teacher by email
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if password matches
    const isMatch = await teacher.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = generateToken(teacher._id);

    // Send response
    res.json({
      message: 'Login successful',
      teacher: {
        _id: teacher._id,
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        email: teacher.email,
        teacherId: teacher.teacherId,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export { registerTeacher, loginTeacher };
