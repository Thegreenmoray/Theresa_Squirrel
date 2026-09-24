import squrriel from "./assets/squirrel.png";
import Tabsforsqurriel from "./tabs/Tabsforsqurriel";
import type { TabItem } from "./tabs/Tabcontainer";

const squirrelTabs: TabItem[] = [
  {
    id: "squirrel",
    tabname: "About Squirrels",
    description:
      "Squirrels are agile, bushy-tailed rodents found all all around the globe. They are known for their acrobatic antics, incredible memory for food caches, and playful nature.",
    image: squrriel,
  },
  {
    id: "shop",
    tabname: "Shop / Available Plants",
    description:
      "List of plants availibe",
  },
  {
    id: "plantlibary",
    tabname: "Plant Library",
    description:
      "Some facts about plants",
  },
  {
    id: "blog",
    tabname: "Blog",
    description:
      "Updates Theresa can post.",
  },
  {
    id: "about",
    tabname:"About",
    description:"about stuff"
  },
  {
    id: "contact",
    tabname:"Contact",
    description:"Insert contact info here."
  }
];

function Frontface() {
  return (
    <div style={{ padding: "20px 16px" }}>
      <h1>Theresa's Squirrel Website</h1>
      {/*this is how you insert data into react*/}
      <Tabsforsqurriel tabs={squirrelTabs} initialActiveIndex={0} />
    </div>
  );
}

export default Frontface;