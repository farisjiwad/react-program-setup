"use client";

import { useEffect, useState } from "react";

export default function Processing() {
	const [jsonData, setJsonData] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadData() {
			const formDataRaw = window.localStorage.getItem('programFormData');
			let formData = {};
			if (formDataRaw) {
				formData = JSON.parse(formDataRaw);
			}
			let fogbugz = "";
			try {
				const res = await fetch('/file.txt');
				fogbugz = await res.text();
			} catch {
				fogbugz = "Could not load file.txt.";
			}
			setJsonData({ ...formData, fogbugz });
			setLoading(false);
		}
		loadData();
	}, []);

	function handleDownload() {
		if (!jsonData) return;
		const json = JSON.stringify(jsonData, null, 2);
		const blob = new Blob([json], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `program-request-${jsonData.clientName || 'client'}.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
			<div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8">
				<h1 className="text-2xl font-bold mb-4 text-center">Review Program Request</h1>
				{loading ? (
					<div className="text-center text-gray-500">Loading...</div>
				) : (
					<>
						<pre className="bg-gray-100 p-4 rounded text-xs mb-4 max-h-96 overflow-auto">{JSON.stringify(jsonData, null, 2)}</pre>
						<button
							type="button"
							className="bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-colors w-full"
							onClick={handleDownload}
						>
							Submit & Download
						</button>
					</>
				)}
			</div>
		</div>
	);
}
