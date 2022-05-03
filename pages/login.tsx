const Login = () => {
  return (
    
      <form action="">
        <div>
          <label for="username">Username</label>
          <input type="text" placeholder="Enter Username" name="uname" required>
          <ErrorMessage name="username" component="div" />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" placeholder="Enter Password" name="psw" required>
          <ErrorMessage name="password" component="div" />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            Login
          </button>
        </div>
      </form>
    
  );
};

export default Login;