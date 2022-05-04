import React from "react";

const signup = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault();

    let name = e.target.elements.name?.value;
    let email = e.target.elements.email?.value;
    let password = e.target.elements.password?.value;

    console.log(name, email, password);
  };
  return (
    <div className="h-screen flex bg-gray-bg1">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
          Sign Up
        </h1>

        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="name"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="name"
              placeholder="Name"
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="email"
              placeholder="Email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="password"
              placeholder="Password"
            />
          </div>

          <div className="flex justify-center items-center mt-6">
            <button
              className={`bg-green py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark`}
            >
              SignUp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default signup;
