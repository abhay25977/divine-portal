import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const studentSchema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  dob: String,
  gender: String,
  religion: String,
  bloodGroup: String,
  medicalCondition: String,
  percentagePreviousClass: String,
  courseType: String,
  branch: String,
  courseDuration: String,

  // Academic Info
  grade: String,
  bsAcademicYear: String,
  adAcademicYear: String,
  month: String,
  medium: String,
  schoolName: String,
  subjects: [String],
  totalSubjects: Number,

  // Address
  address: {
    street: String,
    city: String,
    state: String,
    province: String,
    country: String,
    postalCode: String
  },

  // Contact Info
  contact: String,

  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  // Parent/Guardian
  fatherName: String,
  motherName: String,
  fatherContact: String,
  fatherOccupation: String,
  motherOccupation: String,
  guardianName: String,
  guardianRelation: String,

  studentId: {
    type: String,
    required: true,
    unique: true
  },
  profilePicture: {
    type: String,
    default: ''
  }

}, { timestamps: true });

// Hash password before save
studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
studentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('Student', studentSchema);
