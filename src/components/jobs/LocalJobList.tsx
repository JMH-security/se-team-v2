import React from "react";
import { Button } from "../ui/button";
import { Item, ItemContent, ItemDescription, ItemTitle } from "../ui/item";

function LocalJobList({
  localJobs,
  fetchLocalJobs,
  deleteLocalJob,
  updateLocalJob,
}) {
  console.log("LocalJobList localJobs:", localJobs);
  return (
    <div className="container px-4 m-4 bg-primary/10 rounded-2xl">
      <div className="flex flex-row">
        <Item className="w-24 flex-none">
          <ItemContent>
            <ItemTitle>JobID</ItemTitle>
          </ItemContent>
        </Item>
        <Item className="w-32 flex-auto">
          <ItemTitle>Job Name</ItemTitle>
        </Item>
      </div>

      <ul className="mt-4 space-y-2">
        {localJobs.map((job) => (
          <li key={job._id} className="flex justify-between items-center">
            <div className="flex">
              <Item className="w-24 flex-none">
                <ItemContent>
                  <ItemTitle>{job.jobId}</ItemTitle>
                </ItemContent>
              </Item>
              <Item className="w-48 flex-auto">
                <ItemDescription>{job.jobName}</ItemDescription>
              </Item>
            </div>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => setEditingId(reg._id)}>
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteLocalJob(job._id)}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LocalJobList;
