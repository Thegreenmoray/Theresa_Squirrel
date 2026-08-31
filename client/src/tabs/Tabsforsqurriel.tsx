import { useState } from "react";
import type { TabsProps, TabItem } from "./Tabcontainer";
import "./Tabsforsqurriel.css";

export default function Tabsforsqurriel({
    //collection of tab items
  tabs,
  initialActiveIndex = 0,
  className = "",
    //ahh this is how you do it.
}: TabsProps) {
    //hook, we are checking the active tab, we are adding state variables to functional components
    const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  if (!tabs || tabs.length === 0) {
    return null;
  }
      //can be TabItem or undefined
  const activeTab: TabItem | undefined = tabs[activeIndex] ?? tabs[0];

  return (
    <div className={`tabs-container ${className}`}>
      <div className="tabs-header" role="tablist" aria-label="Squirrel tabs">
          {/*this part contains actual tabs*/}
          {tabs.map((tab, index) => {
          const isActive = index === activeIndex;
          const tabId = tab.id || `tab-${index}`;
          const panelId = `tabpanel-${index}`;

          return (
            <button
              key={tabId}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              className={`tab-button ${isActive ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") {
                  setActiveIndex((index + 1) % tabs.length);
                } else if (e.key === "ArrowLeft") {
                  setActiveIndex((index - 1 + tabs.length) % tabs.length);
                }
              }}
            >
              {tab.tabname}
            </button>
          );
        })}
      </div>
        {/*Ahhh this creates the info, got it*/}
      {activeTab && (
        <div
          id={`tabpanel-${activeIndex}`}
          role="tabpanel"
          aria-labelledby={activeTab.id || `tab-${activeIndex}`}
          className="tab-panel"
        >
          <h2 className="tab-panel-title">{activeTab.tabname}</h2>
          <p className="tab-panel-description">{activeTab.description}</p>
          {activeTab.image && (
            <div className="tab-panel-image-wrapper">
              <img
                src={activeTab.image}
                alt={activeTab.tabname}
                className="tab-panel-image"
              />
            </div>
          )}
          {activeTab.content && (
            <div className="tab-panel-custom-content">
              {activeTab.content}
            </div>
          )}
        </div>
      )}
    </div>
  );
}