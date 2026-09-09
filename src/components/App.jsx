import React, { useMemo, useState } from "react";
import Nav from "./Nav";
import HogCard from "./HogCard";
import HogForm from "./HogForm";

import hogs from "../porkers_data";

function App() {
	const [allHogs, setAllHogs] = useState(hogs);
	const [greasedOnly, setGreasedOnly] = useState(false);
	const [sortBy, setSortBy] = useState("");
	const [hiddenHogs, setHiddenHogs] = useState([]);

	const visibleHogs = useMemo(() => {
		const displayedHogs = allHogs.filter(
			(hog) => !hiddenHogs.includes(hog.name) && (!greasedOnly || hog.greased)
		);

		if (sortBy === "name") {
			return [...displayedHogs].sort((a, b) => a.name.localeCompare(b.name));
		}

		if (sortBy === "weight") {
			return [...displayedHogs].sort((a, b) => a.weight - b.weight);
		}

		return displayedHogs;
	}, [allHogs, greasedOnly, hiddenHogs, sortBy]);

	function hideHog(name) {
		setHiddenHogs((currentHogs) => [...currentHogs, name]);
	}

	function addHog(newHog) {
		setAllHogs((currentHogs) => [...currentHogs, newHog]);
	}

	return (
		<div className="App">
			<Nav />
			<section className="filterWrapper" aria-label="Hog controls">
				<div className="ui checkbox">
					<input
						id="greased-filter"
						type="checkbox"
						checked={greasedOnly}
						onChange={(event) => setGreasedOnly(event.target.checked)}
					/>
					<label htmlFor="greased-filter">Greased Pigs Only?</label>
				</div>
				<div className="sortControl">
					<label htmlFor="sort-hogs">Sort by:</label>
					<select
						id="sort-hogs"
						value={sortBy}
						onChange={(event) => setSortBy(event.target.value)}
					>
						<option value="">Original order</option>
						<option value="name">Name</option>
						<option value="weight">Weight</option>
					</select>
				</div>
			</section>
			<HogForm onAddHog={addHog} />
			<main className="ui grid container">
				{visibleHogs.map((hog) => (
					<HogCard key={hog.name} hog={hog} onHide={hideHog} />
				))}
			</main>
		</div>
	);
}

export default App;
