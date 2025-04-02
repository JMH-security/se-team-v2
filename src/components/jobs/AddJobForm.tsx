"use client";

import submitJobForm from "@/app/actions/submitJobForm";

interface AddJobFormProps {
  customer: string;
}

export default function AddJobForm(customer: AddJobFormProps) {
  console.log("CustomerID", customer.customer.CustomerID);
  let vis = false;

  function setDefaultJobStartDate() {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 14);
    return futureDate;
  }

  return (
    <div className="mt-4 p-4">
      <form
        name="addnewjob"
        className="container mx-auto p-2 bg-gray-200 rounded-lg"
        action={"placeholder"}
      >
        <div className="container flex justify-center my-4 py-4 bg-gray-800 text-white">
          <h2>
            Add Job For Customer <b>{customer.customer.CustomerName}</b>
          </h2>
        </div>
        <div className="container flex flex-wrap mx-auto justify-center bg-gray-600 border-orange-700 border-solid border-2 ">
          <div className="container flex flex-wrap justify-start m-4 p-4 border-yellow-700 border-solid border-2 bg-gray-500">
            <div className="flex p-2">
              <input
                type="text"
                placeholder="Job Name"
                className="input input-bordered text-black min-w-80"
                id="title"
                name="title"
                required
              />
            </div>
            <div className="flex grow p-2">
              <input
                type="text"
                placeholder="Job Description"
                className="input input-bordered grow text-black"
                id="jobdescription"
                name="jobdescription"
                required
              />
            </div>
            <div className="container p-2">
              <textarea
                className="textarea textarea-bordered min-w-full"
                placeholder="Job Notes"
              ></textarea>
            </div>
          </div>
          <div className="flex flex-wrap grow p-2 border-red-700 border-solid border-2">
            <div className="container flex flex-wrap justify-start m-4 p-4 border-yellow-700 border-solid border-2 bg-gray-500">
              <div className="p-2 border-purple-700 border-solid border-2">
                <label htmlFor="activetypeid" className="flex m-1 text-white">
                  Job Status
                </label>
                <select
                  className="select flex grow min-w-56 text-black mx-auto"
                  id="activetypeid"
                  name="activetypeid"
                  required
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>
              <div className="p-2 border-purple-700 border-solid border-2">
                <label htmlFor="locationid" className="flex m-1 text-white">
                  Region
                </label>
                <select
                  className="select flex grow min-w-56 text-black mx-auto"
                  id="regionid"
                  name="regionid"
                  required
                >
                  <option value="4">Major Projects</option>
                  <option value="1">Central</option>
                  <option value="3">Midwest</option>
                  <option value="2">South</option>
                </select>
              </div>
              <div className="p-2 border-purple-700 border-solid border-2">
                <label htmlFor="locationid" className="flex m-1 text-white">
                  Servicing Branch or Project
                </label>
                <select
                  className="select flex grow min-w-56 text-black mx-auto"
                  id="locationid"
                  name="locationid"
                  required
                >
                  <option value="">Select Location</option>
                  <option value="210">Birmingham</option>
                  <option value="1">Atlanta</option>
                </select>
              </div>
              <div className="p-2 border-purple-700 border-solid border-2">
                <label htmlFor="supervisorid" className="flex m-1 text-white">
                  Supervisor
                </label>
                <select
                  className="select flex grow min-w-56 text-black mx-auto"
                  id="supervisorid"
                  name="supervisorid"
                  required
                >
                  <option value="1">Supervisor 1234</option>
                  <option value="2">Supervisor 2345</option>
                  <option value="3">Supervisor 3456</option>
                </select>
              </div>
            </div>

            <div className="container flex flex-wrap justify-start m-4 p-4 border-yellow-700 border-solid border-2 bg-gray-500">
              <div className="p-2 border-purple-700 border-solid border-2">
                <label htmlFor="datetostart" className="flex m-1 text-white">
                  Service Start Date
                </label>
                <input
                  type="date"
                  placeholder="Date to Start"
                  className="input input-bordered w-full max-w-xs min-w-56 text-black"
                  defaultValue={
                    new Date(new Date().setDate(new Date().getDate() + 14))
                      .toISOString()
                      .split("T")[0]
                  }
                  id="datetostart"
                  name="datetostart"
                  required
                />
              </div>
              <div className="p-2 border-purple-700 border-solid border-2">
                <label htmlFor="timetostart" className="flex m-1 text-white">
                  Service Start Time
                </label>
                <input
                  type="text"
                  placeholder="Time of Service Start"
                  className="input input-bordered w-full max-w-xs min-w-56 text-black"
                  defaultValue="07:00"
                  id="timetostart"
                  name="timetostart"
                  required
                />
              </div>
              <div className="p-2 border-purple-700 border-solid border-2">
                <label htmlFor="datetoend" className="flex m-1 text-white">
                  Service Discontinue Date
                </label>
                <input
                  type="date"
                  placeholder="Date to End Service"
                  className="input input-bordered w-full max-w-xs min-w-56 text-black"
                  defaultValue={
                    new Date(new Date().setDate(new Date().getDate() + 379))
                      .toISOString()
                      .split("T")[0]
                  }
                  id="datetoend"
                  name="datetoend"
                />
              </div>
              <div className="p-2 border-purple-700 border-solid border-2">
                <label htmlFor="svcdur" className="flex m-1 text-white">
                  Service Duration Type
                </label>
                <select
                  className="select flex grow min-w-56 text-black mx-auto"
                  id="svcdur"
                  name="svcdur"
                  required
                >
                  <option value="svcdur-recur">Recurring</option>
                  <option value="svcdur-onetime">One-Time</option>
                  <option value="svcdur-oncall">On-Call / Ad-hoc</option>
                </select>
              </div>
              <div className="p-2 border-purple-700 border-solid border-2">
                <label htmlFor="taxinsid" className="flex m-1 text-white">
                  Tax and Insurance
                </label>
                <select
                  className="select flex grow min-w-56 text-black mx-auto"
                  id="taxinsid"
                  name="taxinsid"
                  required
                >
                  <option value="3">AL Clerical</option>
                  <option value="2">AL Outside Sales</option>
                  <option value="1">AL Patrol Agency</option>
                  <option value="9">FL Clerical</option>
                </select>
              </div>
              <div className="p-2 border-purple-700 border-solid border-2">
                <label htmlFor="salestaxid" className="flex m-1 text-white">
                  Sales Tax ID
                </label>
                <select
                  className="select flex grow min-w-56 text-black mx-auto"
                  id="salestaxid"
                  name="salestaxid"
                  required
                >
                  <option value="1">Tax 1</option>
                  <option value="2">Tax 2</option>
                  <option value="3">Tax 3</option>
                  <option value="4">Tax 4</option>
                </select>
              </div>

              <div className="p-2 border-purple-700 border-solid border-2">
                <label htmlFor="hourscatid" className="flex m-1 text-white">
                  Hours Category ID
                </label>
                <select
                  className="select flex grow min-w-56 text-black mx-auto"
                  id="hourscatid"
                  name="hourscatid"
                  required
                >
                  <option value="1">Cat 1</option>
                  <option value="2">Cat 2</option>
                  <option value="3">Cat 3</option>
                  <option value="4">Cat 4</option>
                </select>
              </div>

              <div className="p-2 border-purple-700 border-solid border-2">
                <label htmlFor="hoursruleid" className="flex m-1 text-white">
                  Hours Rule ID
                </label>
                <select
                  className="select flex grow min-w-56 text-black mx-auto"
                  id="hoursruleid"
                  name="hoursruleid"
                  required
                >
                  <option value="1">Hours Rule 1</option>
                  <option value="2">Hours Rule 2</option>
                  <option value="3">Hours Rule 3</option>
                  <option value="4">Hours Rule 4</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap grow p-2 border-red-700 border-solid border-2">
              <div className="flex p-2 border-yellow-500 border-solid border-2">
                <div className="flex p-2 bg-slate-900">
                  <p className="content-center text-white">
                    Select Service Type
                  </p>
                </div>
                <div className="form-control border-green-700 border-solid border-2">
                  <label className="label cursor-pointer">
                    <span className="label-text text-white m-2">
                      Uniformed Security
                    </span>
                    <input
                      type="checkbox"
                      name="usec"
                      id="usec"
                      className="checkbox bg-white"
                    />
                  </label>
                  <label className="label cursor-pointer">
                    <span className="label-text text-white m-2">
                      Integrated Security
                    </span>
                    <input
                      type="checkbox"
                      name="int"
                      id="int"
                      className="checkbox bg-white"
                    />
                  </label>
                </div>
                <div className="border-green-700 border-solid border-2">
                  <label className="label cursor-pointer">
                    <span className="label-text text-white m-2">
                      Investigations
                    </span>
                    <input
                      type="checkbox"
                      name="inv"
                      id="inv"
                      className="checkbox bg-white"
                    />
                  </label>
                  <label className="label cursor-pointer">
                    <span className="label-text text-white m-2">Other</span>
                    <input
                      type="checkbox"
                      name="other"
                      id="other"
                      className="checkbox bg-white"
                    />
                  </label>
                </div>
              </div>

              <div className="p-2 border-purple-700 border-solid border-2">
                <label htmlFor="usec" className="flex m-1">
                  Uniform Security Type
                </label>
                <select
                  className="select flex grow min-w-56 text-black mx-auto"
                  id="usectype"
                  name="usectype"
                  required
                >
                  <option value="usec-a">Armed</option>
                  <option value="usec-ua">Unarmed</option>
                  <option value="usec-both">Both</option>
                </select>
              </div>
              <div className="p-2 border-purple-700 border-solid border-2">
                <label htmlFor="locationid" className="flex m-1">
                  Uniform Type
                </label>
                <select
                  className="select flex grow min-w-56 text-black mx-auto"
                  id="usectype"
                  name="usectype"
                  required
                >
                  <option value="uni-polo">Polo</option>
                  <option value="uni-classa">Blazer</option>
                  <option value="uni-customer">Custom/Other</option>
                </select>
              </div>

              <div className="flex p-2 border-yellow-500 border-solid border-2">
                <div className="flex flex-wrap p-2 bg-slate-900">
                  <p className="content-center text-white">
                    Integrated Type<br></br>
                    <span className="text-sm text-gray-600">
                      {" "}
                      Select all that apply
                    </span>
                  </p>
                </div>
                <div className="form-control border-green-700 border-solid border-2">
                  <label className="label cursor-pointer">
                    <span className="label-text text-white m-2">MSUs</span>
                    <input
                      type="checkbox"
                      name="int-msu"
                      id="int-msu"
                      className="checkbox bg-white"
                    />
                  </label>
                  <label className="label cursor-pointer">
                    <span className="label-text text-white m-2">
                      Remote Monitoring
                    </span>
                    <input
                      type="checkbox"
                      name="int-rm"
                      id="int-rm"
                      className="checkbox bg-white"
                    />
                  </label>
                </div>
                <div className="border-green-700 border-solid border-2">
                  <label className="label cursor-pointer">
                    <span className="label-text text-white m-2">
                      Other Recurring Services
                    </span>
                    <input
                      type="checkbox"
                      name="int-oth-rec"
                      id="int-oth-rec"
                      className="checkbox bg-white"
                    />
                  </label>
                  <label className="label cursor-pointer">
                    <span className="label-text text-white m-2">
                      Installations
                    </span>
                    <input
                      type="checkbox"
                      name="int-install"
                      id="int-install"
                      className="checkbox bg-white"
                    />
                  </label>
                </div>
                <div className="border-green-700 border-solid border-2">
                  <label className="label cursor-pointer">
                    <span className="label-text text-white m-2">
                      Product Sales
                    </span>
                    <input
                      type="checkbox"
                      name="int-prod"
                      id="int-prod"
                      className="checkbox bg-white"
                    />
                  </label>
                  <label className="label cursor-pointer">
                    <span className="label-text text-white m-2">Other</span>
                    <input
                      type="checkbox"
                      name="int-oth"
                      id="int-oth"
                      className="checkbox bg-white"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="container flex flex-wrap justify-between items-center mx-4 px-4 border-green-700 border-solid border-2 bg-gray-800">
            <h1>Service Address</h1>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text text-white p-1">
                  Bill Address Same As Service Address?
                </span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox bg-white"
                />
              </label>
            </div>
          </div>

          <div className="container flex flex-wrap justify-start mt-0 m-4 p-4 border-green-700 border-solid border-2 bg-gray-500">
            <div className="flex grow p-2">
              <input
                type="text"
                placeholder="Street Address"
                className="grow input input-bordered text-black"
                id="address1"
                name="address1"
                required
              />
            </div>
            <div className="p-2">
              <input
                type="text"
                placeholder="Street Address 2"
                className="input input-bordered text-black"
                id="address2"
                name="address2"
              />
            </div>
            <div className="p-2">
              <input
                type="text"
                placeholder="City"
                className="input input-bordered text-black"
                id="city"
                name="city"
                required
              />
            </div>
            <div className="p-2">
              <input
                type="text"
                placeholder="State"
                className="input input-bordered w-full max-w-xs text-black"
                id="state"
                name="state"
                required
              />
            </div>
            <div className="p-2">
              <input
                type="text"
                placeholder="Zip"
                className="input input-bordered w-full max-w-xs text-black"
                id="zip"
                name="zip"
                required
              />
            </div>
          </div>

          {/*******************  BEGIN TAX ADDRESS ********************************/}

          <div className="container flex flex-wrap justify-between items-center mx-4 p-4 border-green-700 border-solid border-2 bg-gray-800">
            <h1>Tax Address</h1>
          </div>

          <div className="container flex flex-wrap justify-start mt-0 m-4 p-4 border-green-700 border-solid border-2">
            <div className="flex grow p-2">
              <input
                type="text"
                placeholder="Tax Street Address"
                className="grow input input-bordered text-black"
                id="taxaddress1"
                name="taxaddress1"
                required
              />
            </div>
            <div className="p-2">
              <input
                type="text"
                placeholder=" Tax Street Address 2"
                className="input input-bordered text-black"
                id="taxaddress2"
                name="taxaddress2"
              />
            </div>
            <div className="p-2">
              <input
                type="text"
                placeholder="Tax City"
                className="input input-bordered text-black"
                id="taxcity"
                name="taxcity"
                required
              />
            </div>
            <div className="p-2">
              <input
                type="text"
                placeholder="Tax State"
                className="input input-bordered w-full max-w-xs text-black"
                id="taxstate"
                name="taxstate"
                required
              />
            </div>
            <div className="p-2">
              <input
                type="text"
                placeholder="Zip"
                className="input input-bordered w-full max-w-xs text-black"
                id="taxzip"
                name="taxzip"
                required
              />
            </div>
          </div>
          {/*******************  END TAX ADDRESS ********************************/}

          <div className="p-2">
            <input
              type="string"
              id="customerid"
              name="customerid"
              className="input input-bordered w-full max-w-xs text-slate-500 bg-gray-600"
              value={customer.customer.CustomerID}
              readOnly
              required
            />
          </div>

          {/* Add other fields here */}
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
