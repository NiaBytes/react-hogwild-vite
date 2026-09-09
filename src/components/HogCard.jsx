import React, { useState } from "react";

function HogCard({ hog, onHide }) {
	const [showDetails, setShowDetails] = useState(false);

	function handleHide(event) {
		event.stopPropagation();
		onHide(hog.name);
	}

	return (
		<article
			aria-label="hog card"
			className="ui card eight wide column"
			onClick={() => setShowDetails((currentValue) => !currentValue)}
		>
			<div className="image">
				<img src={hog.image} alt={`Photo of ${hog.name}`} />
			</div>
			<div className="content">
				<h3 className="header">{hog.name}</h3>
				{showDetails && (
					<div className="hogDetails">
						<p>Specialty: {hog.specialty}</p>
						<p>{hog.weight}</p>
						<p>{hog.greased ? "Greased" : "Nongreased"}</p>
						<p>{hog["highest medal achieved"]}</p>
					</div>
				)}
			</div>
			<button className="ui button" type="button" onClick={handleHide}>
				Hide Me
			</button>
		</article>
	);
}

export default HogCard;
