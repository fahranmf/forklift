import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";
import ThemeToggle from "../components/ThemeToggle";
import Loading from "../components/Loading";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const err = params.get("error");
    if (err) setMsg(decodeURIComponent(err));

    (async () => {
      try {
        const { data } = await API.get("/auth/me");
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      } catch {
        // belum login, biarin
      }
    })();
  }, []); // eslint-disable-line

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const res = await API.post("/auth/login", { email, password });
      if (res.data?.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
      setMsg("Login berhasil!");
      navigate("/");
    } catch (err) {
      setMsg(err.response?.data?.msg || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API.defaults.baseURL}/auth/google`;
  };

  const handleMicrosoftLogin = () => {
    window.location.href = `${API.defaults.baseURL}/auth/microsoft`;
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-dvh bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white dark:bg-gray-800 shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 flex flex-col justify-center">
          <div className="flex flex-col justify-center items-center">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Sign In</h1>
              <ThemeToggle />
            </div>

            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center">
                <button
                  className="cursor-pointer w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                  onClick={handleGoogleLogin}
                  type="button"
                >
                  <div className="bg-white p-2 rounded-full">
                    <svg className="w-4" viewBox="0 0 533.5 544.3">
                      <path
                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                        fill="#4285f4"
                      />
                      <path
                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                        fill="#34a853"
                      />
                      <path
                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                        fill="#fbbc04"
                      />
                      <path
                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                        fill="#ea4335"
                      />
                    </svg>
                  </div>
                  <span className="ml-4">Sign Up with Google</span>
                </button>
              </div>

              <div className="flex flex-col items-center">
                <button
                  className="cursor-pointer w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline  mt-5"
                  onClick={handleMicrosoftLogin}
                  type="button"
                >
                  <div className="bg-white p-2 rounded-full">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path fill="#F35325" d="M1 1h6.5v6.5H1V1z" />
                      <path fill="#81BC06" d="M8.5 1H15v6.5H8.5V1z" />
                      <path fill="#05A6F0" d="M1 8.5h6.5V15H1V8.5z" />
                      <path fill="#FFBA08" d="M8.5 8.5H15V15H8.5V8.5z" />
                    </svg>
                  </div>

                  <span className="ml-4">Sign Up with Microsoft</span>
                </button>
              </div>

              <div className="my-12 border-b border-gray-300 dark:border-gray-600 text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 dark:text-gray-300 tracking-wide font-medium bg-white dark:bg-gray-800 transform translate-y-1/2">
                  Or sign in with e-mail
                </div>
              </div>

              <form className="mx-auto max-w-xs" onSubmit={handleLogin}>
                {msg && <p className="text-red-500 text-center mb-4">{msg}</p>}

                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-900 mt-5"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-gray-900 mt-5"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="submit"
                  className="cursor-pointer mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Sign In</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Kanan: Ilustrasi (opsional, bisa di-hide di mobile) */}
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
