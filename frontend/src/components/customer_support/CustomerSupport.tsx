import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { customerSupportAPI } from "../../Features/customerSupport/customerSupportAPI"; // Correct path
import { toast } from "sonner";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

// Yup validation schema
const schema = yup.object({
  email: yup.string().email().required("Email is required"),
  subject: yup.string().required("Subject is required"),
  description: yup.string().required("Description is required"),
});

type FormData = yup.InferType<typeof schema>;

const CustomerSupportForm = () => {
  // Type user correctly to avoid TS errors
  const user = useSelector((state: RootState) => state.user.user) as { userID: number } | null;

  const [createTicket, { isLoading }] = customerSupportAPI.useCreateSupportTicketMutation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (!user?.userID) return; // Safety check

    try {
      await createTicket({
        ...data,
        userID: user.userID,
      }).unwrap();

      toast.success("Ticket created successfully!");
      reset(); // Clear the form
    } catch {
      toast.error("Failed to create a ticket. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl mx-auto">
      <input
        {...register("email")}
        placeholder="Your Email"
        className="input input-bordered w-full"
      />
      <p className="text-red-500">{errors.email?.message}</p>

      <input
        {...register("subject")}
        placeholder="Subject"
        className="input input-bordered w-full"
      />
      <p className="text-red-500">{errors.subject?.message}</p>

      <textarea
        {...register("description")}
        placeholder="Describe your issue"
        className="textarea textarea-bordered w-full"
      />
      <p className="text-red-500">{errors.description?.message}</p>

      <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Create Ticket"}
      </button>
    </form>
  );
};

export default CustomerSupportForm;
