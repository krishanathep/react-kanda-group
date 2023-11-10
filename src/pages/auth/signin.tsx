import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSignIn, useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import Preloader from "../../components/Preloader";
import axios from "axios";

const Signin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const signIn = useSignIn();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const REACT_APP_API =
    "https://full-stack-app.com/laravel_auth_jwt_api/public/api/auth/login";

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      await axios.post(REACT_APP_API, data).then((res) => {
        const token = res.data.access_token;
        if (token != null) {
          if (
            signIn({
              token: res.data.access_token,
              authState: res.data.user,
              expiresIn: 60,
              tokenType: "Bearer",
            })
          ) {
            navigate("/");
            console.log(useAuthUser)
          }
        } else {
          console.log("เกิดข้อผิดพลาด!!!");
        }
      });
    } catch (error) {
      console.log(error);
      reset({
        email: "",
        password: "",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading === true) {
    return <Preloader />;
  }

  return (
    <>
      <div className="hold-transition login-page">
        <div className="login-box">
          <div className="login-logo">
            <a href="#">
              <b>Admin</b>LTE
            </a>
          </div>
          <div id="auth_bg" className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Sign in to start your session</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3">
                  <input
                    className="form-control"
                    value={"test@gmail.com"}
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: true })}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope" />
                    </div>
                  </div>
                </div>
                {errors.email && (
                  <p className="text-danger">This username field is required</p>
                )}
                <div className="input-group mb-3">
                  <input
                    className="form-control"
                    value={"123456"}
                    type="password"
                    placeholder="Password"
                    {...register("password", { required: true })}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
                </div>
                {errors.password && (
                  <p className="text-danger">This password field is required</p>
                )}
                <div className="row">
                  <div className="col-8"></div>
                  <div className="col-4">
                    <button type="submit" className="btn btn-primary btn-block">
                      Sign In
                    </button>
                  </div>
                </div>
              </form>
              <p className="mb-0 mt-2">
                {/* <Link to={'/auth/signup'} className="text-center">
                Register a new membership
              </Link> */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
