/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import React from "react";
import PropTypes from "prop-types";
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
  campusName: {
    fontWeight: "bold",
    textDecoration: "none",
    color: "#11153e",
  },
  meta: {
    color: "#444",
    marginTop: "6px",
  },
  description: {
    color: "#333",
    marginTop: "8px",
  },
  image: {
    width: "100%",
    maxWidth: "420px",
    borderRadius: "10px",
    marginTop: "12px",
    border: "1px solid #e6e6ef",
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

const AllCampusesView = (props) => {
  const { allCampuses, deleteCampus } = props;
  const classes = useStyles();

  const EmptyState = () => (
    <div className={classes.emptyCard}>
      <Typography variant="h5" className={classes.title}>
        All Campuses
      </Typography>
      <Typography variant="body1" style={{ marginTop: "8px", color: "#333" }}>
        There are no campuses yet. Add your first campus to get started.
      </Typography>

      <div className={classes.buttonRow}>
        <Link to="/newcampus" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Add New Campus
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
            All Campuses
          </Typography>

          <div className={classes.buttonRow} style={{ marginTop: 0 }}>
            <Link to="/newcampus" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary">
                Add New Campus
              </Button>
            </Link>

            <Link to="/" style={{ textDecoration: "none" }}>
              <Button variant="outlined" color="primary">
                Home
              </Button>
            </Link>
          </div>
        </div>

        {!allCampuses.length ? (
          <EmptyState />
        ) : (
          <div className={classes.grid}>
            {allCampuses.map((campus) => (
              <div key={campus.id} className={classes.card}>
                <Link to={`/campus/${campus.id}`} style={{ textDecoration: "none" }}>
                  <Typography variant="h5" className={classes.campusName}>
                    {campus.name}
                  </Typography>
                </Link>

                <Typography variant="body2" className={classes.meta}>
                  <strong>Campus ID:</strong> {campus.id}
                </Typography>

                <Typography variant="body2" className={classes.meta}>
                  <strong>Address:</strong> {campus.address}
                </Typography>

                {campus.description ? (
                  <Typography variant="body2" className={classes.description}>
                    {campus.description}
                  </Typography>
                ) : (
                  <Typography variant="body2" className={classes.description}>
                    No description provided.
                  </Typography>
                )}

                {campus.imageUrl ? (
                  <img
                    className={classes.image}
                    src={campus.imageUrl}
                    alt={campus.name}
                  />
                ) : null}

                <div className={classes.buttonRow}>
                  <Link to={`/campus/${campus.id}`} style={{ textDecoration: "none" }}>
                    <Button variant="contained" color="primary">
                      View
                    </Button>
                  </Link>

                  <Link to={`/editcampus/${campus.id}`} style={{ textDecoration: "none" }}>
                    <Button variant="outlined" color="primary">
                      Edit
                    </Button>
                  </Link>

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteCampus(campus.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
  deleteCampus: PropTypes.func.isRequired,
};

export default AllCampusesView;