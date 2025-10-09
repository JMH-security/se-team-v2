"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import * as yup from "yup";
import { Region } from "@/types/regions";
import { Supervisor } from "@/types/supervisor_archive";
import { Branch } from "@/types/branch";
import { entityConfig } from "@/components/wt/entityConfig";
import { SalesTaxStateId } from "@/types/salestaxstateid";
//import styles from "./page.module.css";

interface FormState {
	title: string;
	jobdescription: string;
	jobnotes: string;
	activetypeid: string;
	regionid: string;
	locationid: string;
	supervisorid: string;
	datetostart: string;
	timetostart: string;
	datetoend: string;
	svcdur: string;
	taxinsid: string;
	salestaxid: string;
	hourscatid: string;
	hoursruleid: string;
	// Service type checkboxes
	usec: boolean;
	int: boolean;
	inv: boolean;
	other: boolean;
	// Uniform options
	uniformSecurityType: string;
	uniformType: string;
	// Integrated type checkboxes
	intMsu: boolean;
	intRm: boolean;
	intOthRec: boolean;
	intInstall: boolean;
	intProd: boolean;
	intOth: boolean;
	// Service Address fields
	address1: string;
	address2: string;
	city: string;
	state: string;
	zip: string;
	// Tax Address fields
	taxaddress1: string;
	taxaddress2: string;
	taxcity: string;
	taxstate: string;
	taxzip: string;
	customerid: string;
	// Bill address same as service address flag
	sameAsServiceAddress: boolean;
}

const initialFormState: FormState = {
	title: "",
	jobdescription: "",
	jobnotes: "",
	activetypeid: "1",
	regionid: "",
	locationid: "",
	supervisorid: "",
	datetostart: new Date(new Date().setDate(new Date().getDate() + 14))
		.toISOString()
		.split("T")[0],
	timetostart: "07:00",
	datetoend: new Date(new Date().setDate(new Date().getDate() + 379))
		.toISOString()
		.split("T")[0],
	svcdur: "svcdur-recur",
	taxinsid: "",
	salestaxid: "",
	hourscatid: "",
	hoursruleid: "",
	usec: false,
	int: false,
	inv: false,
	other: false,
	uniformSecurityType: "usec-a",
	uniformType: "uni-polo",
	intMsu: false,
	intRm: false,
	intOthRec: false,
	intInstall: false,
	intProd: false,
	intOth: false,
	address1: "",
	address2: "",
	city: "",
	state: "",
	zip: "",
	taxaddress1: "",
	taxaddress2: "",
	taxcity: "",
	taxstate: "",
	taxzip: "",
	customerid: "1",
	sameAsServiceAddress: true,
};

const jobSchema = yup.object().shape({
	title: yup.string().required("Job Name is required"),
	jobdescription: yup.string().required("Job Description is required"),
	activetypeid: yup.string().required("Job Status is required"),
	regionid: yup.string().required("Region is required"),
	locationid: yup.string().required("Servicing Branch or Project is required"),
	supervisorid: yup.string().required("Supervisor is required"),
	datetostart: yup.string().required("Service Start Date is required"),
	timetostart: yup.string().required("Service Start Time is required"),
	svcdur: yup.string().required("Service Duration Type is required"),
	taxinsid: yup.string().required("Tax and Insurance is required"),
	salestaxid: yup.string().required("Sales Tax ID is required"),
	hourscatid: yup.string().required("Hours Category ID is required"),
	hoursruleid: yup.string().required("Hours Rule ID is required"),
	address1: yup.string().required("Street Address is required"),
	city: yup.string().required("City is required"),
	state: yup.string().required("State is required"),
	zip: yup.string().required("Zip is required"),
	sameAsServiceAddress: yup.boolean(),
	taxAddress1: yup
		.string()
		.when("sameAsServiceAddress", {
			is: false,
			then: (schema) => schema.required("Tax Street Address is required"),
		}),
	taxAddress2: yup.string(),
	taxCity: yup
		.string()
		.when("sameAsServiceAddress", {
			is: false,
			then: (schema) => schema.required("Tax City is required"),
		}),
	taxState: yup
		.string()
		.when("sameAsServiceAddress", {
			is: false,
			then: (schema) => schema.required("Tax State is required"),
		}),
	taxZip: yup
		.string()
		.when("sameAsServiceAddress", {
			is: false,
			then: (schema) => schema.required("Tax Zip is required"),
		}),
});

