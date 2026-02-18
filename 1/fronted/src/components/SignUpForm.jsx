import { useForm } from "react-hook-form";
import axios from "../api/config";
import { toast } from "react-toastify";
const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleForm = (data) => {
    console.log(data);
    try {
      axios
        .post("/auth/register", data)
        .then((data) => {
          toast.success(data.data.message);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } catch (err) {
      toast.error(err.response.data.message);
    }
    reset();
  };
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Create Account
      </h1>
      <form onSubmit={handleSubmit(handleForm)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            type="text"
            placeholder="Enter Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            type="email"
            placeholder="Enter Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            {...register("password", { required: "Password is required" })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            type="password"
            placeholder="Enter Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 mt-4">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
