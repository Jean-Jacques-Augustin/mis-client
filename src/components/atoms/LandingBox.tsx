import React from "react";
import Card from "@mui/material/Card";


export interface LandingBoxProps {
	title: string;
	description: string;
	icone: React.ReactNode;
}

export default function LandingBox(
	{title, description, icone}: LandingBoxProps
) {
	return (
		<Card variant={"outlined"} sx={{
			p: 2,
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			minHeight: 400,

		}}>
			{icone}
			<h2>{title}</h2>
			<p>{description}</p>
		</Card>
	)
}