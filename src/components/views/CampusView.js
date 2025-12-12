/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
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
  card: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "18px",
    border: "1px solid #e6e6ef",
  },
  title: {
    fontWeight: "bold",
    color: "#11153e",
  },
  meta: {
    color: "#444",
    marginTop: "10px",
  },
  image: {
    width: "100%",
    maxWidth: "520px",
    borderRadius: "10px",
    marginTop: "14px",
    border: "1px solid #e6e6ef",
  },
  buttonRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "14px",
  },
  sectionTitle: {
    marginTop: "22px",
    fontWeight: "bold",
    color: "#11153e",
  },
  list: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "12px",
    marginTop: "12px",
  },
  miniCard: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "14px",
    border: "1px solid #e6e6ef",
  },
  studentLink: {
    textDecoration: "none",
    color: "#11153e",
    fontWeight: "bold",
  },
}));

const CampusView = (props) => {
  const { campus, deleteCampus, history } = props;
  const classes = useStyles();

  // In case campus hasn't loaded yet
  if (!campus || !campus.id) {
    return (
      <div className={classes.page}>
        <div className={classes.container}>
          <div className={classes.card}>
            <Typography variant="h5" className={classes.title}>
              Loading campus...
            </Typography>
          </div>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    deleteCampus(campus.id);
    history.push("/campuses");
  };

  return (
    <div className={classes.page}>
      <div className={classes.container}>
        {/* Campus Details */}
        <div className={classes.card}>
          <Typography variant="h4" className={classes.title}>
            {campus.name}
          </Typography>

          <Typography variant="body1" className={classes.meta}>
            <strong>Address:</strong> {campus.address}
          </Typography>

          <Typography variant="body1" className={classes.meta}>
            <strong>Description:</strong>{" "}
            {campus.description ? campus.description : "No description provided."}
          </Typography>

          {campus.imageUrl ? (
            <img className={classes.image} src={campus.imageUrl} alt={campus.name} />
          ) : null}

          <div className={classes.buttonRow}>
            <Link to={`/editcampus/${campus.id}`} style={{ textDecoration: "none" }}>
              <Button variant="outlined" color="primary">
                Edit Campus
              </Button>
            </Link>

            <Button variant="contained" color="secondary" onClick={handleDelete}>
              Delete Campus
            </Button>

            <Link to="/campuses" style={{ textDecoration: "none" }}>
              <Button variant="outlined" color="primary">
                Back to Campuses
              </Button>
            </Link>
          </div>
        </div>

        {/* Students Section */}
        <Typography variant="h5" className={classes.sectionTitle}>
          Students
        </Typography>

        {campus.students && campus.students.length ? (
          <div className={classes.list}>
            {campus.students.map((student) => {
              const name = `${student.firstname} ${student.lastname}`;
              return (
                <div key={student.id} className={classes.miniCard}>
                  <Link className={classes.studentLink} to={`/student/${student.id}`}>
                    {name}
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={classes.card} style={{ marginTop: "12px" }}>
            <Typography variant="body1" style={{ color: "#333" }}>
              No students enrolled at this campus.
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampusView;
