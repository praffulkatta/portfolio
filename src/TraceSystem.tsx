import { Fragment, useEffect, useState } from "react";
import { traceableProjects } from "./content";

type TraceSystemProps = {
  projectId: (typeof traceableProjects)[number]["id"];
  onProjectChange: (projectId: (typeof traceableProjects)[number]["id"]) => void;
  onOpenProject: (projectId: string) => void;
};

export default function TraceSystem({ projectId, onProjectChange, onOpenProject }: TraceSystemProps) {
  const project = traceableProjects.find((item) => item.id === projectId) ?? traceableProjects[0];
  const [activeNodeId, setActiveNodeId] = useState(project.nodes[0].id);
  const activeNode = project.nodes.find((node) => node.id === activeNodeId) ?? project.nodes[0];

  useEffect(() => {
    setActiveNodeId(project.nodes[0].id);
  }, [project.id, project.nodes]);

  function selectProject(id: typeof project.id) {
    const next = traceableProjects.find((item) => item.id === id);
    if (!next) return;
    onProjectChange(next.id);
  }

  return (
    <div className="trace">
      <div className="trace-controls" role="group" aria-label="Choose a project architecture">
        {traceableProjects.map((item) => (
          <button
            className={item.id === project.id ? "trace-tab is-active" : "trace-tab"}
            type="button"
            aria-pressed={item.id === project.id}
            key={item.id}
            onClick={() => selectProject(item.id)}
          >
            {item.title}
          </button>
        ))}
      </div>

      <p className="trace-caveat">{project.note}</p>

      <div className="trace-flow" role="group" aria-label={`${project.title} reported components`}>
        {project.nodes.map((node, index) => (
          <Fragment key={node.id}>
            <button
              className={node.id === activeNode.id ? "trace-node is-active" : "trace-node"}
              type="button"
              aria-pressed={node.id === activeNode.id}
              onClick={() => setActiveNodeId(node.id)}
            >
              <span className="trace-node-index">0{index + 1}</span>
              <span className="trace-node-title">{node.name}</span>
              <span className="trace-node-stack">{node.technologies.slice(0, 3).join(" · ")}</span>
            </button>
            {index < project.nodes.length - 1 && (
              <span className="trace-connection" aria-label="Connection details not verified">
                <span aria-hidden="true">→</span>
                <small>not verified</small>
              </span>
            )}
          </Fragment>
        ))}
      </div>

      <div className="trace-detail" aria-live="polite">
        <div className="trace-detail-heading">
          <span className="trace-detail-index">COMPONENT / {String(project.nodes.findIndex((node) => node.id === activeNode.id) + 1).padStart(2, "0")}</span>
          <h3>{activeNode.name}</h3>
        </div>
        <div className="trace-detail-copy">
          <p>{activeNode.role}</p>
          <p>{activeNode.implementation}</p>
          <div className="trace-communication">
            <span>COMMUNICATION / UNVERIFIED</span>
            <p>{activeNode.communication}</p>
          </div>
          <ul className="trace-technologies" aria-label={`${activeNode.name} technologies`}>
            {activeNode.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
          <button className="inline-link" type="button" onClick={() => onOpenProject(project.id)}>
            Read the project notes <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>

      <p className="trace-caption">{project.connectionNote}</p>
    </div>
  );
}
