"use client";
import { Sprint } from "@/types/sprint";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [sprints, setSprints] = useState<Sprint[]>([]);

  useEffect(() => {
    const fetchSprint = async () => {
      const res = await fetch("/api/sprint", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      console.log({ data });
      setSprints(data.sprints);
    };

    fetchSprint();
  }, []);
  
  const addIssuesInDB = async () => {
    const res = await fetch('/api/issue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
  
    const data = await res.json();
    return data.reply;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Sprints Overview
        </h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          onClick={addIssuesInDB}
        >
          Add Dummy Data In DB
        </button>
      </div>

      {!sprints || sprints.length === 0 ? (
        <p className="text-center text-gray-400">No sprints available.</p>
      ) : (
        <div className="space-y-6">
          {sprints.map((sprint, index) => (
            <div
              key={index}
              className="bg-gray-800 p-5 rounded-xl shadow-lg transition hover:shadow-xl"
            >
              <h2 className="text-2xl font-semibold mb-1">{sprint.name}</h2>
              <p className="text-gray-400 mb-3 italic">{sprint.goal}</p>
              <div className="text-sm text-gray-300 mb-4">
                📅 {sprint.startDate} — {sprint.endDate}
              </div>

              <div className="space-y-3">
                {!sprint.issues || sprint.issues.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No issues in this sprint.
                  </p>
                ) : (
                  sprint.issues.map((issue, i) => (
                    <div
                      key={i}
                      className="border border-gray-700 rounded-lg p-4 bg-gray-700"
                    >
                      <h3 className="text-lg font-medium">{issue.title}</h3>
                      <p className="text-sm text-gray-300 mb-1">
                        {issue.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>Priority: {issue.priority}</span>
                        <span>Status: {issue.status}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
