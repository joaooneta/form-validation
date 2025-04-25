import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters long"),
  email: z.string().email("Invalid email address"),
  birthYear: z
    .number({ invalid_type_error: "Birth year must be a number" })
    .max(new Date().getFullYear() - 18, "You must be at least 18 years old"),
});

export default function Form({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema), mode: "onTouched" });

  function onRegisterUser(data) {
    onSubmit(data);
    reset();
  }

  return (
    <div>
      <h1>Form validation</h1>
      <form onSubmit={handleSubmit(onRegisterUser)}>
        <div>
          <label>Name:</label>
          <input {...register("name")}></input>
          {errors.name && (
            <p style={{ color: "#f00" }}>{errors.name.message}</p>
          )}
        </div>

        <div>
          <label>Email:</label>
          <input {...register("email")}></input>
          {errors.email && (
            <p style={{ color: "#f00" }}>{errors.email.message}</p>
          )}
        </div>

        <div>
          <label>Birth Year:</label>
          <input {...register("birthYear", { valueAsNumber: true })}></input>
          {errors.birthYear && (
            <p style={{ color: "#f00" }}>{errors.birthYear.message}</p>
          )}
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
