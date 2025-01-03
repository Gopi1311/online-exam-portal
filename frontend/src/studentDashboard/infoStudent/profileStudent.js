import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProfileStudent = () => {
  axios.defaults.withCredentials = true;

  const [profiles, setProfiles] = useState({});
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/user/profile`)
      .then((res) => {
        console.log(res.data);
        setProfiles(res.data);
        //FOR GET IMAGE
        return axios.get(`http://localhost:8081/student/profileStudent/image`, {
          responseType: "blob",
        });
      })
      .then((imgres) => {
        const imageURL = URL.createObjectURL(imgres.data);
        setImageSrc(imageURL);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
      <div className="w-50 bg-white rounded shadow p-4">
        <div className="d-flex align-items-center justify-content-between">
          <h2 className="text-primary mb-0">Student Detail</h2>
          <img
            src={imageSrc}
            alt="Student"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              border: "2px solid #000",
            }}
            className="rounded-circle"
          />
        </div>
        <div className="mt-3">
          <h6 className="text-muted">Student Name:</h6>
          <p className="border-bottom pb-2">{profiles.name}</p>
        </div>
        <div className="mt-3">
          <h6 className="text-muted">E-mail ID:</h6>
          <p className="border-bottom pb-2">{profiles.email}</p>
        </div>
        <div className="mt-3">
          <h6 className="text-muted">Institute Name:</h6>
          <p className="border-bottom pb-2">{profiles.institute}</p>
        </div>
        <Link to="/studenthomedash" className="btn btn-primary btn-block mt-4">
          Back
        </Link>
      </div>
    </div>
  );
};

export default ProfileStudent;
