"use client";

import { ArrowUpRightIcon, CheckIcon, PlusIcon } from "@/components/icons";

import { useRef, useState } from "react";
import { services, vehicles } from "@/data/site";

type Values = { name: string; email: string; vehicle: string; interests: string[]; budget: string; brief: string };
type Field = "name" | "email" | "vehicle" | "interests" | "budget" | "brief";
type Errors = Partial<Record<Field, string>>;
const budgets = ["Exploring options", "Focused upgrade", "Comprehensive build", "Not sure yet"];
const interestNames = services.map((service) => service.name);

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Enter your name.";
  if (!values.email.trim()) errors.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email address.";
  if (!values.vehicle) errors.vehicle = "Select a vehicle or concept build.";
  if (!values.interests.length) errors.interests = "Choose at least one area of interest.";
  if (!values.budget) errors.budget = "Select a budget stage.";
  if (values.brief.trim().length < 20) errors.brief = "Tell us a little more about the project (at least 20 characters).";
  return errors;
}

export function EnquiryForm({ initialVehicle = "", initialService = "" }: { initialVehicle?: string; initialService?: string }) {
  const [values, setValues] = useState<Values>({ name: "", email: "", vehicle: initialVehicle, interests: initialService ? [initialService] : [], budget: "", brief: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [step, setStep] = useState<"details" | "review" | "complete">("details");
  const errorSummary = useRef<HTMLDivElement>(null);
  const sectionTitle = useRef<HTMLHeadingElement>(null);
  const setField = <K extends keyof Values>(key: K, value: Values[K]) => { setValues((current) => ({ ...current, [key]: value })); setErrors((current) => ({ ...current, [key]: undefined })); };
  function review(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length) { requestAnimationFrame(() => errorSummary.current?.focus()); return; }
    setStep("review"); requestAnimationFrame(() => sectionTitle.current?.focus());
  }
  function toggleInterest(value: string) { setField("interests", values.interests.includes(value) ? values.interests.filter((item) => item !== value) : [...values.interests, value]); }

  return <div className="enquiry-shell">
    <div className="enquiry-progress"><span className={step === "details" ? "is-active" : ""}>01 / Details</span><span className={step === "review" ? "is-active" : ""}>02 / Review</span><span className={step === "complete" ? "is-active" : ""}>03 / Demo complete</span></div>
    {step === "details" && <form onSubmit={review} noValidate>
      <h2 ref={sectionTitle} tabIndex={-1}>Tell us about your build.</h2><p className="form-intro">Share what you have in mind. This is a portfolio demonstration; your details stay in this browser session and are not sent or stored.</p>
      {Object.keys(errors).length > 0 && <div className="error-summary" ref={errorSummary} tabIndex={-1} role="alert"><strong>Please check these fields:</strong><ul>{(Object.keys(errors) as Field[]).map((field) => <li key={field}><a href={`#${field}`}>{errors[field]}</a></li>)}</ul></div>}
      <div className="form-two"><div className="field"><label htmlFor="name">Your name <span>*</span></label><input id="name" name="name" value={values.name} onChange={(event) => setField("name", event.target.value)} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />{errors.name && <small id="name-error">{errors.name}</small>}</div><div className="field"><label htmlFor="email">Email address <span>*</span></label><input id="email" name="email" type="email" value={values.email} onChange={(event) => setField("email", event.target.value)} autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />{errors.email && <small id="email-error">{errors.email}</small>}</div></div>
      <div className="field"><label htmlFor="vehicle">Vehicle or concept build <span>*</span></label><select id="vehicle" name="vehicle" value={values.vehicle} onChange={(event) => setField("vehicle", event.target.value)} aria-invalid={!!errors.vehicle} aria-describedby={errors.vehicle ? "vehicle-error" : undefined}><option value="">Choose a vehicle</option>{vehicles.map((vehicle) => <option value={vehicle.slug} key={vehicle.slug}>{vehicle.code} / {vehicle.name}</option>)}<option value="my-vehicle">My own vehicle</option></select>{errors.vehicle && <small id="vehicle-error">{errors.vehicle}</small>}</div>
      <fieldset className="interest-field" id="interests" aria-invalid={!!errors.interests} aria-describedby={errors.interests ? "interests-error" : undefined}><legend>Areas of interest <span>*</span></legend><div className="interest-grid">{interestNames.map((name) => <label key={name} className={values.interests.includes(name) ? "checked" : ""}><input type="checkbox" checked={values.interests.includes(name)} onChange={() => toggleInterest(name)} /><span>{name}</span><span aria-hidden>{values.interests.includes(name) ? <CheckIcon /> : <PlusIcon />}</span></label>)}</div>{errors.interests && <small id="interests-error">{errors.interests}</small>}</fieldset>
      <div className="field"><label htmlFor="budget">Budget stage <span>*</span></label><select id="budget" name="budget" value={values.budget} onChange={(event) => setField("budget", event.target.value)} aria-invalid={!!errors.budget} aria-describedby={errors.budget ? "budget-error" : undefined}><option value="">Choose a stage</option>{budgets.map((budget) => <option key={budget} value={budget}>{budget}</option>)}</select>{errors.budget && <small id="budget-error">{errors.budget}</small>}</div>
      <div className="field"><label htmlFor="brief">Project brief <span>*</span></label><textarea id="brief" name="brief" rows={6} placeholder="What would you like to change, and how should the car feel?" value={values.brief} onChange={(event) => setField("brief", event.target.value)} aria-invalid={!!errors.brief} aria-describedby={errors.brief ? "brief-error" : undefined} />{errors.brief && <small id="brief-error">{errors.brief}</small>}</div>
      <button className="button-primary" type="submit">Review enquiry <span className="action-icon" aria-hidden><ArrowUpRightIcon /></span></button><p className="form-disclaimer">Demo only. Review does not send or save your details.</p>
    </form>}
    {step === "review" && <div className="form-review"><h2 ref={sectionTitle} tabIndex={-1}>Review your enquiry.</h2><p className="form-intro">Check the details below. Completing this demo does not send or store them.</p><dl><div><dt>Name</dt><dd>{values.name}</dd></div><div><dt>Email</dt><dd>{values.email}</dd></div><div><dt>Vehicle</dt><dd>{vehicles.find((item) => item.slug === values.vehicle)?.name ?? "My own vehicle"}</dd></div><div><dt>Interests</dt><dd>{values.interests.join(", ")}</dd></div><div><dt>Budget stage</dt><dd>{values.budget}</dd></div><div><dt>Brief</dt><dd>{values.brief}</dd></div></dl><div className="review-actions"><button type="button" className="button-secondary" onClick={() => { setStep("details"); requestAnimationFrame(() => sectionTitle.current?.focus()); }}>Edit details</button><button className="button-primary" type="button" onClick={() => { setStep("complete"); requestAnimationFrame(() => sectionTitle.current?.focus()); }}>Complete demo <span className="action-icon" aria-hidden><ArrowUpRightIcon /></span></button></div></div>}
    {step === "complete" && <div className="form-complete" role="status"><p className="eyebrow">03 / Demo complete</p><h2 ref={sectionTitle} tabIndex={-1}>A considered start.</h2><p>This interaction is complete. No enquiry was sent or stored. In a live studio site, this is where a secure delivery service would confirm receipt.</p><button className="button-secondary" type="button" onClick={() => { setValues({ name: "", email: "", vehicle: "", interests: [], budget: "", brief: "" }); setErrors({}); setStep("details"); }}>Start again</button></div>}
  </div>;
}
