/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
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
  hero: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "24px",
    marginBottom: "20px",
    border: "1px solid #e6e6ef",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "16px",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "18px",
    border: "1px solid #e6e6ef",
  },
  cardTitle: {
    fontWeight: "bold",
    marginBottom: "6px",
  },
  cardText: {
    color: "#444",
    marginBottom: "12px",
  },
  buttonRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
}));

const HomePageView = () => {
  const classes = useStyles();

  return (
    <div className={classes.page}>
      <div className={classes.container}>
        {/* Hero */}
        <div className={classes.hero}>
          <Typography variant="h4" style={{ fontWeight: "bold", color: "#11153e" }}>
            Campus & Student Directory
          </Typography>
          <Typography variant="body1" style={{ marginTop: "8px", color: "#333" }}>
            Manage campuses and students with full CRUD functionality.
            Use the buttons below to browse or add new records.
          </Typography>
        </div>

        {/* Cards */}
        <div className={classes.grid}>
          {/* Campuses card */}
          <div className={classes.card}>
            <Typography variant="h5" className={classes.cardTitle} style={{ color: "#11153e" }}>
              Campuses
            </Typography>
            <Typography variant="body2" className={classes.cardText}>
              View all campuses, create a new campus, and manage campus details.
            </Typography>

            <div className={classes.buttonRow}>
              <Link to="/campuses" style={{ textDecoration: "none" }}>
                <Button variant="contained" color="primary">
                  View Campuses
                </Button>
              </Link>

              <Link to="/newcampus" style={{ textDecoration: "none" }}>
                <Button variant="outlined" color="primary">
                  Add Campus
                </Button>
              </Link>
            </div>
          </div>

          {/* Students card */}
          <div className={classes.card}>
            <Typography variant="h5" className={classes.cardTitle} style={{ color: "#11153e" }}>
              Students
            </Typography>
            <Typography variant="body2" className={classes.cardText}>
              View all students, add new students, and edit student records (email, GPA, image URL).
            </Typography>

            <div className={classes.buttonRow}>
              <Link to="/students" style={{ textDecoration: "none" }}>
                <Button variant="contained" color="primary">
                  View Students
                </Button>
              </Link>

              <Link to="/newstudent" style={{ textDecoration: "none" }}>
                <Button variant="outlined" color="primary">
                  Add Student
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageView;