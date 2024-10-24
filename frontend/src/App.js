import Login from "./userAuthentication/login";
import StudentSignup from "./userAuthentication/studentsignup";
import Aboutus from "./homeDashBoard/Aboutus";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter , Routes, Route} from "react-router-dom"
import TeacherSignup from "./userAuthentication/teachersignup";
import TeacherHomeDashboard from "./teacherDashboard/teacherHomeDash";
import StudentHomeDash from "./studentDashboard/studentHomeDash"
import DashBoard from "./homeDashBoard/dashBoard";
import ProfileTeacher from "./teacherDashboard/infoTeacher/profileTeacher";
import CreateTestPage from "./teacherDashboard/infoTeacher/createTestPage";
import ViewTestTeacher from "./teacherDashboard/infoTeacher/viewTestTeacher";
import ReportTeacher from "./teacherDashboard/infoTeacher/reportTeacher";
import UpdateTest from "./teacherDashboard/infoTeacher/updateTest";
import ReportStudent from "./studentDashboard/infoStudent/reportStudent";
import ProfileStudent from "./studentDashboard/infoStudent/profileStudent";
import TakeTest from "./studentDashboard/infoStudent/takeTest";
import ExamInstruction from "./studentDashboard/infoStudent/examInstruction";
import StatusStudent from "./studentDashboard/infoStudent/statusStudent";
import FacialRecognition from "./faceRecogniznation/faceAuth";
import axios from "axios";

axios.defaults.withCredentials = true;
function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Routes>
            <Route path='/' element={ <DashBoard/>}  />
            <Route path='/login' element={ <Login/>}  />
            <Route path='/studentsignup' element={ <StudentSignup/>}  />
            <Route path='/aboutus' element={ <Aboutus/>}  />
            <Route path='/teachersignup' element={ <TeacherSignup/>}  />
            <Route path='/studenthomedash' element={ <StudentHomeDash/>}  />
            <Route path='/teacherhomedash' element={ <TeacherHomeDashboard/>}  />
            <Route path='/profileteacher' element={ <ProfileTeacher/>}/>
            <Route path='/CreateTestPage' element={ <CreateTestPage/>}/>
            <Route path='/viewtestteacher/:id' element={ <ViewTestTeacher/>}/>
            <Route path='/reportteacher' element={<ReportTeacher/>}/>
            <Route path='/updatetest/:id' element={<UpdateTest/>}/>


            <Route path='/reportstudent' element={<ReportStudent/>}/>
            <Route path='/profilestudent' element={<ProfileStudent/>}/>
            <Route path='/taketest/:id' element={<TakeTest/>}/>
            <Route path='/examinstruction/:id' element={<ExamInstruction/>}/>
            <Route path='/statusstudent/:id' element={<StatusStudent/>}/>
            <Route path='/faceauth' element={<FacialRecognition/>}/>
        </Routes>
     </BrowserRouter>
  
    </div>
  );
}

export default App;
