/*==================================================
AllStudentsView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the all students view page.
================================================== */
import React from "react";
import { Link } from "react-router-dom";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles(() => ({
  page: {
    minHeight: "calc(100vh - 64px)",
    padding: "30px 20px",
    backgroundColor: "#f5f6fa",
  },
  container: {
    maxWidth: "900px",
    margin: "0 auto",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "16px",
  },
  title: {
    fontWeight: "bold",
    color: "#11153e",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "14px",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "16px",
    border: "1px solid #e6e6ef",
  },
  studentName: {
    fontWeight: "bold",
    textDecoration: "none",
    color: "#11153e",
  },
  meta: {
    color: "#444",
    marginTop: "6px",
  },
  image: {
    width: "120px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "10px",
    border: "1px solid #e6e6ef",
    marginTop: "10px",
  },
  buttonRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "12px",
  },
  emptyCard: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "18px",
    border: "1px solid #e6e6ef",
  },
}));

const AllStudentsView = (props) => {
  const { students, deleteStudent } = props;
  const classes = useStyles();

  const EmptyState = () => (
    <div className={classes.emptyCard}>
      <Typography variant="h5" className={classes.title}>
        All Students
      </Typography>
      <Typography variant="body1" style={{ marginTop: "8px", color: "#333" }}>
        There are no students yet. Add your first student to get started.
      </Typography>

      <div className={classes.buttonRow}>
        <Link to="/newstudent" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Add New Student
          </Button>
        </Link>

        <Link to="/" style={{ textDecoration: "none" }}>
          <Button variant="outlined" color="primary">
            Back Home
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className={classes.page}>
      <div className={classes.container}>
        <div className={classes.headerRow}>
          <Typography variant="h4" className={classes.title}>
            All Students
          </Typography>

          <div className={classes.buttonRow} style={{ marginTop: 0 }}>
            <Link to="/newstudent" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary">
                Add New Student
              </Button>
            </Link>

            <Link to="/" style={{ textDecoration: "none" }}>
              <Button variant="outlined" color="primary">
                Home
              </Button>
            </Link>
          </div>
        </div>

        {!students.length ? (
          <EmptyState />
        ) : (
          <div className={classes.grid}>
            {students.map((student) => {
              const name = `${student.firstname} ${student.lastname}`;

              return (
                <div key={student.id} className={classes.card}>
                  <Link to={`/student/${student.id}`} style={{ textDecoration: "none" }}>
                    <Typography variant="h5" className={classes.studentName}>
                      {name}
                    </Typography>
                  </Link>

                  <Typography variant="body2" className={classes.meta}>
                    <strong>Student ID:</strong> {student.id}
                  </Typography>

                  <Typography variant="body2" className={classes.meta}>
                    <strong>Email:</strong> {student.email ? student.email : "N/A"}
                  </Typography>

                  <Typography variant="body2" className={classes.meta}>
                    <strong>GPA:</strong>{" "}
                    {student.gpa !== null && student.gpa !== undefined ? student.gpa : "N/A"}
                  </Typography>

                  <Typography variant="body2" className={classes.meta}>
                    <strong>Campus:</strong> {student.campus ? student.campus.name : "None"}
                  </Typography>

                  {student.imageUrl ? (
                    <img className={classes.image} src={student.imageUrl} alt={name} />
                  ) : null}

                  <div className={classes.buttonRow}>
                    <Link to={`/student/${student.id}`} style={{ textDecoration: "none" }}>
                      <Button variant="contained" color="primary">
                        View
                      </Button>
                    </Link>

                    <Link to={`/editstudent/${student.id}`} style={{ textDecoration: "none" }}>
                      <Button variant="outlined" color="primary">
                        Edit
                      </Button>
                    </Link>

                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => deleteStudent(student.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllStudentsView;