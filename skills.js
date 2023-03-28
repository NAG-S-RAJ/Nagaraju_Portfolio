import React, { useState } from "react";
import ".skills.css";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import FrontendPanel from "FrontendPanel.js";
import Panel from "../../components/SkillPanels/Panel";
import CompetitivePanel from "../../components/SkillPanels/CompetitivePanel";
import BackendPanel from "BackendPanel.js";

function Skills() {
	const [tab, setTab] = useState(0);

	const handleTabChange = (event, i) => {
		setTab(i);
	};

	return (
		<div className="section-style skill-section">
			<h1 className="section-head skill-head">
				My Skills{" "}
				<span role="img" aria-label="skill emoji">
					💪
				</span>
			</h1>
			<AppBar position="static" elevation={3} className="skill-bar">
				<Tabs
					value={tab}
					onChange={handleTabChange}
					variant="fullWidth"
					indicatorColor="primary"
				>
					<Tab label="Frontend" />
					<Tab label="Backend" />
					<Tab label="DSA" />
				</Tabs>
			</AppBar>
			<Panel index={0} value={tab}>
				<FrontendPanel />
			</Panel>
			<Panel index={1} value={tab}>
				<BackendPanel />
			</Panel>
			<Panel index={2} value={tab}>
				<CompetitivePanel />
			</Panel>
		</div>
	);
}

export default Skills;