const JobForm: React.FC<JobsProps> = ({ customer }) => {
	const [regions, setRegions] = useState<Region[]>([]);
	const [branches, setBranches] = useState<Branch[]>([]);
	const [supervisors, setSupervisors] = useState<Supervisor[]>([]);
	const [salesTaxStateId, setSalesTaxStateId] = useState<SalesTaxStateId[]>([]);
	const [formState, setFormState] = useState<FormState>(initialFormState);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	useEffect(() => {
		getRegions();
		getBranches();
		getSupervisors();
		getSalesTaxStateIds();
	}, []);

	const getRegions = async () => {
		try {
			const res = await fetch(entityConfig.regions.endpointUrl, {
				method: "GET",
			});
			const data = await res.json();
			setRegions(data);
		} catch (error) {
			console.error("Error fetching regions", error);
		}
	};

	const getBranches = async () => {
		try {
			const res = await fetch(entityConfig.branches.endpointUrl, {
				method: "GET",
			});
			const data = await res.json();
			setBranches(data);
		} catch (error) {
			console.error("Error fetching branches", error);
		}
	};

	const getSupervisors = async () => {
		try {
			const res = await fetch(entityConfig.supervisors.endpointUrl, {
				method: "GET",
			});
			const data = await res.json();
			setSupervisors(data);
		} catch (error) {
			console.error("Error fetching supervisors", error);
		}
	};

	const getSalesTaxStateIds = async () => {
		try {
			const res = await fetch(entityConfig.salestaxstateid.endpointUrl, {
				method: "GET",
			});
			const data = await res.json();
			setSalesTaxStateId(data);
		} catch (error) {
			console.error("Error fetching Sales Tax State Ids", error);
		}
	};

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		// @ts-expect-error TS is just freaking out about the type of `checked`.
		const { name, value, type, checked } = e.target;
		setFormState((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await jobSchema.validate(formState, { abortEarly: false });
			console.log("Form Submitted", formState);
			setErrors({});
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (validationError: any) {
			const errorObj: { [key: string]: string } = {};
			if (validationError.inner) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				validationError.inner.forEach((err: any) => {
					if (err.path) errorObj[err.path] = err.message;
				});
			}
			setErrors(errorObj);
			console.error("Validation Errors:", errorObj);
		}
	};

	return (
		<>
			<div className="">
				<form name="addnewjob" onSubmit={handleSubmit} className="">
					<div className="">
						<h2>
							Add Job For Customer <b>{customer}</b>
						</h2>
					</div>

					{/* Basic Job Information */}
					<div className="">
						<div className="">
							<label htmlFor="title">Job Name</label>
							<input
								type="text"
								placeholder="Job Name"
								id="title"
								name="title"
								value={formState.title}
								onChange={handleChange}
								className=""
							/>
							{errors.title && <span className="">{errors.title}</span>}
						</div>
						<div className="">
							<label htmlFor="jobdescription">Job Description</label>
							<input
								type="text"
								placeholder="Job Description"
								id="jobdescription"
								name="jobdescription"
								value={formState.jobdescription}
								onChange={handleChange}
								className="input"
							/>
							{errors.jobdescription && (
								<span className="">{errors.jobdescription}</span>
							)}
						</div>
						<div className="">
							<label htmlFor="jobnotes">Job Notes</label>
							<textarea
								id="jobnotes"
								name="jobnotes"
								placeholder="Job Notes"
								value={formState.jobnotes}
								onChange={handleChange}
								className=""
							/>
						</div>
					</div>

					{/* Job Details */}
					<div className="">
						<div className="">
							<label htmlFor="activetypeid">Job Status</label>
							<select
								id="activetypeid"
								name="activetypeid"
								value={formState.activetypeid}
								onChange={handleChange}
								className=""
							>
								<option value="1">Active</option>
								<option value="0">Inactive</option>
							</select>
							{errors.activetypeid && (
								<span className="">{errors.activetypeid}</span>
							)}
						</div>
						<div className="">
							<label htmlFor="regionid">Region</label>
							<select
								id="regionid"
								name="regionid"
								value={formState.regionid}
								onChange={handleChange}
								className=""
							>
								<option value="">Select Region</option>
								{regions.map((region) => (
									<option key={region.id} value={region.id}>
										{region.name}
									</option>
								))}
							</select>
							{errors.regionid && <span className="">{errors.regionid}</span>}
						</div>
						<div className="">
							<label htmlFor="locationid">Servicing Branch or Project</label>
							<select
								id="locationid"
								name="locationid"
								value={formState.locationid}
								onChange={handleChange}
								className=""
							>
								<option value="">Select Branch or Project</option>
								{branches.map((branch) => (
									<option key={branch.id} value={branch.id}>
										{branch.name}
									</option>
								))}
							</select>
							{errors.locationid && (
								<span className="">{errors.locationid}</span>
							)}
						</div>
						<div className="">
							<label htmlFor="supervisorid">Supervisor</label>
							<select
								id="supervisorid"
								name="supervisorid"
								value={formState.supervisorid}
								onChange={handleChange}
								className=""
							>
								<option value="">Select Supervisor</option>
								{supervisors.map((supervisor) => (
									<option key={supervisor.id} value={supervisor.id}>
										{supervisor.name}
									</option>
								))}
							</select>
							{errors.supervisorid && (
								<span className="">{errors.supervisorid}</span>
							)}
						</div>
					</div>

					{/* Service Details */}
					<div className="">
						<div className="">
							<label htmlFor="datetostart">Service Start Date</label>
							<input
								type="date"
								id="datetostart"
								name="datetostart"
								value={formState.datetostart}
								onChange={handleChange}
								className=""
							/>
							{errors.datetostart && (
								<span className="">{errors.datetostart}</span>
							)}
						</div>
						<div className="">
							<label htmlFor="timetostart">Service Start Time</label>
							<input
								type="text"
								id="timetostart"
								name="timetostart"
								value={formState.timetostart}
								onChange={handleChange}
								className=""
							/>
							{errors.timetostart && (
								<span className="">{errors.timetostart}</span>
							)}
						</div>
						<div className="">
							<label htmlFor="datetoend">Service Discontinue Date</label>
							<input
								type="date"
								id="datetoend"
								name="datetoend"
								value={formState.datetoend}
								onChange={handleChange}
								className=""
							/>
						</div>
						<div className="">
							<label htmlFor="svcdur">Service Duration Type</label>
							<select
								id="svcdur"
								name="svcdur"
								value={formState.svcdur}
								onChange={handleChange}
								className=""
							>
								<option value="svcdur-recur">Recurring</option>
								<option value="svcdur-onetime">One-Time</option>
								<option value="svcdur-oncall">On-Call / Ad-hoc</option>
							</select>
							{errors.svcdur && (
								<span className={styles.error}>{errors.svcdur}</span>
							)}
						</div>
						<div className="">
							<label htmlFor="taxinsid">Tax and Insurance</label>
							<select
								id="taxinsid"
								name="taxinsid"
								value={formState.taxinsid}
								onChange={handleChange}
								className=""
							>
								<option value="">Select Tax/Insurance</option>
								<option value="3">AL Clerical</option>
								<option value="2">AL Outside Sales</option>
								<option value="1">AL Patrol Agency</option>
								<option value="9">FL Clerical</option>
							</select>
							{errors.taxinsid && <span className="">{errors.taxinsid}</span>}
						</div>
						<div className="">
							<label htmlFor="salestaxid">Sales Tax ID</label>
							<select
								id="salestaxid"
								name="salestaxid"
								value={formState.salestaxid}
								onChange={handleChange}
								className=""
							>
								<option value="">Select Sales Tax</option>
								<option value="1">Tax 1</option>
								<option value="2">Tax 2</option>
								<option value="3">Tax 3</option>
								<option value="4">Tax 4</option>
							</select>
							{errors.salestaxid && (
								<span className="">{errors.salestaxid}</span>
							)}
						</div>
						<div className="">
							<label htmlFor="hourscatid">Hours Category ID</label>
							<select
								id="hourscatid"
								name="hourscatid"
								value={formState.hourscatid}
								onChange={handleChange}
								className=""
							>
								<option value="">Select Hours Category</option>
								<option value="1">Cat 1</option>
								<option value="2">Cat 2</option>
								<option value="3">Cat 3</option>
								<option value="4">Cat 4</option>
							</select>
							{errors.hourscatid && (
								<span className="">{errors.hourscatid}</span>
							)}
						</div>
						<div className="">
							<label htmlFor="hoursruleid">Hours Rule ID</label>
							<select
								id="hoursruleid"
								name="hoursruleid"
								value={formState.hoursruleid}
								onChange={handleChange}
								className=""
							>
								<option value="">Select Hours Rule</option>
								<option value="1">Hours Rule 1</option>
								<option value="2">Hours Rule 2</option>
								<option value="3">Hours Rule 3</option>
								<option value="4">Hours Rule 4</option>
							</select>
							{errors.hoursruleid && (
								<span className="">{errors.hoursruleid}</span>
							)}
						</div>
					</div>

					{/* Service Types */}
					<div className="">
						<div className="">
							<h3>Select Service Type</h3>
							<div className="">
								<label>
									<input
										type="checkbox"
										name="usec"
										checked={formState.usec}
										onChange={handleChange}
									/>
									Uniformed Security
								</label>
								<label>
									<input
										type="checkbox"
										name="int"
										checked={formState.int}
										onChange={handleChange}
									/>
									Integrated Security
								</label>
								<label>
									<input
										type="checkbox"
										name="inv"
										checked={formState.inv}
										onChange={handleChange}
									/>
									Investigations
								</label>
								<label>
									<input
										type="checkbox"
										name="other"
										checked={formState.other}
										onChange={handleChange}
									/>
									Other
								</label>
							</div>
						</div>

						<div className="">
							<div className="">
								<label htmlFor="uniformSecurityType">
									Uniform Security Type
								</label>
								<select
									id="uniformSecurityType"
									name="uniformSecurityType"
									value={formState.uniformSecurityType}
									onChange={handleChange}
									className=""
								>
									<option value="usec-a">Armed</option>
									<option value="usec-ua">Unarmed</option>
									<option value="usec-both">Both</option>
								</select>
							</div>
						</div>

						<div className="">
							<div className="">
								<label htmlFor="uniformType">Uniform Type</label>
								<select
									id="uniformType"
									name="uniformType"
									value={formState.uniformType}
									onChange={handleChange}
									className=""
								>
									<option value="uni-polo">Polo</option>
									<option value="uni-classa">Blazer</option>
									<option value="uni-customer">Custom/Other</option>
								</select>
							</div>
						</div>

						<div className="">
							<h3>Integrated Type (Select all that apply)</h3>
							<div className="">
								<label>
									<input
										type="checkbox"
										name="intMsu"
										checked={formState.intMsu}
										onChange={handleChange}
									/>
									MSUs
								</label>
								<label>
									<input
										type="checkbox"
										name="intRm"
										checked={formState.intRm}
										onChange={handleChange}
									/>
									Remote Monitoring
								</label>
								<label>
									<input
										type="checkbox"
										name="intOthRec"
										checked={formState.intOthRec}
										onChange={handleChange}
									/>
									Other Recurring Services
								</label>
								<label>
									<input
										type="checkbox"
										name="intInstall"
										checked={formState.intInstall}
										onChange={handleChange}
									/>
									Installations
								</label>
								<label>
									<input
										type="checkbox"
										name="intProd"
										checked={formState.intProd}
										onChange={handleChange}
									/>
									Product Sales
								</label>
								<label>
									<input
										type="checkbox"
										name="intOth"
										checked={formState.intOth}
										onChange={handleChange}
									/>
									Other
								</label>
							</div>
						</div>
					</div>

					{/* Service Address */}
					<div className="">
						<div className="">
							<h3>Service Address</h3>
							<div className="">
								<label>
									<input
										type="checkbox"
										name="sameAsServiceAddress"
										checked={formState.sameAsServiceAddress}
										onChange={handleChange}
									/>
									Bill Address Same As Service Address?
								</label>
							</div>
						</div>
						<div className="">
							<label htmlFor="address1">Street Address</label>
							<input
								type="text"
								placeholder="Street Address"
								id="address1"
								name="address1"
								value={formState.address1}
								onChange={handleChange}
								className=""
							/>
							{errors.address1 && <span className="">{errors.address1}</span>}
						</div>
						<div className="">
							<label htmlFor="address2">Street Address 2</label>
							<input
								type="text"
								placeholder="Street Address 2"
								id="address2"
								name="address2"
								value={formState.address2}
								onChange={handleChange}
								className=""
							/>
						</div>
						<div className="">
							<label htmlFor="city">City</label>
							<input
								type="text"
								placeholder="City"
								id="city"
								name="city"
								value={formState.city}
								onChange={handleChange}
								className=""
							/>
							{errors.city && <span className="">{errors.city}</span>}
						</div>
						<div className="">
							<label htmlFor="state">State</label>
							<input
								type="text"
								placeholder="State"
								id="state"
								name="state"
								value={formState.state}
								onChange={handleChange}
								className=""
							/>
							{errors.state && <span className="">{errors.state}</span>}
						</div>
						<div className="">
							<label htmlFor="zip">Zip</label>
							<input
								type="text"
								placeholder="Zip"
								id="zip"
								name="zip"
								value={formState.zip}
								onChange={handleChange}
								className=""
							/>
							{errors.zip && <span className="">{errors.zip}</span>}
						</div>
					</div>

					{/* Tax Address */}
					<div className="">
						<div className="">
							<h3>Tax Address</h3>
						</div>
						<div className="">
							<label htmlFor="taxaddress1">Tax Street Address</label>
							<input
								type="text"
								placeholder="Tax Street Address"
								id="taxaddress1"
								name="taxaddress1"
								value={formState.taxaddress1}
								onChange={handleChange}
								className=""
							/>
							{errors.taxaddress1 && (
								<span className="">{errors.taxaddress1}</span>
							)}
						</div>
						<div className="">
							<label htmlFor="taxaddress2">Tax Street Address 2</label>
							<input
								type="text"
								placeholder="Tax Street Address 2"
								id="taxaddress2"
								name="taxaddress2"
								value={formState.taxaddress2}
								onChange={handleChange}
								className=""
							/>
						</div>
						<div className="">
							<label htmlFor="taxcity">Tax City</label>
							<input
								type="text"
								placeholder="Tax City"
								id="taxcity"
								name="taxcity"
								value={formState.taxcity}
								onChange={handleChange}
								className=""
							/>
							{errors.taxcity && <span className="">{errors.taxcity}</span>}
						</div>
						<div className="">
							<label htmlFor="taxstate">Tax State</label>
							<input
								type="text"
								placeholder="Tax State"
								id="taxstate"
								name="taxstate"
								value={formState.taxstate}
								onChange={handleChange}
								className=""
							/>
							{errors.taxstate && <span className="">{errors.taxstate}</span>}
						</div>
						<div className="">
							<label htmlFor="taxzip">Tax Zip</label>
							<input
								type="text"
								placeholder="Tax Zip"
								id="taxzip"
								name="taxzip"
								value={formState.taxzip}
								onChange={handleChange}
								className=""
							/>
							{errors.taxzip && <span className="">{errors.taxzip}</span>}
						</div>
					</div>

					{/* Customer ID (Read-Only) */}
					<div className="">
						<label htmlFor="customerid">Customer ID</label>
						<input
							type="string"
							id="customerid"
							name="customerid"
							value={formState.customerid}
							readOnly
							className=""
						/>
					</div>

					<button type="submit" className="">
						Submit
					</button>
				</form>
			</div>
		</>
	);
};

export default JobForm;
