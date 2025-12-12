/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

const CampusView = (props) => {
  const { campus, deleteCampus, history } = props;

  // In case campus hasn't loaded yet
  if (!campus || !campus.id) {
    return <div>Loading campus...</div>;
  }

  const handleDelete = () => {
    deleteCampus(campus.id);
    history.push("/campuses");
  };

  return (
    <div>
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      
      <Link to={`/editcampus/${campus.id}`}>
        <button>Edit Campus</button>
      </Link>

      {/* Delete Campus button */}
      <button onClick={handleDelete}>
        Delete This Campus
      </button>

      <h2>Students</h2>
      {campus.students && campus.students.length ? (
        campus.students.map((student) => {
          const name = student.firstname + " " + student.lastname;
          return (
            <div key={student.id}>
              <Link to={`/student/${student.id}`}>
                <h3>{name}</h3>
              </Link>
            </div>
          );
        })
      ) : (
        <p>No students enrolled at this campus.</p>
      )}
    </div>
  );
};

export default CampusView;
