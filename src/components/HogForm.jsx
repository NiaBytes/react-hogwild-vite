import React, { useState } from "react";
import piggy from "../assets/porco.png";

const initialForm = {
	name: "",
	weight: "",
	specialty: "",
	greased: false,
};

function HogForm({ onAddHog }) {
	const [formData, setFormData] = useState(initialForm);

	function updateField(event) {
		const { name, type, checked, value } = event.target;
		setFormData((currentData) => ({
			...currentData,
			[name]: type === "checkbox" ? checked : value,
		}));
	}

	function handleSubmit(event) {
		event.preventDefault();
		onAddHog({
			...formData,
			weight: Number(formData.weight),
			image: piggy,
			"highest medal achieved": "No medal yet",
		});
		setFormData(initialForm);
	}

	return (
		<form className="ui form hogForm" onSubmit={handleSubmit}>
			<div className="field">
				<label htmlFor="hog-name">Name:</label>
				<input
					id="hog-name"
					name="name"
					type="text"
					value={formData.name}
					onChange={updateField}
					required
				/>
			</div>
			<div className="field">
				<label htmlFor="hog-weight">Weight:</label>
				<input
					id="hog-weight"
					name="weight"
					type="number"
					min="0"
					step="0.1"
					value={formData.weight}
					onChange={updateField}
					required
				/>
			</div>
			<div className="field">
				<label htmlFor="hog-specialty">Specialty:</label>
				<input
					id="hog-specialty"
					name="specialty"
					type="text"
					value={formData.specialty}
					onChange={updateField}
					required
				/>
			</div>
			<div className="inline field">
				<input
					id="hog-greased"
					name="greased"
					type="checkbox"
					checked={formData.greased}
					onChange={updateField}
				/>
				<label htmlFor="hog-greased">Greased?</label>
			</div>
			<button className="ui primary button" type="submit">
				Add Hog
			</button>
		</form>
	);
}

export default HogForm;
