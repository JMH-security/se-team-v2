"use client"


import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { addJob } from '@/actions/addJob';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const initialState = {
    message: "",
  };


export function AddJob({ customerId }: { customerId: string }) {
  
  
    const [state, formAction] = useActionState(addJob, initialState);

  const Submit = () => {
    const { pending } = useFormStatus();
    return <Button type="submit" disabled={pending}>{pending ? 'Adding...' : 'Add Job'}</Button>;
  };

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="customerId" value={customerId} />
      <Input id="jobNumber" name="jobNumber" placeholder="Job Number" />
      <Input id="JobDescription" name="jobDescription" placeholder="Job Name" />
      <Submit />
      {state?.error && <pre className="text-red-500 text-sm">{JSON.stringify(state.error, null, 2)}</pre>}
    </form>
  );
}
