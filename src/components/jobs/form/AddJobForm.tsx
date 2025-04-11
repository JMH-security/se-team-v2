"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { createJob } from "@/app/actions/jobActions";

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending}>
      Add Job
    </Button>
  );
}

export function AddJobForm() {
  // useActionState is available with React 19 (Next.js App Router)
  const [state, formAction] = useActionState(createJob, initialState);

  return (
    <form action={formAction}>
      <label htmlFor="job">Enter Task</label>
      <input type="text" id="job" name="job" required />
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}