export default function Navbar({ setPage }) {
    return (
      <div style={styles.navbar}>
        <div style={styles.inner}>
          <h2 style={styles.logo}>HRMS Lite</h2>
          <div>
            <button onClick={() => setPage("dashboard")} style={styles.button}>
              Dashboard
            </button>
            <button onClick={() => setPage("employees")} style={styles.button}>
              Employees
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  const styles = {
    navbar: {
      backgroundColor: "#0f172a",
      padding: "18px 0",
    },
    inner: {
      maxWidth: "1100px",
      margin: "0 auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "white",
    },
    logo: {
      margin: 0,
    },
    button: {
      marginLeft: "12px",
      padding: "8px 16px",
      backgroundColor: "#3b82f6",
      border: "none",
      borderRadius: "6px",
      color: "white",
      cursor: "pointer",
    },
  };